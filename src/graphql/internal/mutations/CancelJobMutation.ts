// Copyright 2023 Deepsquare Association
// This file is part of Nexus.
// Nexus is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.
// Nexus is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.
// You should have received a copy of the GNU General Public License along with Nexus. If not, see <https://www.gnu.org/licenses/>.
import { injectable } from 'tsyringe';
import { Args, ArgsType, Field, Mutation, Resolver } from 'type-graphql';
import { type Hex } from 'viem';
import DeepSquareClient from '@deepsquare/deepsquare-client';
import HexScalar from '@graphql/internal/scalars/HexScalar';

@ArgsType()
class CancelJobArgs {
  @Field(() => HexScalar)
  jobId!: Hex;
}

@injectable()
@Resolver()
export default class CancelJobMutation {
  constructor(private readonly deepsquare: DeepSquareClient) {}

  @Mutation(() => Boolean)
  async cancelJob(@Args() { jobId }: CancelJobArgs) {
    await this.deepsquare.cancel(jobId);
    return true;
  }
}
