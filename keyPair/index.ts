import {Keypair} from "@solana/web3.js"

const keyPair=new Keypair();
console.log('The public key is :{}',keyPair.publicKey.toBase58());
console.log('THe private key is :{}',keyPair.secretKey);