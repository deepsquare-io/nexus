import { injectable } from 'tsyringe';
import { Args, ArgsType, Field, Mutation, Resolver } from 'type-graphql';
import DeepSquareClient from '@deepsquare/deepsquare-client';
import Job from '@graphql/internal/types/Job';

@ArgsType()
class RequestJobArgs {
  @Field(() => Job)
  job!: Job;

  @Field(() => String)
  jobName!: string;

  @Field(() => String)
  maxAmount!: string;
}

@injectable()
@Resolver()
export default class RequestJobMutation {
  constructor(private readonly deepsquare: DeepSquareClient) {}

  @Mutation(() => Boolean)
  async requestJob(@Args() { job, jobName, maxAmount }: RequestJobArgs) {
    await this.deepsquare.submitJob(job, jobName, BigInt(maxAmount));
    return true;
  }
}
