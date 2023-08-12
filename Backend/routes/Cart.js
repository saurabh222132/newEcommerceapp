const express = require("express");
const {
  addToCart,
  fetchCartByUser,
  deleteFromCart,
  updateCart,
} = require("../controller/Cart");
const { verifyJWT } = require("../middleware/verifyJWT.js");

const router = express.Router();
//  /products is already added in base path

router.use(verifyJWT);
router
  .post("/", addToCart)
  .get("/", fetchCartByUser)
  .delete("/:id", deleteFromCart)
  .patch("/:id", updateCart);

exports.router = router;
