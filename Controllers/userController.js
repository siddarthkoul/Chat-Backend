const express = require('express');
const UserModel  = require("../Models/userModel");
const asyncHandler = require('express-async-handler');

const loginController = () => {};
const signupController = asyncHandler (async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).send("All necessary input fields are required");
    }

    // Check if email already exists
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
});

module.exports = {loginController, signupController}
  