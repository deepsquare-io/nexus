import { Field, ObjectType } from 'type-graphql';
import { type Hex } from 'viem';
import BigIntScalar from '@graphql/internal/scalars/BigIntScalar';
import { HexScalar } from '@graphql/internal/scalars/HexScalar';
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

  @Field(() => ProviderStatus)
  status!: ProviderStatus;

  @Field(() => BigIntScalar)
  jobCount!: bigint;

  @Field(() => Boolean)
  valid!: boolean;

  @Field(() => Boolean)
  linkListed!: boolean;
}
