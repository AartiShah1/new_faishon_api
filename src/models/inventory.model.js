const { dbConn } = require("../../config/config");

class Inventory {
    //   static checkUserexistance(email) {
    //     const query = "select COUNT(email) AS isEmail from users where email = ?";
    //     return new Promise((resolve, reject) => {
    //       dbConn.query(query, [email], (err, res) => {
    //         console.log(err, res);
    //         if (err) reject(err);
    //         else resolve(res[0].isEmail);
    //       });
    //     });
    //   }
    static getallinventory() {
        const query = "SELECT i.id, i.productId, (SELECT p.product_name FROM product p WHERE p.id = i.productId) AS productName, i.quantity, i.unitId, (SELECT u.unit FROM unit u WHERE u.id = i.unitId) AS unitName, i.status FROM inventory i WHERE STATUS = TRUE;";
        return new Promise((resolve, reject) => {
          dbConn.query(query, [], (err, res) => {
            if (err) reject(err);
            else resolve(res);
          });
        });
      }

      static getParticularInventory(id) {
        const query = "select * from inventory where id = ?";
        return new Promise((resolve, reject) => {
          dbConn.query(query, [id], (err, res) => {
            console.log(err, res);
            if (err) reject(err);
            else resolve(res);
          });
        });
      }
    
      static createInventory(inventoryData) {
        const query =
          "insert into inventory (productId,quantity,unitId) values (?,?, (select id from unit where unit = ?))";
        return new Promise((resolve, reject) => {
          dbConn.query(
            query,
            [
              Number(inventoryData.productId),
              Number(inventoryData.quantity),
              inventoryData.unit
            ],
            (err, res) => {
              if (err) reject(err);
              else resolve(res);
            }
          );
        });
      }
    
      static updateInventory(inventoryData) {
        const query =
          "update inventory set productId= ?, unitId = (select id from unit where unit = ?) where productId = ?";
        return new Promise((resolve, reject) => {
          dbConn.query(
            query,
            [
              Number(inventoryData.productId),
              inventoryData.unit,
              Number(inventoryData.productId),
            ],
            (err, res) => {
              if (err) reject(err);
              else resolve(res);
            }
          );
        });
      }

      static updateIncreaseInventory(inventoryData) {
        console.log('inventoryData',inventoryData,'inventoryData.quantity',inventoryData.quantity,'inventoryData.productId',inventoryData.productId)
        const query =
          "update inventory set quantity = ? where id = ?";
        return new Promise((resolve, reject) => {
          dbConn.query(
            query,
            [
              Number(inventoryData.quantity),
              Number(inventoryData.productId),
            ],
            (err, res) => {
              console.log(err, res)
              if (err) reject(err);
              else resolve(res);
            }
          );
        });
      }

      static updateInventoryQuantityOnly(inventoryData) {
        const query =
          "update inventory set quantity =? where id = ?";
        return new Promise((resolve, reject) => {
          dbConn.query(
            query,
            [
              Number(inventoryData.quantity),
              Number(inventoryData.id)
            ],
            (err, res) => {
              if (err) reject(err);
              else resolve(res);
            }
          );
        });
      }
    
      static deleteInventory(id) {
        const query = "delete from inventory where id = ?";
        return new Promise((resolve, reject) => {
          dbConn.query(query, [Number(id)], (err, res) => {
            if (err) reject(err);
            else resolve(res);
          });
        });
      }
    }
    
    module.exports = Inventory;
    