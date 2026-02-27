import { NextRequest } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { corsResponse, corsErrorResponse, handleCorsOptions } from '@/lib/cors';

export async function OPTIONS() {
  return handleCorsOptions();
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { license_key, device_fingerprint, device_name, app_version } = body;

    if (!license_key || !device_fingerprint) {
      return corsErrorResponse('license_key and device_fingerprint are required', 400);
    }

    // Check if license exists
    const { data: license, error: fetchError } = await supabaseAdmin
      .from('licenses')
      .select('*')
      .eq('license_key', license_key)
      .single();

    if (fetchError || !license) {
      return corsErrorResponse('License not found', 404);
    }

    // Check license status
    if (license.status === 'revoked') {
      return corsResponse({ valid: false, reason: 'License has been revoked' }, 403);
    }

    if (license.status === 'suspended') {
      return corsResponse({ valid: false, reason: 'License has been suspended' }, 403);
    }

    if (license.status === 'expired') {
      return corsResponse({ valid: false, reason: 'License has expired' }, 403);
    }

    // Check if license is already activated on a different device
    if (license.device_fingerprint && license.device_fingerprint !== device_fingerprint) {
      return corsErrorResponse(
        'License is already activated on another device. Deactivate it first.',
        409
      );
    }

    // Activate the license
    const now = new Date().toISOString();
    const { error: updateError } = await supabaseAdmin
      .from('licenses')
      .update({
        device_fingerprint,
        device_name: device_name || null,
        app_version: app_version || null,
        activated_at: license.activated_at || now,
        last_heartbeat: now,
        status: 'active',
      })
      .eq('id', license.id);

    if (updateError) {
      console.error('Failed to activate license:', updateError);
      return corsErrorResponse('Failed to activate license', 500);
    }

    // Fetch features for this license
    const { data: features } = await supabaseAdmin
      .from('license_features')
      .select('feature')
      .eq('license_id', license.id);

    return corsResponse({
      valid: true,
      personality: license.personality || 'default',
      features: features?.map((f: { feature: string }) => f.feature) || [],
    });
  } catch (error) {
    console.error('License activation error:', error);
    return corsErrorResponse('Internal server error', 500);
  }
}
