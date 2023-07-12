// Copyright 2023 Deepsquare Association
// This file is part of Nexus.
// Nexus is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.
// Nexus is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.
// You should have received a copy of the GNU General Public License along with Nexus. If not, see <https://www.gnu.org/licenses/>.
import { injectable } from 'tsyringe';
import { Field, ObjectType, Query, Resolver } from 'type-graphql';
import { privateKeyToAccount } from 'viem/accounts';
import DeepSquareClient from '@deepsquare/deepsquare-client';
import { JobSummary } from '@graphql/internal/types/JobSummary';
import { Provider } from '@graphql/internal/types/Provider';
import env from '@lib/app/env';

@ObjectType()
export class FullJobSummary extends JobSummary {
  @Field(() => Provider)
  provider!: Provider | undefined;
}

@injectable()
@Resolver()
export default class ListJobsQuery {
  constructor(private readonly deepsquare: DeepSquareClient) {}

  @Query(() => [FullJobSummary])
  async listJobs() {
    const ids = await this.deepsquare.listJob(privateKeyToAccount(env.WEB3_PRIVATE_KEY).address);
    return Promise.all(ids.map((id) => this.deepsquare.getJob(id)));
  }
}
