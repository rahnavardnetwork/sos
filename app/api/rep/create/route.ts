import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import bcrypt from 'bcryptjs';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(request: NextRequest) {
  try {
    const {
      username,
      password,
      full_name,
      email,
      phone,
      role = 'rep',
      is_active = true,
    } = await request.json();

    // Validation
    if (!username || !password || !full_name) {
      return NextResponse.json(
        { error: 'نام کاربری، رمز عبور و نام کامل الزامی است' },
        { status: 400 }
      );
    }

    // Check if username already exists
    const { data: existingRep } = await supabase
      .from('rep')
      .select('id')
      .eq('username', username)
      .single();

    if (existingRep) {
      return NextResponse.json(
        { error: 'این نام کاربری قبلاً ثبت شده است' },
        { status: 409 }
      );
    }

    // Hash password
    const password_hash = await bcrypt.hash(password, 10);

    // Insert new rep
    const { data: newRep, error: insertError } = await supabase
      .from('rep')
      .insert({
        username,
        password_hash,
        full_name,
        email: email || null,
        phone: phone || null,
        role,
        is_active,
      })
      .select()
      .single();

    if (insertError) {
      console.error('Insert error:', insertError);
      return NextResponse.json(
        { error: 'خطا در ایجاد نماینده' },
        { status: 500 }
      );
    }

    // Log activity
    await supabase
      .from('rep_activity')
      .insert({
        rep_id: newRep.id,
        activity_type: 'created',
        ip_address: request.headers.get('x-forwarded-for') || 'unknown',
        details: {
          created_by: 'system',
        },
      });

    return NextResponse.json({
      success: true,
      rep: {
        id: newRep.id,
        username: newRep.username,
        full_name: newRep.full_name,
        email: newRep.email,
        role: newRep.role,
      },
    });

  } catch (error) {
    console.error('Create rep error:', error);
    return NextResponse.json(
      { error: 'خطای سرور' },
      { status: 500 }
    );
  }
}