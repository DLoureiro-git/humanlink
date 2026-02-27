import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    if (!email || !password || password.length < 6) {
      return NextResponse.json({ error: 'Invalid email or password' }, { status: 400 });
    }

    // Create user with auto-confirm using admin client (bypasses email confirmation)
    const { data, error } = await supabaseAdmin.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
    });

    if (error) {
      // Check for duplicate user
      if (error.message?.includes('already') || error.message?.includes('duplicate')) {
        return NextResponse.json({ error: 'user_already_exists' }, { status: 409 });
      }
      console.error('Signup error:', error);
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ user: { id: data.user.id, email: data.user.email } });
  } catch (error) {
    console.error('Signup route error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
