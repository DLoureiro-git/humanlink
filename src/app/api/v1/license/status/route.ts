import { NextRequest } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { corsResponse, corsErrorResponse, handleCorsOptions } from '@/lib/cors';

export async function OPTIONS() {
  return handleCorsOptions();
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const licenseKey = searchParams.get('license_key');

    if (!licenseKey) {
      return corsErrorResponse('license_key query parameter is required', 400);
    }

    // Fetch license
    const { data: license, error: fetchError } = await supabaseAdmin
      .from('licenses')
      .select('*')
      .eq('license_key', licenseKey)
      .single();

    if (fetchError || !license) {
      return corsErrorResponse('License not found', 404);
    }

    // Fetch features
    const { data: features } = await supabaseAdmin
      .from('license_features')
      .select('feature')
      .eq('license_id', license.id);

    return corsResponse({
      license_key: license.license_key,
      status: license.status,
      personality: license.personality || 'default',
      email: license.email,
      device_fingerprint: license.device_fingerprint,
      device_name: license.device_name,
      app_version: license.app_version,
      activated_at: license.activated_at,
      last_heartbeat: license.last_heartbeat,
      created_at: license.created_at,
      features: features?.map((f: { feature: string }) => f.feature) || [],
    });
  } catch (error) {
    console.error('License status error:', error);
    return corsErrorResponse('Internal server error', 500);
  }
}
