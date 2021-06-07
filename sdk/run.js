import {TonClient} from "@tonclient/core";
import {libWeb} from "@tonclient/lib-web";
import {Account} from "@tonclient/appkit";
import {checkExtensions, getCurrentExtension} from "../extensions/checkExtensions";
import {DEXrootContract} from "../contracts/DEXRoot.js";
import {DEXclientContract} from "../contracts/DEXClient.js";
import {RootTokenContract} from "../contracts/RootTokenContract.js";
import {SafeMultisigWallet} from "../msig/SafeMultisigWallet.js";
import {getRootCreators, getShardConnectPairQUERY} from "../webhook/script"

TonClient.useBinaryLibrary(libWeb);

const Radiance = require('../Radiance.json');


function UserException(message) {
    this.message = message;
    this.name = "UserExeption";
}

function hex2a(hex) {
    let str = '';
    for (let i = 0; i < hex.length; i += 2) {
        let v = parseInt(hex.substr(i, 2), 16);
        if (v) str += String.fromCharCode(v);
    }
    return str;
}

function getShard(string) {
    return string[2];
}
let clientAddress = ""

/**
 * Function to send to root client pubkey
 * @author   max_akkerman
 * @return   callback         onSharding()
 */
export async function setCreator() {
    let curExt = {};
    await checkExtensions().then(async res => curExt = await getCurrentExtension(res))
    const {name, address, pubkey, contract, runMethod, callMethod, internal} = curExt._extLib

    let checkClientExists = await checkPubKey()

    if(checkClientExists.status){
        console.log(UserException("y already have dex client"))
        return new UserException("y already have dex client")
    }else {
        try {

            console.log("setCreator", address)
            const rootContract = await contract(DEXrootContract.abi, Radiance.networks['2'].dexroot);
            let deployresp = await callMethod("setCreator", {giverAddr: address}, rootContract)
            console.log("deployresp",deployresp)
            let checkClientExists = await getRootCreators().catch(e=>console.log(e))

            console.log("checkClientExists",checkClientExists)
            let n = 0
            while (!checkClientExists.creators["0x"+pubkey]){
                checkClientExists = await getRootCreators()
                n++
                if(n>100){

                    return new UserException("yps, something goes wrong, try again")
                }
            }
            console.log("deployresp", deployresp)
            await onSharding()


            // return resp

        } catch (e) {
            console.log("catch E", e);
            return e
        }
    }
}
/**
 * Function to get shard id to deploy dex client
 * @author   max_akkerman
 * @return   callback         createDEXclient()
 */

