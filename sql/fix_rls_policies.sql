-- ============================================================================
-- FIX RLS POLICIES FOR PROVIDER REGISTRATION
-- ============================================================================

-- First, check current policies
SELECT schemaname, tablename, policyname, permissive, roles, cmd
FROM pg_policies
WHERE tablename IN ('service_provider', 'provider_category', 'custom_category_request');

-- Drop ALL existing policies on these tables
DO $$ 
DECLARE
    pol record;
BEGIN
    FOR pol IN 
        SELECT policyname, tablename 
        FROM pg_policies 
        WHERE tablename IN ('service_provider', 'provider_category', 'custom_category_request')
    LOOP
        EXECUTE format('DROP POLICY IF EXISTS %I ON %I', pol.policyname, pol.tablename);
    END LOOP;
END $$;

-- SERVICE_PROVIDER TABLE POLICIES
-- Allow anonymous and authenticated users to INSERT
CREATE POLICY "service_provider_insert_policy"
  ON service_provider
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Allow everyone to SELECT approved providers
CREATE POLICY "service_provider_select_policy"
  ON service_provider 
  FOR SELECT
  TO anon, authenticated, public
  USING (status = 'approved' AND verified = TRUE);

-- PROVIDER_CATEGORY TABLE POLICIES
-- Allow anonymous and authenticated users to INSERT
CREATE POLICY "provider_category_insert_policy"
  ON provider_category
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Allow everyone to SELECT
CREATE POLICY "provider_category_select_policy"
  ON provider_category 
  FOR SELECT
  TO anon, authenticated, public
  USING (true);

-- CUSTOM_CATEGORY_REQUEST TABLE POLICIES
-- Allow anonymous and authenticated users to INSERT
CREATE POLICY "custom_category_request_insert_policy"
  ON custom_category_request
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Allow everyone to SELECT (optional, adjust as needed)
CREATE POLICY "custom_category_request_select_policy"
  ON custom_category_request
  FOR SELECT
  TO anon, authenticated, public
  USING (true);

-- Verify the new policies
SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual, with_check
FROM pg_policies
WHERE tablename IN ('service_provider', 'provider_category', 'custom_category_request')
ORDER BY tablename, policyname;
