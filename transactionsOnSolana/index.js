"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const web3_js_1 = require("@solana/web3.js");
const receiverKey = new web3_js_1.Keypair();
const senderKey = new web3_js_1.Keypair();
const receiverPublicKey = new web3_js_1.PublicKey(receiverKey.publicKey.toBase58());
const senderPublicKey = new web3_js_1.PublicKey(senderKey.publicKey.toBase58());
const connection = new web3_js_1.Connection("https://api.devnet.solana.com", "confirmed");
console.log(`✅ Loaded our own keypair, the destination public key, and connected to Solana`);
const transaction = new web3_js_1.Transaction();
const sendSolInstruction = web3_js_1.SystemProgram.transfer({
    fromPubkey: senderPublicKey,
    toPubkey: receiverPublicKey,
    lamports: 100000
});
transaction.add(sendSolInstruction);
(() => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const signature = yield (0, web3_js_1.sendAndConfirmTransaction)(connection, transaction, [web3_js_1.Keypair.fromSecretKey(Buffer.from(senderKey))]);
        console.log("Transaction successful with signature:", signature);
    }
    catch (error) {
        console.error("Transaction failed:", error);
    }
}))();
