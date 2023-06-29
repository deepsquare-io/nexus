import { Rest } from 'ably/promises';
import { Args, ArgsType, Field, Query, Resolver } from 'type-graphql';
import DeepSquareClient from '@deepsquare/deepsquare-client';

@ArgsType()
class StreamJobLogsArgs {
  @Field(() => String)
  jobId!: string;
}

@Resolver()
export default class StartStreamJobLogsQuery {
  constructor(private readonly deepSquare: DeepSquareClient, private readonly ably: Rest) {}

  @Query(() => Boolean)
  startStreamJobLogs(@Args() { jobId }: StreamJobLogsArgs): boolean {
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

    return true;
  }
}
