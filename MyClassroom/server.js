const express=require('express');
const app=express();
const session = require('express-session');
const flash = require('connect-flash');
const path=require("path");
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views")); 
const sessionOption={
    secret: 'mysupersecretstring',
    resave: false,
    saveUninitialized: true,
}
app.use(session(sessionOption));
app.use(flash());         
app.get("/test",(req,res)=>{
    res.send("Test Successfull....");
})

app.get("/register",(req,res)=>{
    let {name = "Anonymous"}=req.query;
    req.session.name=name;
    if(name == "Anonymous"){
        req.flash("err","User not Registered");
    }
    else{
        req.flash("Success","User Added Successfully");
    }
    res.redirect("/display");
})

app.get("/display",(req,res)=>{
    res.locals.success=req.flash("Success");
    res.locals.error=req.flash("err");
    res.locals.name=req.session.name;
    res.render("./home.ejs");
})
app.listen(3000,(req,res)=>{
    console.log("Connected...");
})