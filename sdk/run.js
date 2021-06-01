import {signerKeys, TonClient} from "@tonclient/core";
import {libWeb} from "@tonclient/lib-web";
import {Account} from "@tonclient/appkit";
import {checkExtensions, getCurrentExtension} from "../extensions/checkExtensions";
import {DexrootData} from "../contracts/DEXrootContract.js";

TonClient.useBinaryLibrary(libWeb);

import {DEXrootContract} from "../contracts/DEXRoot.js";
import {DEXclientContract} from "../contracts/DEXClient.js";
import {TONTokenWalletContract} from "../contracts/TONTokenWallet.js";
const Radiance = require('../Radiance.json');

/*
    deploy new client
*/

function UserException(message) {
    this.message = message;
    this.name = "UserExeption";
}

function getShard(string) {
    return string[2];
}
let clientAddress = ""
export async function onSharding() {

    let curExt = {};
    await checkExtensions().then(async res => curExt = await getCurrentExtension(res))
    const {name, address, pubkey, contract, runMethod, callMethod} = curExt._extLib
    try {
        // const clientKeys = signerKeys(await TonClient.default.crypto.generate_random_sign_keys());
        //
        // console.log("clientKeys.keys.public:", clientKeys.keys.public);
        // let pubkeyH = '0x'+clientKeys.keys.public;

        const rootContract = await contract(DEXrootContract.abi, Radiance.networks['2'].dexroot);
        let targetShard = getShard(Radiance.networks['2'].dexroot);
        console.log("pubkeypubkey",pubkey)
        let status = false;
        let n = 0;
        while (!status) {
            let response = await runMethod("getClientAddress", {_answer_id:0,clientPubKey:'0x'+pubkey,clientSoArg:n}, rootContract)
            console.log("response",response)
            let clientAddr;
            if(name==="broxus"){
                clientAddr = response.value0._address;
            }else{
                clientAddr = response.value0;
            }


            let shard = getShard(clientAddr);
            console.log(shard,targetShard)
            if (shard === targetShard) {
                status = true;
                clientAddress = clientAddr;
                console.log({address: clientAddr, keys: pubkey, clientSoArg: n})
                await createDEXclient({address: clientAddr, keys: '0x'+pubkey, clientSoArg: n}).catch(e=>console.log(e))
                // return {address: clientAddr, keys: pubkey, clientSoArg: n}
            } else {console.log(n);}
            n++;
        }
    } catch (e) {
        console.log("catch E", e);
        return e
    }
}

// 0:3e0b005781c00c4ace572ea9b06ff094ac3f0d1572d40f10b973492f48fd1b0f
export async function setCreator() {
    let curExt = {};
    await checkExtensions().then(async res => curExt = await getCurrentExtension(res))
    const {name, address, pubkey, contract, runMethod, callMethod, internal} = curExt._extLib

    // const shardData = onSharding()
    // console.log("shardData", shardData)
    try {
        let resp = {};
console.log("setCreator",address)
        const rootContract = await contract(DEXrootContract.abi, Radiance.networks['2'].dexroot);
        let deployresp = await callMethod("setCreator", {giverAddr: address}, rootContract).then(res => {
            resp = res;
            console.log("res",res)
        }).catch(e=>console.log(e));
        console.log("deployresp",deployresp)
        return resp
    } catch (e) {
        console.log("catch E", e);
        return e
    }
}


export async function createDEXclient(shardData) {
    let curExt = {};
    await checkExtensions().then(async res => curExt = await getCurrentExtension(res))
    const {name, address, pubkey, contract, runMethod, callMethod, internal} = curExt._extLib

    // const shardData = onSharding()
    // console.log("shardData", shardData)
    try {
        // let resp = {};
        const rootContract = await contract(DEXrootContract.abi, Radiance.networks['2'].dexroot);
        // console.log("shardData.keys",shardData.keys, "shardData.clientSoArg",shardData.clientSoArg, "rootContract",rootContract)
        let deployresp = await callMethod("createDEXclient", {pubkey: shardData.keys,souint:shardData.clientSoArg}, rootContract).catch(e=>console.log(e))
        //     .then(res => {
        //     resp = res;
        //
        // }).catch(e=>console.log(e));

    console.log("deployresp",deployresp)
        // return resp
    } catch (e) {
        console.log("catch E", e);
        return e
    }
}

