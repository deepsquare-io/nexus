import type { Address } from 'wagmi';
import ChainId from '@lib/web3/lib/ChainId';

const mainnet: { [contractName: string]: Address } = {
  Credit: '0x43f185708de9e18D514F317Ca5587F96847A3dbe',
  FaucetCredit: '0x2a1614Ee3595649916e5C10B3136DcC3aF0F9CD8',
  FaucetNative: '0xCc49D18f4A79427d3473282D0F1aCCa5Ad4D2312',
  MetaScheduler: '0x3a97E2ddD148647E60b4b94BdAD56173072Aa925',
  ProviderManager: '0xb52405C2D11a8d1E4a0c6807f0C169F4D1345447',
  Tools: '0x7b13A06c4709FAa715AFC5cB429EFdafCFc109d6',
  Constants: '0x73e364C4F66a7ba0D137027E2ec5D64dccB3453C',
  ProviderJobQueues: '0x100f3280aD46a766Bd173512dB9c3a8423568De4',
};

const testnet: { [contractName: string]: Address } = {
  Credit: '0x43f185708de9e18D514F317Ca5587F96847A3dbe',
  FaucetCredit: '0x2a1614Ee3595649916e5C10B3136DcC3aF0F9CD8',
  FaucetNative: '0xCc49D18f4A79427d3473282D0F1aCCa5Ad4D2312',
  MetaScheduler: '0x3a97E2ddD148647E60b4b94BdAD56173072Aa925',
  ProviderManager: '0xb52405C2D11a8d1E4a0c6807f0C169F4D1345447',
  Tools: '0x7b13A06c4709FAa715AFC5cB429EFdafCFc109d6',
  Constants: '0x73e364C4F66a7ba0D137027E2ec5D64dccB3453C',
  ProviderJobQueues: '0x100f3280aD46a766Bd173512dB9c3a8423568De4',
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
