const express = require("express");
const { fetchBrands, createBrand } = require("../controller/Brand");

const router = express.Router();
//  /brands is already added in base path
const { verifyJWT } = require("../middleware/verifyJWT");
router.use(verifyJWT);
router.get("/", fetchBrands).post("/", createBrand);

exports.router = router;
