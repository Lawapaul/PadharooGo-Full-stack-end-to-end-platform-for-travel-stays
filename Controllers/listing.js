const Listing = require('../models/listing.js');
const mongoose = require("mongoose");
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const mapToken = process.env.mapToken;''
const geocodingClient = mbxGeocoding({accessToken : mapToken});


module.exports.index = async (req,res) => {
    const allListings = await Listing.find({});
    let {category} = req.query;
    let {destination} = req.query;
    if(destination){
        const result = await Listing.find({ location: { $regex: destination, $options: "i" } });
        if(!result){
            req.flash("err","City Not Found");
            return res.redirect("/listings");
        }
        return res.render("./listings/index.ejs", { allListings: result });
    }
    if(category){
        const filteredListings=await Listing.find({category: category});
        return res.render("./listings/index.ejs", { allListings: filteredListings });
    }
    return res.render("./listings/index.ejs", { allListings });
}

module.exports.new = (req,res) => {
    res.render("./listings/new.ejs")
}

module.exports.newPost = async(req,res,next)=>{
        let response = await geocodingClient.forwardGeocode({
        query: req.body.listing.location,
        limit: 2
        })
        .send()
        const newListing = new Listing(req.body.listing);
        newListing.owner = req.user._id;
        if(req.file) {
            newListing.image = {
                url: req.file.path,
                filename: req.file.filename
            };
        }
        newListing.geometry= response.body.features[0].geometry;
        await newListing.save();
        console.log(newListing);
        req.flash("success","New Listing Created!");
        res.redirect("/listings");
}

module.exports.edit = async(req,res) => {
    let {id} = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).send("Invalid listing ID");
    }
    let fetched_data=await Listing.findById(id);
    if (!fetched_data) {
        req.flash("error","Listing you requested for does not exist");
        return res.redirect("/listings")
    }
    let originalImageUrl = fetched_data.image.url;
    originalImageUrl=originalImageUrl.replace("/upload","/upload/h_250,w_250")
    res.render("./listings/edit.ejs",{fetched_data,id,originalImageUrl});
}

module.exports.update = async(req,res) => {
    let {id} = req.params;
    if(!req.body.listing){
        throw new ExpressError(404,"Send Valid data for listing")
    }
    let listing = await Listing.findByIdAndUpdate(id, req.body.listing);
    if(req.file) {
            listing.image = {
                url: req.file.path,
                filename: req.file.filename
            };
        }
    await listing.save();
    req.flash("success","Listing Updated!");
    res.redirect(`/listings/${id}`);
}

module.exports.deleteListing = async (req,res)=>{
    let {id}=req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).send("Invalid listing ID");
    }
    await Listing.findByIdAndDelete(id);
    req.flash("success","Listing Deleted!");
    res.redirect("/listings");
}

module.exports.renderEdit = async(req,res) => {
    let {id} = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).send("Invalid listing ID");
    }
    let information = await Listing.findById(id).populate({path: "reviews",populate: {path: "author"}}).populate('owner');
    if (!information) {
        req.flash("error","Listing you requested for does not exist");
        return res.redirect("/listings")
    }
    console.log(`Result: ${res.locals.currentUser ? res.locals.currentUser._id : 'No user logged in'}` );
    res.render("./listings/Individual.ejs",{information,id,currentUser: res.locals.currentUser});
}