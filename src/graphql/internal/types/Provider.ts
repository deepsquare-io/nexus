import { Field, ObjectType } from 'type-graphql';
import { type Hex } from 'viem';
import { ProviderStatus } from '@lib/types/enums/ProviderStatus';

@ObjectType()
export class ProviderHardware {
  @Field(() => String)
  nodes!: bigint;

  @Field(() => String)
  gpus!: bigint;

  @Field(() => String)
  cpus!: bigint;

  @Field(() => String)
  mem!: bigint;
}

@ObjectType()
export class ProviderPrices {
  @Field(() => String)
  gpuPricePerMin!: bigint;

  @Field(() => String)
  cpuPricePerMin!: bigint;

  @Field(() => String)
  memPricePerMin!: bigint;
}

@ObjectType()
export default class Provider {
  @Field(() => String)
  addr!: Hex;

  @Field(() => ProviderHardware)
  providerHardware!: ProviderHardware;

  @Field(() => ProviderPrices)
  providerPrices!: ProviderPrices;

  @Field(() => ProviderStatus)
  status!: ProviderStatus;

  @Field(() => String)
  jobCount!: bigint;

  @Field(() => Boolean)
  valid!: boolean;

  @Field(() => Boolean)
  linkListed!: boolean;
}