export async function onSharding() {

    let curExt = {};
    await checkExtensions().then(async res => curExt = await getCurrentExtension(res))
    const {name, address, pubkey, contract, runMethod, callMethod} = curExt._extLib
    try {
        const rootContract = await contract(DEXrootContract.abi, Radiance.networks['2'].dexroot);
        let targetShard = getShard(Radiance.networks['2'].dexroot);
        // console.log("pubkeypubkey",pubkey)
        let status = false;
        let n = 0;
        while (!status) {
            let response = await runMethod("getClientAddress", {_answer_id:0,clientPubKey:'0x'+pubkey,clientSoArg:n}, rootContract)
            // console.log("response",response)
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
                // console.log({address: clientAddr, keys: pubkey, clientSoArg: n})
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

/**
 * Function to send to root client pubkey
 * @author   max_akkerman
 * @param   {object} shardData {address: clientAddr, keys: '0x'+pubkey, clientSoArg: n}
 * @return   {object} {deployedAddress:address,statusCreate:bool}
 */

export async function createDEXclient(shardData) {
    let curExt = {};
    await checkExtensions().then(async res => curExt = await getCurrentExtension(res))
    const {name, address, pubkey, contract, runMethod, callMethod, internal} = curExt._extLib

    try {
        const rootContract = await contract(DEXrootContract.abi, Radiance.networks['2'].dexroot);
        return await callMethod("createDEXclient", {
            pubkey: shardData.keys,
            souint: shardData.clientSoArg
        }, rootContract).catch(e => {
            let ecode = '106';
            let found = e.text.match(ecode);
            if(found){
                return new UserException("y are not registered at dex root, pls transfer some funds to dex root address")
            }else{
                return e
            }
            }
        )
    } catch (e) {
        console.log("catch E", e);
        return e
    }
}

/**
 * Function to send to check exists of dex client by pubkey
 * @author   max_akkerman
 * @param   {string} user public key
 * @return   {object} {status: true, dexclient: "0:7d0f794a34e1645ab920f5737d19435415dd07331f02eb02b7bc41727448da43"}
 */

export async function checkPubKey() {
    let curExt = {};
    await checkExtensions().then(async res => curExt = await getCurrentExtension(res))
    const {name, address, pubkey, contract, runMethod, callMethod} = curExt._extLib
    console.log("typof pub", typeof pubkey)
    try {
        const rootContract = await contract(DEXrootContract.abi, Radiance.networks['2'].dexroot);
        let checkPubKey = await runMethod("checkPubKey", {pubkey:"0x"+pubkey}, rootContract)
        console.log("checkPubKey",checkPubKey)
        return checkPubKey
    } catch (e) {
        console.log("catch E", e);
        return e
    }
}


// export async function getGiverAddress() {
//     //put curExt to global store
//     let curExt = {};
//     await checkExtensions().then(async res => curExt = await getCurrentExtension(res))
//     const {name, address, pubkey, contract, runMethod, callMethod} = curExt._extLib
//     try {
//         let resp = {};
//         const rootContract = await contract(DEXrootContract.abi, Radiance.networks['2'].dexroot);
//         console.log("pubkey",pubkey,"address",address)
//         let getGiverAddress = await runMethod("getGiverAddress", {_answer_id:0,giverPubKey:"0x"+pubkey}, rootContract)
//
//         console.log( "getGiverAddress",getGiverAddress)
//         return getGiverAddress
//
//     } catch (e) {
//         console.log("catch E", e);
//         return e
//     }
// }


// export async function getRootData() {
//     //put curExt to global store
//     let curExt = {};
//     await checkExtensions().then(async res => curExt = await getCurrentExtension(res))
//     const {name, address, pubkey, contract, runMethod, callMethod} = curExt._extLib
//     try {
//         let resp = {};
//         const rootContract = await contract(DEXrootContract.abi, Radiance.networks['2'].dexroot);
//
//         let creators = await runMethod("creators", {}, rootContract)
//         let getBalanceTONgrams = await runMethod("getBalanceTONgrams", {}, rootContract)
//         let balanceOf = await runMethod("balanceOf", {}, rootContract)
//         let pubkeys = await runMethod("pubkeys", {}, rootContract)
//         let pairs = await runMethod("pairs", {}, rootContract)
//         let pairKeys = await runMethod("pairKeys", {}, rootContract)
//         let clients = await runMethod("clients", {}, rootContract)
//         let clientKeys = await runMethod("clientKeys", {}, rootContract)
// console.log( {...creators,...getBalanceTONgrams,...balanceOf,...pubkeys,...pairs,...pairKeys,...clients,...clientKeys})
//         return {...creators,...getBalanceTONgrams,...balanceOf,...pubkeys,...pairs,...pairKeys,...clients,...clientKeys}
//         // console.log("getBalanceTONgrams",getBalanceTONgrams)
//
//     } catch (e) {
//         console.log("catch E", e);
//         return e
//     }
// }

// export async function getAllPairs() {
//     //put curExt to global store
//     let curExt = {};
//     await checkExtensions().then(async res => curExt = await getCurrentExtension(res))
//     const {name, address, pubkey, contract, runMethod, callMethod} = curExt._extLib
//     try {
//         const rootContract = await contract(DEXrootContract.abi, Radiance.networks['2'].dexroot);
//         let pairsAll = await runMethod("pairs", {}, rootContract)
//         let { pairs } = pairsAll
//         let normlizeWallets = []
//         for (const item of Object.entries(pairs)) {
//             const curRootTokenA = await contract(RootTokenContract.abi, item[1].root0);
//             const curRootTokenB = await contract(RootTokenContract.abi, item[1].root1);
//             const curRootTokenAB = await contract(RootTokenContract.abi, item[1].rootLP);
//             let curRootDataA = await runMethod("getDetails", {_answer_id:0}, curRootTokenA)
//             let curRootDataB = await runMethod("getDetails", {_answer_id:0}, curRootTokenB)
//             let curRootDataAB = await runMethod("getDetails", {_answer_id:0}, curRootTokenAB)
//             let itemData = {};
//             itemData.pairAddress = item[0];
//             itemData.tokenA = hex2a(curRootDataA.value0.name)
//             itemData.tokenB = hex2a(curRootDataB.value0.name)
//             normlizeWallets.push(itemData)
//         }
//         return normlizeWallets
//     } catch (e) {
//         console.log("catch E", e);
//         return e
//     }
// }

export async function swapA(pairAddr, qtyA) {
    let curExt = {};
    await checkExtensions().then(async res => curExt = await getCurrentExtension(res))
    const {name, address, pubkey, contract, runMethod, callMethod} = curExt._extLib
    let getClientAddressFromRoot = await checkPubKey()
    if(getClientAddressFromRoot.status === false){
        return getClientAddressFromRoot
    }
    try {
        // let resp = {};
        const clientContract = await contract(DEXclientContract.abi, getClientAddressFromRoot.dexclient);
        const processSwapA = await callMethod("processSwapA", {pairAddr:pairAddr, qtyA:qtyA}, clientContract)
        console.log("processSwapA",processSwapA)
        return processSwapA
    } catch (e) {
        console.log("catch E processSwapA", e);
        return e
    }
}


export async function swapB(pairAddr, qtyB) {
    let curExt = {};
    await checkExtensions().then(async res => curExt = await getCurrentExtension(res))
    const {name, address, pubkey, contract, runMethod, callMethod} = curExt._extLib
    let getClientAddressFromRoot = await checkPubKey()
    if(getClientAddressFromRoot.status === false){
        return getClientAddressFromRoot
    }
    try {
        let resp = {};
        const clientContract = await contract(DEXclientContract.abi, getClientAddressFromRoot.dexclient);
        const processSwapA = await callMethod("processSwapB", {pairAddr:pairAddr, qtyB:qtyB}, clientContract)
        console.log("processSwapA",processSwapA)
        return processSwapA
    } catch (e) {
        console.log("catch E processSwapA", e);
        return e
    }
}


// export async function getAllClientWallets() {
//
//     //TODO get contract and runmetod from global??
//     let curExt = {};
//     await checkExtensions().then(async res => curExt = await getCurrentExtension(res))
//     const {name, address, pubkey, contract, runMethod, callMethod} = curExt._extLib
//
//
//     // let getClientAddressFromRoot = await checkPubKey()
//     // if(getClientAddressFromRoot.status === false){
//     //     return getClientAddressFromRoot
//     // }
// //TODO get from global store client address >>> if np client return - checkPubkey too low
// //     let clientAddress = "0:7d0f794a34e1645ab920f5737d19435415dd07331f02eb02b7bc41727448da43"
//     try {
//         const clientContract = await contract(DEXclientContract.abi, "0:7d0f794a34e1645ab920f5737d19435415dd07331f02eb02b7bc41727448da43");
//         let clientWallets = await runMethod("rootWallet", {}, clientContract)
//         let normlizeWallets = []
//         for (const item of Object.entries(clientWallets.rootWallet)) {
//
//             const curWalletContract = await contract(TONTokenWalletContract.abi, item[1]);
//             const curRootContract = await contract(RootTokenContract.abi, item[0]);
//
//             let curWalletData = await runMethod("getDetails", {_answer_id:0}, curWalletContract)
//             let curRootData = await runMethod("getDetails", {_answer_id:0}, curRootContract)
//             let itemData = {};
//
//             itemData.walletAddress = item[1];
//
//
//             itemData.name = hex2a(curRootData.value0.name);
//             itemData.balance = curWalletData.value0.balance;
//
//             normlizeWallets.push(itemData)
//
//     }
//         console.log("normlizeWallets",normlizeWallets)
// return normlizeWallets
//     } catch (e) {
//         console.log("catch E", e);
//         return e
//     }
// }


// export async function getAllExistingPairs() {
//
//     //TODO get contract and runmetod from global??
//     let curExt = {};
//     await checkExtensions().then(async res => curExt = await getCurrentExtension(res))
//     console.log("curExt",curExt)
//     const {contract, runMethod} = curExt._extLib
//     // let getClientAddressFromRoot = await checkPubKey()
//     // if(getClientAddressFromRoot.status === false){
//     //     return getClientAddressFromRoot
//     // }
// //TODO get from global store client address
// //     let clientAddress = "0:7d0f794a34e1645ab920f5737d19435415dd07331f02eb02b7bc41727448da43"
//     try {
//         const rootContract = await contract(DEXrootContract.abi, Radiance.networks['2'].dexroot);
//         let pairs = await runMethod("pairs", {}, rootContract)
//
//         let normlizeWallets = []
//         for (const item of Object.entries(pairs.pairs)) {
//             // console.log("pairs.pairs",item)
//             const curRootTokenA = await contract(RootTokenContract.abi, item[1].root0);
//             const curRootTokenB = await contract(RootTokenContract.abi, item[1].root1);
//             const curRootTokenAB = await contract(RootTokenContract.abi, item[1].rootLP);
//             const pairContract = await contract(DEXPairContract.abi, item[0]);
//
//             let bal = await runMethod("balanceReserve", {}, pairContract)
//
//             let curRootDataA = await runMethod("getDetails", {_answer_id:0}, curRootTokenA)
//             let curRootDataB = await runMethod("getDetails", {_answer_id:0}, curRootTokenB)
//             let curRootDataAB = await runMethod("getDetails", {_answer_id:0}, curRootTokenAB)
//
//             let itemData = {};
//             itemData.pairAddress = item[0];
//             itemData.pairname = hex2a(curRootDataAB.value0.name)
//             itemData.nameWalletA = hex2a(curRootDataA.value0.name)
//             itemData.balanceWalletA = bal.balanceReserve[item[1].root0]
//
//             itemData.nameWalletB = hex2a(curRootDataB.value0.name)
//             itemData.balanceWalletB = bal.balanceReserve[item[1].root1]
//
//             normlizeWallets.push(itemData)
//         }
//         console.log("{normlizeWallets}",normlizeWallets)
//         return normlizeWallets
//     } catch (e) {
//         console.log("catch E", e);
//         return e
//    }
// }

// export async function getPairReserves(walletAadrress, walletBaddress) {
//     let curExt = {};
//     await checkExtensions().then(async res => curExt = await getCurrentExtension(res))
//     const {name, address, pubkey, contract, runMethod, callMethod} = curExt._extLib
//     try {
//         const walletA = await contract(TONTokenWalletContract.abi, walletAadrress);
//         const walletB = await contract(TONTokenWalletContract.abi, walletBaddress);
//
//         let balanceA = await runMethod("balance", {_answer_id:0}, walletA).catch(e=>console.log(e))
//         let balanceB = await runMethod("balance", {_answer_id:0}, walletB).catch(e=>console.log(e))
//
//         // const DEXPairContract1 = await contract(DEXPairContract.abi, "0:738e8c43fb8984190e04b18de0f9694b4a0d06c59dbd2437fd3d9259b3e3223c");
//         // console.log("DEXPairContract.abi",DEXPairContract1)
//         // let balanceB = await runMethod("balanceReserve", {}, DEXPairContract1).catch(e=>console.log(e))
//
// console.log("balanceA",balanceA,"balanceB",balanceB)
//
//
//         return {balanceA,balanceB}
//     } catch (e) {
//         console.log("catch E", e);
//         return e
//     }
// }






// export async function getWalletBalance(walletAddress) {
//     let curExt = {};
//     await checkExtensions().then(async res => curExt = await getCurrentExtension(res))
//     const {name, address, pubkey, contract, runMethod, callMethod} = curExt._extLib
//     try {
//         const wallet = await contract(TONTokenWalletContract.abi, walletAddress);
//         let balance = await runMethod("balance", {_answer_id:0}, wallet).catch(e=>console.log(e))
//
//         console.log("balance",balance)
//         return balance
//     } catch (e) {
//         console.log("catch E", e);
//         return e
//     }
// }

export async function returnLiquidity(pairAddr, tokens) {
    let curExt = {};
    await checkExtensions().then(async res => curExt = await getCurrentExtension(res))
    const {name, address, pubkey, contract, runMethod, callMethod} = curExt._extLib
    let getClientAddressFromRoot = await checkPubKey()
    if(getClientAddressFromRoot.status === false){
        return getClientAddressFromRoot
    }
    try {
        const clientContract = await contract(DEXclientContract.abi, getClientAddressFromRoot.dexclient);
        const returnLiquidity = await callMethod("returnLiquidity", {pairAddr:pairAddr, tokens:tokens}, clientContract)
        return returnLiquidity
    } catch (e) {
        console.log("catch E returnLiquidity", e);
        return e
    }
}
export async function processLiquidity(pairAddr, qtyA, qtyB) {
    let curExt = {};
    await checkExtensions().then(async res => curExt = await getCurrentExtension(res))
    const {name, address, pubkey, contract, runMethod, callMethod} = curExt._extLib
    let getClientAddressFromRoot = await checkPubKey()
    if(getClientAddressFromRoot.status === false){
        return getClientAddressFromRoot
    }
    try {
        const clientContract = await contract(DEXclientContract.abi, getClientAddressFromRoot.dexclient);
        const processLiquidity = await callMethod("processLiquidity", {pairAddr:pairAddr, qtyA:qtyA, qtyB:qtyB}, clientContract)
        return processLiquidity
    } catch (e) {
        console.log("catch E processLiquidity", e);
        return e
    }
}

// export async function getWalletData(walletAddress) {
//     let curExt = {};
//     await checkExtensions().then(async res => curExt = await getCurrentExtension(res))
//     const {name, address, pubkey, contract, runMethod, callMethod} = curExt._extLib
//     try {
//         const wallet = await contract(TONTokenWalletContract.abi, walletAddress);
//         let details = await runMethod("getDetails", {_answer_id:0}, wallet).catch(e=>console.log(e))
//         return details
//     } catch (e) {
//         console.log("catch E", e);
//         return e
//     }
// }
/*
    pairAddr type string
 */


export async function connectToPair(pairAddr) {

    // let pairAddr = "0:7e97c915eeb2cad1e0977225b6a9d96ed79902f01c46c60e3362a1e2a5da1912"
    let curExt = {};
    await checkExtensions().then(async res => curExt = await getCurrentExtension(res))
    const {contract,callMethod,runMethod} = curExt._extLib
    let getClientAddressFromRoot = await checkPubKey()
    if(getClientAddressFromRoot.status === false){
        return getClientAddressFromRoot
    }
    try {
        const clientContract = await contract(DEXclientContract.abi, getClientAddressFromRoot.dexclient);
        let connectPairFunc = await callMethod("connectPair", {pairAddr: pairAddr}, clientContract)
        console.log("connectPairFunc",connectPairFunc)
        await getClientForConnect({pairAddr: pairAddr, runMethod:runMethod,callMethod:callMethod,contract:contract,clientAddress:getClientAddressFromRoot.dexclient,clientContract:clientContract})
    } catch (e) {
        console.log("catch E", e);
        return e
    }
}

export async function getClientForConnect(data) {
    const {pairAddr, clientAddress, contract, runMethod, callMethod,clientContract} = data
    try {
        let soUINT = await runMethod("soUINT", {}, clientContract)
        let pairs = await runMethod("pairs", {}, clientContract)
        let clientRoots = await runMethod("getAllDataPreparation", {}, clientContract)
        let curPair = null
        while (!curPair){
            pairs = await runMethod("pairs", {}, clientContract)
            curPair = pairs.pairs[pairAddr]
        }

        await connectToPairStep2DeployWallets({...soUINT, curPair,clientAdr:clientAddress,callMethod,clientContract,contract:contract,clientRoots:clientRoots.rootKeysR})
    } catch (e) {
        console.log("catch E", e);
        return e
    }
}

// balanceWalletA: "366029617099"
// balanceWalletB: "997931073121808"
// nameWalletA: "freeton ETH"
// nameWalletB: "USD Tether"
// pairAddress: "0:7798891c9570faa24a3d14d249bbff94f38ca43a0530a6aa26bdd1e452094908"
// pairname: "DS-ETH/USDT"


export async function connectToPairStep2DeployWallets(connectionData) {
    let { soUINT,curPair,clientAdr,callMethod, clientContract,contract,clientRoots} = connectionData;

    let targetShard = getShard(clientAdr);
    let cureClientRoots = [curPair.rootA,curPair.rootB,curPair.rootAB]
    let newArr = cureClientRoots.filter(function(item) {
        return clientRoots.indexOf(item) === -1;
    });
    if(newArr.length===0){
        return new UserException("y already have all pair wallets")
    }
try{
    await newArr.map(async (item,i)=>{
       let soUint = await getShardConnectPairQUERY(clientAdr,targetShard,item)
       await callMethod("connectRoot", {root: item, souint:soUint,gramsToConnector:500000000,gramsToRoot:1500000000}, clientContract).then(respt=>{
       })
    })
}catch (e) {
    console.log("this",e)
    return e
}
    // console.log("curRootsForDeploy",curRootsForDeploy)
    // curRootsForDeploy.map(async item=>{
    //     console.log("item",item)
    //     await callMethod("connectRoot", {root: item.rootAddr, souint:item.soUint,gramsToConnector:500000000,gramsToRoot:1500000000}, clientContract)
    // })

    //     await getShardConnectPairQUERY(clientAdr,targetShard,curPair.rootA).then(async res=> {
    //         console.log("res", res)
    //         soDataRootA = res
    //         await getShardConnectPairQUERY(clientAdr, targetShard, curPair.rootB).then(async resp=> {
    //             console.log("resp", resp)
    //             soDataRootB = resp
    //             await getShardConnectPairQUERY(clientAdr,targetShard, curPair.rootAB).then(resp3=>{
    //                 console.log("resp3", resp3)
    //                 soDataRootAB = resp3
    //             })
    //             }
    //     //
    //         )
    //     }
    // )
    // let statusRootAwalletDeploy = await callMethod("connectRoot", {root: curPair.rootA, souint:soDataRootA,gramsToConnector:500000000,gramsToRoot:1500000000}, clientContract)
    // let statusRootBwalletDeploy = await callMethod("connectRoot", {root: curPair.rootB, souint:soDataRootB,gramsToConnector:500000000,gramsToRoot:1500000000}, clientContract)
    // let statusRootABwalletDeploy = await callMethod("connectRoot", {root: curPair.rootAB, souint:soDataRootAB,gramsToConnector:500000000,gramsToRoot:1500000000}, clientContract)

}
// export async function getShardConnectPair(clientAcc,targetShard, rootAcc,runMethod) {
//     let connectorSoArg0;
//     let status = false;
//     let n = 0;
//     let shardC
//     let connectorAddr
//     while (!status) {
//         let response = await runMethod("getConnectorAddress", {_answer_id: 0, connectorSoArg: n}, clientAcc);
//         // console.log("getConnectorAddress",response)
//         connectorAddr = response.value0;
//         // console.log("connectorAddr",connectorAddr)
//         shardC = getShard(connectorAddr);
//         console.log("shardC", shardC, "targetShard", targetShard)
//         if (shardC === targetShard) {
//             console.log("connectorSoArg:", n);
//             console.log("connector address:", connectorAddr);
//
//             status = true;
//         } else {
//             console.log(n);
//         }
//         n++;
//     }
//
//     let status2 = false;
//     while (!status2) {
//     let resp = await runMethod("getWalletAddress", {
//         _answer_id: 0,
//         wallet_public_key_: 0,
//         owner_address_: connectorAddr
//     }, rootAcc);
//     let walletAddr = resp.value0;
//     let shardW = getShard(walletAddr);
//     console.log("shardW", shardW, "targetShard", targetShard)
//     if (shardW === targetShard) {
//         console.log("Bingo!");
//         connectorSoArg0 = n;
//         console.log("wallet address:", walletAddr);
//         console.log("connectorSoArg0:", n);
//         status2 = true;
//     } else {
//         console.log(n);
//     }
//
//
// }
//     console.log("connectorSoArg0",connectorSoArg0)
//     return connectorSoArg0
// }
//
// export async function getShardConnectPair(clientAcc,targetShard, rootAcc,runMethod) {
//     let connectorSoArg0;
//     let status = false;
//     let n = 0;
//     while (!status) {
//         let response = await runMethod("getConnectorAddress", {_answer_id:0,connectorSoArg:n}, clientAcc);
//         console.log("getConnectorAddress",response)
//         let connectorAddr = response.value0;
//         console.log("connectorAddr",connectorAddr)
//         let shardC = getShard(connectorAddr);
//         console.log("shardC",shardC,"targetShard",targetShard)
//         if (shardC === targetShard) {
//             console.log("connectorSoArg:", n);
//             console.log("getConnectorAddress:", connectorAddr);
//             let resp = await runMethod("getWalletAddress", {_answer_id:0, wallet_public_key_:0,owner_address_:connectorAddr},rootAcc);
//             let walletAddr = resp.value0;
//             let shardW = getShard(walletAddr);
//             console.log("shardW",shardW,"targetShard",targetShard)
//             if (shardW === targetShard) {
//                 console.log("Bingo!");
//                 connectorSoArg0 = n;
//                 console.log("getWalletAddress:", walletAddr);
//                 console.log("connectorSoArg0:", n);
//                 status = true;
//             } else {console.log(n);}
//         } else {console.log(n);}
//         n++;
//     }
//     console.log("connectorSoArg0",connectorSoArg0)
//     return connectorSoArg0
// }

async function main(client) {
    let responce;
    const clientKeys = JSON.parse(fs.readFileSync(pathJsonClient,{encoding: "utf8"})).keys;
    const clientAddr = JSON.parse(fs.readFileSync(pathJsonClient,{encoding: "utf8"})).address;
    const clientSoArg = JSON.parse(fs.readFileSync(pathJsonClient,{encoding: "utf8"})).clientSoArg
    const clientAcc = new Account(DEXClientContract, {address:clientAddr,signer:clientKeys,client,});




    response = await clientAcc.runLocal("getAllDataPreparation", {});
    let pair0 = response.decoded.output.pairKeysR[0];
    response = await clientAcc.runLocal("pairs", {});
    let pair0info = response.decoded.output.pairs[pair0];
    let rootA = pair0info.rootA;
    let rootB = pair0info.rootB;
    let rootAB = pair0info.rootAB;

    console.log("Pair0 rootA:", rootA);
    console.log("Pair0 rootB:", rootB);
    console.log("Pair0 rootAB:", rootAB);

    const rootA_Acc = new Account(RootTokenContract,{address:rootA,client,});
    const rootB_Acc = new Account(RootTokenContract,{address:rootB,client,});
    const rootAB_Acc = new Account(RootTokenContract,{address:rootAB,client,});

    let targetShard = getShard(clientAddr);

    let connectorSoArg0;
    status = false;
    n = 0;
    while (!status) {
        response = await clientAcc.runLocal("getConnectorAddress", {_answer_id:0,connectorSoArg:n});
        let connectorAddr = response.decoded.output.value0;
        let shardC = getShard(connectorAddr);
        if (shardC == targetShard) {
            console.log("connectorSoArg:", n);
            console.log("getConnectorAddress:", connectorAddr);
            response = await rootA_Acc.runLocal("getWalletAddress", {_answer_id:0, wallet_public_key_:0,owner_address_:connectorAddr});
            let walletAddr = response.decoded.output.value0;
            let shardW = getShard(walletAddr);
            if (shardW == targetShard) {
                console.log("Bingo!");
                connectorSoArg0 = n;
                console.log("getWalletAddress:", walletAddr);
                console.log("connectorSoArg0:", n);
                status = true;
            } else {console.log(n);}
        } else {console.log(n);}
        n++;
    }

    let connectorSoArg1;
    status = false;
    // n = 0;
    while (!status) {
        response = await clientAcc.runLocal("getConnectorAddress", {_answer_id:0,connectorSoArg:n});
        let connectorAddr = response.decoded.output.value0;
        let shardC = getShard(connectorAddr);
        if (shardC == targetShard) {
            console.log("connectorSoArg:", n);
            console.log("getConnectorAddress:", connectorAddr);
            response = await rootB_Acc.runLocal("getWalletAddress", {_answer_id:0, wallet_public_key_:0,owner_address_:connectorAddr});
            let walletAddr = response.decoded.output.value0;
            let shardW = getShard(walletAddr);
            if (shardW == targetShard) {
                console.log("Bingo!");
                connectorSoArg1 = n;
                console.log("getWalletAddress:", walletAddr);
                console.log("connectorSoArg1:", n);
                status = true;
            } else {console.log(n);}
        } else {console.log(n);}
        n++;
    }

    let connectorSoArg2;
    status = false;
    // n = 0;
    while (!status) {
        response = await clientAcc.runLocal("getConnectorAddress", {_answer_id:0,connectorSoArg:n});
        let connectorAddr = response.decoded.output.value0;
        let shardC = getShard(connectorAddr);
        if (shardC == targetShard) {
            console.log("connectorSoArg:", n);
            console.log("getConnectorAddress:", connectorAddr);
            response = await rootAB_Acc.runLocal("getWalletAddress", {_answer_id:0, wallet_public_key_:0,owner_address_:connectorAddr});
            let walletAddr = response.decoded.output.value0;
            let shardW = getShard(walletAddr);
            if (shardW == targetShard) {
                console.log("Bingo!");
                connectorSoArg2 = n;
                console.log("getWalletAddress:", walletAddr);
                console.log("connectorSoArg1:", n);
                status = true;
            } else {console.log(n);}
        } else {console.log(n);}
        n++;
    }


    let keyJson = JSON.stringify({address:clientAddr,keys:clientKeys,clientSoArg:clientSoArg,pair0:{address:pair0,rootA:connectorSoArg0,rootB:connectorSoArg1,rootAB:connectorSoArg2}});
    fs.writeFileSync( pathJsonClient, keyJson,{flag:'w'});
    console.log("Data for the DEXclient written successfully to:", pathJsonClient);

    response = await clientAcc.run("connectRoot", {root:rootA,souint:connectorSoArg0,gramsToConnector:500000000,gramsToRoot:1500000000});
    console.log("Contract reacted to your connectRoot:", response.decoded.output);

    response = await clientAcc.run("connectRoot", {root:rootB,souint:connectorSoArg1,gramsToConnector:500000000,gramsToRoot:1500000000});
    console.log("Contract reacted to your connectRoot:", response.decoded.output);

    response = await clientAcc.run("connectRoot", {root:rootAB,souint:connectorSoArg2,gramsToConnector:500000000,gramsToRoot:1500000000});
    console.log("Contract reacted to your connectRoot:", response.decoded.output);


}


export async function transfer() {
    let curExt = {};
    await checkExtensions().then(async res => curExt = await getCurrentExtension(res))
    const {name, address, pubkey, contract, runMethod, callMethod, internal} = curExt._extLib

    // const shardData = onSharding()
    // console.log("shardData", shardData)
    try {

        const contractMessageProcessing = await address.transfer(form.address.value, form.amount.value, false, payload);
        let resp = {};
        console.log("setCreator",address)
        const msigContract = await contract(SafeMultisigWallet.abi, address);
        let deployresp = await internal("sendTransaction", {dest: Radiance.networks['2'].dexroot,value:10000000000, bounce:false,flags:0,payload:0}, msigContract).then(res => {
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
