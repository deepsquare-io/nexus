// Copyright 2023 Deepsquare Association
// This file is part of Nexus.
// Nexus is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.
// Nexus is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.
// You should have received a copy of the GNU General Public License along with Nexus. If not, see <https://www.gnu.org/licenses/>.
import type { Address } from 'wagmi';
import ChainId from '@lib/web3/lib/ChainId';

const mainnet: { [contractName: string]: Address } = {
  Credit: '0x43f185708de9e18D514F317Ca5587F96847A3dbe',
  FaucetCredit: '0xA23a503FB48E76C861c3Cc8216796F7e799CCd67',
  FaucetNative: '0xfA5FafBcD79B475a5b9BEcAA272B19d6B9C39f21',
  MetaScheduler: '0x196A7EB3E16a8359c30408f4F79622157Ef86d7c',
  ProviderManager: '0xe0aa6146c67152bb1C9baE170b4F247A95AeAd17',
  Tools: '0xcB6840474B0E1362E57cbB6cD51D3CcDf58844aA',
  Constants: '0x7e0d2107615F856412dD7A90C4A5AD000F3c2126',
  ProviderJobQueues: '0x5D8059e99844AC798AcE60255d1958cB98e98130',
  JobRepository: '0xeDa851d8A2a2aac992f053F76667E8745f446141',
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
