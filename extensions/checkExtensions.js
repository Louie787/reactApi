import freeton from "freeton";
import "core-js/stable";
import "regenerator-runtime/runtime";
import ton, {Address, AddressLiteral, Contract, hasTonProvider} from 'ton-inpage-provider';
// import React from 'react';
// import ReactDOM from 'react-dom';
// import { useState, useEffect } from 'react';

const {DEXrootContract} = require('./../DEXroot');
const {DEXclientContract} = require('./../DEXclient');

function checkExtensionAvailability() {
    return window.freeton !== undefined;
}

export async function checkExtensions() {
    return [
        {
            current: true,
            name: "extraton",
            available: await checkExtensionAvailability(),
            link: "https://chrome.google.com/webstore/detail/extraton/hhimbkmlnofjdajamcojlcmgialocllm",
            logo: "./extratonIcon.png",
        },
        {
            current: false,
            name: "broxus",
            available: await hasTonProvider(),
            link: "https://chrome.google.com/webstore/detail/ton-crystal-wallet/cgeeodpfagjceefieflmdfphplkenlfk",
            logo: "./broxusIcon.png",
        }
    ]
}

export async function getCurrentExtension(extensionsArry) {
    let curExtension = extensionsArry.filter(item => {
            return item.current === true
        }
    );
    // if(curExtension.length === 0){
    //     console.log("0000000>>>>>>no extension",curExtension)
    //     extensionsArry[0]._extLib = await extraton()
    //     extensionsArry[0].name = "testing extraton"
    //     return extensionsArry[0]
    // }
    if (curExtension[0].name === "extraton") {
        curExtension[0]._extLib = await extraton()
    } else {
        curExtension[0]._extLib = await broxus()
    }

    if (curExtension.length > 1) {
        return curExtension[0]
    }
    console.log("no provided extension")
    return curExtension[0]
}


async function extraton() {

    const provider = getProvider();
    const signer = await provider.getSigner();

    let curExtenson = {};
    curExtenson.name = "extraton";
    curExtenson.address = signer.wallet.address;
    curExtenson.pubkey = await signer.getPublicKey();
    curExtenson.contract = (contractAbi, contractAddress) => {
        return new freeton.Contract(signer, contractAbi, contractAddress)
    };
    curExtenson.runMethod = async (methodName, params, contract) => {
        return await contract.methods[methodName].run(params)
    };
    curExtenson.callMethod = async (methodName, params, contract) => {
        return await contract.methods[methodName].call(params)
    };

    return curExtenson
}

function getProvider() {
    return new freeton.providers.ExtensionProvider(window.freeton);
}



async function broxus() {

    await ton.ensureInitialized();
    const {accountInteraction} = await ton.api.requestPermissions({
        permissions: ['tonClient', 'accountInteraction']
    });
    if (accountInteraction == null) {
        return new Error('Insufficient permissions');
    }
    let curExtenson = {};

    curExtenson.name = "broxus";
    curExtenson.address = accountInteraction.address;
    curExtenson.pubkey = accountInteraction.publicKey;
    curExtenson.contract = (contractAbi, contractAddress) => {
        return new Contract(contractAbi, new AddressLiteral(contractAddress))
    };
    curExtenson.runMethod = async (methodName, params, contract) => {
        return await contract.methods[methodName](params).call({cachedState: undefined})
    };
    curExtenson.callMethod = async (methodName, params, contract) => {
        return await contract.methods[methodName](params).sendExternal({publicKey: accountInteraction.publicKey}).catch(e=>console.log(e))
    };
    curExtenson.internal = async (methodName, params, contract) => {
        return await contract.methods[methodName](params).send({
            from: new Address(curExtenson.address),
            amount: "10000000000",
            bounce: false
        })
    };
    return curExtenson
}


