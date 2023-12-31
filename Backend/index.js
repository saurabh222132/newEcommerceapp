const express = require("express");
const server = express();
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();
const cookieParser = require("cookie-parser");

const { createProduct } = require("./controller/Product");
const productsRouter = require("./routes/Products");
const categoriesRouter = require("./routes/Categories");
const brandsRouter = require("./routes/Brands");
const usersRouter = require("./routes/Users");
const authRouter = require("./routes/Auth");
const cartRouter = require("./routes/Cart");
const ordersRouter = require("./routes/Order");
const { ShowIncommingRequest } = require("./middleware/showIncommingRequests");

//middlewares

server.use(
  cors({
    exposedHeaders: ["X-Total-Count"],
    credentials: true,

    origin: [
      "http://localhost:3000",
      "https://main--stupendous-hotteok-6cf370.netlify.app",
    ],
  })
);
server.use(ShowIncommingRequest); //it is used to show which request is comming no need for devploy
server.use(cookieParser());
server.use(express.json()); // to parse req.body
server.use("/products", productsRouter.router);
server.use("/categories", categoriesRouter.router);
server.use("/brands", brandsRouter.router);
server.use("/users", usersRouter.router);
server.use("/auth", authRouter.router);
server.use("/cart", cartRouter.router);
server.use("/orders", ordersRouter.router);

main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect(`${process.env.URI}`);
  console.log("database connected");
}

server.get("/", (req, res) => {
  setTimeout(() => {
    res.json({ status: "live" });
  }, 10000);
});

server.listen(process.env.PORT, () => {
  console.log(`server started at port ${process.env.PORT} `);
});
