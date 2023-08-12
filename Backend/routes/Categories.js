const express = require("express");
const { fetchCategories, createCategory } = require("../controller/Category");
const { verifyJWT } = require("../middleware/verifyJWT");

const router = express.Router();
//  /categories is already added in base path
router.use(verifyJWT);
router.get("/", fetchCategories).post("/", createCategory);

exports.router = router;
