const DEXrootContract = {
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
                "name": "setDEXclientCode",
                "inputs": [
                    {
                        "name": "code",
                        "type": "cell"
                    }
                ],
                "outputs": []
            },
            {
                "name": "setDEXpairCode",
                "inputs": [
                    {
                        "name": "code",
                        "type": "cell"
                    }
                ],
                "outputs": []
            },
            {
                "name": "setDEXconnectorCode",
                "inputs": [
                    {
                        "name": "code",
                        "type": "cell"
                    }
                ],
                "outputs": []
            },
            {
                "name": "setRootTokenCode",
                "inputs": [
                    {
                        "name": "code",
                        "type": "cell"
                    }
                ],
                "outputs": []
            },
            {
                "name": "setTONTokenWalletCode",
                "inputs": [
                    {
                        "name": "code",
                        "type": "cell"
                    }
                ],
                "outputs": []
            },
            {
                "name": "setGiverCode",
                "inputs": [
                    {
                        "name": "code",
                        "type": "cell"
                    }
                ],
                "outputs": []
            },
            {
                "name": "getClientAddress",
                "inputs": [
                    {
                        "name": "_answer_id",
                        "type": "uint32"
                    },
                    {
                        "name": "clientPubKey",
                        "type": "uint256"
                    },
                    {
                        "name": "clientSoArg",
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
                "name": "getGiverAddress",
                "inputs": [
                    {
                        "name": "_answer_id",
                        "type": "uint32"
                    },
                    {
                        "name": "giverPubKey",
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
                "name": "createDEXclient",
                "inputs": [
                    {
                        "name": "pubkey",
                        "type": "uint256"
                    },
                    {
                        "name": "souint",
                        "type": "uint256"
                    }
                ],
                "outputs": [
                    {
                        "name": "deployedAddress",
                        "type": "address"
                    },
                    {
                        "name": "statusCreate",
                        "type": "bool"
                    }
                ]
            },
            {
                "name": "getPairAddress",
                "inputs": [
                    {
                        "name": "_answer_id",
                        "type": "uint32"
                    },
                    {
                        "name": "pairPubKey",
                        "type": "uint256"
                    },
                    {
                        "name": "pairSoArg",
                        "type": "uint256"
                    },
                    {
                        "name": "pairCreator",
                        "type": "address"
                    },
                    {
                        "name": "pairRootA",
                        "type": "address"
                    },
                    {
                        "name": "pairRootB",
                        "type": "address"
                    },
                    {
                        "name": "pairRootAB",
                        "type": "address"
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
                "name": "getRootTokenAddress",
                "inputs": [
                    {
                        "name": "_answer_id",
                        "type": "uint32"
                    },
                    {
                        "name": "rootPubKey",
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
                "name": "getConnectorAddress",
                "inputs": [
                    {
                        "name": "_answer_id",
                        "type": "uint32"
                    },
                    {
                        "name": "connectorPubKey",
                        "type": "uint256"
                    },
                    {
                        "name": "connectorSoArg",
                        "type": "uint256"
                    },
                    {
                        "name": "connectorCommander",
                        "type": "address"
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
                "name": "createDEXpair",
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
                    }
                ],
                "outputs": []
            },
            {
                "name": "getPairByRoots01",
                "inputs": [
                    {
                        "name": "root0",
                        "type": "address"
                    },
                    {
                        "name": "root1",
                        "type": "address"
                    }
                ],
                "outputs": [
                    {
                        "name": "pairAddr",
                        "type": "address"
                    }
                ]
            },
            {
                "name": "getPairByRoots10",
                "inputs": [
                    {
                        "name": "root1",
                        "type": "address"
                    },
                    {
                        "name": "root0",
                        "type": "address"
                    }
                ],
                "outputs": [
                    {
                        "name": "pairAddr",
                        "type": "address"
                    }
                ]
            },
            {
                "name": "getRootsByPair",
                "inputs": [
                    {
                        "name": "pairAddr",
                        "type": "address"
                    }
                ],
                "outputs": [
                    {
                        "name": "root0",
                        "type": "address"
                    },
                    {
                        "name": "root1",
                        "type": "address"
                    }
                ]
            },
            {
                "name": "checkPubKey",
                "inputs": [
                    {
                        "name": "pubkey",
                        "type": "uint256"
                    }
                ],
                "outputs": [
                    {
                        "name": "status",
                        "type": "bool"
                    },
                    {
                        "name": "dexclient",
                        "type": "address"
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
                "name": "codeDEXclient",
                "inputs": [],
                "outputs": [
                    {
                        "name": "codeDEXclient",
                        "type": "cell"
                    }
                ]
            },
            {
                "name": "codeDEXpair",
                "inputs": [],
                "outputs": [
                    {
                        "name": "codeDEXpair",
                        "type": "cell"
                    }
                ]
            },
            {
                "name": "codeDEXconnector",
                "inputs": [],
                "outputs": [
                    {
                        "name": "codeDEXconnector",
                        "type": "cell"
                    }
                ]
            },
            {
                "name": "codeRootToken",
                "inputs": [],
                "outputs": [
                    {
                        "name": "codeRootToken",
                        "type": "cell"
                    }
                ]
            },
            {
                "name": "codeTONTokenWallet",
                "inputs": [],
                "outputs": [
                    {
                        "name": "codeTONTokenWallet",
                        "type": "cell"
                    }
                ]
            },
            {
                "name": "codeGiver",
                "inputs": [],
                "outputs": [
                    {
                        "name": "codeGiver",
                        "type": "cell"
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
                                "name": "root0",
                                "type": "address"
                            },
                            {
                                "name": "root1",
                                "type": "address"
                            },
                            {
                                "name": "rootLP",
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
            },
            {
                "name": "pubkeys",
                "inputs": [],
                "outputs": [
                    {
                        "name": "pubkeys",
                        "type": "map(uint256,address)"
                    }
                ]
            },
            {
                "name": "clients",
                "inputs": [],
                "outputs": [
                    {
                        "name": "clients",
                        "type": "map(address,uint256)"
                    }
                ]
            },
            {
                "name": "clientKeys",
                "inputs": [],
                "outputs": [
                    {
                        "name": "clientKeys",
                        "type": "address[]"
                    }
                ]
            },
            {
                "name": "balanceOf",
                "inputs": [],
                "outputs": [
                    {
                        "name": "balanceOf",
                        "type": "map(address,uint128)"
                    }
                ]
            }
        ],
        "data": [
            {
                "key": 1,
                "name": "soUINT",
                "type": "uint256"
            }
        ],
        "events": []
    },
    tvc: "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",
};
module.exports = { DEXrootContract };
