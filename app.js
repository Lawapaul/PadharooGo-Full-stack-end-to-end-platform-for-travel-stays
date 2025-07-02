require('dotenv').config()

const express=require('express');
const app=express();
const path=require("path");
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const engine = require('ejs-mate');
const ExpressError=require("./utils/ExpressError.js");
const session=require('express-session');
const MongoStore = require('connect-mongo');
const flash=require('connect-flash');
const passport = require('passport');
const LocalStrategy = require('passport-local'); 
const User = require('./models/user');

app.engine('ejs', engine);
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.static(path.join(__dirname,"public")));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride('_method'));

const uri = process.env.atlasDB;

const store = MongoStore.create({
    mongoUrl: uri,
    crypto: {
    secret: process.env.secret
    },
    touchAfter: 24*3600,
});

store.on("error", ()=>{
    console.log("Error in store");
})
const sessionOptions={
    store,
    secret: process.env.secret,
    resave: false,
    saveUninitialized: true,
    cookie:{
        expires: Date.now() + 7*24*60*60*1000,
        maxAge: 7*24*60*60*1000,
        httpOnly: true,
    }

}

app.use(session(sessionOptions));
app.use(flash());

//Passport - Move this BEFORE routes
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req,res,next)=>{
    res.locals.success=req.flash("success");
    res.locals.error=req.flash("error");
    res.locals.currentUser = req.user;
    next();
})

const listingRouter = require("./routes/listing.js");
const reviewRouter = require("./routes/review.js");
const userRouter = require("./routes/user.js");
const port = 8000;




async function main(){
    return await mongoose.connect(uri);
}
main().then(()=>{
    console.log("Connected to Database");
})
.catch((err)=>{
    console.error("Error connecting to Database:", err);
});

app.use("/listings",listingRouter)
app.use("/listings/:id/reviews",reviewRouter)
app.use("/",userRouter);

app.all("*",(req,res,next)=>{
    next(new ExpressError(404,"Page Not Found!"))
})

app.use((err, req, res, next) => {
    let { statusCode = 500, message = "Something went wrong" } = err;
    res.status(statusCode).render("error.ejs",{err,message})
});

app.listen(port,()=>{
    console.log("Listening");
})