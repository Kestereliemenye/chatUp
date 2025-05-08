const express = require("express");
const router = express.Router();
const { signUser, loginUser, refreshToken, userHandler, updateProfile } = require("../controllers/authController");

//signup route
router.post("/signup", signUser);

//login route
router.post("/login", loginUser);

//refresh token route
router.get("/refresh_token", refreshToken);

//get user route
router.get("/user", userHandler)

//update profile route
router.put("/user/update/profile", updateProfile)

module.exports = router;