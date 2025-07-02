const mongoose = require('mongoose');
const Listing = require('../models/listing');
const initData = require("./data");
async function main(){
    return await mongoose.connect('mongodb://127.0.0.1:27017/airbnb');
}
main().then(()=>{
    console.log("Connected to Database");
})
.catch((err)=>{
    console.log("Error");
})

const initDB = async () =>{
   await Listing.deleteMany({});
   initData.data = initData.data.map((obj)=>({...obj,owner: '68612588c711f6e4f8e9b5b5'}))
   await Listing.insertMany(initData.data);
}
initDB();