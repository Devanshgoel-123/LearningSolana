import {Connection,clusterApiUrl,PublicKey} from "@solana/web3.js"
const connection=new Connection(clusterApiUrl("mainnet-beta"),"confirmed");

const address=new PublicKey("CenYq6bDRB7p73EjsPEpiYN7uveyPUTdXkDkgUduboaN")
console.log("Connected")            
async function getBalanceFunction() {
    const balance=await connection.getBalance(address);
    console.log(balance/10e9)
}
const verifyAddress=PublicKey.isOnCurve("CenYq6bDRB7p73EjsPEpiYN7uveyPUTdXkDkgUduboaN");
console.log(verifyAddress);

getBalanceFunction();