// Copyright 2023 Deepsquare Association
// This file is part of Nexus.
// Nexus is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.
// Nexus is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.
// You should have received a copy of the GNU General Public License along with Nexus. If not, see <https://www.gnu.org/licenses/>.
import type { Address } from 'wagmi';
import ChainId from '@lib/web3/lib/ChainId';

const mainnet: { [contractName: string]: Address } = {
  Credit: '0x43f185708de9e18D514F317Ca5587F96847A3dbe',
  FaucetCredit: '0x5fB6FFc12BAc330e9683B8908015850A5FB554DB',
  FaucetNative: '0xB12F570F7B81884a5Aa2D74aCEf3cA238b78A69c',
  MetaScheduler: '0x68A606C58fA06fF6872c80d71A71Ab7506eCa44B',
  ProviderManager: '0xb31c40ea5766Cd20D322D7BB7E0a5bF5534aA558',
  Tools: '0x226D47E310C1f2F9028a252e56C8183e661df591',
  Constants: '0xb1E887f7208cD88AC304A461DA92F8e4fa2dfB67',
  ProviderJobQueues: '0xBEe29A9C99A15bB5814c3348d245880B08075B3C',
  JobRepository: '0xFBBf852fC433fCBa1a71B92bFA26Aa8A6027C0fc',
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
