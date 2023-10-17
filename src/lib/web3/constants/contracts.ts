// Copyright 2023 Deepsquare Association
// This file is part of Nexus.
// Nexus is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.
// Nexus is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.
// You should have received a copy of the GNU General Public License along with Nexus. If not, see <https://www.gnu.org/licenses/>.
import type { Address } from 'wagmi';
import ChainId from '@lib/web3/lib/ChainId';

const mainnet: { [contractName: string]: Address } = {
  Credit: '0x43f185708de9e18D514F317Ca5587F96847A3dbe',
  FaucetCredit: '0xE80D1B228BBc15489255fCe75243CD48913d4dfc',
  FaucetNative: '0x9f2862718e0aD6715850938702deeF204C863300',
  MetaScheduler: '0x945Cb74ba64714f977c4abbE8a416F7E0Cf5180B',
  ProviderManager: '0x609b8204E4830b24fA09B09983Fe631d1D1bd897',
  Tools: '0xE1F0AbA8476c5C725B1E897fb172f4432ae2525E',
  Constants: '0x14d7cA72e3a8D2081E2cE1B4e16f4BBB1Ef95Ff4',
  ProviderJobQueues: '0xB0a97543BdF19B070fDa596f103b2A9CE4E3B62E',
  JobRepository: '0x94E361F62CB4BEb6d43e181A8570f83f2c809245',
};

type addressBook = typeof mainnet;

const addresses2: Record<ChainId, addressBook> = {
  [ChainId.DEEPSQUARE_MAINNET]: mainnet,
};

const current = addresses2[ChainId.DEEPSQUARE_MAINNET];

export const addressCredit = current.Credit;
export const addressFaucetCredit = current.FaucetCredit;
export const addressFaucetNative = current.FaucetNative;
export const addressProviderManager = current.ProviderManager;
export const addressMetaScheduler = current.MetaScheduler;

export const addressTools = current.Tools;

export const addressConstants = current.Constants;

export const addressProviderJobQueues = current.ProviderJobQueues;

export const addressJobRepository = current.JobRepository;
