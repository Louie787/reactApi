const DEXPairContract = {
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
                "inputs": [
                    {
                        "name": "souintA",
                        "type": "uint256"
                    },
                    {
                        "name": "souintB",
                        "type": "uint256"
                    },
                    {
                        "name": "gramsDeployConnector",
                        "type": "uint128"
                    },
                    {
                        "name": "gramsDeployWallet",
                        "type": "uint128"
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
                "name": "connect",
                "inputs": [],
                "outputs": []
            },
            {
                "name": "getQuotient",
                "inputs": [
                    {
                        "name": "min",
                        "type": "uint128"
                    },
                    {
                        "name": "max",
                        "type": "uint128"
                    }
                ],
                "outputs": [
                    {
                        "name": "value0",
                        "type": "uint128"
                    }
                ]
            },
            {
                "name": "getRemainder",
                "inputs": [
                    {
                        "name": "min",
                        "type": "uint128"
                    },
                    {
                        "name": "max",
                        "type": "uint128"
                    }
                ],
                "outputs": [
                    {
                        "name": "value0",
                        "type": "uint128"
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
                "name": "burnCallback",
                "inputs": [
                    {
                        "name": "tokens",
                        "type": "uint128"
                    },
                    {
                        "name": "payload",
                        "type": "cell"
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
                        "name": "wallet_address",
                        "type": "address"
                    },
                    {
                        "name": "send_gas_to",
                        "type": "address"
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
                "name": "creator",
                "inputs": [],
                "outputs": [
                    {
                        "name": "creator",
                        "type": "address"
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
                "name": "rootA",
                "inputs": [],
                "outputs": [
                    {
                        "name": "rootA",
                        "type": "address"
                    }
                ]
            },
            {
                "name": "rootB",
                "inputs": [],
                "outputs": [
                    {
                        "name": "rootB",
                        "type": "address"
                    }
                ]
            },
            {
                "name": "rootAB",
                "inputs": [],
                "outputs": [
                    {
                        "name": "rootAB",
                        "type": "address"
                    }
                ]
            },
            {
                "name": "walletReserve",
                "inputs": [],
                "outputs": [
                    {
                        "name": "walletReserve",
                        "type": "map(address,address)"
                    }
                ]
            },
            {
                "name": "syncStatus",
                "inputs": [],
                "outputs": [
                    {
                        "name": "syncStatus",
                        "type": "map(address,bool)"
                    }
                ]
            },
            {
                "name": "balanceReserve",
                "inputs": [],
                "outputs": [
                    {
                        "name": "balanceReserve",
                        "type": "map(address,uint128)"
                    }
                ]
            },
            {
                "name": "totalSupply",
                "inputs": [],
                "outputs": [
                    {
                        "name": "totalSupply",
                        "type": "uint128"
                    }
                ]
            },
            {
                "name": "processingStatus",
                "inputs": [],
                "outputs": [
                    {
                        "name": "processingStatus",
                        "type": "map(address,map(address,bool))"
                    }
                ]
            },
            {
                "name": "processingData",
                "inputs": [],
                "outputs": [
                    {
                        "name": "processingData",
                        "type": "map(address,map(address,uint128))"
                    }
                ]
            },
            {
                "name": "processingDest",
                "inputs": [],
                "outputs": [
                    {
                        "name": "processingDest",
                        "type": "map(address,map(address,address))"
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
                "name": "connectors",
                "inputs": [],
                "outputs": [
                    {
                        "components": [
                            {
                                "name": "root_address",
                                "type": "address"
                            },
                            {
                                "name": "souint",
                                "type": "uint256"
                            },
                            {
                                "name": "status",
                                "type": "bool"
                            }
                        ],
                        "name": "connectors",
                        "type": "map(address,tuple)"
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
                "name": "creator",
                "type": "address"
            },
            {
                "key": 4,
                "name": "codeDEXConnector",
                "type": "cell"
            },
            {
                "key": 5,
                "name": "rootA",
                "type": "address"
            },
            {
                "key": 6,
                "name": "rootB",
                "type": "address"
            },
            {
                "key": 7,
                "name": "rootAB",
                "type": "address"
            }
        ],
        "events": []
    },
    tvc: "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",
};
module.exports = { DEXPairContract };