import type { HardhatUserConfig } from 'hardhat/config';

const config: HardhatUserConfig = {
  networks: {
    hardhat: {
      chainId: 1337,
      forking: {
        url: 'https://api.avax-test.network/ext/bc/C/rpc',
      },
      mining: {
        // interval: 1000,
      },
      accounts: {
        mnemonic: 'clever viable one client winter assault tissue slogan unfair fish blame mercy demise rack start',
        count: 10,
        accountsBalance: '0',
      },
    },
  },
};

export default config;
