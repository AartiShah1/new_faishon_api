const express = require("express");
const routers = express.Router();
const productController = require("../controllers/product.controller");

routers.get("/getallProducts", productController.getAllproducts);

routers.get("/unit",productController.getProductUnit);

routers.get("/category",productController.getProductCategory);

routers.get("/getproductbyid", productController.getParticularProduct);

routers.post("/createProduct", productController.createProduct);

routers.put("/updateProduct", productController.updateProduct);

routers.delete("/deleteProduct", productController.deleteProduct);

module.exports = routers;
