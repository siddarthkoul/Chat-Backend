const express = require('express');
const UserModel  = require("../Models/userModel");
const asyncHandler = require('express-async-handler');
const generateToken = require('../config/generateToken');

const loginController = asyncHandler (async(res,req) => {
    const { name,  password } = req.body;
    const User = await UserModel.findOne({name});
    if(User&&(await User.matchPassword(password)))
    {
        res.json({
            _id : user._id,
            name : user.name,
            email : user.email,
            isAdmin : user.isAdmin,
            token : generateToken(User._id)
        });
    }
    else{
         throw new Error("Invalid password or Username ")
    }
}) ;
const signupController = asyncHandler (async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).send("All necessary input fields are required");
    }

    // Check if email already ex ists
    const userExist = await UserModel.findOne({ email });
    if (userExist) {
        return res.status(400).send("User already exists");
    }

    // Check if username already exists
    const usernameExist = await UserModel.findOne({ name });
    if (usernameExist) {
        return res.status(400).send("Username already taken");
    }

    //creating a new user
    const user = await UserModel.create({name, email, password});
    if(user){
        res.status(201).json({
            _id : user._id,
            name : user.name,
            email : user.email,
            isAdmin : user.isAdmin,
            token : generateToken  (user._id)
        })
        }
        else{
            res.status(400).send("resgistration error")
        }
      });

module.exports = {loginController, signupController}
  