const express = require("express");
const { fetchUserById, updateUser } = require("../controller/User");
const { verifyJWT } = require("../middleware/verifyJWT");

const router = express.Router();
router.use(verifyJWT);
//  /users is already added in base path
router.get("/:id", fetchUserById).patch("/:id", updateUser);

exports.router = router;
