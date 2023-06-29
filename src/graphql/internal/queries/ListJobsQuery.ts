import { injectable } from 'tsyringe';
import { Field, Mutation, ObjectType, Resolver } from 'type-graphql';
import { privateKeyToAccount } from 'viem/accounts';
import type DeepSquareClient from '@deepsquare/deepsquare-client';
import JobSummary from '@graphql/internal/types/JobSummary';
import Provider from '@graphql/internal/types/Provider';
import env from '@lib/app/env';

@injectable()
@Resolver()
@ObjectType()
export class FullJobSummary extends JobSummary {
  @Field(() => Provider, { nullable: true })
  provider!: Provider | null;
}

export default class ListJobsQuery {
  constructor(private readonly deepsquare: DeepSquareClient) {}

  @Mutation(() => [FullJobSummary])
  async listJobs(): Promise<FullJobSummary[]> {
    const ids = await this.deepsquare.listJob(privateKeyToAccount(env.WEB3_PRIVATE_KEY).address);

    const test: FullJobSummary = await this.deepsquare.getJob('0x00');

    return Promise.all(ids.map((id) => this.deepsquare.getJob(id)));
  }
}
