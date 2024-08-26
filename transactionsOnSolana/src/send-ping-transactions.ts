import * as web3 from "@solana/web3.js";

const payer = web3.Keypair.fromSecretKey(new Uint8Array([
    235, 253, 104, 155, 145, 222, 215, 118, 220,  19, 233, // make sure of the network you are testing on 
    68, 233, 189, 226, 234,  46, 253,  18,  95, 132, 208,
    73, 137, 250, 118,  43,  92,  69, 189,   8, 236,  66,
    246,  91, 173, 118, 114, 215,  81, 238,  64, 191,  77,
    71, 179, 251,  72, 223, 206, 170, 199,  36, 199, 155,
    26,  92, 107,   8, 194,  98, 163,  62,   9
]));
console.log(payer.publicKey.toBase58())
const connection = new web3.Connection("https://api.devnet.solana.com", "confirmed");

const PING_PROGRAM_ADDRESS = new web3.PublicKey("ChT1B39WKLS8qUrkLvFDXMhEJ4F1XZzwUNHUt4AU9aVa");
const PING_PROGRAM_DATA_ADDRESS = new web3.PublicKey("Ah9K7dQ8EHaZqcAsgBW8w37yN2eAy3koFmUn4x3CJtod");

async function checkAccountBalance(publicKey:any) {
    try {
        const balance = await connection.getBalance(publicKey);
        console.log(`Balance of ${publicKey.toBase58()}: ${balance / web3.LAMPORTS_PER_SOL} SOL`);
    } catch (err) {
        console.error('Failed to fetch balance:', err);
    }
}

checkAccountBalance(PING_PROGRAM_DATA_ADDRESS);

const transaction = new web3.Transaction();
const programId = new web3.PublicKey(PING_PROGRAM_ADDRESS);
const pingProgramDataId = new web3.PublicKey(PING_PROGRAM_DATA_ADDRESS);

const instruction = new web3.TransactionInstruction({
    keys: [
        {
            pubkey: pingProgramDataId,
            isSigner: false,
            isWritable: true,
        },
    ],
    programId,
});

transaction.add(instruction);

const signatureFunction = async () => {
    try {
        const signature = await web3.sendAndConfirmTransaction(connection, transaction, [payer]);
        console.log('Transaction successful:', signature);
    } catch (err:any) {
        console.error('Transaction failed:', err.message);
        if (err.logs) {
            console.error('Transaction logs:', err.logs);
        }
    }
};

signatureFunction();