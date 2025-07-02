const express = require("express");
const router = express.Router({mergeParams: true});
const wrapAsync = require("../utils/wrapAsync.js")
const ExpressError=require("../utils/ExpressError.js");
const { listingSchema, reviewSchema } = require("../schema.js");
const { isLoggedIn, isReviewAuthor } = require('../Middlewares/isLoggedIn.js')
const reviewController = require('../Controllers/reviews.js');

const validateReview = (req,res,next) => {
    let result = reviewSchema.validate(req.body); 
    if(result.error){
        throw new ExpressError(400,result.error.details.map(el => el.message).join(","));
    }else{
        next();
    }
};

router.post("/", isLoggedIn, validateReview, wrapAsync(reviewController.Review));

router.delete("/:reviewId", isLoggedIn,isReviewAuthor, wrapAsync(reviewController.deleteReview));

module.exports=router