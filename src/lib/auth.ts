import { NextRequest } from 'next/server';
import * as crypto from 'crypto';

export function verifyAdminApiKey(request: NextRequest): boolean {
  const apiKey = request.headers.get('x-admin-api-key');
  return apiKey === process.env.ADMIN_API_KEY;
}

export function generateLicenseKey(): string {
  return `HL-${crypto.randomBytes(4).toString('hex').toUpperCase()}-${crypto.randomBytes(4).toString('hex').toUpperCase()}-${crypto.randomBytes(4).toString('hex').toUpperCase()}`;
}
