use anchor_lang::{prelude::*, solana_program::pubkey::PUBKEY_BYTES};

declare_id!("47cBNi7VsX35eEsZquxYjwpsmtQVcrDDiEpNSVKCwExB");
const MIN_RATING: u8 = 1;
const MAX_RATING: u8 = 5;
const MAX_TITLE_LENGTH: usize = 120;
const MAX_DESCRIPTION_LENGTH: usize = 120;
#[program]
pub mod anchor_movie_review_program {
    use super::*;
    pub fn add_movie_review(
        ctx: Context<AddMovieReview>,
        title: String,
        description: String,
        rating: u8,
    ) -> Result<()> {
        require!(
            rating >= MIN_RATING && rating <= MAX_RATING,
            MovieReviewError::InvalidRating
        );
        require!(
            title.len() <= MAX_TITLE_LENGTH,
            MovieReviewError::TitleTooLong
        );
        require!(
            description.len() <= MAX_DESCRIPTION_LENGTH,
            MovieReviewError::DescriptionTooLong
        );
        msg!("Movie Review Account Created");
        msg!("Title: {}", title);
        msg!("Description: {}", description);
        msg!("Rating: {}", rating);
        let movie_review = &mut ctx.accounts.movie_review;
        movie_review.reviewer = ctx.accounts.initializer.key();
        movie_review.title = title;
        movie_review.rating = rating;
        movie_review.description = description;
        Ok(())
    }
    pub fn update_movie_review(
        ctx: Context<UpdateMovieReview>,
        title: String,
        description: String,
        rating: u8,
    ) -> Result<()> {
        msg!("Movie Review Account space reallocated");
        msg!("Title:{}", title);
        msg!("Description: {}", description);
        msg!("Rating: {}", rating);
        let movie_review = &mut ctx.accounts.movie_review;
        movie_review.rating = rating;
        movie_review.description = description;
        Ok(())
    }
    pub fn delete_movie_review(_ctx: Context<DeleteMovieReview>, title: String) -> Result<()> {
        msg!("Movie review for {} deleted", title);
        Ok(())
    }
}

#[account]
pub struct MovieAccountState {
    pub reviewer: Pubkey,
    pub rating: u8,
    title: String,
    description: String,
}
const ANCHOR_DISCRIMINATOR: usize = 8; // 8 bytes for the discriminator
const STRING_LENGTH_PREFIX: usize = 4;
const RATING_LENGTH_PREFIX: usize = 1; //1 byte
                                       //We will implement some spce for the dynamic nature of this particular MovieStateAccount
impl Space for MovieAccountState {
    const INIT_SPACE: usize = ANCHOR_DISCRIMINATOR
        + PUBKEY_BYTES
        + RATING_LENGTH_PREFIX
        + STRING_LENGTH_PREFIX
        + STRING_LENGTH_PREFIX;
}
#[error_code] //The #[error_code] macro will generate error types to be used as return types from our instruction handlers.
enum MovieReviewError {
    #[msg("Rating must be between 1 and 5")]
    InvalidRating,
    #[msg("Movie title too long")]
    TitleTooLong,
    #[msg("Movie Description too long")]
    DescriptionTooLong,
}

#[derive(Accounts)] // this is to initialize the accounts that will be used for the Add_movie_review Function
#[instruction(title:String,description:String)] // This is to specify the additional inputs which need to be given apart from the Accounts list
pub struct AddMovieReview<'info> {
    #[account(
        init,
        seeds=[title.as_bytes(),initializer.key().as_ref()],
        bump,
        payer=initializer,
        space=MovieAccountState::INIT_SPACE+title.len()+description.len()
    )]
    pub movie_review: Account<'info, MovieAccountState>,
    #[account(mut)]
    pub initializer: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
#[instruction(title:String,description:String)]
pub struct UpdateMovieReview<'info> {
    #[account(
        mut,
        seeds=[title.as_bytes(),initializer.key().as_ref()],
        bump,
        realloc=MovieAccountState::INIT_SPACE+title.len()+description.len(),
        realloc::payer=initializer,// the account to subtract or add lamports to depending on whether the reallocation is decreasing or increasing account space
        realloc::zero=true,
    )]
    pub movie_review: Account<'info, MovieAccountState>,
    #[account(mut)]
    pub initializer: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
#[instruction(title: String)]
pub struct DeleteMovieReview<'info> {
    #[account(
        mut,
        seeds=[title.as_bytes(), initializer.key().as_ref()],
        bump,
        close=initializer //use the close constraint to specify we are closing the movie_review account and that the rent should be refunded to the initializer account.
    )]
    pub movie_review: Account<'info, MovieAccountState>,
    #[account(mut)]
    pub initializer: Signer<'info>,
    pub system_program: Program<'info, System>,
}
