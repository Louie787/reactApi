const DEXclientContract = {
    abi: {
        "ABI version": 2,
        "header": [
            "pubkey",
            "time",
            "expire"
        ],
        "functions": [
            {
                "name": "constructor",
                "inputs": [],
                "outputs": []
            },
            {
                "name": "sendTransfer",
                "inputs": [
                    {
                        "name": "dest",
                        "type": "address"
                    },
                    {
                        "name": "value",
                        "type": "uint128"
                    },
                    {
                        "name": "bounce",
                        "type": "bool"
                    }
                ],
                "outputs": []
            },
            {
                "name": "connectPair",
                "inputs": [
                    {
                        "name": "pairAddr",
                        "type": "address"
                    }
                ],
                "outputs": [
                    {
                        "name": "statusConnection",
                        "type": "bool"
                    }
                ]
            },
            {
                "name": "createNewEmptyWalletByOwner",
                "inputs": [
                    {
                        "name": "rootAddr",
                        "type": "address"
                    }
                ],
                "outputs": [
                    {
                        "name": "createStatus",
                        "type": "bool"
                    }
                ]
            },
            {
                "name": "createNewPairByOwner",
                "inputs": [
                    {
                        "name": "root0",
                        "type": "address"
                    },
                    {
                        "name": "root1",
                        "type": "address"
                    },
                    {
                        "name": "createId",
                        "type": "uint256"
                    },
                    {
                        "name": "grams",
                        "type": "uint128"
                    }
                ],
                "outputs": [
                    {
                        "name": "createStatus",
                        "type": "bool"
                    }
                ]
            },
            {
                "name": "setNewEmptyWallet",
                "id": "0x7",
                "inputs": [
                    {
                        "name": "value0",
                        "type": "address"
                    }
                ],
                "outputs": []
            },
            {
                "name": "getWalletByRoot",
                "inputs": [
                    {
                        "name": "rootAddr",
                        "type": "address"
                    }
                ],
                "outputs": [
                    {
                        "name": "wallet",
                        "type": "address"
                    }
                ]
            },
            {
                "name": "getAddressWTON",
                "inputs": [],
                "outputs": [
                    {
                        "name": "wallet",
                        "type": "address"
                    }
                ]
            },
            {
                "name": "setPair",
                "id": "0x3",
                "inputs": [
                    {
                        "name": "arg0",
                        "type": "address"
                    },
                    {
                        "name": "arg1",
                        "type": "address"
                    },
                    {
                        "name": "arg2",
                        "type": "address"
                    },
                    {
                        "name": "arg3",
                        "type": "address"
                    },
                    {
                        "name": "arg4",
                        "type": "address"
                    },
                    {
                        "name": "arg5",
                        "type": "address"
                    }
                ],
                "outputs": []
            },
            {
                "name": "setPairDepositA",
                "id": "0x8",
                "inputs": [
                    {
                        "name": "arg0",
                        "type": "address"
                    }
                ],
                "outputs": []
            },
            {
                "name": "setPairDepositB",
                "id": "0x9",
                "inputs": [
                    {
                        "name": "arg0",
                        "type": "address"
                    }
                ],
                "outputs": []
            },
            {
                "name": "getPair",
                "inputs": [
                    {
                        "name": "value0",
                        "type": "address"
                    }
                ],
                "outputs": [
                    {
                        "name": "pairRootA",
                        "type": "address"
                    },
                    {
                        "name": "pairReserveA",
                        "type": "address"
                    },
                    {
                        "name": "clientDepositA",
                        "type": "address"
                    },
                    {
                        "name": "pairRootB",
                        "type": "address"
                    },
                    {
                        "name": "pairReserveB",
                        "type": "address"
                    },
                    {
                        "name": "clientDepositB",
                        "type": "address"
                    },
                    {
                        "name": "curPair",
                        "type": "address"
                    }
                ]
            },
            {
                "name": "sendTokens",
                "inputs": [
                    {
                        "name": "from",
                        "type": "address"
                    },
                    {
                        "name": "to",
                        "type": "address"
                    },
                    {
                        "name": "tokens",
                        "type": "uint128"
                    },
                    {
                        "name": "grams",
                        "type": "uint128"
                    }
                ],
                "outputs": [
                    {
                        "name": "transmitter",
                        "type": "address"
                    },
                    {
                        "name": "receiver",
                        "type": "address"
                    },
                    {
                        "name": "body",
                        "type": "cell"
                    }
                ]
            },
            {
                "name": "sendTokens2",
                "inputs": [
                    {
                        "name": "from",
                        "type": "address"
                    },
                    {
                        "name": "to",
                        "type": "address"
                    },
                    {
                        "name": "tokens",
                        "type": "uint128"
                    },
                    {
                        "name": "grams",
                        "type": "uint128"
                    }
                ],
                "outputs": [
                    {
                        "name": "transmitter",
                        "type": "address"
                    },
                    {
                        "name": "receiver",
                        "type": "address"
                    }
                ]
            },
            {
                "name": "sendTokens3",
                "inputs": [
                    {
                        "name": "from",
                        "type": "address"
                    },
                    {
                        "name": "to",
                        "type": "address"
                    },
                    {
                        "name": "tokens",
                        "type": "uint128"
                    }
                ],
                "outputs": [
                    {
                        "name": "transmitter",
                        "type": "address"
                    },
                    {
                        "name": "receiver",
                        "type": "address"
                    },
                    {
                        "name": "body",
                        "type": "cell"
                    }
                ]
            },
            {
                "name": "getPairClientWallets",
                "inputs": [
                    {
                        "name": "pairAddr",
                        "type": "address"
                    }
                ],
                "outputs": [
                    {
                        "name": "walletA",
                        "type": "address"
                    },
                    {
                        "name": "walletB",
                        "type": "address"
                    },
                    {
                        "name": "pairReturn",
                        "type": "address"
                    }
                ]
            },
            {
                "name": "getAllDataPreparation",
                "inputs": [],
                "outputs": [
                    {
                        "name": "pairKeysR",
                        "type": "address[]"
                    },
                    {
                        "name": "rootKeysR",
                        "type": "address[]"
                    }
                ]
            },
            {
                "name": "showContractAddress",
                "inputs": [],
                "outputs": [
                    {
                        "name": "dexclient",
                        "type": "address"
                    },
                    {
                        "name": "dexclientUINT256",
                        "type": "uint256"
                    }
                ]
            },
            {
                "name": "makeABdepositToPair",
                "inputs": [
                    {
                        "name": "pairAddr",
                        "type": "address"
                    },
                    {
                        "name": "qtyA",
                        "type": "uint128"
                    },
                    {
                        "name": "qtyB",
                        "type": "uint128"
                    }
                ],
                "outputs": [
                    {
                        "name": "makeDepositStatus",
                        "type": "bool"
                    }
                ]
            },
            {
                "name": "makeAdepositToPair",
                "inputs": [
                    {
                        "name": "pairAddr",
                        "type": "address"
                    },
                    {
                        "name": "qtyA",
                        "type": "uint128"
                    }
                ],
                "outputs": [
                    {
                        "name": "makeDepositStatus",
                        "type": "bool"
                    }
                ]
            },
            {
                "name": "makeBdepositToPair",
                "inputs": [
                    {
                        "name": "pairAddr",
                        "type": "address"
                    },
                    {
                        "name": "qtyB",
                        "type": "uint128"
                    }
                ],
                "outputs": [
                    {
                        "name": "makeDepositStatus",
                        "type": "bool"
                    }
                ]
            },
            {
                "name": "returnDepositFromPair",
                "inputs": [
                    {
                        "name": "pairAddr",
                        "type": "address"
                    }
                ],
                "outputs": [
                    {
                        "name": "returnDepositStatus",
                        "type": "bool"
                    }
                ]
            },
            {
                "name": "processLiquidity",
                "inputs": [
                    {
                        "name": "pairAddr",
                        "type": "address"
                    },
                    {
                        "name": "qtyA",
                        "type": "uint128"
                    },
                    {
                        "name": "qtyB",
                        "type": "uint128"
                    }
                ],
                "outputs": [
                    {
                        "name": "processLiquidityStatus",
                        "type": "bool"
                    }
                ]
            },
            {
                "name": "returnAllLiquidity",
                "inputs": [
                    {
                        "name": "pairAddr",
                        "type": "address"
                    }
                ],
                "outputs": [
                    {
                        "name": "returnLiquidityStatus",
                        "type": "bool"
                    }
                ]
            },
            {
                "name": "processSwapA",
                "inputs": [
                    {
                        "name": "pairAddr",
                        "type": "address"
                    },
                    {
                        "name": "qtyA",
                        "type": "uint128"
                    }
                ],
                "outputs": [
                    {
                        "name": "processSwapStatus",
                        "type": "bool"
                    }
                ]
            },
            {
                "name": "processSwapB",
                "inputs": [
                    {
                        "name": "pairAddr",
                        "type": "address"
                    },
                    {
                        "name": "qtyB",
                        "type": "uint128"
                    }
                ],
                "outputs": [
                    {
                        "name": "processSwapStatus",
                        "type": "bool"
                    }
                ]
            },
            {
                "name": "getBalanceTONgrams",
                "inputs": [],
                "outputs": [
                    {
                        "name": "balanceTONgrams",
                        "type": "uint128"
                    }
                ]
            },
            {
                "name": "setWrapper",
                "id": "0x89",
                "inputs": [
                    {
                        "name": "arg0",
                        "type": "address"
                    },
                    {
                        "name": "arg1",
                        "type": "address"
                    }
                ],
                "outputs": []
            },
            {
                "name": "wrapTON",
                "inputs": [
                    {
                        "name": "qtyTONgrams",
                        "type": "uint128"
                    }
                ],
                "outputs": [
                    {
                        "name": "processWrapStatus",
                        "type": "bool"
                    }
                ]
            },
            {
                "name": "unwrapTON",
                "inputs": [],
                "outputs": [
                    {
                        "name": "processUnwrapStatus",
                        "type": "bool"
                    }
                ]
            },
            {
                "name": "callbackUnwrapTON",
                "id": "0x24",
                "inputs": [
                    {
                        "name": "value0",
                        "type": "uint128"
                    }
                ],
                "outputs": []
            },
            {
                "name": "wTONroot",
                "inputs": [],
                "outputs": [
                    {
                        "name": "rootDEX",
                        "type": "address"
                    }
                ]
            },
            {
                "name": "clientID",
                "inputs": [],
                "outputs": [
                    {
                        "name": "clientID",
                        "type": "uint256"
                    }
                ]
            },
            {
                "name": "wTONroot",
                "inputs": [],
                "outputs": [
                    {
                        "name": "wTONroot",
                        "type": "address"
                    }
                ]
            },
            {
                "name": "wTONwrapper",
                "inputs": [],
                "outputs": [
                    {
                        "name": "wTONwrapper",
                        "type": "address"
                    }
                ]
            },
            {
                "name": "test1",
                "inputs": [],
                "outputs": [
                    {
                        "name": "test1",
                        "type": "uint128"
                    }
                ]
            },
            {
                "name": "test2",
                "inputs": [],
                "outputs": [
                    {
                        "name": "test2",
                        "type": "uint128"
                    }
                ]
            },
            {
                "name": "test3",
                "inputs": [],
                "outputs": [
                    {
                        "name": "test3",
                        "type": "uint128"
                    }
                ]
            }
        ],
        "data": [
            {
                "key": 1,
                "name": "rootDEX",
                "type": "address"
            },
            {
                "key": 2,
                "name": "clientID",
                "type": "uint256"
            },
            {
                "key": 3,
                "name": "wTONroot",
                "type": "address"
            },
            {
                "key": 4,
                "name": "wTONwrapper",
                "type": "address"
            }
        ],
        "events": []
    },
    tvc: "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",
};
module.exports = { DEXclientContract };
