const express = require("express");
const router = express.Router();
const User=require("../models/user.js");

module.exports.signup = (req,res)=>{
    res.render("./users/signup.ejs");
}

module.exports.signupPOST = async(req,res,next)=>{
    try{
        let {username,email,password}=req.body;
        const newUser= new User({username,email})
        const Registered=await User.register(newUser,password)
        req.login(Registered,(err)=>{
            if(err){
                return next(err);
            }
            req.flash("success","Welcome to PadharooGo")
            res.redirect("/listings"); 
        })
        
    }catch(err){
        req.flash("error",err.message);
        res.redirect("/signup");
    }
   
}

module.exports.login = (req,res)=>{
    res.render("./users/login.ejs"); 
}

module.exports.loginPOST = async(req,res)=>{
    console.log("Login successful, session redirectURL:", req.session.redirectURL);
    req.flash("success","Welcome to PadharooGo");
    let redirectUrl = req.session.redirectURL || '/listings';
    console.log("Redirecting to:", redirectUrl);
    delete req.session.redirectURL;
    return res.redirect(redirectUrl);
}
module.exports.logout = (req,res,next)=>{
    req.logout((err)=>{
        if(err){
            return next(err);
        }
        req.flash("success","Successfully logged Out");
        res.redirect("/listings");
    })
   
}

module.exports.demoUser = async(req,res,next)=>{
    try{
        let demoUser = await User.findOne({username: "demo"});
        if(!demoUser){
            demoUser = new User({
                email: "customdomain.08@gmail.com",
                username: "demo",
            })
            await User.register(demoUser,"demo");
        }
        req.login(demoUser,(err)=>{
            if(err){
                return next(err);
            }
            req.flash("success","Welcome to PadharooGo! You are logged in as Demo User");
            return res.redirect("/listings");
        })
    }catch(err){
        next(err);
    }
    
}