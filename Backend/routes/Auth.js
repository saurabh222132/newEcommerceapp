const express = require("express");
const {
  createUser,
  loginUser,
  refreshToken,
  Logout,
} = require("../controller/Auth");

const router = express.Router();
//  /auth is already added in base path
router
  .post("/signup", createUser)
  .post("/login", loginUser)
  .get("/logout", Logout)
  .get("/refresh", refreshToken);

exports.router = router;
