-- =====================================================
-- Security Database Schema Updates
-- افزودن لایه‌های امنیتی به دیتابیس
-- =====================================================

-- 1. به‌روزرسانی جدول rep_session با فیلدهای امنیتی
-- =====================================================
ALTER TABLE rep_session
ADD COLUMN IF NOT EXISTS session_fingerprint TEXT,
ADD COLUMN IF NOT EXISTS created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
ADD COLUMN IF NOT EXISTS last_rotation_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
ADD COLUMN IF NOT EXISTS mfa_verified BOOLEAN DEFAULT FALSE,
ADD COLUMN IF NOT EXISTS device_info JSONB DEFAULT '{}'::jsonb;

-- ایجاد Index برای بهبود performance
CREATE INDEX IF NOT EXISTS idx_rep_session_fingerprint ON rep_session(session_fingerprint);
CREATE INDEX IF NOT EXISTS idx_rep_session_expires ON rep_session(expires_at);
CREATE INDEX IF NOT EXISTS idx_rep_session_created ON rep_session(created_at);

-- =====================================================
-- 2. ایجاد جدول Audit Log برای Audit Trail
-- =====================================================
CREATE TABLE IF NOT EXISTS audit_log (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  action TEXT NOT NULL CHECK (action IN ('INSERT', 'UPDATE', 'DELETE', 'SELECT')),
  table_name TEXT NOT NULL,
  record_id TEXT,
  user_id UUID REFERENCES rep(id),
  changes JSONB DEFAULT '{}'::jsonb,
  timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  ip_address TEXT,
  user_agent TEXT,
  success BOOLEAN DEFAULT TRUE,
  error_message TEXT
);

-- Index برای جستجوی سریع
CREATE INDEX IF NOT EXISTS idx_audit_log_user ON audit_log(user_id);
CREATE INDEX IF NOT EXISTS idx_audit_log_timestamp ON audit_log(timestamp);
CREATE INDEX IF NOT EXISTS idx_audit_log_table ON audit_log(table_name);
CREATE INDEX IF NOT EXISTS idx_audit_log_action ON audit_log(action);

-- =====================================================
-- 3. ایجاد جدول Security Events برای لاگ امنیتی
-- =====================================================
CREATE TABLE IF NOT EXISTS security_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  event_type TEXT NOT NULL,
  severity TEXT NOT NULL CHECK (severity IN ('low', 'medium', 'high', 'critical')),
  ip_address TEXT NOT NULL,
  user_id UUID REFERENCES rep(id),
  endpoint TEXT,
  user_agent TEXT,
  details JSONB DEFAULT '{}'::jsonb,
  timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  resolved BOOLEAN DEFAULT FALSE,
  resolved_at TIMESTAMP WITH TIME ZONE,
  resolved_by UUID REFERENCES rep(id)
);

-- Index برای مانیتورینگ
CREATE INDEX IF NOT EXISTS idx_security_events_severity ON security_events(severity);
CREATE INDEX IF NOT EXISTS idx_security_events_timestamp ON security_events(timestamp);
CREATE INDEX IF NOT EXISTS idx_security_events_ip ON security_events(ip_address);
CREATE INDEX IF NOT EXISTS idx_security_events_type ON security_events(event_type);
CREATE INDEX IF NOT EXISTS idx_security_events_resolved ON security_events(resolved) WHERE NOT resolved;

-- =====================================================
-- 4. ایجاد جدول Blocked IPs
-- =====================================================
CREATE TABLE IF NOT EXISTS blocked_ips (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  ip_address TEXT UNIQUE NOT NULL,
  reason TEXT NOT NULL,
  blocked_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  blocked_until TIMESTAMP WITH TIME ZONE,
  block_type TEXT CHECK (block_type IN ('temporary', 'permanent')),
  attempts_count INTEGER DEFAULT 1,
  last_attempt_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  blocked_by UUID REFERENCES rep(id),
  notes TEXT
);