export async function checkPubKey() {
    //put curExt to global store
    let curExt = {};
    await checkExtensions().then(async res => curExt = await getCurrentExtension(res))
    const {name, address, pubkey, contract, runMethod, callMethod} = curExt._extLib
    try {
        const rootContract = await contract(DEXrootContract.abi, Radiance.networks['2'].dexroot);
        let checkPubKey = await runMethod("checkPubKey", {pubkey:"0x"+pubkey}, rootContract)
        return checkPubKey
    } catch (e) {
        console.log("catch E", e);
        return e
    }
}

export async function getGiverAddress() {
    //put curExt to global store
    let curExt = {};
    await checkExtensions().then(async res => curExt = await getCurrentExtension(res))
    const {name, address, pubkey, contract, runMethod, callMethod} = curExt._extLib
    try {
        let resp = {};
        const rootContract = await contract(DEXrootContract.abi, Radiance.networks['2'].dexroot);
        console.log("pubkey",pubkey,"address",address)
        let getGiverAddress = await runMethod("getGiverAddress", {_answer_id:0,giverPubKey:"0x"+pubkey}, rootContract)

        console.log( "getGiverAddress",getGiverAddress)
        return getGiverAddress
        // console.log("getBalanceTONgrams",getBalanceTONgrams)

    } catch (e) {
        console.log("catch E", e);
        return e
    }
}


export async function getRootData() {
    //put curExt to global store
    let curExt = {};
    await checkExtensions().then(async res => curExt = await getCurrentExtension(res))
    const {name, address, pubkey, contract, runMethod, callMethod} = curExt._extLib
    try {
        let resp = {};
        const rootContract = await contract(DEXrootContract.abi, Radiance.networks['2'].dexroot);

        let creators = await runMethod("creators", {}, rootContract)
        let getBalanceTONgrams = await runMethod("getBalanceTONgrams", {}, rootContract)
        let balanceOf = await runMethod("balanceOf", {}, rootContract)
        let pubkeys = await runMethod("pubkeys", {}, rootContract)
        let pairs = await runMethod("pairs", {}, rootContract)
        let pairKeys = await runMethod("pairKeys", {}, rootContract)
        let clients = await runMethod("clients", {}, rootContract)
        let clientKeys = await runMethod("clientKeys", {}, rootContract)
console.log( {...creators,...getBalanceTONgrams,...balanceOf,...pubkeys,...pairs,...pairKeys,...clients,...clientKeys})
        return {...creators,...getBalanceTONgrams,...balanceOf,...pubkeys,...pairs,...pairKeys,...clients,...clientKeys}
        // console.log("getBalanceTONgrams",getBalanceTONgrams)

    } catch (e) {
        console.log("catch E", e);
        return e
    }
}
export async function getClientData() {
    let curExt = {};
    await checkExtensions().then(async res => curExt = await getCurrentExtension(res))
    const {name, address, pubkey, contract, runMethod, callMethod} = curExt._extLib
    let getClientAddressFromRoot = await checkPubKey()
    if(getClientAddressFromRoot.status === false){
        return getClientAddressFromRoot
    }
    try {
        const clientContract = await contract(DEXclientContract.abi, getClientAddressFromRoot.dexclient);
        let soUINT = await runMethod("soUINT", {}, clientContract)
        let rootConnector = await runMethod("rootConnector", {}, clientContract)
        let rootDEX = await runMethod("rootDEX", {}, clientContract)
        let pairs = await runMethod("pairs", {}, clientContract)
        let rootWallet = await runMethod("rootWallet", {}, clientContract)
        let getAllDataPreparation = await runMethod("getAllDataPreparation", {}, clientContract)
        let counterCallback = await runMethod("counterCallback", {}, clientContract)

        console.log( {...soUINT,...rootConnector,...rootDEX,...pairs,...rootWallet,...getAllDataPreparation,...counterCallback})
        return {...soUINT,...rootConnector,...rootDEX,...pairs,...rootWallet,...getAllDataPreparation,...counterCallback}
    } catch (e) {
        console.log("catch E", e);
        return e
   }
}

