import { Rest } from 'ably/promises';
import { injectable } from 'tsyringe';
import { Args, ArgsType, Field, Query, Resolver } from 'type-graphql';
import { type Hex } from 'viem';
import DeepSquareClient from '@deepsquare/deepsquare-client';
import { HexScalar } from '@graphql/internal/scalars/HexScalar';

@ArgsType()
class StreamJobLogsArgs {
  @Field(() => HexScalar)
  jobId!: Hex;
}

@injectable()
@Resolver()
export default class StartStreamJobLogsQuery {
  constructor(private readonly deepSquare: DeepSquareClient, private readonly ably: Rest) {}

  @Query(() => String)
  startStreamJobLogs(@Args() { jobId }: StreamJobLogsArgs) {
    const { fetchLogs } = this.deepSquare.getLogsMethods(jobId);
    const publishLogs = async () => {
      const [stream, stopFetch] = await fetchLogs();
      const channel = this.ably.channels.get(jobId);
      try {
        for await (const line of stream) {
          await channel.publish(jobId, line.data.toString());
        }
      } finally {
        stopFetch();
        this.ably.channels.release(jobId);
      }
    };

    void publishLogs();

    return 'test';
  }
}
