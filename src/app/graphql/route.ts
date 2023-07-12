import { MongoClient } from 'mongodb';
import type { NextRequest } from 'next/server';
import 'reflect-metadata';
import { startServerAndCreateNextHandler } from '@as-integrations/next';
import createServer from '@graphql/internal/createServer';
import container from '@lib/app/container';
import createMongoose from '../../database/createMongoose';

const handler = async (request: NextRequest) => {
  await Promise.all([container.resolve(MongoClient).connect(), createMongoose()]);
  return startServerAndCreateNextHandler(createServer())(request);
};

export async function GET(request: NextRequest) {
  return handler(request);
}

export async function POST(request: NextRequest) {
  return handler(request);
}
