import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import {expect} from "chai";
import { AnchorMovieReviewProgram } from "../target/types/anchor_movie_review_program";

describe("anchor-movie-review-program", () => {
  // Configure the client to use the local cluster.
    const provider=anchor.AnchorProvider.env();
    //When you set up your test environment with anchor.AnchorProvider.env(), you're creating a provider that includes a wallet (which could be a local test wallet or one provided by Anchor)
    //. This provider is used to sign transactions and submit them to the blockchain.
    anchor.setProvider(provider);
  
    const program=anchor.workspace.AnchorMovieReviewProgram as Program<AnchorMovieReviewProgram>;
    const movie = {
      title: "Movie Is The Best",
      description: "Wow what a good movie it was real great",
      rating: 5,
    };
    const [moviePda]=anchor.web3.PublicKey.findProgramAddressSync(
      [Buffer.from(movie.title),provider.wallet.publicKey.toBuffer()], //Buffer.from() function converts the movie title (a string) into a byte array.
      program.programId
    )
    it("Movie review is added`", async () => {
      const tx=await program.methods.addMovieReview(movie.title,movie.description,movie.rating).rpc();
      const account=await program.account.movieAccountState.fetch(moviePda);
      expect(movie.title===account.title);
      expect(movie.title === account.title);
      expect(movie.rating === account.rating);
      expect(movie.description === account.description);
      expect(account.reviewer === provider.wallet.publicKey);
    });
 
    it("Movie review is updated`", async () => {
      const newDescription="Wow this is fine";
      const newRating=4;
      const tx=await program.methods.updateMovieReview(movie.title,newDescription,newRating).rpc();
      const account = await program.account.movieAccountState.fetch(moviePda);
  expect(movie.title === account.title);
  expect(newRating === account.rating);
  expect(newDescription === account.description);
  expect(account.reviewer === provider.wallet.publicKey);
    });
   
    it("Deletes a movie review", async () => {
      const tx=await program.methods.deleteMovieReview(movie.title).rpc();
      console.log(tx);
    });
  
});
