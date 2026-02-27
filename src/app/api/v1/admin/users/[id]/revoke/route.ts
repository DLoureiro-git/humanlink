import { NextRequest } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { verifyAdminAuth } from '@/lib/auth';
import { corsResponse, corsErrorResponse, handleCorsOptions } from '@/lib/cors';

export async function OPTIONS() {
  return handleCorsOptions();
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    if (!(await verifyAdminAuth(request))) {
      return corsErrorResponse('Unauthorized', 401);
    }

    const { id } = await params;

    // Check if license exists
    const { data: license, error: fetchError } = await supabaseAdmin
      .from('licenses')
      .select('id, status')
      .eq('id', id)
      .single();

    if (fetchError || !license) {
      return corsErrorResponse('License not found', 404);
    }

    if (license.status === 'revoked') {
      return corsErrorResponse('License is already revoked', 400);
    }

    // Revoke the license
    const now = new Date().toISOString();
    const { error: updateError } = await supabaseAdmin
      .from('licenses')
      .update({
        status: 'revoked',
        revoked_at: now,
        updated_at: now,
        device_fingerprint: null,
        device_name: null,
      })
      .eq('id', id);

    if (updateError) {
      console.error('Failed to revoke license:', updateError);
      return corsErrorResponse('Failed to revoke license', 500);
    }

    return corsResponse({
      success: true,
      message: 'License revoked successfully',
      id,
      status: 'revoked',
    });
  } catch (error) {
    console.error('Revoke license error:', error);
    return corsErrorResponse('Internal server error', 500);
  }
}
