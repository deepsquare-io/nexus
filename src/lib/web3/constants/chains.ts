export const deepsquareChain = {
  id: 179188,
  name: 'DeepSquare Mainnet C-Chain',
  network: 'deepsquare testnet',
  nativeCurrency: {
    name: 'Square',
    symbol: 'SQUARE',
    decimals: 18,
  },
  rpcUrls: {
    public: { http: ['https://testnet.deepsquare.run/rpc'] },
    default: { http: ['https://testnet.deepsquare.run/rpc'] },
  },
  blockExplorers: {
    default: { name: 'DeepTrace', url: 'https://https://deeptrace.deepsquare.run/' },
  },
  contracts: {
    multicall3: {
      address: '0xad25E3e89e005EE6b1d9a4723DE82b2D591779d2',
      blockCreated: 38009,
    },
  },
} as const;
