import { Rest } from 'ably/promises';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  if (!process.env.ABLY_SUBSCRIBE_KEY) {
    return NextResponse.json(
      {
        errorMessage: `Missing ABLY_API_KEY environment variable.
                If you're running locally, please ensure you have a ./.env file with a value for ABLY_API_KEY=your-key.
                If you're running in Netlify, make sure you've configured env variable ABLY_API_KEY. 
                Please see README.md for more details on configuring your Ably API Key.`,
      },
      {
        status: 500,
        headers: {
          'Access-Control-Allow-Origin': '*',
        },
      },
    );
  }

  // const clientId = (await request.json()).clientId || process.env.DEFAULT_CLIENT_ID || 'NO_CLIENT_ID';
  const client = new Rest(process.env.ABLY_SUBSCRIBE_KEY);
  const tokenRequestData = await client.auth.createTokenRequest({ clientId: 'NO_CLIENT_ID' });
  return NextResponse.json(tokenRequestData, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  });
}
