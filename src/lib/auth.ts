import { NextRequest } from 'next/server';
import * as crypto from 'crypto';
import { createServerClient } from '@supabase/ssr';
import { supabaseAdmin } from './supabase';

export function verifyAdminApiKey(request: NextRequest): boolean {
  const apiKey = request.headers.get('x-admin-api-key');
  return !!apiKey && apiKey === process.env.ADMIN_API_KEY;
}

export async function verifyAdminAuth(request: NextRequest): Promise<boolean> {
  // First try API key
  if (verifyAdminApiKey(request)) {
    return true;
  }

  // Then try Supabase session from cookies
  try {
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() {
            return request.cookies.getAll();
          },
          setAll() {},
        },
      }
    );

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return false;

    const { data } = await supabaseAdmin
      .from('users')
      .select('is_admin')
      .eq('id', user.id)
      .single();

    return data?.is_admin === true;
  } catch {
    return false;
  }
}

export function generateLicenseKey(): string {
  return `HL-${crypto.randomBytes(4).toString('hex').toUpperCase()}-${crypto.randomBytes(4).toString('hex').toUpperCase()}-${crypto.randomBytes(4).toString('hex').toUpperCase()}`;
}
