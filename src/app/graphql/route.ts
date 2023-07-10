import type { NextRequest } from 'next/server';
import 'reflect-metadata';
import { startServerAndCreateNextHandler } from '@as-integrations/next';
import createServer from '@graphql/internal/createServer';

const handler = startServerAndCreateNextHandler(createServer());

export async function GET(request: NextRequest) {
  return handler(request);
}

export async function POST(request: NextRequest) {
  return handler(request);
}
