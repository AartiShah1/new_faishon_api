const productModel = require("../models/product.model");
const inventoryModel = require("../models/inventory.model");
async function getAllproducts(req, res) {
  // const userData = req.body; // req.query
  await productModel.getallproduts().then((result) => {
    if (result) {
      res.send(result);
    } else res.status(500).send({ error: "Internal Server Error." });
  });
}

async function getParticularProduct(req, res) {
  const id = req.query.id;
  await productModel.getParticularProduct(id).then((result) => {
    if (result) {
      if (result.length > 0) res.send(result);
      else res.send({ message: `Product not found` });
    } else res.status(500).send({ error: "Internal Server Error." });
  });
}

async function getProductUnit(req, res) {
  await productModel.getProductUnit().then((result) => {
    if (result) {
      if (result.length > 0) res.send(result);
      else res.send({ message: `Unit not found` });
    } else res.status(500).send({ error: "Internal Server Error." });
  });
}

async function getProductCategory(req, res) {
  await productModel.getProductCategory().then((result) => {
    if (result) {
      if (result.length > 0) res.send(result);
      else res.send({ message: `Category not found` });
    } else res.status(500).send({ error: "Internal Server Error." });
  });
}

async function createProduct(req, res) {
  const productData = req.body;
  console.log(productData)
  if (
    !productData.product_name ||
    !productData.product_price ||
    
    !productData.category ||
    !productData.description ||
    !productData.unit ||
    !productData.file
  )
    return res.status(404).send({ error: "information missing" });

  await productModel
    .createProduct(productData)
    .then(async (result) => {
      const pid = result[1][0].id;
      const data = {
        productId: pid,
        quantity: 0,
        unit: productData.unit,
      };
      await inventoryModel.createInventory(data).then(() => {
        res.send({ message: `Product inserted.` });
      });
    })
    .catch((err) => {
      console.log(err, "error while saving data");
      return res.status(500).send({ error: "Internal Server Error." });
    });
}

async function updateProduct(req, res) {
  const productData = req.body;
  console.log(productData)
  await productModel
    .updateProduct(productData)
    .then(async (result) => {
      const pid = productData.id;
      const data = {
        productId: pid,
        quantity: 0,
        unit: productData.unit,
      };
      await inventoryModel.updateInventory(data).then(() => {
        res.send({ message: `Product Updated.` });
      });
    })
    .catch((err) => {
      console.log(err, "error while saving data");
      return res.status(500).send({ error: "Internal Server Error." });
    });

}

async function deleteProduct(req, res) {
  const id = req.query.id;

  await productModel
    .deleteProduct(id)
    .then(() => {
      res.send({ message: `product Data deleted.` });
    })
    .catch((err) => {
      console.log(err, "error while deleting data");
      return res.status(500).send({ error: "Internal Server Error." });
    });
}

module.exports = {
  getAllproducts,
  getParticularProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductUnit,
  getProductCategory
};
