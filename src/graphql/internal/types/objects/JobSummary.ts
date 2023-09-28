// Copyright 2023 Deepsquare Association
// This file is part of Nexus.
// Nexus is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.
// Nexus is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.
// You should have received a copy of the GNU General Public License along with Nexus. If not, see <https://www.gnu.org/licenses/>.
import { Field, InputType, Int, ObjectType } from 'type-graphql';
import type { ReadContractReturnType } from 'viem';
import { type Hex } from 'viem';
import type { IJobRepositoryAbi } from '@abi/IJobRepository';
import { JobStatus } from '@deepsquare/deepsquare-client';
import { BigIntScalar } from '@graphql/internal/scalars/BigIntScalar';
import HexScalar from '@graphql/internal/scalars/HexScalar';

@InputType('LabelInput')
@ObjectType()
export class Label {
  @Field()
  key!: string;

  @Field()
  value!: string;
}

@ObjectType()
export class Affinity {
  @Field(() => Label)
  label!: Label;

  @Field(() => HexScalar)
  op!: Hex;
}

@ObjectType()
export class JobDefinition {
  @Field(() => BigIntScalar)
  gpusPerTask!: bigint;

  @Field(() => BigIntScalar)
  memPerCpu!: bigint;

  @Field(() => BigIntScalar)
  cpusPerTask!: bigint;

  @Field(() => BigIntScalar)
  ntasks!: bigint;

  @Field()
  batchLocationHash!: string;

  @Field(() => Int)
  storageType!: number;

  @Field(() => [Label])
  uses!: readonly Label[];

  @Field(() => [Affinity])
  affinity!: Affinity[];
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

  @Field(() => BigIntScalar)
  panicTimestamp!: bigint;
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
export class JobSummary implements ReadContractReturnType<typeof IJobRepositoryAbi, 'get'> {
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

  @Field()
  cost!: JobCost;

  @Field()
  time!: JobTime;

  @Field(() => HexScalar)
  jobName!: Hex;

  @Field(() => Boolean)
  hasCancelRequest!: boolean;

  @Field(() => String)
  lastError!: string;
}
