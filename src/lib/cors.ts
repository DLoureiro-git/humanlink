import { NextResponse } from 'next/server';

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization, x-admin-api-key',
  'Access-Control-Max-Age': '86400',
};

export function corsResponse(body: unknown, status: number = 200): NextResponse {
  return NextResponse.json(body, {
    status,
    headers: CORS_HEADERS,
  });
}

export function corsErrorResponse(message: string, status: number = 400): NextResponse {
  return NextResponse.json({ error: message }, {
    status,
    headers: CORS_HEADERS,
  });
}

export function handleCorsOptions(): NextResponse {
  return new NextResponse(null, {
    status: 204,
    headers: CORS_HEADERS,
  });
}
