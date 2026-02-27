import { NextRequest } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { corsResponse, corsErrorResponse, handleCorsOptions } from '@/lib/cors';

export async function OPTIONS() {
  return handleCorsOptions();
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { license_key, device_fingerprint } = body;

    if (!license_key || !device_fingerprint) {
      return corsErrorResponse('license_key and device_fingerprint are required', 400);
    }

    // Fetch license
    const { data: license, error: fetchError } = await supabaseAdmin
      .from('licenses')
      .select('*')
      .eq('license_key', license_key)
      .single();

    if (fetchError || !license) {
      return corsErrorResponse('License not found', 404);
    }

    // Verify device fingerprint matches
    if (license.device_fingerprint !== device_fingerprint) {
      return corsErrorResponse('Device fingerprint does not match', 403);
    }

    // Clear device info
    const { error: updateError } = await supabaseAdmin
      .from('licenses')
      .update({
        device_fingerprint: null,
        device_name: null,
        app_version: null,
      })
      .eq('id', license.id);

    if (updateError) {
      console.error('Failed to deactivate license:', updateError);
      return corsErrorResponse('Failed to deactivate license', 500);
    }

    return corsResponse({
      success: true,
      message: 'License deactivated successfully',
    });
  } catch (error) {
    console.error('License deactivation error:', error);
    return corsErrorResponse('Internal server error', 500);
  }
}
