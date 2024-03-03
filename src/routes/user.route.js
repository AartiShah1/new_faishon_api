const express = require("express");
const routers = express.Router();
const userController = require("../controllers/user.controller");

routers.get("/getUsers", userController.getUsers);

routers.get("/getUserbyEmail", userController.getUser);

routers.post("/createUser", userController.createUser);

routers.put("/updateUser", userController.updateUser);

routers.delete("/deleteUser", userController.deleteUser);

routers.get('/status/count', userController.getTotalCounts);



module.exports = routers;
