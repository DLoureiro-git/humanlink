import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase-server';
import { supabaseAdmin } from '@/lib/supabase';

export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get the user's license with subscription ID
    const { data: license } = await supabaseAdmin
      .from('licenses')
      .select('lemonsqueezy_subscription_id, customer_portal_url')
      .or(`user_id.eq.${user.id},email.eq.${user.email}`)
      .order('created_at', { ascending: false })
      .limit(1)
      .single();

    if (!license) {
      return NextResponse.json({ error: 'No subscription found' }, { status: 404 });
    }

    // If we have a cached portal URL, return it
    if (license.customer_portal_url) {
      return NextResponse.json({ url: license.customer_portal_url });
    }

    // Otherwise fetch from LemonSqueezy API
    const apiKey = process.env.LEMONSQUEEZY_API_KEY;
    if (!apiKey || !license.lemonsqueezy_subscription_id) {
      return NextResponse.json({ error: 'Subscription management not available' }, { status: 503 });
    }

    const response = await fetch(
      `https://api.lemonsqueezy.com/v1/subscriptions/${license.lemonsqueezy_subscription_id}`,
      {
        headers: {
          'Accept': 'application/vnd.api+json',
          'Authorization': `Bearer ${apiKey}`,
        },
      }
    );

    if (!response.ok) {
      return NextResponse.json({ error: 'Failed to fetch subscription' }, { status: 500 });
    }

    const subData = await response.json();
    const portalUrl = subData.data.attributes.urls?.customer_portal;

    if (portalUrl) {
      // Cache the portal URL
      await supabaseAdmin
        .from('licenses')
        .update({ customer_portal_url: portalUrl })
        .eq('lemonsqueezy_subscription_id', license.lemonsqueezy_subscription_id);
    }

    return NextResponse.json({ url: portalUrl || null });
  } catch (error) {
    console.error('Portal error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
