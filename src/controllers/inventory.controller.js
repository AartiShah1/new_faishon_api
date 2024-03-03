const inventoryModel = require("../models/inventory.model");
async function getallinventory(req, res) {
  // const userData = req.body; // req.query
  await inventoryModel.getallinventory().then((result) => {
    if (result) {
      res.send(result);
    } else res.status(500).send({ error: "Internal Server Error." });
  });
}

async function getParticularInventory(req, res) {
  const id = req.query.id;
  await inventoryModel.getParticularInventory(id).then((result) => {
    if (result) {
      if (result.length > 0) res.send(result);
      else res.send({ message: `${id} not found` });
    } else res.status(500).send({ error: "Internal Server Error." });
  });
}

async function createInventory(req, res) {
  const inventoryData = req.body;
  if (
    !inventoryData.productId ||
    !inventoryData.quantity ||
    !inventoryData.unitId
  )
    return res.status(404).send({ error: "information missing" });

  await inventoryModel
    .createInventory(inventoryData)
    .then(() => {
      res.send({ message: `Inventory inserted.` });
    })
    .catch((err) => {
      console.log(err, "error while saving data");
      return res.status(500).send({ error: "Internal Server Error." });
    });
}

async function updateInventory(req, res) {
  try {
    const inventoryData = req.body;
    await inventoryModel.updateInventory(inventoryData);
    res.send({ message: `Inventory Data updated.` });
  } catch (err) {
    console.log(err, "error while updating data");
    return res.status(500).send({ error: "Internal Server Error." });
  }
}

async function increaseInventory(req, res) {
  try {
    const inventoryData = req.body;
    await inventoryModel.updateIncreaseInventory(inventoryData);
    res.send({ message: `Inventory Data updated.` });
  } catch (err) {
    console.log(err, "error while updating data");
    return res.status(500).send({ error: "Internal Server Error." });
  }
}

async function deleteInventory(req, res) {
  const id = req.query.id;

  await inventoryModel
    .deleteInventory(id)
    .then(() => {
      res.send({ message: `inventory Data deleted.` });
    })
    .catch((err) => {
      console.log(err, "error while deleting data");
      return res.status(500).send({ error: "Internal Server Error." });
    });
}

module.exports = {
  increaseInventory,
  getallinventory,
  getParticularInventory,
  createInventory,
  updateInventory,
  deleteInventory,
};
