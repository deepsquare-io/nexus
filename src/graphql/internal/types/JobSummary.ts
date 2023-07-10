import { Field, Int, ObjectType } from 'type-graphql';
import type { ReadContractReturnType } from 'viem';
import { type Hex } from 'viem';
import type { MetaSchedulerAbi } from '@abi/MetaScheduler';
import { JobStatus } from '@deepsquare/deepsquare-client';
import { BigIntScalar } from '@graphql/internal/scalars/BigIntScalar';
import HexScalar from '@graphql/internal/scalars/HexScalar';

@ObjectType()
export class Label {
  @Field()
  key!: string;

  @Field()
  value!: string;
}

@ObjectType()
export class JobDefinition {
  @Field(() => BigIntScalar)
  gpuPerTask!: bigint;

  @Field(() => BigIntScalar)
  memPerCpu!: bigint;

  @Field(() => BigIntScalar)
  cpuPerTask!: bigint;

  @Field(() => BigIntScalar)
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
  @Field(() => BigIntScalar)
  start!: bigint;

  @Field(() => BigIntScalar)
  end!: bigint;

  @Field(() => BigIntScalar)
  cancelRequestTimestamp!: bigint;

  @Field(() => BigIntScalar)
  blockNumberStateChange!: bigint;
}

@ObjectType()
export class JobCost {
  @Field(() => BigIntScalar)
  maxCost!: bigint;

  @Field(() => BigIntScalar)
  finalCost!: bigint;

  @Field(() => BigIntScalar)
  pendingTopUp!: bigint;

  @Field(() => Boolean)
  delegateSpendingAuthority!: boolean;
}

@ObjectType()
export class JobSummary implements ReadContractReturnType<typeof MetaSchedulerAbi, 'getJob'> {
  @Field(() => HexScalar)
  jobId!: Hex;

  @Field(() => Int)
  status!: JobStatus;

  @Field(() => HexScalar)
  customerAddr!: Hex;

  @Field(() => HexScalar)
  providerAddr!: Hex;

  @Field()
  definition!: JobDefinition;

  @Field(() => Boolean)
  valid!: boolean;

  @Field()
  cost!: JobCost;

  @Field()
  time!: JobTime;

  @Field(() => HexScalar)
  jobName!: Hex;

  @Field(() => Boolean)
  hasCancelRequest!: boolean;
}
