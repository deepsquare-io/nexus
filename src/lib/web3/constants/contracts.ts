// Copyright 2023 Deepsquare Association
// This file is part of Nexus.
// Nexus is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.
// Nexus is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.
// You should have received a copy of the GNU General Public License along with Nexus. If not, see <https://www.gnu.org/licenses/>.
import type { Address } from 'wagmi';
import ChainId from '@lib/web3/lib/ChainId';

const mainnet: { [contractName: string]: Address } = {
  Credit: '0x43f185708de9e18D514F317Ca5587F96847A3dbe',
  FaucetCredit: '0xc35af2Ef0892a5eaFe66622B43984fE1f706818D',
  FaucetNative: '0xD7A048d0004db0A4603B2e4a19D977b6d8f6a5d5',
  MetaScheduler: '0x3707aB457CF457275b7ec32e203c54df80C299d5',
  ProviderManager: '0x335aC45a7D3A1b705F431e809230A58c795fc86D',
  Tools: '0x147770d430eB795efC40848e03d4d09c9FeBCcdF',
  Constants: '0x67d5AF411a8eB3745784c5161b6969b28D8a813d',
  ProviderJobQueues: '0x1F9D645E67ad92CCE89320c719513CD6E70Ba7aA',
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
