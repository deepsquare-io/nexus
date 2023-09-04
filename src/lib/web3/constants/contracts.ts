// Copyright 2023 Deepsquare Association
// This file is part of Nexus.
// Nexus is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.
// Nexus is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.
// You should have received a copy of the GNU General Public License along with Nexus. If not, see <https://www.gnu.org/licenses/>.
import type { Address } from 'wagmi';
import ChainId from '@lib/web3/lib/ChainId';

const mainnet: { [contractName: string]: Address } = {
  Credit: '0x43f185708de9e18D514F317Ca5587F96847A3dbe',
  FaucetCredit: '0xc4d780b7b335565D6f245B2a7a202FDdf8D53C7E',
  FaucetNative: '0x5b6AaAeeff5CC2EDf02936369dE62a80f48ba952',
  MetaScheduler: '0xeD6Deb4c6E7e5D35c0d0FE3802663142e3E266da',
  ProviderManager: '0x4d2e48b66dbBbD8381a0C7117a9d968E7c2a7Ae9',
  Tools: '0x6Db50eC804f3D7a1E3dE8A7Cc72BA0F0Dc84e5f0',
  Constants: '0x982b6457f4261BA330358CFf4e51C1Bc27137082',
  ProviderJobQueues: '0xe2Cb34139cA4d42708e98E68722558b0e9F4C1E3',
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
