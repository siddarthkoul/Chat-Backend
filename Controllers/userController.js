const express = require('express');
const UserModel = require("../Models/userModel");
const asyncHandler = require('express-async-handler');
const generateToken = require('../config/generateToken');

const app = express();
app.use(express.json()); // Add this line to parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Add this line to parse URL-encoded bodies

const loginController = asyncHandler(async (req, res) => {
    const { name, password } = req.body;
    const user = await UserModel.findOne({ name });
    console.log("fetched user data", user);
    console.log(await user.matchPassword(password));
    if (user && (await user.matchPassword(password))) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id)
        });
    } else {
        throw new Error("Invalid password or Username ")
    }
});

const signupController = asyncHandler(async (req, res) => {
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
    const user = await UserModel.create({ name, email, password });
    if (user) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id)
        })
    } else {
        res.status(400).send("registration error")
    }
});

module.exports = { loginController, signupController };
