import {Connection,SystemProgram,sendAndConfirmTransaction,PublicKey, Keypair, Transaction} from "@solana/web3.js";

const receiverKey=new Keypair();
const senderKey =new Keypair();

const receiverPublicKey=new PublicKey(receiverKey.publicKey.toBase58());
const senderPublicKey=new PublicKey(senderKey.publicKey.toBase58())

const connection= new Connection("https://api.devnet.solana.com","confirmed");

console.log(
    `✅ Loaded our own keypair, the destination public key, and connected to Solana`,
  );

const transaction=new Transaction();
const sendSolInstruction=SystemProgram.transfer({
    fromPubkey:senderPublicKey,
    toPubkey:receiverPublicKey,
    lamports:100000
});

transaction.add(sendSolInstruction);
(async () => {
    try {
      const signature = await sendAndConfirmTransaction(
        connection,
        transaction,
        [senderKey]
      );
      console.log("Transaction successful with signature:", signature);
    } catch (error) {
      console.error("Transaction failed:", error);
    }
  })();