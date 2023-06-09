export const IMetaSchedulerAbi = 
[
  {
    "anonymous": false,
    "inputs":
    [
      {
        "indexed": false,
        "internalType": "bytes32",
        "name": "_jobId",
        "type": "bytes32"
      },
      {
        "indexed": false,
        "internalType": "address",
        "name": "_providerAddr",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "_billingAmount",
        "type": "uint256"
      }
    ],
    "name": "BilledTooMuchEvent",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs":
    [
      {
        "indexed": false,
        "internalType": "address",
        "name": "customerAddr",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "address",
        "name": "providerAddr",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "bytes32",
        "name": "jobId",
        "type": "bytes32"
      },
      {
        "indexed": false,
        "internalType": "uint64",
        "name": "maxDurationMinute",
        "type": "uint64"
      },
      {
        "components":
        [
          {
            "internalType": "uint64",
            "name": "gpuPerTask",
            "type": "uint64"
          },
          {
            "internalType": "uint64",
            "name": "memPerCpu",
            "type": "uint64"
          },
          {
            "internalType": "uint64",
            "name": "cpuPerTask",
            "type": "uint64"
          },
          {
            "internalType": "uint64",
            "name": "ntasks",
            "type": "uint64"
          },
          {
            "internalType": "string",
            "name": "batchLocationHash",
            "type": "string"
          },
          {
            "internalType": "enum StorageType",
            "name": "storageType",
            "type": "uint8"
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
            "name": "uses",
            "type": "tuple[]"
          }
        ],
        "indexed": false,
        "internalType": "struct JobDefinition",
        "name": "jobDefinition",
        "type": "tuple"
      }
    ],
    "name": "ClaimJobEvent",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs":
    [
      {
        "indexed": false,
        "internalType": "address",
        "name": "customerAddr",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "address",
        "name": "providerAddr",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "bytes32",
        "name": "jobId",
        "type": "bytes32"
      }
    ],
    "name": "ClaimNextCancellingJobEvent",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs":
    [
      {
        "indexed": false,
        "internalType": "bytes32",
        "name": "_jobId",
        "type": "bytes32"
      },
      {
        "indexed": false,
        "internalType": "address",
        "name": "_providerAddr",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint64",
        "name": "maxDurationMinute",
        "type": "uint64"
      }
    ],
    "name": "ClaimNextTopUpJobEvent",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs":
    [
      {
        "indexed": false,
        "internalType": "bytes32",
        "name": "_jobId",
        "type": "bytes32"
      },
      {
        "indexed": false,
        "internalType": "address",
        "name": "_providerAddr",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "address",
        "name": "_customerAddr",
        "type": "address"
      }
    ],
    "name": "JobRefusedEvent",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs":
    [
      {
        "indexed": false,
        "internalType": "bytes32",
        "name": "_jobId",
        "type": "bytes32"
      },
      {
        "indexed": false,
        "internalType": "enum JobStatus",
        "name": "_from",
        "type": "uint8"
      },
      {
        "indexed": false,
        "internalType": "enum JobStatus",
        "name": "_to",
        "type": "uint8"
      }
    ],
    "name": "JobTransitionEvent",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs":
    [
      {
        "indexed": false,
        "internalType": "bytes32",
        "name": "_jobId",
        "type": "bytes32"
      },
      {
        "indexed": false,
        "internalType": "address",
        "name": "_customerAddr",
        "type": "address"
      }
    ],
    "name": "NewJobRequestEvent",
    "type": "event"
  },
  {
    "inputs":
    [
      {
        "internalType": "bytes32",
        "name": "_jobId",
        "type": "bytes32"
      }
    ],
    "name": "cancelJob",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "claimNextCancellingJob",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "claimNextJob",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs":
    [
      {
        "internalType": "bytes32",
        "name": "_jobId",
        "type": "bytes32"
      }
    ],
    "name": "getJob",
    "outputs":
    [
      {
        "components":
        [
          {
            "internalType": "bytes32",
            "name": "jobId",
            "type": "bytes32"
          },
          {
            "internalType": "enum JobStatus",
            "name": "status",
            "type": "uint8"
          },
          {
            "internalType": "address",
            "name": "customerAddr",
            "type": "address"
          },
          {
            "internalType": "address",
            "name": "providerAddr",
            "type": "address"
          },
          {
            "components":
            [
              {
                "internalType": "uint64",
                "name": "gpuPerTask",
                "type": "uint64"
              },
              {
                "internalType": "uint64",
                "name": "memPerCpu",
                "type": "uint64"
              },
              {
                "internalType": "uint64",
                "name": "cpuPerTask",
                "type": "uint64"
              },
              {
                "internalType": "uint64",
                "name": "ntasks",
                "type": "uint64"
              },
              {
                "internalType": "string",
                "name": "batchLocationHash",
                "type": "string"
              },
              {
                "internalType": "enum StorageType",
                "name": "storageType",
                "type": "uint8"
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
                "name": "uses",
                "type": "tuple[]"
              }
            ],
            "internalType": "struct JobDefinition",
            "name": "definition",
            "type": "tuple"
          },
          {
            "internalType": "bool",
            "name": "valid",
            "type": "bool"
          },
          {
            "components":
            [
              {
                "internalType": "uint256",
                "name": "maxCost",
                "type": "uint256"
              },
              {
                "internalType": "uint256",
                "name": "finalCost",
                "type": "uint256"
              },
              {
                "internalType": "uint256",
                "name": "pendingTopUp",
                "type": "uint256"
              },
              {
                "internalType": "bool",
                "name": "delegateSpendingAuthority",
                "type": "bool"
              }
            ],
            "internalType": "struct JobCost",
            "name": "cost",
            "type": "tuple"
          },
          {
            "components":
            [
              {
                "internalType": "uint256",
                "name": "start",
                "type": "uint256"
              },
              {
                "internalType": "uint256",
                "name": "end",
                "type": "uint256"
              },
              {
                "internalType": "uint256",
                "name": "cancelRequestTimestamp",
                "type": "uint256"
              },
              {
                "internalType": "uint256",
                "name": "blockNumberStateChange",
                "type": "uint256"
              }
            ],
            "internalType": "struct JobTime",
            "name": "time",
            "type": "tuple"
          },
          {
            "internalType": "bytes32",
            "name": "jobName",
            "type": "bytes32"
          },
          {
            "internalType": "bool",
            "name": "hasCancelRequest",
            "type": "bool"
          }
        ],
        "internalType": "struct Job",
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
        "internalType": "bytes32",
        "name": "_jobId",
        "type": "bytes32"
      },
      {
        "internalType": "address",
        "name": "_providerAddr",
        "type": "address"
      }
    ],
    "name": "metaSchedule",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs":
    [
      {
        "internalType": "bytes32",
        "name": "_jobId",
        "type": "bytes32"
      },
      {
        "internalType": "enum JobStatus",
        "name": "_jobStatus",
        "type": "uint8"
      },
      {
        "internalType": "uint64",
        "name": "_jobDurationMinute",
        "type": "uint64"
      }
    ],
    "name": "providerSetJobStatus",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs":
    [
      {
        "internalType": "bytes32",
        "name": "_jobId",
        "type": "bytes32"
      }
    ],
    "name": "refuseJob",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs":
    [
      {
        "components":
        [
          {
            "internalType": "uint64",
            "name": "gpuPerTask",
            "type": "uint64"
          },
          {
            "internalType": "uint64",
            "name": "memPerCpu",
            "type": "uint64"
          },
          {
            "internalType": "uint64",
            "name": "cpuPerTask",
            "type": "uint64"
          },
          {
            "internalType": "uint64",
            "name": "ntasks",
            "type": "uint64"
          },
          {
            "internalType": "string",
            "name": "batchLocationHash",
            "type": "string"
          },
          {
            "internalType": "enum StorageType",
            "name": "storageType",
            "type": "uint8"
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
            "name": "uses",
            "type": "tuple[]"
          }
        ],
        "internalType": "struct JobDefinition",
        "name": "_definition",
        "type": "tuple"
      },
      {
        "internalType": "uint256",
        "name": "_maxCost",
        "type": "uint256"
      },
      {
        "internalType": "bytes32",
        "name": "_jobName",
        "type": "bytes32"
      },
      {
        "internalType": "bool",
        "name": "delegateSpendingAuthority",
        "type": "bool"
      }
    ],
    "name": "requestNewJob",
    "outputs":
    [
      {
        "internalType": "bytes32",
        "name": "",
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
        "internalType": "bytes32",
        "name": "_jobId",
        "type": "bytes32"
      },
      {
        "internalType": "uint256",
        "name": "_amount",
        "type": "uint256"
      }
    ],
    "name": "topUpJob",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs":
    [
      {
        "internalType": "bytes32",
        "name": "_jobId",
        "type": "bytes32"
      }
    ],
    "name": "topUpJobDelegate",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs":
    [
      {
        "internalType": "uint256",
        "name": "_amount",
        "type": "uint256"
      }
    ],
    "name": "withdrawAdmin",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
] as const;
