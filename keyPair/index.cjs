"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const web3_js_1 = require("@solana/web3.js");
require("dotenv/config");
const keyPair = new web3_js_1.Keypair();
console.log('The public key is :{}', keyPair.publicKey.toBase58());
console.log('THe private key is :{}', keyPair.secretKey);
console.log(process.env.SECRET_KEY);