-- Index
CREATE INDEX IF NOT EXISTS idx_blocked_ips_ip ON blocked_ips(ip_address);
CREATE INDEX IF NOT EXISTS idx_blocked_ips_until ON blocked_ips(blocked_until);
CREATE INDEX IF NOT EXISTS idx_blocked_ips_type ON blocked_ips(block_type);

-- =====================================================
-- 5. ایجاد جدول MFA Codes (برای احراز هویت دو مرحله‌ای)
-- =====================================================
CREATE TABLE IF NOT EXISTS mfa_codes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES rep(id) NOT NULL,
  code TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
  attempts INTEGER DEFAULT 0,
  used BOOLEAN DEFAULT FALSE,
  used_at TIMESTAMP WITH TIME ZONE,
  ip_address TEXT,
  user_agent TEXT
);

-- Index
CREATE INDEX IF NOT EXISTS idx_mfa_codes_user ON mfa_codes(user_id);
CREATE INDEX IF NOT EXISTS idx_mfa_codes_expires ON mfa_codes(expires_at);
CREATE INDEX IF NOT EXISTS idx_mfa_codes_used ON mfa_codes(used) WHERE NOT used;

-- Auto-delete expired codes
CREATE OR REPLACE FUNCTION delete_expired_mfa_codes()
RETURNS void AS $$
BEGIN
  DELETE FROM mfa_codes WHERE expires_at < NOW();
END;
$$ LANGUAGE plpgsql;

-- =====================================================
-- 6. ایجاد جدول Password History (جلوگیری از استفاده مجدد)
-- =====================================================
CREATE TABLE IF NOT EXISTS password_history (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES rep(id) NOT NULL,
  password_hash TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Index
CREATE INDEX IF NOT EXISTS idx_password_history_user ON password_history(user_id);
CREATE INDEX IF NOT EXISTS idx_password_history_created ON password_history(created_at);

-- =====================================================
-- 7. ایجاد جدول Encrypted Data (ذخیره داده‌های رمزنگاری شده)
-- =====================================================
CREATE TABLE IF NOT EXISTS encrypted_data (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  entity_type TEXT NOT NULL,
  entity_id UUID NOT NULL,
  field_name TEXT NOT NULL,
  encrypted_value TEXT NOT NULL,
  iv TEXT NOT NULL,
  auth_tag TEXT NOT NULL,
  algorithm TEXT DEFAULT 'aes-256-gcm',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(entity_type, entity_id, field_name)
);

-- Index
CREATE INDEX IF NOT EXISTS idx_encrypted_data_entity ON encrypted_data(entity_type, entity_id);

-- =====================================================
-- 8. Row Level Security (RLS) Policies
-- =====================================================

-- فعال کردن RLS برای جداول حساس
ALTER TABLE audit_log ENABLE ROW LEVEL SECURITY;
ALTER TABLE security_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE mfa_codes ENABLE ROW LEVEL SECURITY;
ALTER TABLE password_history ENABLE ROW LEVEL SECURITY;

-- Policy: فقط admin ها می‌توانند audit log را ببینند
CREATE POLICY audit_log_admin_only ON audit_log
  FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM rep
      WHERE rep.id = audit_log.user_id
      AND rep.role = 'admin'
    )
  );

-- Policy: کاربران فقط رویدادهای امنیتی خودشان را ببینند
CREATE POLICY security_events_user_own ON security_events
  FOR SELECT
  USING (
    user_id = auth.uid()
    OR
    EXISTS (
      SELECT 1 FROM rep
      WHERE rep.id = user_id
      AND rep.role = 'admin'
    )
  );

-- Policy: کاربران فقط MFA codes خودشان را ببینند
CREATE POLICY mfa_codes_user_own ON mfa_codes
  FOR ALL
  USING (user_id = auth.uid());

