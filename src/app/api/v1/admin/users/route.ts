import { NextRequest } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { verifyAdminApiKey, generateLicenseKey } from '@/lib/auth';
import { corsResponse, corsErrorResponse, handleCorsOptions } from '@/lib/cors';

export async function OPTIONS() {
  return handleCorsOptions();
}

export async function GET(request: NextRequest) {
  try {
    if (!verifyAdminApiKey(request)) {
      return corsErrorResponse('Unauthorized', 401);
    }

    // Fetch all licenses with stats
    const { data: licenses, error } = await supabaseAdmin
      .from('licenses')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Failed to fetch licenses:', error);
      return corsErrorResponse('Failed to fetch licenses', 500);
    }

    // Get heartbeat counts per license
    const licenseIds = licenses?.map((l: { id: string }) => l.id) || [];
    const { data: heartbeatCounts } = await supabaseAdmin
      .from('heartbeats')
      .select('license_id')
      .in('license_id', licenseIds);

    // Count heartbeats per license
    const heartbeatMap: Record<string, number> = {};
    heartbeatCounts?.forEach((h: { license_id: string }) => {
      heartbeatMap[h.license_id] = (heartbeatMap[h.license_id] || 0) + 1;
    });

    // Enrich licenses with heartbeat count
    const enrichedLicenses = licenses?.map((license: Record<string, unknown>) => ({
      ...license,
      total_heartbeats: heartbeatMap[license.id as string] || 0,
    }));

    return corsResponse({
      users: enrichedLicenses,
      total: enrichedLicenses?.length || 0,
    });
  } catch (error) {
    console.error('Admin users GET error:', error);
    return corsErrorResponse('Internal server error', 500);
  }
}

export async function POST(request: NextRequest) {
  try {
    if (!verifyAdminApiKey(request)) {
      return corsErrorResponse('Unauthorized', 401);
    }

    const body = await request.json();
    const { email, personality } = body;

    if (!email) {
      return corsErrorResponse('email is required', 400);
    }

    // Generate a unique license key
    const licenseKey = generateLicenseKey();

    // Create the license
    const { data: license, error } = await supabaseAdmin
      .from('licenses')
      .insert({
        license_key: licenseKey,
        email,
        personality: personality || 'default',
        status: 'active',
        created_at: new Date().toISOString(),
      })
      .select()
      .single();

    if (error) {
      console.error('Failed to create license:', error);
      return corsErrorResponse('Failed to create license', 500);
    }

    return corsResponse({
      success: true,
      license,
    }, 201);
  } catch (error) {
    console.error('Admin users POST error:', error);
    return corsErrorResponse('Internal server error', 500);
  }
}
