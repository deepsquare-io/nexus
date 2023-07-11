import { injectable } from 'tsyringe';
import { Args, ArgsType, Field, Mutation, Resolver } from 'type-graphql';
import DeepSquareClient from '@deepsquare/deepsquare-client';
import Job from '@graphql/internal/types/Job';
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
}

@injectable()
@Resolver()
export default class RequestJobMutation {
  constructor(private readonly deepsquare: DeepSquareClient) {}

  @Mutation(() => Boolean)
  async requestJob(@Args() { job, jobName, maxAmount, userId }: RequestJobArgs) {
    const user = await UserModel.findById(userId);
    if (!user) throw new Error(`Unable to find user with id: ${userId}`);
    user.jobs = [...user.jobs, await this.deepsquare.submitJob(job, jobName, BigInt(maxAmount))];
    await user.save();
    return true;
  }
}
