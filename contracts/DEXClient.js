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
                "name": "setPair",
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
                    }
                ],
                "outputs": []
            },
            {
                "name": "getConnectorAddress",
                "inputs": [
                    {
                        "name": "_answer_id",
                        "type": "uint32"
                    },
                    {
                        "name": "connectorSoArg",
                        "type": "uint256"
                    }
                ],
                "outputs": [
                    {
                        "name": "value0",
                        "type": "address"
                    }
                ]
            },
            {
                "name": "connectRoot",
                "inputs": [
                    {
                        "name": "root",
                        "type": "address"
                    },
                    {
                        "name": "souint",
                        "type": "uint256"
                    },
                    {
                        "name": "gramsToConnector",
                        "type": "uint128"
                    },
                    {
                        "name": "gramsToRoot",
                        "type": "uint128"
                    }
                ],
                "outputs": [
                    {
                        "name": "statusConnected",
                        "type": "bool"
                    }
                ]
            },
            {
                "name": "connectCallback",
                "inputs": [
                    {
                        "name": "wallet",
                        "type": "address"
                    }
                ],
                "outputs": []
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
                "name": "returnLiquidity",
                "inputs": [
                    {
                        "name": "pairAddr",
                        "type": "address"
                    },
                    {
                        "name": "tokens",
                        "type": "uint128"
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
                "name": "tokensReceivedCallback",
                "inputs": [
                    {
                        "name": "token_wallet",
                        "type": "address"
                    },
                    {
                        "name": "token_root",
                        "type": "address"
                    },
                    {
                        "name": "amount",
                        "type": "uint128"
                    },
                    {
                        "name": "sender_public_key",
                        "type": "uint256"
                    },
                    {
                        "name": "sender_address",
                        "type": "address"
                    },
                    {
                        "name": "sender_wallet",
                        "type": "address"
                    },
                    {
                        "name": "original_gas_to",
                        "type": "address"
                    },
                    {
                        "name": "updated_balance",
                        "type": "uint128"
                    },
                    {
                        "name": "payload",
                        "type": "cell"
                    }
                ],
                "outputs": []
            },
            {
                "name": "getCallback",
                "inputs": [
                    {
                        "name": "id",
                        "type": "uint256"
                    }
                ],
                "outputs": [
                    {
                        "name": "token_wallet",
                        "type": "address"
                    },
                    {
                        "name": "token_root",
                        "type": "address"
                    },
                    {
                        "name": "amount",
                        "type": "uint128"
                    },
                    {
                        "name": "sender_public_key",
                        "type": "uint256"
                    },
                    {
                        "name": "sender_address",
                        "type": "address"
                    },
                    {
                        "name": "sender_wallet",
                        "type": "address"
                    },
                    {
                        "name": "original_gas_to",
                        "type": "address"
                    },
                    {
                        "name": "updated_balance",
                        "type": "uint128"
                    },
                    {
                        "name": "payload_arg0",
                        "type": "uint8"
                    },
                    {
                        "name": "payload_arg1",
                        "type": "address"
                    },
                    {
                        "name": "payload_arg2",
                        "type": "address"
                    }
                ]
            },
            {
                "name": "getBalance",
                "inputs": [],
                "outputs": [
                    {
                        "name": "balance",
                        "type": "uint128"
                    }
                ]
            },
            {
                "name": "createNewPair",
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
                        "name": "pairSoArg",
                        "type": "uint256"
                    },
                    {
                        "name": "connectorSoArg0",
                        "type": "uint256"
                    },
                    {
                        "name": "connectorSoArg1",
                        "type": "uint256"
                    },
                    {
                        "name": "rootSoArg",
                        "type": "uint256"
                    },
                    {
                        "name": "rootName",
                        "type": "bytes"
                    },
                    {
                        "name": "rootSymbol",
                        "type": "bytes"
                    },
                    {
                        "name": "rootDecimals",
                        "type": "uint8"
                    },
                    {
                        "name": "grammsForPair",
                        "type": "uint128"
                    },
                    {
                        "name": "grammsForRoot",
                        "type": "uint128"
                    },
                    {
                        "name": "grammsForConnector",
                        "type": "uint128"
                    },
                    {
                        "name": "grammsForWallet",
                        "type": "uint128"
                    },
                    {
                        "name": "grammsTotal",
                        "type": "uint128"
                    }
                ],
                "outputs": []
            },
            {
                "name": "rootDEX",
                "inputs": [],
                "outputs": [
                    {
                        "name": "rootDEX",
                        "type": "address"
                    }
                ]
            },
            {
                "name": "soUINT",
                "inputs": [],
                "outputs": [
                    {
                        "name": "soUINT",
                        "type": "uint256"
                    }
                ]
            },
            {
                "name": "codeDEXConnector",
                "inputs": [],
                "outputs": [
                    {
                        "name": "codeDEXConnector",
                        "type": "cell"
                    }
                ]
            },
            {
                "name": "rootKeys",
                "inputs": [],
                "outputs": [
                    {
                        "name": "rootKeys",
                        "type": "address[]"
                    }
                ]
            },
            {
                "name": "rootWallet",
                "inputs": [],
                "outputs": [
                    {
                        "name": "rootWallet",
                        "type": "map(address,address)"
                    }
                ]
            },
            {
                "name": "rootConnector",
                "inputs": [],
                "outputs": [
                    {
                        "name": "rootConnector",
                        "type": "map(address,address)"
                    }
                ]
            },
            {
                "name": "counterCallback",
                "inputs": [],
                "outputs": [
                    {
                        "name": "counterCallback",
                        "type": "uint256"
                    }
                ]
            },
            {
                "name": "pairs",
                "inputs": [],
                "outputs": [
                    {
                        "components": [
                            {
                                "name": "status",
                                "type": "bool"
                            },
                            {
                                "name": "rootA",
                                "type": "address"
                            },
                            {
                                "name": "walletA",
                                "type": "address"
                            },
                            {
                                "name": "rootB",
                                "type": "address"
                            },
                            {
                                "name": "walletB",
                                "type": "address"
                            },
                            {
                                "name": "rootAB",
                                "type": "address"
                            }
                        ],
                        "name": "pairs",
                        "type": "map(address,tuple)"
                    }
                ]
            },
            {
                "name": "pairKeys",
                "inputs": [],
                "outputs": [
                    {
                        "name": "pairKeys",
                        "type": "address[]"
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
                "name": "soUINT",
                "type": "uint256"
            },
            {
                "key": 3,
                "name": "codeDEXConnector",
                "type": "cell"
            }
        ],
        "events": []
    },
    tvc: "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",
};
module.exports = { DEXclientContract };
