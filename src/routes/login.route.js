const express = require("express");
const router = express.Router();
const loginRoute = require("../controllers/login.controller");

router.post("/userLogin", loginRoute.userLogin);

module.exports = router;
