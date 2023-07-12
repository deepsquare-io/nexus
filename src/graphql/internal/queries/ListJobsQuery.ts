import { injectable } from 'tsyringe';
import { Arg, Field, ObjectType, Query, Resolver } from 'type-graphql';
import DeepSquareClient from '@deepsquare/deepsquare-client';
import { JobSummary } from '@graphql/internal/types/JobSummary';
import { Provider } from '@graphql/internal/types/Provider';
import UserModel from '../../../database/User/UserModel';

@ObjectType()
export class FullJobSummary extends JobSummary {
  @Field(() => Provider)
  provider!: Provider | undefined;
}

@injectable()
@Resolver()
export default class ListJobsQuery {
  constructor(private readonly deepsquare: DeepSquareClient) {}

  @Query(() => [FullJobSummary])
  async listJobs(@Arg('userId', () => String) userId: string) {
    const user = await UserModel.findById(userId);
    if (!user) return [];
    return (await Promise.all(user.jobs.map((id) => this.deepsquare.getJob(id)))).filter(
      (job) => job.jobId !== '0x0000000000000000000000000000000000000000000000000000000000000000',
    );
  }
}
