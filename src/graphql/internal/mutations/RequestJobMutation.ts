// Copyright 2023 Deepsquare Association
// This file is part of Nexus.
// Nexus is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.
// Nexus is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.
// You should have received a copy of the GNU General Public License along with Nexus. If not, see <https://www.gnu.org/licenses/>.
import { injectable } from 'tsyringe';
import { Args, ArgsType, Field, Mutation, Resolver } from 'type-graphql';
import DeepSquareClient from '@deepsquare/deepsquare-client';
import Job from '@graphql/internal/types/objects/Job';
import { Label } from '@graphql/internal/types/objects/JobSummary';
import UserModel from '../../../database/User/UserModel';

@ArgsType()
class RequestJobArgs {
  @Field(() => Job)
  job!: Job;

  @Field(() => String)
  jobName!: string;

  @Field(() => String)
  maxAmount!: string;

  @Field(() => String)
  userId!: string;

  @Field(() => [Label], { defaultValue: [] })
  labels!: Label[];
}

@injectable()
@Resolver()
export default class RequestJobMutation {
  constructor(private readonly deepsquare: DeepSquareClient) {}

  @Mutation(() => Boolean)
  async requestJob(@Args() { job, jobName, maxAmount, userId, labels }: RequestJobArgs) {
    const user = await UserModel.findById(userId);
    if (!user) throw new Error(`Unable to find user with id: ${userId}`);
    user.jobs = [...user.jobs, await this.deepsquare.submitJob(job, jobName, BigInt(maxAmount), labels)];
    await user.save();
    return true;
  }
}
