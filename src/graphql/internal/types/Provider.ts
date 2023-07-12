// Copyright 2023 Deepsquare Association
// This file is part of Foobar.
// Foobar is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.
// Foobar is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.
// You should have received a copy of the GNU General Public License along with Foobar. If not, see <https://www.gnu.org/licenses/>.
import { Field, Int, ObjectType } from 'type-graphql';
import { type Hex } from 'viem';
import { BigIntScalar } from '@graphql/internal/scalars/BigIntScalar';
import HexScalar from '@graphql/internal/scalars/HexScalar';
import { ProviderStatus } from '@lib/types/enums/ProviderStatus';

@ObjectType()
export class ProviderHardware {
  @Field(() => BigIntScalar)
  nodes!: bigint;

  @Field(() => BigIntScalar)
  gpus!: bigint;

  @Field(() => BigIntScalar)
  cpus!: bigint;

  @Field(() => BigIntScalar)
  mem!: bigint;
}

@ObjectType()
export class ProviderPrices {
  @Field(() => BigIntScalar)
  gpuPricePerMin!: bigint;

  @Field(() => BigIntScalar)
  cpuPricePerMin!: bigint;

  @Field(() => BigIntScalar)
  memPricePerMin!: bigint;
}

@ObjectType()
export class Provider {
  @Field(() => HexScalar)
  addr!: Hex;

  @Field(() => ProviderHardware)
  providerHardware!: ProviderHardware;

  @Field(() => ProviderPrices)
  providerPrices!: ProviderPrices;

  @Field(() => Int)
  status!: ProviderStatus;

  @Field(() => BigIntScalar)
  jobCount!: bigint;

  @Field(() => Boolean)
  valid!: boolean;

  @Field(() => Boolean)
  linkListed!: boolean;
}