let pairDa = {
    pairAddress: "0:3e96b50974d234e41c8b9ed34e31d582a4c09f5de2e150e292698e837fdc8f5a",
    walletA: "0:3f4e1ba21792fb570eba3d24f46faa585abc921bfa09b53c0c373e0d44e66aa3",
    walletB: "0:30423414c343e45f854dba29b5b70510df9db82163c499641adfb2e32d63dc4a"
}

export async function getPairReserves() {
    let curExt = {};
    await checkExtensions().then(async res => curExt = await getCurrentExtension(res))
    const {name, address, pubkey, contract, runMethod, callMethod} = curExt._extLib
    console.log("address",address)
    try {
        const walletA = await contract(TONTokenWalletContract.abi, "0:3f4e1ba21792fb570eba3d24f46faa585abc921bfa09b53c0c373e0d44e66aa3");
        const walletB = await contract(TONTokenWalletContract.abi, "0:30423414c343e45f854dba29b5b70510df9db82163c499641adfb2e32d63dc4a");

        let balanceA = await runMethod("balance", {_answer_id:0}, walletA).catch(e=>console.log(e))
        let balanceB = await runMethod("balance", {_answer_id:0}, walletB).catch(e=>console.log(e))

console.log("balanceA",balanceA,balanceB)


        return {balanceA,balanceB}
    } catch (e) {
        console.log("catch E", e);
        return e
    }
}

export async function getWalletData() {
    let curExt = {};
    await checkExtensions().then(async res => curExt = await getCurrentExtension(res))
    const {name, address, pubkey, contract, runMethod, callMethod} = curExt._extLib
    console.log("address",address)
    try {
        const walletA = await contract(TONTokenWalletContract.abi, "0:3f4e1ba21792fb570eba3d24f46faa585abc921bfa09b53c0c373e0d44e66aa3");
        const walletB = await contract(TONTokenWalletContract.abi, "0:30423414c343e45f854dba29b5b70510df9db82163c499641adfb2e32d63dc4a");

        let detailsA = await runMethod("getDetails", {_answer_id:0}, walletA).catch(e=>console.log(e))
        let detailsB = await runMethod("getDetails", {_answer_id:0}, walletB).catch(e=>console.log(e))

        console.log({detailsA,detailsB})


        return {detailsA,detailsB}
    } catch (e) {
        console.log("catch E", e);
        return e
    }
}
/*
    pairAddr type string
 */
export async function connectToPair(pairAddr) {
    let curExt = {};
    await checkExtensions().then(async res => curExt = await getCurrentExtension(res))
    const {name, address, pubkey, contract, runMethod, callMethod, internal} = curExt._extLib
    let getClientAddressFromRoot = await checkPubKey()
    if(getClientAddressFromRoot.status === false){
        return getClientAddressFromRoot
    }
    try {
        let resp = {};
        //todo check address
        const clientContract = await contract(DEXclientContract.abi, getClientAddressFromRoot.dexclient);

        let statusOfConnection = await callMethod("connectPair", {
            pairAddr: "0:74b3396166b5b620b560c8c298846ea95010f53985d80c1fab81c847c2971886",
        }, clientContract)

        console.log("statusOfConnection",statusOfConnection)

    } catch (e) {
        console.log("catch E", e);
        return e
    }
}





export async function getPairClientWallets(pairAddr) {
    let curExt = {};
    await checkExtensions().then(async res => curExt = await getCurrentExtension(res))

    const {name, address, pubkey, contract, runMethod, callMethod} = curExt._extLib
    try {
        let resp = {};
//TODO client address should be from function checkpubkey setted to store and getted from it
        const clientContract = await contract(DEXclientContract.abi, "0:31af2637c252235547e0cdd9582311adb5d8098302800d106e72e027d8f25d0f");
        await runMethod("getPairClientWallets", {
            pairAddr: pairAddr,
        }, clientContract).then(res => {
            resp = res
        });
        return resp
    } catch (e) {
        console.log("catch E", e);
    }
}

/*
    {
        pairKeysR:address[]
        rootKeysR: address[]
     }

 */
