const asyncHandler = require('express-async-handler');
const User = require('../db/user');
const { createSecretToken } = require("../utils/secretToken");
const bcrypt = require('bcrypt');
require("dotenv").config();
const jwt = require("jsonwebtoken");




//For user registration
const registerController = asyncHandler(async (req, res, next) => {
    const { username, password, email, phone } = req.body;
    //validation
    if (!username) {
        return res.send({ error: 'Username is required' })
    }
    if (!email) {
        return res.send({ error: 'Email is required' })
    }
    if (!password) {
        return res.send({ error: 'Password is required' })
    }
    if (!phone) {
        return res.send({ error: 'Phone is required' })
    }
    const existingUser = await User.findOne({ email })
    //existing user
    if (existingUser) {
        return res.status(200).send({
            success: true,
            message: 'Already register please login'
        })
    }
    const user = await User.create({ username, password, email, phone });
    const token = createSecretToken(user._id);
    res.cookie("token", token, {
        withCredentials: true,
        httpOnly: false,
    });
    res
        .status(201)
        .json({ message: "User signed in successfully", success: true, user });
    next();

});



//For user Login
const loginController = asyncHandler(async (req, res, next) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.json({ message: 'All fields are required' })
    }
    const user = await User.findOne({ username });

    if (!user) {
        return res.status(401).json({ error: 'Invalid username or Password' });
    }

    const auth = await bcrypt.compare(password, user.password)
    if (!auth) {
        return res.json({ message: 'Invalid username or Password' })
    }

    const token = createSecretToken(user._id);
    res.cookie("token", token, {
        withCredentials: true,
        httpOnly: false,
    });
    res.status(201).json({ message: "User logged in successfully", success: true });
    next();
});


// For User Verification code
const userVerification = (req, res) => {
    const token = req.cookies.token
    if (!token) {
        return res.json({ status: false })
    }
    jwt.verify(token, process.env.TOKEN_KEY, async (err, data) => {
        if (err) {
            return res.json({ status: Error })
        } else {
            const user = await User.findById(data.id)
            if (user) return res.json({ status: true, user: user.username, message: "User is successfully verified" })
            else return res.json({ status: false })
        }
    })
}




//exporting controllers
module.exports = { loginController, registerController, userVerification };
