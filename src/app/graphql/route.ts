// Copyright 2023 Deepsquare Association
// This file is part of Nexus.
// Nexus is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.
// Nexus is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.
// You should have received a copy of the GNU General Public License along with Nexus. If not, see <https://www.gnu.org/licenses/>.
import { MongoClient } from 'mongodb';
import type { NextRequest } from 'next/server';
import 'reflect-metadata';
import { startServerAndCreateNextHandler } from '@as-integrations/next';
import type Context from '@graphql/internal/context/Context';
import JwtContext from '@graphql/internal/context/JwtContext';
import createServer from '@graphql/internal/createServer';
import container from '@lib/app/container';
import createMongoose from '../../database/createMongoose';

const handler = async (request: NextRequest) => {
  await Promise.all([container.resolve(MongoClient).connect(), createMongoose()]);
  return startServerAndCreateNextHandler<NextRequest, Context>(createServer(), {
    context: async function setContext(req: NextRequest) {
      return await JwtContext(req);
    },
  })(request);
};

export async function GET(request: NextRequest) {
  return handler(request);
}

export async function POST(request: NextRequest) {
  return handler(request);
}
