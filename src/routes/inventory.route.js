const express = require("express");
const routers = express.Router();
const inventoryController = require("../controllers/inventory.controller");

routers.get("/getallInventory", inventoryController.getallinventory);

routers.get("/getinventorybyid", inventoryController.getParticularInventory);

routers.post("/createInventory", inventoryController.createInventory);

routers.put("/updateInventory", inventoryController.updateInventory);

routers.put("/increaseInventory", inventoryController.increaseInventory);

routers.delete("/deleteInventory", inventoryController.deleteInventory);

module.exports = routers;

