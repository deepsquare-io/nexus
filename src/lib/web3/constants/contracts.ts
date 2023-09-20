// Copyright 2023 Deepsquare Association
// This file is part of Nexus.
// Nexus is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.
// Nexus is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.
// You should have received a copy of the GNU General Public License along with Nexus. If not, see <https://www.gnu.org/licenses/>.
import type { Address } from 'wagmi';
import ChainId from '@lib/web3/lib/ChainId';

const mainnet: { [contractName: string]: Address } = {
  Credit: '0x43f185708de9e18D514F317Ca5587F96847A3dbe',
  FaucetCredit: '0x9d5686FcA91Dd2bc0C4efc40209A0d8c6Db4FE70',
  FaucetNative: '0xb5ca6E9aA460714Ad7c4D734849bA016c07c43A8',
  MetaScheduler: '0x48af46ee836514551886bbC3b5920Eba81126F62',
  ProviderManager: '0x6203C63c987F2247F4694cE3Dc21F2393c2af84e',
  Tools: '0xe5609294736a6340853b096F0d449E7B8C8765bD',
  Constants: '0xc54620e9852C26d1f60495223345Bd624153b5D8',
  ProviderJobQueues: '0x4e851439132e7a5306FDcf384B8b70CDa58FC1de',
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
