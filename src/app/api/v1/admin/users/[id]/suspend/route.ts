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

    if (license.status === 'suspended') {
      return corsErrorResponse('License is already suspended', 400);
    }

    if (license.status === 'revoked') {
      return corsErrorResponse('Cannot suspend a revoked license', 400);
    }

    // Suspend the license
    const now = new Date().toISOString();
    const { error: updateError } = await supabaseAdmin
      .from('licenses')
      .update({
        status: 'suspended',
        suspended_at: now,
        updated_at: now,
      })
      .eq('id', id);

    if (updateError) {
      console.error('Failed to suspend license:', updateError);
      return corsErrorResponse('Failed to suspend license', 500);
    }

    return corsResponse({
      success: true,
      message: 'License suspended successfully',
      id,
      status: 'suspended',
    });
  } catch (error) {
    console.error('Suspend license error:', error);
    return corsErrorResponse('Internal server error', 500);
  }
}
