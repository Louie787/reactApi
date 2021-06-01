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
import { getWalletData,getPairReserves,checkPubKey, getPairClientWallets,getAllDataPreparation,showContractAddress,pairKeys,getDexClientData,x,getRootData,getClientData,createDEXclient,connectToPair,onSharding,getGiverAddress} from "./sdk/run"

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

  async function clickMe() {
      let y = getClientData()
      console.log("xxx",y)

}
    async function clickMe2() {
        let y = getRootData()
        console.log("xxx",y)

    }
    async function clickMe3() {
        let y = checkPubKey()
    }
    async function clickMe4() {
        let y = createDEXclient()
    }
    async function clickMe5() {
        let y = connectToPair()
    }
    async function clickMe6() {
        let y = onSharding()
    }
    async function clickMe7() {
        let y = getGiverAddress()
    }
    async function clickMe8() {
        let y = getPairReserves()
    }
    async function clickMe9() {
        let y = getWalletData()
    }

  return (
      <div className="App">
        <button
            style={{
          "width": "500px",
          "height": "200px",
             }}
                onClick={()=>clickMe()}>
            getclientData
        </button>
          <button
              style={{
                  "width": "500px",
                  "height": "200px",
              }}
              onClick={()=>clickMe2()}>
              getRootData
          </button>
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
              createDEXclient
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
              getGiverAddress
          </button>
          <button
              style={{
                  "width": "500px",
                  "height": "200px",
              }}
              onClick={()=>clickMe8()}>
              getPairReserves
          </button>
          <button
              style={{
                  "width": "500px",
                  "height": "200px",
              }}
              onClick={()=>clickMe9()}>
              getWalletData
          </button>
      </div>
  );
}

export default App;

