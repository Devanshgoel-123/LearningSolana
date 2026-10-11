# LearningSolana

### Hands-on Solana exercises, from keypairs to Anchor programs

![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white) ![Solana](https://img.shields.io/badge/Solana-9945FF?logo=solana&logoColor=white) ![Rust](https://img.shields.io/badge/Rust-000?logo=rust&logoColor=white)

What I've learned building on Solana, one folder per exercise.

| Folder | What it covers |
|---|---|
| [`keyPair/`](keyPair) | Generating and loading keypairs with `@solana/web3.js` |
| [`DataFromNetwork/`](DataFromNetwork) | Reading balances and account data from the network |
| [`transactionsOnSolana/`](transactionsOnSolana) | Building, signing, and sending transactions |
| [`solana-lab-token22-in-the-client/`](solana-lab-token22-in-the-client) | Token-2022 (Token Extensions) from the client |
| [`solana-ping-frontend/`](solana-ping-frontend), [`anchor-ping-frontend/`](anchor-ping-frontend) | Wallet-adapter frontends that call an on-chain program |
| [`anchor-movie-review-program/`](anchor-movie-review-program) | An Anchor program (Rust) with PDAs for storing movie reviews |

```bash
cd <folder> && npm install && npx ts-node index.ts     # client exercises
cd anchor-movie-review-program && anchor build && anchor test
```

> Use devnet keypairs only, and never commit real keys or `.env` files.
