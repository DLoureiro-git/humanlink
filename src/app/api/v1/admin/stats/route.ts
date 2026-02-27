import { NextRequest } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { verifyAdminAuth } from '@/lib/auth';
import { corsResponse, corsErrorResponse, handleCorsOptions } from '@/lib/cors';

export async function OPTIONS() {
  return handleCorsOptions();
}

export async function GET(request: NextRequest) {
  try {
    if (!(await verifyAdminAuth(request))) {
      return corsErrorResponse('Unauthorized', 401);
    }

    // Total users (all licenses)
    const { count: totalUsers, error: totalError } = await supabaseAdmin
      .from('licenses')
      .select('*', { count: 'exact', head: true });

    if (totalError) {
      console.error('Failed to count total users:', totalError);
      return corsErrorResponse('Failed to fetch stats', 500);
    }

    // Active users
    const { count: activeUsers, error: activeError } = await supabaseAdmin
      .from('licenses')
      .select('*', { count: 'exact', head: true })
      .eq('status', 'active');

    if (activeError) {
      console.error('Failed to count active users:', activeError);
      return corsErrorResponse('Failed to fetch stats', 500);
    }

    // Suspended users
    const { count: suspendedUsers, error: suspendedError } = await supabaseAdmin
      .from('licenses')
      .select('*', { count: 'exact', head: true })
      .eq('status', 'suspended');

    if (suspendedError) {
      console.error('Failed to count suspended users:', suspendedError);
      return corsErrorResponse('Failed to fetch stats', 500);
    }

    // Revoked users
    const { count: revokedUsers, error: revokedError } = await supabaseAdmin
      .from('licenses')
      .select('*', { count: 'exact', head: true })
      .eq('status', 'revoked');

    if (revokedError) {
      console.error('Failed to count revoked users:', revokedError);
      return corsErrorResponse('Failed to fetch stats', 500);
    }

    // Monthly active users (distinct licenses with heartbeats in the last 30 days)
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const { data: recentHeartbeats, error: heartbeatError } = await supabaseAdmin
      .from('heartbeats')
      .select('license_id')
      .gte('created_at', thirtyDaysAgo.toISOString());

    if (heartbeatError) {
      console.error('Failed to fetch monthly active users:', heartbeatError);
      return corsErrorResponse('Failed to fetch stats', 500);
    }

    const uniqueLicenseIds = new Set(
      recentHeartbeats?.map((h: { license_id: string }) => h.license_id) || []
    );

    return corsResponse({
      total_users: totalUsers || 0,
      active_users: activeUsers || 0,
      suspended_users: suspendedUsers || 0,
      revoked_users: revokedUsers || 0,
      monthly_active: uniqueLicenseIds.size,
    });
  } catch (error) {
    console.error('Admin stats error:', error);
    return corsErrorResponse('Internal server error', 500);
  }
}
