import freeton from "freeton";
import { signerKeys, TonClient,DebotModule } from "@tonclient/core";
import {Account} from "@tonclient/appkit";
import {libWeb} from "@tonclient/lib-web";
import { DEXclientContract } from "./DEXclient"
import { DEXrootContract } from "./DEXroot"
// import "core-js/stable";
// import "regenerator-runtime/runtime";
import ton, { hasTonProvider,Contract,AddressLiteral,Address} from 'ton-inpage-provider';
import BigNumber from "bignumber.js";

import {HelloContract} from "./HelloContract";
import { useState } from "react"
import { checkExtensions, test,getCurrentExtension } from "./extensions/checkExtensions"
import { swapB, swapA,setCreator,connectToPairStep2DeployWallets,checkPubKey, createDEXclient,connectToPair,onSharding,} from "./sdk/run"
import { subscribe,getVal, subscribeAll,getClientBalance,getAllPairsWoithoutProvider,getAllClientWalletsQUERY,getRootBalanceOF,getRootCreators } from "./webhook/script"

// async function checkExtension() {
//
//     let broxus = await hasTonProvider()
//     let extraton = window.freeton
//     console.log("broxus",broxus, "extraton",extraton)
//     if (!(await hasTonProvider())) {
//         console.log("no broxus extension")
//         // throw new Error('Extension is not installed')
//     }
//     if (window.freeton === undefined) {
//         console.log("no extraton extension")
//         // throw 'Extension not available.';
//     }
// }
//
// const _ = {
//   checkExtensionAvailability() {
//     if (window.freeton === undefined) {
//       throw 'Extension not available.';
//     }
//   },
//   getProvider() {
//     return new freeton.providers.ExtensionProvider(window.freeton);
//   }
// };
//
// TonClient.useBinaryLibrary(libWeb);
//
// TonClient.defaultConfig = {
//     network: {
//         endpoints: ['net.ton.dev'],
//     },
// };
//
// const client = new TonClient({network: { server_address: 'net.ton.dev' }});
// const debotModule = new DebotModule(client);

// const DePoolAbi = `{
//   "ABI version": 2,
//   "header": ["time", "expire"],
//   "functions": [{
//     "name": "addOrdinaryStake",
//     "inputs": [
//       {"name":"stake","type":"uint64"}
//     ],
//     "outputs": []
//   }, {
//     "name": "getParticipantInfo",
//     "inputs": [
//       {"name":"addr","type":"address"}
//     ],
//     "outputs": [
//       {"name":"total","type":"uint64"},
//       {"name":"withdrawValue","type":"uint64"},
//       {"name":"reinvest","type":"bool"},
//       {"name":"reward","type":"uint64"},
//       {"name":"stakes","type":"map(uint64,uint64)"},
//       {"components":[{"name":"remainingAmount","type":"uint64"},{"name":"lastWithdrawalTime","type":"uint64"},{"name":"withdrawalPeriod","type":"uint32"},{"name":"withdrawalValue","type":"uint64"},{"name":"owner","type":"address"}],"name":"vestings","type":"map(uint64,tuple)"},
//       {"components":[{"name":"remainingAmount","type":"uint64"},{"name":"lastWithdrawalTime","type":"uint64"},{"name":"withdrawalPeriod","type":"uint32"},{"name":"withdrawalValue","type":"uint64"},{"name":"owner","type":"address"}],"name":"locks","type":"map(uint64,tuple)"},
//       {"name":"vestingDonor","type":"address"},
//       {"name":"lockDonor","type":"address"}
//     ]
//   }],
//   "data": [],
//   "events": []
// }`;

