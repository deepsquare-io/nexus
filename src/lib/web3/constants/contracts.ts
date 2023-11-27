// Copyright 2023 Deepsquare Association
// This file is part of Nexus.
// Nexus is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.
// Nexus is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.
// You should have received a copy of the GNU General Public License along with Nexus. If not, see <https://www.gnu.org/licenses/>.
import type { Address } from 'wagmi';
import ChainId from '@lib/web3/lib/ChainId';

const mainnet: { [contractName: string]: Address } = {
  Credit: '0x43f185708de9e18D514F317Ca5587F96847A3dbe',
  FaucetCredit: '0x040811a6A4d8160a920e3FCDc5368fF3e6D1bc69',
  FaucetNative: '0x712b942336942441E711A454EEb4950E5063Ef33',
  MetaScheduler: '0x7524fBB0c1e099A4A472C5A7b0B1E1E3aBd3fE97',
  ProviderManager: '0x64D5a36De73f9789009060FE44d71D9C0903F1EF',
  Tools: '0x5FbD484a91ea7399d08C8aCb19AB17976AE6DA04',
  Constants: '0xf0945FB84D0D882d087a53d2B0B544E281F3D9A7',
  ProviderJobQueues: '0xFf62C3141e21A97152e7662B4e469F6681F9368a',
  JobRepository: '0x3860F9Ca87dF098067D10d3C4A6043fd50c5F1dd',
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