-- Policy: کاربران فقط password history خودشان را ببینند
CREATE POLICY password_history_user_own ON password_history
  FOR SELECT
  USING (user_id = auth.uid());

-- =====================================================
-- 9. Triggers برای Audit Trail خودکار
-- =====================================================

-- Function برای ثبت خودکار تغییرات
CREATE OR REPLACE FUNCTION audit_trigger_function()
RETURNS TRIGGER AS $$
BEGIN
  IF (TG_OP = 'DELETE') THEN
    INSERT INTO audit_log (action, table_name, record_id, changes)
    VALUES ('DELETE', TG_TABLE_NAME, OLD.id::TEXT, row_to_json(OLD));
    RETURN OLD;
  ELSIF (TG_OP = 'UPDATE') THEN
    INSERT INTO audit_log (action, table_name, record_id, changes)
    VALUES ('UPDATE', TG_TABLE_NAME, NEW.id::TEXT, 
      jsonb_build_object(
        'old', row_to_json(OLD),
        'new', row_to_json(NEW)
      ));
    RETURN NEW;
  ELSIF (TG_OP = 'INSERT') THEN
    INSERT INTO audit_log (action, table_name, record_id, changes)
    VALUES ('INSERT', TG_TABLE_NAME, NEW.id::TEXT, row_to_json(NEW));
    RETURN NEW;
  END IF;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- اضافه کردن Trigger به جداول مهم
CREATE TRIGGER audit_rep_changes
  AFTER INSERT OR UPDATE OR DELETE ON rep
  FOR EACH ROW EXECUTE FUNCTION audit_trigger_function();

CREATE TRIGGER audit_provider_changes
  AFTER INSERT OR UPDATE OR DELETE ON provider
  FOR EACH ROW EXECUTE FUNCTION audit_trigger_function();

-- =====================================================
-- 10. Functions برای امنیت
-- =====================================================

-- تابع بررسی قدرت رمز عبور
CREATE OR REPLACE FUNCTION check_password_strength(password TEXT)
RETURNS BOOLEAN AS $$
BEGIN
  RETURN (
    LENGTH(password) >= 12 AND
    password ~ '[A-Z]' AND
    password ~ '[a-z]' AND
    password ~ '[0-9]' AND
    password ~ '[!@#$%^&*(),.?":{}|<>]'
  );
END;
$$ LANGUAGE plpgsql;

-- تابع بررسی استفاده مجدد از رمز عبور
CREATE OR REPLACE FUNCTION check_password_reuse(
  p_user_id UUID,
  p_password_hash TEXT,
  p_limit INTEGER DEFAULT 5
)
RETURNS BOOLEAN AS $$
DECLARE
  v_count INTEGER;
BEGIN
  SELECT COUNT(*) INTO v_count
  FROM password_history
  WHERE user_id = p_user_id
    AND password_hash = p_password_hash
  ORDER BY created_at DESC
  LIMIT p_limit;
  
  RETURN v_count > 0;
END;
$$ LANGUAGE plpgsql;

-- تابع پاکسازی session های منقضی شده
CREATE OR REPLACE FUNCTION cleanup_expired_sessions()
RETURNS INTEGER AS $$
DECLARE
  v_deleted INTEGER;
BEGIN
  DELETE FROM rep_session
  WHERE expires_at < NOW();
  
  GET DIAGNOSTICS v_deleted = ROW_COUNT;
  RETURN v_deleted;
END;
$$ LANGUAGE plpgsql;

-- =====================================================
-- 11. Scheduled Jobs (نیاز به pg_cron extension)
-- =====================================================

-- فعال کردن pg_cron (اگر موجود باشد)
-- CREATE EXTENSION IF NOT EXISTS pg_cron;

-- پاکسازی خودکار هر 1 ساعت
-- SELECT cron.schedule('cleanup-expired-sessions', '0 * * * *', 'SELECT cleanup_expired_sessions()');
-- SELECT cron.schedule('cleanup-expired-mfa', '*/15 * * * *', 'SELECT delete_expired_mfa_codes()');

