const express = require("express");
const router = express.Router();
const usercartController = require("../controllers/cart.controller");

router.get("/getCart", usercartController.getCart);
router.get("/getCartByCartId", usercartController.getCartByCartId);
router.get("/getusercartDetails", usercartController.getusercartDetails);
router.post("/createCart", usercartController.createCart);
router.post("/updateCart", usercartController.updateCart);
router.delete("/cancelCart", usercartController.cancelCart);
router.put("/acceptCart", usercartController.acceptCart);
router.delete("/placedCart", usercartController.placedCart);


router.post("/deleteCart", usercartController.deleteCart);



module.exports = router;