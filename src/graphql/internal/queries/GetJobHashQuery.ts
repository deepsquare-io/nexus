// Copyright 2023 Deepsquare Association
// This file is part of Foobar.
// Foobar is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.
// Foobar is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.
// You should have received a copy of the GNU General Public License along with Foobar. If not, see <https://www.gnu.org/licenses/>.
import { injectable } from 'tsyringe';
import { Args, ArgsType, Field, ObjectType, Query, Resolver } from 'type-graphql';
import { type Hex } from 'viem';
import { privateKeyToAccount } from 'viem/accounts';
import DeepSquareClient from '@deepsquare/deepsquare-client';
import HexScalar from '@graphql/internal/scalars/HexScalar';
import env from '@lib/app/env';

@ArgsType()
class GetJobHashArgs {
  @Field(() => HexScalar)
  jobId!: Hex;
}

@ObjectType()
class GetJobHashOutput {
  @Field(() => HexScalar)
  hash!: Hex;

  @Field(() => HexScalar)
  address!: Hex;

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
