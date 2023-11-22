// Copyright 2023 Deepsquare Association
// This file is part of Nexus.
// Nexus is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.
// Nexus is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.
// You should have received a copy of the GNU General Public License along with Nexus. If not, see <https://www.gnu.org/licenses/>.
import { injectable } from 'tsyringe';
import { Args, ArgsType, Field, ObjectType, Query, Resolver } from 'type-graphql';
import { privateKeyToAccount } from 'viem/accounts';
import DeepSquareClient from '@deepsquare/deepsquare-client';
import env from '@lib/app/env';

@ArgsType()
class GetJobHashArgs {
  @Field(() => String)
  jobId!: string;
}

@ObjectType()
class GetJobHashOutput {
  @Field(() => String)
  hash!: string;

  @Field(() => String)
  address!: string;

  @Field(() => String)
  timestamp!: string;
}

@injectable()
@Resolver()
export default class GetJobHashQuery {
  constructor(private readonly deepSquare: DeepSquareClient) {}

  @Query(() => GetJobHashOutput)
  async getJobHash(@Args() { jobId }: GetJobHashArgs): Promise<GetJobHashOutput> {
    const hashAndTimestamp = await this.deepSquare.getJobHash(jobId);

    return {
      hash: hashAndTimestamp.hash,
      address: privateKeyToAccount(env.WEB3_PRIVATE_KEY).address,
      timestamp: hashAndTimestamp.timestamp.toString(),
    };
  }
}
