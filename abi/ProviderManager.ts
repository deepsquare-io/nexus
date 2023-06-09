export const ProviderManagerAbi = 
[
  {
    "inputs": [],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "inputs": [],
    "name": "Banned",
    "type": "error"
  },
  {
    "inputs":
    [
      {
        "internalType": "uint256",
        "name": "current",
        "type": "uint256"
      }
    ],
    "name": "InvalidNCpu",
    "type": "error"
  },
  {
    "inputs":
    [
      {
        "internalType": "uint256",
        "name": "current",
        "type": "uint256"
      }
    ],
    "name": "InvalidNMem",
    "type": "error"
  },
  {
    "inputs":
    [
      {
        "internalType": "uint256",
        "name": "current",
        "type": "uint256"
      }
    ],
    "name": "InvalidNNodes",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "NoProvider",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "WaitingApprovalOnly",
    "type": "error"
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
    "name": "HardwareUpdatedEvent",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs":
    [
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "id",
        "type": "uint256"
      }
    ],
    "name": "NewHead",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs":
    [
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "id",
        "type": "uint256"
      }
    ],
    "name": "NewTail",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs":
    [
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "id",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "bytes32",
        "name": "data",
        "type": "bytes32"
      }
    ],
    "name": "ObjectCreated",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs":
    [
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "id",
        "type": "uint256"
      }
    ],
    "name": "ObjectRemoved",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs":
    [
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "prev",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "next",
        "type": "uint256"
      }
    ],
    "name": "ObjectsLinked",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs":
    [
      {
        "indexed": true,
        "internalType": "bytes32",
        "name": "role",
        "type": "bytes32"
      },
      {
        "indexed": true,
        "internalType": "bytes32",
        "name": "previousAdminRole",
        "type": "bytes32"
      },
      {
        "indexed": true,
        "internalType": "bytes32",
        "name": "newAdminRole",
        "type": "bytes32"
      }
    ],
    "name": "RoleAdminChanged",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs":
    [
      {
        "indexed": true,
        "internalType": "bytes32",
        "name": "role",
        "type": "bytes32"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "account",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "sender",
        "type": "address"
      }
    ],
    "name": "RoleGranted",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs":
    [
      {
        "indexed": true,
        "internalType": "bytes32",
        "name": "role",
        "type": "bytes32"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "account",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "sender",
        "type": "address"
      }
    ],
    "name": "RoleRevoked",
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
    "inputs": [],
    "name": "DEFAULT_ADMIN_ROLE",
    "outputs":
    [
      {
        "internalType": "bytes32",
        "name": "",
        "type": "bytes32"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "METASCHEDULER_CONTRACT_ROLE",
    "outputs":
    [
      {
        "internalType": "bytes32",
        "name": "",
        "type": "bytes32"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "METASCHEDULER_ROLE",
    "outputs":
    [
      {
        "internalType": "bytes32",
        "name": "",
        "type": "bytes32"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "PROVIDER_REGISTRATION_TAX",
    "outputs":
    [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs":
    [
      {
        "internalType": "bytes32",
        "name": "_data",
        "type": "bytes32"
      }
    ],
    "name": "addHead",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs":
    [
      {
        "internalType": "bytes32",
        "name": "_data",
        "type": "bytes32"
      }
    ],
    "name": "addTail",
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
    "inputs": [],
    "name": "elementCount",
    "outputs":
    [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs":
    [
      {
        "internalType": "uint256",
        "name": "cursor",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "howMany",
        "type": "uint256"
      }
    ],
    "name": "fetchPage",
    "outputs":
    [
      {
        "internalType": "bytes32[]",
        "name": "data",
        "type": "bytes32[]"
      },
      {
        "internalType": "uint256",
        "name": "actualLength",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "newCursor",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs":
    [
      {
        "internalType": "bytes32",
        "name": "_hash",
        "type": "bytes32"
      },
      {
        "internalType": "uint256",
        "name": "_from",
        "type": "uint256"
      }
    ],
    "name": "findIdForDataFrom",
    "outputs":
    [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs":
    [
      {
        "internalType": "uint256",
        "name": "_id",
        "type": "uint256"
      }
    ],
    "name": "get",
    "outputs":
    [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      },
      {
        "internalType": "bytes32",
        "name": "",
        "type": "bytes32"
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
        "name": "status",
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
        "internalType": "bytes32",
        "name": "role",
        "type": "bytes32"
      }
    ],
    "name": "getRoleAdmin",
    "outputs":
    [
      {
        "internalType": "bytes32",
        "name": "",
        "type": "bytes32"
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
        "internalType": "bytes32",
        "name": "role",
        "type": "bytes32"
      },
      {
        "internalType": "address",
        "name": "account",
        "type": "address"
      }
    ],
    "name": "grantRole",
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
        "internalType": "bytes32",
        "name": "role",
        "type": "bytes32"
      },
      {
        "internalType": "address",
        "name": "account",
        "type": "address"
      }
    ],
    "name": "hasRole",
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
    "inputs": [],
    "name": "head",
    "outputs":
    [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "idCounter",
    "outputs":
    [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
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
        "internalType": "uint256",
        "name": "_prevId",
        "type": "uint256"
      },
      {
        "internalType": "bytes32",
        "name": "_data",
        "type": "bytes32"
      }
    ],
    "name": "insertAfter",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs":
    [
      {
        "internalType": "uint256",
        "name": "_nextId",
        "type": "uint256"
      },
      {
        "internalType": "bytes32",
        "name": "_data",
        "type": "bytes32"
      }
    ],
    "name": "insertBefore",
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
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "objects",
    "outputs":
    [
      {
        "internalType": "uint256",
        "name": "id",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "next",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "prev",
        "type": "uint256"
      },
      {
        "internalType": "bytes32",
        "name": "data",
        "type": "bytes32"
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
        "name": "",
        "type": "address"
      }
    ],
    "name": "providers",
    "outputs":
    [
      {
        "internalType": "address",
        "name": "walletAddr",
        "type": "address"
      },
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
        "name": "providerHardware",
        "type": "tuple"
      },
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
        "name": "providerPrices",
        "type": "tuple"
      },
      {
        "internalType": "enum ProviderStatus",
        "name": "status",
        "type": "uint8"
      },
      {
        "internalType": "uint64",
        "name": "jobCount",
        "type": "uint64"
      },
      {
        "internalType": "bool",
        "name": "valid",
        "type": "bool"
      },
      {
        "internalType": "bool",
        "name": "linkListed",
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
        "name": "_tags",
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
        "name": "_tags",
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
        "internalType": "uint256",
        "name": "_id",
        "type": "uint256"
      }
    ],
    "name": "remove",
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
  },
  {
    "inputs":
    [
      {
        "internalType": "bytes32",
        "name": "role",
        "type": "bytes32"
      },
      {
        "internalType": "address",
        "name": "account",
        "type": "address"
      }
    ],
    "name": "renounceRole",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs":
    [
      {
        "internalType": "bytes32",
        "name": "role",
        "type": "bytes32"
      },
      {
        "internalType": "address",
        "name": "account",
        "type": "address"
      }
    ],
    "name": "revokeRole",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs":
    [
      {
        "internalType": "bytes4",
        "name": "interfaceId",
        "type": "bytes4"
      }
    ],
    "name": "supportsInterface",
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
    "inputs": [],
    "name": "tail",
    "outputs":
    [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "totalJobCount",
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
  }
] as const;
