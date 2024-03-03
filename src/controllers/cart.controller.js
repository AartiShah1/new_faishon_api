const cartModel = require("../models/cart.model");

async function getCart(req, res) {
  const userId = req.query.userId;
  await cartModel.getusercart(Number(userId)).then((result) => {
    if (result) {
      res.send(result);
    } else res.status(500).send({ error: "Internal Server Error." });
  });
}

async function getCartByCartId(req, res) {
  const cartId = req.query.cartId;
  await cartModel.getusercartByCartId(Number(cartId)).then((result) => {
    if (result) {
      res.send(result);
    } else res.status(500).send({ error: "Internal Server Error." });
  });
}

async function getusercartDetails(req, res) {
  const cartId = req.query.cartId;
  await cartModel.getusercartDetails(Number(cartId)).then((result) => {
    if (result) {
      res.send(result);
    } else res.status(500).send({ error: "Internal Server Error." });
  });
}

async function createCart(req, res) {
  const cartData = req.body;
  if (
    Number(cartData.userId) <= 0 ||
    !cartData.name ||
    !cartData.address ||
    !cartData.totalPrice ||
    !cartData.totalQnty ||
    cartData.shoppingCart.length <= 0
  )
    return res.send({ message: "information missing" });

  await cartModel
    .createCart(cartData)
    .then(async (result) => {
      const detailsCids = [];
      const cid = result[1][0].cartId;
      if (cid > 0) {
        for (let i = 0; i < cartData.shoppingCart.length; i++) {
          let data = {
            cartId: cid,
            productId: cartData.shoppingCart[i].id,
            quantity: cartData.shoppingCart[i].qty,
            price: cartData.shoppingCart[i].product_price,
            unitId: cartData.shoppingCart[i].unit,
            total: cartData.shoppingCart[i].TotalProductPrice,
          };
          let detailsIds = await cartModel.createCartDetails(data);
          detailsCids.push(detailsIds[1][0].cartId);
        }
      }
      if (detailsCids.length > 0) res.send({ message: `Cart inserted.` });
      else res.send({ message: `Something wrong. Data not inserted.` });
    })
    .catch((err) => {
      console.log(err, "error while saving data");
      return res.status(500).send({ error: "Internal Server Error." });
    });
}

async function updateCart(req, res) {
  const cartData = req.body;

  if (
    cartData.id <= 0 ||
    !cartData.customer_name ||
    !cartData.address ||
    !cartData.total_price ||
    !cartData.deliverycharge ||
    !cartData.discount ||
    !cartData.tax ||
    !cartData.total_payable
  )
    return res.status(404).send({ error: "information missing" });

  await cartModel
    .updateCart(cartData)
    .then(() => {
      res.send({ message: `User Data updated.` });
    })
    .catch((err) => {
      console.log(err, "error while updating data");
      return res.status(500).send({ error: "Internal Server Error." });
    });
}



async function cancelCart(req, res) {
  const cartId = req.query.cartId;
  if (Number(cartId) <= 0) return res.status(404).send({ error: "information missing" });

  await cartModel
    .cancelCart(Number(cartId))
    .then(() => {
      res.send({ message: `User Data updated.` });
    })
    .catch((err) => {
      console.log(err, "error while updating data");
      return res.status(500).send({ error: "Internal Server Error." });
    });
}

async function acceptCart(req, res) {
  const cartId = req.query.cartId;
  if (Number(cartId) <= 0) return res.status(404).send({ error: "information missing" });

  await cartModel
    .acceptCart(Number(cartId))
    .then(() => {
      res.send({ message: `User Data updated.` });
    })
    .catch((err) => {
      console.log(err, "error while updating data");
      return res.status(500).send({ error: "Internal Server Error." });
    });
}

async function placedCart(req, res) {
  const cartId = req.query.cartId;
  if (Number(cartId) <= 0) return res.status(404).send({ error: "information missing" });

  await cartModel
    .placedCart(Number(cartId))
    .then(() => {
      res.send({ message: `User Data updated.` });
    })
    .catch((err) => {
      console.log(err, "error while updating data");
      return res.status(500).send({ error: "Internal Server Error." });
    });
}


async function deleteCart(req, res) {
  const userEmail = req.query.email;
  const id = req.query.id;

  const email = userModel.getCart(userEmail);
  if (!email) return res.status(404).send({ error: "User is not registered" });

  await cartModel
    .deleteCart(id)
    .then(() => {
      res.send({ message: `User Data deleted.` });
    })
    .catch((err) => {
      console.log(err, "error while deleting data");
      return res.status(500).send({ error: "Internal Server Error." });
    });
}

module.exports = { getCart, getCart, createCart, updateCart, deleteCart,getusercartDetails, getCartByCartId,cancelCart,placedCart, acceptCart };
