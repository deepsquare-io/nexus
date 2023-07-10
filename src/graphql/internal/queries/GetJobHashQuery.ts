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
