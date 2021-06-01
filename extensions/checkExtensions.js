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
    if (window.freeton === undefined) {
        console.log("no extraton extension")
        return false
    }
    return true

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
            current: true,
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
    if (curExtension[0].name === "extraton") {
        curExtension[0]._extLib = await extraton()
    } else {
        curExtension[0]._extLib = await broxus()
    }

    if (curExtension.length > 1) {
        return curExtension[0]
    }
    console.log(curExtension[0])
    return curExtension[0]
}


async function extraton() {

    const provider = getProvider();
    const signer = await provider.getSigner();

    let curExtenson = {};
    console.log("provider", provider, "signer", signer)
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
    console.log("i am at broxus1")
    await ton.ensureInitialized();
    console.log("i am at broxus2")
    const {accountInteraction} = await ton.api.requestPermissions({
        permissions: ['tonClient', 'accountInteraction']
    });
    console.log("i am at broxus3")
    if (accountInteraction == null) {
        return new Error('Insufficient permissions');
    }
    console.log("i am at broxus4")
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
        return await contract.methods[methodName](params).sendExternal({publicKey: accountInteraction.publicKey})
    };
    curExtenson.internal = async (methodName, params, contract) => {
        console.log("contract",contract)
        return await contract.methods[methodName](params).send({
            from: new Address("0:024d40e511ca53446dd80e48762325955b11f16f22ad15013a8cbf009515ef77"),
            amount: "1000000000",
            bounce: false
        })
    };
    return curExtenson
}


// export async function test() {
//     if (!(await hasTonProvider())) {
//         return;
//     }
//     await ton.ensureInitialized();
//
//     const { accountInteraction } = await ton.api.requestPermissions({
//         permissions: ['tonClient', 'accountInteraction']
//     });
//     if (accountInteraction == null) {
//         throw new Error('Insufficient permissions');
//     }
//
//     const myContract = new Contract(DEXrootContract.abi, new AddressLiteral('0:2b31415e2b6cf0b4f9e6defe887cf84357ccc4cdd909d0ae04d8968603b754d0'));
// console.log("myContract",myContract)
//
//         await myContract.methods.checkPubKey({
//             pubkey: "0x" + accountInteraction.publicKey
//     }).call({
//         cachedState: undefined // can be used to reduce network requests
//     }).then(res=>console.log("res",res));
// }




