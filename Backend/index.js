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

    origin: ["http://localhost:3000"],
  })
);
server.use(ShowIncommingRequest);
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
  res.json({ status: "Server is alive!" });
});

server.listen(process.env.PORT, () => {
  console.log(`server started at port ${process.env.PORT} `);
});
