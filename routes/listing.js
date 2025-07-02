const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js")
const ExpressError=require("../utils/ExpressError.js");
const { listingSchema,} = require("../schema.js");
const { isLoggedIn, isOwner } = require('../Middlewares/isLoggedIn.js')
const listingController = require('../Controllers/listing.js');
const Listing=require('../models/listing.js');
const multer = require('multer');
const {storage} = require("../cloudConfig.js")
const upload = multer({storage});
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const mapToken = process.env.mapToken;''
const geocodingClient = mbxGeocoding({accessToken : mapToken})


const validateListing = (req,res,next) => {
    let result = listingSchema.validate(req.body); 
    if(result.error){
        req.flash('error',`${result.error.details.map(el => el.message).join(",")}`);
        return res.redirect('/listings/new');
    }else{
        next();
    }
};
//Index Route
router.get("/", wrapAsync(listingController.index));

//New Route
router.route("/new")
.get(isLoggedIn, listingController.new)
.post(
    isLoggedIn,
    upload.single('listing[image][url]'),
    validateListing,
    wrapAsync(listingController.newPost)
);

//Edit Route
router.route('/edit/:id')
.get(isLoggedIn,isOwner,wrapAsync(listingController.edit))
.put(isLoggedIn,isOwner, upload.single("listing[image][url]"),validateListing,wrapAsync(listingController.update));

router.delete("/delete/:id",isLoggedIn,isOwner,wrapAsync(listingController.deleteListing));

router.get("/:id",wrapAsync(listingController.renderEdit));

router.post("/destination",async(req,res)=>{
    let {city} = req.body;
    console.log(city);
    return res.redirect(`/listings?destination=${city}`);
})
module.exports = router