import { NextRequest } from 'next/server';
import { createServerClient } from '@supabase/ssr';
import { supabaseAdmin } from '@/lib/supabase';
import { corsResponse, corsErrorResponse, handleCorsOptions } from '@/lib/cors';

const VALID_PERSONALITIES = ['atlas', 'nova', 'spark', 'sage'];

export async function OPTIONS() {
  return handleCorsOptions();
}

export async function PUT(request: NextRequest) {
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
    if (!user) {
      return corsErrorResponse('Unauthorized', 401);
    }

    const body = await request.json();
    const { personality } = body;

    if (!personality || !VALID_PERSONALITIES.includes(personality)) {
      return corsErrorResponse(`Invalid personality. Must be one of: ${VALID_PERSONALITIES.join(', ')}`, 400);
    }

    const { error } = await supabaseAdmin
      .from('licenses')
      .update({
        personality_choice: personality,
        updated_at: new Date().toISOString(),
      })
      .eq('email', user.email);

    if (error) {
      return corsErrorResponse('Failed to update personality', 500);
    }

    return corsResponse({ success: true, personality });
  } catch {
    return corsErrorResponse('Internal server error', 500);
  }
}
