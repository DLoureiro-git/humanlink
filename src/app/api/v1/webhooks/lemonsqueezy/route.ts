import { NextRequest } from 'next/server';
import * as crypto from 'crypto';
import { supabaseAdmin } from '@/lib/supabase';
import { generateLicenseKey } from '@/lib/auth';
import { corsResponse, corsErrorResponse } from '@/lib/cors';

function verifyWebhookSignature(
  payload: string,
  signature: string | null,
  secret: string
): boolean {
  if (!signature) return false;

  try {
    const hmac = crypto.createHmac('sha256', secret);
    const digest = hmac.update(payload).digest('hex');

    const signatureBuffer = Buffer.from(signature, 'hex');
    const digestBuffer = Buffer.from(digest, 'hex');

    if (signatureBuffer.length !== digestBuffer.length) return false;

    return crypto.timingSafeEqual(signatureBuffer, digestBuffer);
  } catch {
    return false;
  }
}

interface LemonSqueezyAttributes {
  user_email?: string;
  user_name?: string;
  variant_name?: string;
  product_name?: string;
  status?: string;
  ends_at?: string;
  [key: string]: unknown;
}

interface LemonSqueezyEvent {
  meta: {
    event_name: string;
    custom_data?: Record<string, unknown>;
  };
  data: {
    id: string;
    type: string;
    attributes: LemonSqueezyAttributes;
  };
}

export async function POST(request: NextRequest) {
  try {
    const rawBody = await request.text();
    const signature = request.headers.get('x-signature');
    const webhookSecret = process.env.LEMONSQUEEZY_WEBHOOK_SECRET;

    if (!webhookSecret) {
      console.error('LEMONSQUEEZY_WEBHOOK_SECRET not configured');
      return corsErrorResponse('Webhook secret not configured', 500);
    }

    // Verify webhook signature
    if (!verifyWebhookSignature(rawBody, signature, webhookSecret)) {
      console.error('Invalid webhook signature');
      return corsErrorResponse('Invalid signature', 401);
    }

    const event: LemonSqueezyEvent = JSON.parse(rawBody);
    const eventName = event.meta.event_name;
    const attributes = event.data.attributes;

    console.log(`[LemonSqueezy Webhook] Event: ${eventName}`, {
      id: event.data.id,
      email: attributes.user_email,
      status: attributes.status,
    });

    // Log the webhook event
    await supabaseAdmin.from('webhook_logs').insert({
      provider: 'lemonsqueezy',
      event_name: eventName,
      payload: event,
      created_at: new Date().toISOString(),
    });

    switch (eventName) {
      case 'subscription_created': {
        // Create a new license for the subscriber
        const email = attributes.user_email;
        if (!email) {
          console.error('No email in subscription_created event');
          return corsErrorResponse('No email provided', 400);
        }

        const licenseKey = generateLicenseKey();
        const personality = attributes.variant_name || 'default';

        const { error } = await supabaseAdmin.from('licenses').insert({
          license_key: licenseKey,
          email,
          personality_choice: personality,
          status: 'active',
          lemonsqueezy_subscription_id: event.data.id,
          created_at: new Date().toISOString(),
        });

        if (error) {
          console.error('Failed to create license from webhook:', error);
          return corsErrorResponse('Failed to create license', 500);
        }

        console.log(`[LemonSqueezy] License created for ${email}: ${licenseKey}`);
        break;
      }

      case 'subscription_cancelled': {
        // Mark the license for expiration (it will expire at the end of the billing period)
        const { error } = await supabaseAdmin
          .from('licenses')
          .update({
            cancellation_scheduled: true,
            cancellation_date: attributes.ends_at || null,
            updated_at: new Date().toISOString(),
          })
          .eq('lemonsqueezy_subscription_id', event.data.id);

        if (error) {
          console.error('Failed to mark license for cancellation:', error);
          return corsErrorResponse('Failed to update license', 500);
        }

        console.log(
          `[LemonSqueezy] Subscription cancelled, license will expire at: ${attributes.ends_at}`
        );
        break;
      }

      case 'subscription_expired': {
        // Suspend the license
        const now = new Date().toISOString();
        const { error } = await supabaseAdmin
          .from('licenses')
          .update({
            status: 'suspended',
            suspended_at: now,
            updated_at: now,
          })
          .eq('lemonsqueezy_subscription_id', event.data.id);

        if (error) {
          console.error('Failed to suspend license from webhook:', error);
          return corsErrorResponse('Failed to suspend license', 500);
        }

        console.log(`[LemonSqueezy] Subscription expired, license suspended`);
        break;
      }

      case 'subscription_resumed': {
        // Reactivate the license
        const { error } = await supabaseAdmin
          .from('licenses')
          .update({
            status: 'active',
            suspended_at: null,
            cancellation_scheduled: false,
            cancellation_date: null,
            updated_at: new Date().toISOString(),
          })
          .eq('lemonsqueezy_subscription_id', event.data.id);

        if (error) {
          console.error('Failed to reactivate license from webhook:', error);
          return corsErrorResponse('Failed to reactivate license', 500);
        }

        console.log(`[LemonSqueezy] Subscription resumed, license reactivated`);
        break;
      }

      case 'subscription_updated': {
        // Log the update, could handle plan changes here
        console.log(`[LemonSqueezy] Subscription updated:`, {
          status: attributes.status,
          variant: attributes.variant_name,
        });
        break;
      }

      default: {
        console.log(`[LemonSqueezy] Unhandled event: ${eventName}`);
      }
    }

    return corsResponse({ received: true });
  } catch (error) {
    console.error('LemonSqueezy webhook error:', error);
    return corsErrorResponse('Internal server error', 500);
  }
}
