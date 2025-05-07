const bcrypt = require("bcryptjs");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const { createAccessToken, createRefreshToken } = require("../utils/token");
// FOR Random username
const generateUsername = require("../utils/generateUserName");

exports.signUser = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    //check is user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exsists" });
    }

    //hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    //create user
    //add username
    const username = generateUsername()
    console.log(username)
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      username
    });
    //respond
    res.status(201).json({ message: "User signed up", userID: user._id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Signup Failed", error: err.message });
  }
};

//LOGIN
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    //find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentilas" });
    }
    //create password
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(400).json({ message: "Invalid credentilas" });
    }
    //generate token
    const payload = { id: user._id, email: user.email };
    const accessToken = createAccessToken({ id: user.id, email: user.email });
    const refreshToken = createRefreshToken(payload);

    //send refrsh token only as http cookie
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      path: "/refresh_token",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    //responding with acess token and user details
    res
      .status(200)
      .json({
        message: "Login successful",
        accessToken,
        user: { name: user.name, email: user.email },
      });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Login Failed", error: err.message });
  }
};
exports.refreshToken = (req, res) => {
  const token = req.cookies.refreshToken;
  if (!token) {
    return res.sendStatus(401);
  }
  jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
    if (err) {
      return res.sendStatus(403);
    }
    const accessToken = createAccessToken({ id: user.id, email: user.email });
    res.json({ accessToken });
  });
};
exports.userHandler = async (req, res) => {
  const token = req.headers.authorization?.split(' ')[1]; // etracts token from "Bearer <token>"
  console.log( "token" ,token);

  if (!token) {
    return res.status(401).json({ message: "Not authorized" });
  }
  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    console.log("access token" , process.env.ACCESS_TOKEN_SECRET);
    
    // fetch user from database based on decoded id
    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json({ name: user.name, email: user.email , username: user.username}); //sends back user name and email
  } catch (err) {
    console.error(err);
    res.status(403).json({ message: "invalid token" });
  }
};
