import { NextRequest } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { corsResponse, corsErrorResponse, handleCorsOptions } from '@/lib/cors';

const GRACE_PERIOD_DAYS = 7;

export async function OPTIONS() {
  return handleCorsOptions();
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      license_key,
      device_fingerprint,
      app_version,
      os_info,
      skills_installed,
      llm_provider,
    } = body;

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
    if (license.device_fingerprint && license.device_fingerprint !== device_fingerprint) {
      return corsResponse(
        { valid: false, reason: 'Device fingerprint mismatch' },
        403
      );
    }

    // Check if license is revoked
    if (license.status === 'revoked') {
      return corsResponse(
        { valid: false, reason: 'License has been revoked', action: 'block' },
        403
      );
    }

    // Check if license is suspended
    if (license.status === 'suspended') {
      // Check grace period
      const suspendedAt = license.suspended_at
        ? new Date(license.suspended_at)
        : new Date(license.updated_at || license.created_at);
      const gracePeriodEnd = new Date(suspendedAt);
      gracePeriodEnd.setDate(gracePeriodEnd.getDate() + GRACE_PERIOD_DAYS);

      if (new Date() > gracePeriodEnd) {
        return corsResponse(
          {
            valid: false,
            reason: 'License suspended and grace period expired',
            action: 'block',
          },
          403
        );
      }

      return corsResponse(
        {
          valid: false,
          reason: 'License is suspended',
          action: 'warn',
          grace_period_ends: gracePeriodEnd.toISOString(),
        },
        200
      );
    }

    // Check if license is expired
    if (license.status === 'expired') {
      return corsResponse(
        { valid: false, reason: 'License has expired', action: 'block' },
        403
      );
    }

    // Update last_heartbeat on the license
    const now = new Date().toISOString();
    const { error: updateError } = await supabaseAdmin
      .from('licenses')
      .update({
        last_heartbeat: now,
        app_version: app_version || license.app_version,
      })
      .eq('id', license.id);

    if (updateError) {
      console.error('Failed to update heartbeat:', updateError);
    }

    // Insert heartbeat record
    const { error: insertError } = await supabaseAdmin
      .from('heartbeats')
      .insert({
        license_id: license.id,
        device_fingerprint,
        app_version: app_version || null,
        os_info: os_info || null,
        skills_installed: skills_installed || null,
        llm_provider: llm_provider || null,
        created_at: now,
      });

    if (insertError) {
      console.error('Failed to insert heartbeat record:', insertError);
    }

    return corsResponse({
      valid: true,
      status: license.status,
      personality: license.personality_choice || 'nova',
    });
  } catch (error) {
    console.error('Heartbeat error:', error);
    return corsErrorResponse('Internal server error', 500);
  }
}
