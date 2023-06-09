export const ProviderJobQueuesAbi = 
[
  {
    "inputs": [],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "inputs": [],
    "name": "Empty",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "NoJob",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "OutOfBounds",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "Uninitialized",
    "type": "error"
  },
  {
    "anonymous": false,
    "inputs":
    [
      {
        "indexed": true,
        "internalType": "address",
        "name": "previousOwner",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "newOwner",
        "type": "address"
      }
    ],
    "name": "OwnershipTransferred",
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
    "name": "getCancellingJobQueueSize",
    "outputs":
    [
      {
        "internalType": "uint256",
        "name": "length",
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
    "name": "getClaimableJobQueueSize",
    "outputs":
    [
      {
        "internalType": "uint256",
        "name": "length",
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
    "name": "getTimeoutQueueSize",
    "outputs":
    [
      {
        "internalType": "uint256",
        "name": "length",
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
    "name": "getTopUpJobQueueSize",
    "outputs":
    [
      {
        "internalType": "uint256",
        "name": "length",
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
    "name": "hasCancellingJob",
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
    "name": "hasNextClaimableJob",
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
    "name": "hasTimeoutJob",
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
    "name": "hasTopUpJob",
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
    "name": "owner",
    "outputs":
    [
      {
        "internalType": "address",
        "name": "",
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
      }
    ],
    "name": "popNextCancellingJob",
    "outputs":
    [
      {
        "internalType": "bytes32",
        "name": "jobId",
        "type": "bytes32"
      }
    ],
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
    "name": "popNextClaimableJob",
    "outputs":
    [
      {
        "internalType": "bytes32",
        "name": "jobId",
        "type": "bytes32"
      }
    ],
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
    "name": "popNextTimeoutJob",
    "outputs":
    [
      {
        "internalType": "bytes32",
        "name": "jobId",
        "type": "bytes32"
      }
    ],
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
    "name": "popNextTopUpJob",
    "outputs":
    [
      {
        "internalType": "bytes32",
        "name": "jobId",
        "type": "bytes32"
      }
    ],
    "stateMutability": "nonpayable",
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
    "name": "providerCancellingJobsQueues",
    "outputs":
    [
      {
        "internalType": "int128",
        "name": "_begin",
        "type": "int128"
      },
      {
        "internalType": "int128",
        "name": "_end",
        "type": "int128"
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
    "name": "providerClaimableJobsQueues",
    "outputs":
    [
      {
        "internalType": "int128",
        "name": "_begin",
        "type": "int128"
      },
      {
        "internalType": "int128",
        "name": "_end",
        "type": "int128"
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
    "name": "providerTimeoutJobsQueues",
    "outputs":
    [
      {
        "internalType": "int128",
        "name": "_begin",
        "type": "int128"
      },
      {
        "internalType": "int128",
        "name": "_end",
        "type": "int128"
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
    "name": "providerTopUpJobsQueues",
    "outputs":
    [
      {
        "internalType": "int128",
        "name": "_begin",
        "type": "int128"
      },
      {
        "internalType": "int128",
        "name": "_end",
        "type": "int128"
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
        "internalType": "bytes32",
        "name": "_jobId",
        "type": "bytes32"
      }
    ],
    "name": "pushCancellingJob",
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
        "internalType": "bytes32",
        "name": "_jobId",
        "type": "bytes32"
      }
    ],
    "name": "pushClaimableJob",
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
        "internalType": "bytes32",
        "name": "_jobId",
        "type": "bytes32"
      }
    ],
    "name": "pushTimeoutJob",
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
        "internalType": "bytes32",
        "name": "_jobId",
        "type": "bytes32"
      }
    ],
    "name": "pushTopUpJob",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "renounceOwnership",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs":
    [
      {
        "internalType": "contract IMetaScheduler",
        "name": "_metaschedulerAddr",
        "type": "address"
      }
    ],
    "name": "setMetascheduler",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs":
    [
      {
        "internalType": "address",
        "name": "newOwner",
        "type": "address"
      }
    ],
    "name": "transferOwnership",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
] as const;
