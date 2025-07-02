const Listing = require("../models/listing");
const mongoose = require('mongoose');
const Review = require("../models/review");

module.exports.isLoggedIn = (req,res,next)=>{
    if(!req.isAuthenticated()){
        req.session.redirectURL = req.originalUrl;
        req.flash("error","You must log in");
        return res.redirect("/login");
    }
    next();
}
module.exports.redirectURL = (req,res,next)=>{
    if(req.session.redirectURL){
        res.locals.redirectURL=req.session.redirectURL;
    }
    next();
}
module.exports.isOwner = async(req,res,next)=>{
    let {id}=req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).send("Invalid listing ID");
    }
    let listing = await Listing.findById(id).populate('owner');
    if(!listing) {
        req.flash('error',"Listing not found");
        return res.redirect('/listings');
    }
    if(!res.locals.currentUser || !listing.owner._id.equals(res.locals.currentUser._id)){
        req.flash('error',"You dont have permission to edit");
        return res.redirect(`/listings/${id}`);
    }
    next();
}
module.exports.isReviewAuthor = async(req,res,next)=>{
    let {id,reviewId}=req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).send("Invalid listing ID");
    }
    if (!mongoose.Types.ObjectId.isValid(reviewId)) {
        return res.status(404).send("Invalid review ID");
    }
    let review = await Review.findById(reviewId);
    if(!review) {
        req.flash('error',"Review not found");
        return res.redirect(`/listings/${id}`);
    }
    if(!res.locals.currentUser || !review.author.equals(res.locals.currentUser._id)){
        req.flash('error',"You are not the author of this review");
        return res.redirect(`/listings/${id}`);
    }
    next();
}