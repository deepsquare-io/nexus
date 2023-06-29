import { Field, Int, ObjectType } from 'type-graphql';
import type { ReadContractReturnType } from 'viem';
import { type Hex } from 'viem';
import type { MetaSchedulerAbi } from '@abi/MetaScheduler';
import { JobStatus } from '@lib/types/enums/JobStatus';

@ObjectType()
export class Label {
  @Field()
  key!: string;

  @Field()
  value!: string;
}

@ObjectType()
export class JobDefinition {
  @Field(() => String)
  gpuPerTask!: bigint;

  @Field(() => String)
  memPerCpu!: bigint;

  @Field(() => String)
  cpuPerTask!: bigint;

  @Field(() => String)
  ntasks!: bigint;

  @Field()
  batchLocationHash!: string;

  @Field(() => Int)
  storageType!: number;

  @Field(() => [Label])
  uses!: readonly Label[];
}

@ObjectType()
export class JobTime {
  @Field(() => String)
  start!: bigint;

  @Field(() => String)
  end!: bigint;

  @Field(() => String)
  cancelRequestTimestamp!: bigint;

  @Field(() => String)
  blockNumberStateChange!: bigint;
}

@ObjectType()
export class JobCost {
  @Field(() => String)
  maxCost!: bigint;

  @Field(() => String)
  finalCost!: bigint;

  @Field(() => String)
  pendingTopUp!: bigint;

  @Field(() => Boolean)
  delegateSpendingAuthority!: boolean;
}

@ObjectType()
export default class JobSummary implements ReadContractReturnType<typeof MetaSchedulerAbi, 'getJob'> {
  @Field(() => String)
  jobId!: Hex;

  @Field(() => JobStatus)
  status!: JobStatus;

  @Field(() => String)
  customerAddr!: Hex;

  @Field(() => String)
  providerAddr!: Hex;

  @Field()
  definition!: JobDefinition;

  @Field(() => Boolean)
  valid!: boolean;

  @Field()
  cost!: JobCost;

  @Field()
  time!: JobTime;

  @Field(() => String)
  jobName!: Hex;

  @Field(() => Boolean)
  hasCancelRequest!: boolean;
}