export async function getAllDataPreparation() {
    let curExt = {};
    await checkExtensions().then(async res => curExt = await getCurrentExtension(res))

    const {name, address, pubkey, contract, runMethod, callMethod} = curExt._extLib
    try {
        let resp = {};
//TODO client address should be from function checkpubkey setted to store and getted from it
        const clientContract = await contract(DEXclientContract.abi, "0:31af2637c252235547e0cdd9582311adb5d8098302800d106e72e027d8f25d0f");
        await runMethod("getAllDataPreparation", {}, clientContract).then(res => {
            resp = res
        });
        return resp
    } catch (e) {
        console.log("catch E", e);
    }
}

/*
    {
        "dexclient": "address"
        "dexclientUINT256":"uint256"
    }
*/

export async function showContractAddress() {
    let curExt = {};
    await checkExtensions().then(async res => curExt = await getCurrentExtension(res))

    const {name, address, pubkey, contract, runMethod, callMethod} = curExt._extLib
    try {
        let resp = {};
//TODO client address should be from function checkpubkey setted to store and getted from it
        const clientContract = await contract(DEXclientContract.abi, "0:31af2637c252235547e0cdd9582311adb5d8098302800d106e72e027d8f25d0f");
        await runMethod("showContractAddress", {}, clientContract).then(res => {
            resp = res
        });
        return resp
    } catch (e) {
        console.log("catch E", e);
    }
}

export async function rootDEX() {
    let curExt = {};
    await checkExtensions().then(async res => curExt = await getCurrentExtension(res))

    const {name, address, pubkey, contract, runMethod, callMethod} = curExt._extLib
    try {
        let resp = {};
//TODO client address should be from function checkpubkey setted to store and getted from it
        const clientContract = await contract(DEXclientContract.abi, "0:31af2637c252235547e0cdd9582311adb5d8098302800d106e72e027d8f25d0f");
        await runMethod("rootDEX", {}, clientContract).then(res => {
            resp = res
        });
        return resp
    } catch (e) {
        console.log("catch E", e);
    }
}

export async function wTONwrapper() {
    let curExt = {};
    await checkExtensions().then(async res => curExt = await getCurrentExtension(res))

    const {name, address, pubkey, contract, runMethod, callMethod} = curExt._extLib
    try {
        let resp = {};
//TODO client address should be from function checkpubkey setted to store and getted from it
        const clientContract = await contract(DEXclientContract.abi, "0:31af2637c252235547e0cdd9582311adb5d8098302800d106e72e027d8f25d0f");
        await runMethod("wTONwrapper", {}, clientContract).then(res => {
            resp = res
        });
        return resp
    } catch (e) {
        console.log("catch E", e);
    }
}

/*
  pairKeys: address[]
*/
export async function pairKeys() {
    let curExt = {};
    await checkExtensions().then(async res => curExt = await getCurrentExtension(res))
    console.log("curExt", curExt)
    const {name, address, pubkey, contract, runMethod, callMethod} = curExt._extLib
    try {
        let resp = {};
//TODO client address should be from function checkpubkey setted to store and getted from it
        const rootContract = await contract(DEXrootContract.abi, Radiance.networks['2'].dexroot);
        console.log("rootContract", rootContract)
        await runMethod("pairKeys", {}, rootContract).then(res => {
            console.log("resp", res)
            resp = res
        });

        return resp
    } catch (e) {
        console.log("catch E", e);
    }
}

export async function getDexClientData() {
    let curExt = {};
    await checkExtensions().then(async res => curExt = await getCurrentExtension(res))
    // console.log("curExt", curExt)
    const {name, address, pubkey, contract, runMethod, callMethod} = curExt._extLib
    try {
        let resp = {};
        const {pairKeysR, rootKeysR} = await getAllDataPreparation();
        const pairsData = [];
        await pairKeysR.map(async item => {
            let curDat = {};
            let {walletA, walletB} = await getPairClientWallets(item);
            curDat.pairAddress = item;
            curDat.walletA = walletA;
            curDat.walletB = walletB;
            await pairsData.push(curDat)
        })

        return pairsData

        // const pairsData = [];
        // pairKeysR.map(item)
        // console.log("pairKeysR", pairKeysR, "rootKeysR",rootKeysR)
//         const rootContract = await contract(DEXrootContract.abi, Radiance.networks['2'].dexroot);
//         console.log("rootContract", rootContract)
//         await runMethod("pairKeys", {}, rootContract).then(res => {
//             console.log("resp", res)
//             resp = res
//         });
//
//         return resp
    } catch (e) {
        console.log("catch E", e);
    }
}

