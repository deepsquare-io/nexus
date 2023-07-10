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
