
const Listing = require("../models/listing");
const Review = require("../models/review");

module.exports.Review = async (req, res) => {
    let { id } = req.params;
    let listing = await Listing.findById(id).populate("reviews");
    let { rating, comment } = req.body.review;
    
    let newReview = new Review({
        rating: rating,
        comment: comment
    });
    newReview.author = req.user._id;
    listing.reviews.push(newReview);
    await newReview.save();
    await listing.save();
    req.flash("success","Review Created!");
    res.redirect(`/listings/${id}`);
}

module.exports.deleteReview = async (req, res) => {
    let { id, reviewId } = req.params;
    await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    await Review.findByIdAndDelete(reviewId);
    req.flash("success","Review Deleted!");
    res.redirect(`/listings/${id}`);
}