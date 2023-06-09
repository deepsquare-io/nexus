export const IProviderManagerAbi = 
[
  {
    "anonymous": false,
    "inputs":
    [
      {
        "indexed": false,
        "internalType": "address",
        "name": "_providerAddr",
        "type": "address"
      }
    ],
    "name": "HardwareUpdatedEvent",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs":
    [
      {
        "indexed": false,
        "internalType": "address",
        "name": "_providerAddr",
        "type": "address"
      }
    ],
    "name": "ToBeApproved",
    "type": "event"
  },
  {
    "inputs":
    [
      {
        "internalType": "address",
        "name": "_providerAddr",
        "type": "address"
      }
    ],
    "name": "approve",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs":
    [
      {
        "internalType": "address",
        "name": "_providerAddr",
        "type": "address"
      }
    ],
    "name": "ban",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs":
    [
      {
        "internalType": "address",
        "name": "_providerAddr",
        "type": "address"
      }
    ],
    "name": "getAllTag",
    "outputs":
    [
      {
        "components":
        [
          {
            "internalType": "string",
            "name": "key",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "value",
            "type": "string"
          }
        ],
        "internalType": "struct Label[]",
        "name": "",
        "type": "tuple[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs":
    [
      {
        "internalType": "address",
        "name": "_providerAddr",
        "type": "address"
      }
    ],
    "name": "getJobCount",
    "outputs":
    [
      {
        "internalType": "uint64",
        "name": "",
        "type": "uint64"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs":
    [
      {
        "internalType": "address",
        "name": "_providerAddr",
        "type": "address"
      }
    ],
    "name": "getProviderHardware",
    "outputs":
    [
      {
        "components":
        [
          {
            "internalType": "uint64",
            "name": "nodes",
            "type": "uint64"
          },
          {
            "internalType": "uint64",
            "name": "gpus",
            "type": "uint64"
          },
          {
            "internalType": "uint64",
            "name": "cpus",
            "type": "uint64"
          },
          {
            "internalType": "uint64",
            "name": "mem",
            "type": "uint64"
          }
        ],
        "internalType": "struct ProviderHardware",
        "name": "",
        "type": "tuple"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs":
    [
      {
        "internalType": "address",
        "name": "_providerAddr",
        "type": "address"
      }
    ],
    "name": "getProviderPrices",
    "outputs":
    [
      {
        "components":
        [
          {
            "internalType": "uint256",
            "name": "gpuPricePerMin",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "cpuPricePerMin",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "memPricePerMin",
            "type": "uint256"
          }
        ],
        "internalType": "struct ProviderPrices",
        "name": "",
        "type": "tuple"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs":
    [
      {
        "internalType": "address",
        "name": "_providerAddr",
        "type": "address"
      }
    ],
    "name": "getProviderStatus",
    "outputs":
    [
      {
        "internalType": "enum ProviderStatus",
        "name": "_status",
        "type": "uint8"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs":
    [
      {
        "internalType": "address",
        "name": "_providerAddr",
        "type": "address"
      }
    ],
    "name": "getProviderWalletAddr",
    "outputs":
    [
      {
        "internalType": "address",
        "name": "_walletAddr",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs":
    [
      {
        "internalType": "address",
        "name": "_providerAddr",
        "type": "address"
      },
      {
        "internalType": "string",
        "name": "tagKey",
        "type": "string"
      }
    ],
    "name": "getTag",
    "outputs":
    [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs":
    [
      {
        "internalType": "address",
        "name": "_providerAddr",
        "type": "address"
      }
    ],
    "name": "hasJoined",
    "outputs":
    [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs":
    [
      {
        "internalType": "address",
        "name": "_providerAddr",
        "type": "address"
      }
    ],
    "name": "incJobCount",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs":
    [
      {
        "internalType": "address",
        "name": "_providerAddr",
        "type": "address"
      }
    ],
    "name": "kick",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs":
    [
      {
        "internalType": "uint64",
        "name": "_nNodes",
        "type": "uint64"
      },
      {
        "internalType": "uint64",
        "name": "_gpus",
        "type": "uint64"
      },
      {
        "internalType": "uint64",
        "name": "_cpus",
        "type": "uint64"
      },
      {
        "internalType": "uint64",
        "name": "_mem",
        "type": "uint64"
      },
      {
        "internalType": "uint256",
        "name": "_gpuPricePerMin",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "_cpuPricePerMin",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "_memPricePerMin",
        "type": "uint256"
      },
      {
        "components":
        [
          {
            "internalType": "string",
            "name": "key",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "value",
            "type": "string"
          }
        ],
        "internalType": "struct Label[]",
        "name": "_labels",
        "type": "tuple[]"
      }
    ],
    "name": "register",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs":
    [
      {
        "internalType": "address",
        "name": "_providerAddr",
        "type": "address"
      },
      {
        "internalType": "uint64",
        "name": "_nNodes",
        "type": "uint64"
      },
      {
        "internalType": "uint64",
        "name": "_gpus",
        "type": "uint64"
      },
      {
        "internalType": "uint64",
        "name": "_cpus",
        "type": "uint64"
      },
      {
        "internalType": "uint64",
        "name": "_mem",
        "type": "uint64"
      },
      {
        "internalType": "uint256",
        "name": "_gpuPricePerMin",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "_cpuPricePerMin",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "_memPricePerMin",
        "type": "uint256"
      },
      {
        "components":
        [
          {
            "internalType": "string",
            "name": "key",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "value",
            "type": "string"
          }
        ],
        "internalType": "struct Label[]",
        "name": "_labels",
        "type": "tuple[]"
      }
    ],
    "name": "registerProvider",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs":
    [
      {
        "internalType": "address",
        "name": "_providerAddr",
        "type": "address"
      }
    ],
    "name": "reinstate",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs":
    [
      {
        "internalType": "address",
        "name": "_providerAddr",
        "type": "address"
      }
    ],
    "name": "removeProvider",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
] as const;
