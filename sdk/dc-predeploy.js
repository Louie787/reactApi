const {TonClient, abiContract, signerKeys} = require("@tonclient/core");
const { libNode } = require("@tonclient/lib-node");
const { Account } = require("@tonclient/appkit");
const { DEXRootContract } = require("./DEXRoot.js");
const { DEXClientContract } = require("./DEXClient.js");
const { DEXConnectorContract } = require("./DEXConnector.js");
const { GiverContract } = require("./Giver.js");
const dotenv = require('dotenv').config();
const networks = ["http://localhost",'net.ton.dev','main.ton.dev','rustnet.ton.dev'];
const hello = ["Hello localhost TON!","Hello dev net TON!","Hello main net TON!","Hello rust dev net TON!"];
const networkSelector = process.env.NET_SELECTOR;

const fs = require('fs');
const pathJsonRoot = './DEXRootContract.json';
const pathJsonClient = './DEXClientContract.json';

TonClient.useBinaryLibrary(libNode);

function getShard(string) {
  return string[2];
}

async function logEvents(params, response_type) {
  // console.log(`params = ${JSON.stringify(params, null, 2)}`);
  // console.log(`response_type = ${JSON.stringify(response_type, null, 2)}`);
}

async function main(client) {
  let responce;
  const rootAddr = JSON.parse(fs.readFileSync(pathJsonRoot,{encoding: "utf8"})).address;
  const rootAcc = new Account(DEXRootContract, {address: rootAddr,client,});

  const clientKeys = signerKeys(await TonClient.default.crypto.generate_random_sign_keys());

  console.log("clientKeys.keys.public:", clientKeys.keys.public);
  let pubkey = '0x'+clientKeys.keys.public;

  // response = await rootAcc.runLocal("getClientAddress", {_answer_id:0,clientPubKey:pubkey,clientSoArg:0});
  // console.log("Contract reacted to your getClientAddress:", response.decoded.output.value0);

  let status = false;
  let targetShard = getShard(rootAddr);
  let n = 0;
  while (!status) {
    response = await rootAcc.runLocal("getClientAddress", {_answer_id:0,clientPubKey:pubkey,clientSoArg:n});
    let clientAddr = response.decoded.output.value0;
    let shard = getShard(clientAddr);
    if (shard == targetShard) {
      console.log("Bingo!");
      console.log("clientSoArg:", n);
      console.log("clientAddress:", clientAddr);
      let keyJson = JSON.stringify({address:clientAddr, keys:clientKeys, clientSoArg:n});
      fs.writeFileSync( pathJsonClient, keyJson,{flag:'w'});
      console.log("Address of the DEXclient and clientSoArg written successfully to:", pathJsonClient);
      status = true;
    } else {console.log(n);}
    n++;
  }

}

(async () => {
  const client = new TonClient({network: { endpoints: [networks[networkSelector]],},});
  try {
    console.log(hello[networkSelector]);
    await main(client);
    process.exit(0);
  } catch (error) {
    if (error.code === 504) {
      console.error(`Network is inaccessible. Pls check connection`);
    } else {
      console.error(error);
    }
  }
  client.close();
})();
