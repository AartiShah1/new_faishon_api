// const {port} = require('./src/helper')

const express = require("express");
const app = express();

const bodyParser = require("body-parser");
const { json, urlencoded } = bodyParser;

app.use(urlencoded({ extended: false }));
app.use(json());

const cors = require("cors");

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "UPDATE"],
  })
);

app.get("/", (req, res) => {
  res.send("My api is Connected Successfully!!!");
});

const port = process.env.PORTS || 4500;

//const { lookup } = require("dns");
app.listen(port, () => {
  console.log(`API started Port:${port}`);
});

const userRoute = require("./src/routes/user.route");
app.use("/users", userRoute);

const productRoute = require("./src/routes/product.route");
app.use("/product", productRoute);

const inventoryRoute = require("./src/routes/inventory.route");
app.use("/inventory", inventoryRoute);

const loginRoute = require("./src/routes/login.route");
app.use("/login", loginRoute);

//localhost:4500/users/getUsers

const product = require("./src/routes/product.route");
app.use("/product", product);

app.use(express.static("src"));
app.use("/images", express.static("files"));

const fileUpload = require("./src/routes/file.upload.route");
app.use("/upload", fileUpload);

const cartRoute = require("./src/routes/cart.route");
app.use("/usercart", cartRoute);