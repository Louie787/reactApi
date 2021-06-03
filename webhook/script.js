import {libWeb} from "@tonclient/lib-web";
const { ResponseType } = require("@tonclient/core/dist/bin");
const {
    MessageBodyType,
    TonClient,
} = require("@tonclient/core");
const { Account } = require("@tonclient/appkit");
TonClient.useBinaryLibrary(libWeb);
const DappServer = "net.ton.dev"
const client = new TonClient({ network: { endpoints: [DappServer] } });


import {DEXrootContract} from "../contracts/DEXRoot.js";
import {DEXclientContract} from "../contracts/DEXClient.js";
import {TONTokenWalletContract} from "../contracts/TONTokenWallet.js";
import {RootTokenContract} from "../contracts/RootTokenContract.js";
import {SafeMultisigWallet} from "../msig/SafeMultisigWallet.js";
import {DEXPairContract} from "../contracts/DEXPairContract.js";

import {abiContract} from "@tonclient/core";
import {getWalletBalance} from "../sdk/run";
import {checkExtensions, getCurrentExtension} from "../extensions/checkExtensions";

function hex2a(hex) {
    let str = '';
    for (let i = 0; i < hex.length; i += 2) {
        let v = parseInt(hex.substr(i, 2), 16);
        if (v) str += String.fromCharCode(v);
    }
    return str;
}
export async function сheckLibWeb() {
    const acc = new Account(DEXrootContract, {address: "0:74a70fecf38874f6b6e131df9aa1099d8ed3046312f233cb36aba5f6fb2513ff", client});
    const response = await acc.runLocal("pairs", {});

    let normlizeWallets = []
    console.log("response",response.decoded.output)

    for (const item of Object.entries(response.decoded.output.pairs)) {
        console.log("item",item)
        const curRootTokenA = new Account(RootTokenContract, {address: item[1].root0, client});
        const curRootTokenB = new Account(RootTokenContract, {address: item[1].root1, client});
        const curRootTokenAB = new Account(RootTokenContract, {address: item[1].rootLP, client});
        const pairContract = new Account(DEXPairContract, {address: item[0], client});

        let bal = await pairContract.runLocal("balanceReserve", {})

        let curRootDataA = await curRootTokenA.runLocal("getDetails", {_answer_id:0})
        let curRootDataB = await curRootTokenB.runLocal("getDetails", {_answer_id:0})
        let curRootDataAB = await curRootTokenAB.runLocal("getDetails", {_answer_id:0})

        let itemData = {};
        itemData.pairAddress = item[0];
        console.log("curRootDataAB",curRootDataAB)
        itemData.pairname = hex2a(curRootDataAB.decoded.output.value0.name)
        itemData.nameWalletA = hex2a(curRootDataA.decoded.output.value0.name)
        itemData.balanceWalletA = bal.decoded.output.balanceReserve[item[1].root0]

        itemData.nameWalletB = hex2a(curRootDataB.decoded.output.value0.name)
        itemData.balanceWalletB = bal.decoded.output.balanceReserve[item[1].root1]

        normlizeWallets.push(itemData)
    }
    console.log("{normlizeWallets}",normlizeWallets)
    return normlizeWallets

}





export async function getClientBalance() {

    let address = "0:7d0f794a34e1645ab920f5737d19435415dd07331f02eb02b7bc41727448da43"
    try {
        let clientBalance = await client.net.query_collection({
            collection: "accounts",
            filter: {
                id: {
                    eq: address,
                },
            },
            result: "balance",
        });

        console.log("clientBalance",+clientBalance.result[0].balance)
    } catch (e) {
        console.log("catch E", e);
        return e
    }
}

const decode = {
    async message(abi, boc) {
        try {
            const decodedMessage = (
                await TonClient.default.abi.decode_message({
                    abi: abiContract(abi),  //DEXclientContract.abi RootTokenContract 60ae82cc933c9613a7a9e531129a66195390edd61d8f5b77224893cea003021e
                    message: boc,
                })
            )
            return decodedMessage
        } catch (e) {
            // console.log(e)
            return e.code
        }
    },
}


export async function subscribeAll() {
    let wallets = ["0:7e0457591e59add970bfa95c87d8b1d6c13e0677411c93c057a1706184e9b6ab","0:7823d7b9083c54a9176509b294386f020106dc6e53e77970d6726d7da97bc857"]
    wallets.map(item=>subscribe(item))



};


export async function subscribe(address) {
// let address = "0:7e0457591e59add970bfa95c87d8b1d6c13e0677411c93c057a1706184e9b6ab"
    let subscribeID = (await client.net.subscribe_collection({
        collection: "messages",
        filter: {
            dst: { eq: address },
        },
        result: "id boc created_at",

    }, async (params,responseType) => {
         if (responseType === ResponseType.Custom) {

             let decoded = await decode.message(DEXrootContract.abi, params.result.boc)
             if (decoded === 304) {decoded = await decode.message(RootTokenContract.abi, params.result.boc)}
             if (decoded === 304) {decoded = await decode.message(TONTokenWalletContract.abi, params.result.boc)}
             if (decoded === 304) {decoded = await decode.message(SafeMultisigWallet.abi, params.result.boc)}
             if (decoded === 304) {decoded = await decode.message(DEXPairContract.abi, params.result.boc)}
             if (decoded === 304) {decoded = await decode.message(DEXclientContract.abi, params.result.boc)}
//
// console.log("params.result.id", params.result.id)
// console.log("created_at_string", params.result.created_at)
             let resInput = decoded.value
             let caseID = await checkMessagesAmount({transactionID:params.result.id, "created_at":params.result.created_at, amountOfTokens: resInput.tokens, grams:resInput.grams,})
             console.log("caseID",caseID)


                 await chek(caseID)



        }
    })).handle;
    // await _db.saveSubscribeID({"subID":subscribeID,"address":address})
    console.log({"subID":subscribeID,"address":address})
    // return {"status":"success", "subscribed address": address}
}




let checkerArr = [];
let checkMessagesAmount = function(messageID){
    checkerArr.push(messageID)
    if(checkerArr.length === 2){
        checkerArr.filter(function(item, pos) {
            return checkerArr.indexOf(item) === pos;
        })
        // checkerArr.map(item=> {
        //     return item.grams === 0
        // })

        // if(checkerArr[0] === checkerArr[1]){
        //     checkerArr = [];
        //     console.log("checkerArr[0]",checkerArr[0])
        //     return checkerArr[0]
        // }
    }
    console.log("checkerArr",checkerArr)
    return null
}
let chek = function(messageID){
    // console.log("messageID",messageID)
}

// export async function unsubscribe(address) {
//
//
//     let userData = await _db.unsubAtdb(address)
//     await client.net.unsubscribe({ handle: userData.subscribeID });
//     return {"status":"success", "subscribed address": address}
// };

