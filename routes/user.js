const express = require("express");
const router = express.Router();
const User=require("../models/user.js");
const wrapAsync = require("../utils/wrapAsync");
const passport = require("passport");
const {redirectURL} = require("../Middlewares/isLoggedIn.js");
const userController = require('../Controllers/user.js'); 

router.route("/signup")
.get(userController.signup)
.post(wrapAsync(userController.signupPOST));

router.route("/login")
.get(userController.login)
.post(redirectURL,passport.authenticate("local",{
    failureRedirect: '/login',
    failureFlash: true,
}),userController.loginPOST);

router.get("/logout",userController.logout);
router.post("/login/demo",wrapAsync(userController.demoUser));
module.exports=router;