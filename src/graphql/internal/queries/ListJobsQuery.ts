import { injectable } from 'tsyringe';
import { Field, ObjectType, Query, Resolver } from 'type-graphql';
import { privateKeyToAccount } from 'viem/accounts';
import DeepSquareClient from '@deepsquare/deepsquare-client';
import { JobSummary } from '@graphql/internal/types/JobSummary';
import { Provider } from '@graphql/internal/types/Provider';
import env from '@lib/app/env';

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
  async listJobs() {
    const ids = await this.deepsquare.listJob(privateKeyToAccount(env.WEB3_PRIVATE_KEY).address);
    return Promise.all(ids.map((id) => this.deepsquare.getJob(id)));
  }
}
