const mongoose = require('mongoose');
const { type } = require('os');
const { title, ref } = require('process');
const review=require("./review.js");
const { required } = require('joi');

const ListingSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: String,
    image: {
        filename: String,
        url: {
            type: String,
            default: "ind",
            set: (v) => {
                return v === "" ? "https://plus.unsplash.com/premium_vector-1721890983105-625c0d32045f?q=80&w=2960&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" : v;
            }
        }
    },
    price: Number,
    location: String,
    country: String,
    category: {
        type: String,
        enum: ['Trending','Rooms','Iconic Cities','Mountains','Castles','Amazing Pools','Camping','Farms','Artic','Domes','Boats'],
        required: true
    },
    reviews: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Review",
        }
    ],
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    geometry: {
        type: {
            type: String, 
            enum: ['Point'], 
            required: true
        },
        coordinates: {
            type: [Number],
            required: true
        }
    }
});

ListingSchema.post("findOneAndDelete",async(listing)=>{
    if(listing){
        await review.deleteMany({_id : {$in: listing.reviews}});
    }
})
const Listing = mongoose.model("Listing",ListingSchema);
module.exports=Listing;