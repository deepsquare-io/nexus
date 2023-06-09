import type { Address } from 'wagmi';
import ChainId from '@lib/web3/lib/ChainId';

const mainnet: { [contractName: string]: Address } = {
  Credit: '0x43f185708de9e18D514F317Ca5587F96847A3dbe',
  FaucetCredit: '0x4e7D6c6394c697aA3378B4F60B534ad6E3398A4d',
  FaucetNative: '0x1fDAB86aA706Ef4682dc3B236a5094391B0F99A4',
  MetaScheduler: '0xc9AcB97F1132f0FB5dC9c5733B7b04F9079540f0',
  ProviderManager: '0x29c60202a1a1d74A7Fcdd40a03f91F06c177c78A',
  Tools: '0x5fF5520751cEc64b2704942928a09d5bc409EdB3',
  Constants: '0xCbA35A058FD8f9D83C905F9B66A17D92Ae49363B',
  ProviderJobQueues: '0xC5590Eb96E6b36103B083e88914226d6a33466E9',
};

const testnet: { [contractName: string]: Address } = {
  Credit: '0x43f185708de9e18D514F317Ca5587F96847A3dbe',
  FaucetCredit: '0x4e7D6c6394c697aA3378B4F60B534ad6E3398A4d',
  FaucetNative: '0x1fDAB86aA706Ef4682dc3B236a5094391B0F99A4',
  MetaScheduler: '0xc9AcB97F1132f0FB5dC9c5733B7b04F9079540f0',
  ProviderManager: '0x29c60202a1a1d74A7Fcdd40a03f91F06c177c78A',
  Tools: '0x5fF5520751cEc64b2704942928a09d5bc409EdB3',
  Constants: '0xCbA35A058FD8f9D83C905F9B66A17D92Ae49363B',
  ProviderJobQueues: '0xC5590Eb96E6b36103B083e88914226d6a33466E9',
};

type addressBook = typeof mainnet & Partial<typeof testnet>;

const addresses2: Record<ChainId, addressBook> = {
  [ChainId.DEEPSQUARE_MAINNET]: mainnet,
  [ChainId.DEEPSQUARE_TESTNET]: testnet,
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