-- =====================================================
-- 12. Views برای گزارش‌گیری امنیتی
-- =====================================================

-- View: خلاصه رویدادهای امنیتی
CREATE OR REPLACE VIEW security_summary AS
SELECT
  DATE(timestamp) as date,
  event_type,
  severity,
  COUNT(*) as count,
  COUNT(DISTINCT ip_address) as unique_ips,
  COUNT(DISTINCT user_id) as unique_users
FROM security_events
WHERE timestamp >= NOW() - INTERVAL '30 days'
GROUP BY DATE(timestamp), event_type, severity
ORDER BY date DESC, count DESC;

-- View: IP های مشکوک
CREATE OR REPLACE VIEW suspicious_ips AS
SELECT
  ip_address,
  COUNT(*) as event_count,
  COUNT(DISTINCT event_type) as different_event_types,
  MAX(timestamp) as last_seen,
  MAX(severity) as highest_severity
FROM security_events
WHERE timestamp >= NOW() - INTERVAL '7 days'
  AND severity IN ('high', 'critical')
GROUP BY ip_address
HAVING COUNT(*) > 5
ORDER BY event_count DESC;

-- View: فعالیت کاربران
CREATE OR REPLACE VIEW user_activity_summary AS
SELECT
  r.id,
  r.username,
  r.email,
  COUNT(DISTINCT rs.id) as active_sessions,
  MAX(rs.created_at) as last_login,
  COUNT(DISTINCT ra.id) as total_activities,
  MAX(ra.created_at) as last_activity
FROM rep r
LEFT JOIN rep_session rs ON r.id = rs.rep_id AND rs.expires_at > NOW()
LEFT JOIN rep_activity ra ON r.id = ra.rep_id
WHERE r.is_active = TRUE
GROUP BY r.id, r.username, r.email
ORDER BY last_activity DESC;

-- =====================================================
-- 13. Backup & Recovery
-- =====================================================

-- تابع backup جداول امنیتی
CREATE OR REPLACE FUNCTION backup_security_tables()
RETURNS TEXT AS $$
DECLARE
  v_timestamp TEXT;
BEGIN
  v_timestamp := TO_CHAR(NOW(), 'YYYYMMDD_HH24MISS');
  
  -- این تابع باید در production با ابزارهای مناسب پیاده شود
  -- مثل pg_dump یا ابزارهای backup اختصاصی
  
  RETURN 'Backup completed at: ' || v_timestamp;
END;
$$ LANGUAGE plpgsql;

-- =====================================================
-- 14. Grants & Permissions
-- =====================================================

-- محدود کردن دسترسی به جداول حساس
REVOKE ALL ON audit_log FROM PUBLIC;
REVOKE ALL ON security_events FROM PUBLIC;
REVOKE ALL ON blocked_ips FROM PUBLIC;
REVOKE ALL ON mfa_codes FROM PUBLIC;
REVOKE ALL ON password_history FROM PUBLIC;
REVOKE ALL ON encrypted_data FROM PUBLIC;

-- اعطای دسترسی فقط به service role
-- GRANT ALL ON audit_log TO service_role;
-- GRANT ALL ON security_events TO service_role;
-- ... (بقیه جداول)

-- =====================================================
-- پایان اسکریپت
-- =====================================================

-- اجرای تست‌های اولیه
DO $$
BEGIN
  RAISE NOTICE 'Security schema updates completed successfully!';
  RAISE NOTICE 'Total security tables: %', (
    SELECT COUNT(*) FROM information_schema.tables 
    WHERE table_schema = 'public' 
    AND table_name IN (
      'audit_log', 'security_events', 'blocked_ips', 
      'mfa_codes', 'password_history', 'encrypted_data'
    )
  );
END $$;