// async function test() {
//     if (!(await hasTonProvider())) {
//             throw new Error('Extension is not installed')
//         }
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
// console.log("myContract",accountInteraction.publicKey)
//
//
//     let resp = await myContract.methods.getRootsByPair({
//         // pubkey:"2f7e706585d71064c1c95382aaab6cfbb6d8ecb3b892a9b5034ae02eb03e7f36",
//         // pubkey: BigInt(0x2f7e706585d71064c1c95382aaab6cfbb6d8ecb3b892a9b5034ae02eb03e7f36)
//         // clientId:"0"
//         pairAddr:"0:2778b6df9fc582fd03218eb3d685c47ca1a398838d2f15d30cb4166c1c60b8f5"
//         // rootAddr:"0:2778b6df9fc582fd03218eb3d685c47ca1a398838d2f15d30cb4166c1c60b8f5"
//     }).call({
//         // publicKey: accountInteraction.publicKey,
//         // cachedState: undefined // can be used to reduce network requests
//     }).then(res=>console.log("res",res));
//     console.log("total",resp)
// }
//
// const DePoolAbi = {
//     'ABI version': 2,
//     'header': ['time', 'expire'],
//     'functions': [
//         {
//             "name": "addOrdinaryStake",
//             "inputs": [
//                 {"name":"stake","type":"uint64"}
//             ],
//             "outputs": []
//         }, {
//             "name": "getParticipantInfo",
//             "inputs": [
//                 {"name":"addr","type":"address"}
//             ],
//             "outputs": [
//                 {"name":"total","type":"uint64"},
//                 {"name":"withdrawValue","type":"uint64"},
//                 {"name":"reinvest","type":"bool"},
//                 {"name":"reward","type":"uint64"},
//                 {"name":"stakes","type":"map(uint64,uint64)"},
//                 {"components":[{"name":"remainingAmount","type":"uint64"},{"name":"lastWithdrawalTime","type":"uint64"},{"name":"withdrawalPeriod","type":"uint32"},{"name":"withdrawalValue","type":"uint64"},{"name":"owner","type":"address"}],"name":"vestings","type":"map(uint64,tuple)"},
//                 {"components":[{"name":"remainingAmount","type":"uint64"},{"name":"lastWithdrawalTime","type":"uint64"},{"name":"withdrawalPeriod","type":"uint32"},{"name":"withdrawalValue","type":"uint64"},{"name":"owner","type":"address"}],"name":"locks","type":"map(uint64,tuple)"},
//                 {"name":"vestingDonor","type":"address"},
//                 {"name":"lockDonor","type":"address"}
//             ]
//         },
// ],
// 'events': []
// };



function App() {

    async function clickMe3() {
        let y = checkPubKey()
    }
    async function clickMe4() {
        let y = setCreator()
    }
    async function clickMe5() {
        let y = connectToPair()
    }
    async function clickMe6() {
        let y = onSharding()
    }
    async function clickMe7() {
        let y = swapA()
    }
    async function clickMe10() {
        let y = setCreator()
    }
    async function clickMe11() {
        let y = getVal()
    }
    async function clickMe12() {
        let y = getAllPairsWoithoutProvider()
    }
    async function clickMe13() {
        // let y = getClientBalance()
        let y = await getRootCreators()
        let x = await getRootBalanceOF()

    }
    async function clickMe14() {
        let y = getAllClientWalletsQUERY()
    }
    async function clickMe15() {
        let y = getClientBalance()
    }



  return (
      <div className="App">

          <button
              style={{
                  "width": "500px",
                  "height": "200px",
              }}
              onClick={()=>clickMe3()}>
              checkPubKey
          </button>
          <button
              style={{
                  "width": "500px",
                  "height": "200px",
              }}
              onClick={()=>clickMe4()}>
              setCreator
          </button>

          <button
              style={{
                  "width": "500px",
                  "height": "200px",
              }}
              onClick={()=>clickMe5()}>
              connectToPair
          </button>

          <button
              style={{
                  "width": "500px",
                  "height": "200px",
              }}
              onClick={()=>clickMe6()}>
              onSharding
          </button>
          <button
              style={{
                  "width": "500px",
                  "height": "200px",
              }}
              onClick={()=>clickMe7()}>
              swapA
          </button>
          <button
              style={{
                  "width": "500px",
                  "height": "200px",
              }}
              onClick={()=>clickMe10()}>
              create dex client
          </button>

          <button
              style={{
                  "width": "500px",
                  "height": "200px",
              }}
              onClick={()=>clickMe11()}>
              getval
          </button>
          <button
              style={{
                  "width": "500px",
                  "height": "200px",
              }}
              onClick={()=>clickMe12()}>
              getAllPairsWoithoutProvider
          </button>

          <button
              style={{
                  "width": "500px",
                  "height": "200px",
              }}
              onClick={()=>clickMe13()}>
              getRootCreators
          </button>
          <button
              style={{
                  "width": "500px",
                  "height": "200px",
              }}
              onClick={()=>clickMe14()}>
              getAllClientWalletsQUERY
          </button>
          <button
              style={{
                  "width": "500px",
                  "height": "200px",
              }}
              onClick={()=>clickMe15()}>
              getClientBalance
          </button>

      </div>
  );
}

export default App;

