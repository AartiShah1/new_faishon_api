const { dbConn } = require("../../config/config");
class Cart {
  // static createCart(cartData) {
  //   const query =
  //   //   "insert into cart(cartId,productId,quantity,price,unitId,total) values((SELECT c.usercart FROM usercart c WHERE c.usercart = ?),(SELECT p.id FROM product p WHERE p.product = ?),?,?,(SELECT u.id FROM unit u WHERE u.unit = ?),?);SELECT id FROM usercart ORDER BY id DESC"
  //   "insert into usercart(cartId,productId,quantity,price,unitId,total) values(?,?,?,?,?,?);SELECT cartId FROM cardDetail ORDER BY id DESC;"

  //   return new Promise((resolve, reject) => {
  //     dbConn.query(
  //       query,
  //       [
  //         // cartData.cartId,
  //         cartData.productId,
  //         cartData.quantity,
  //         cartData.price,
  //         cartData.unitId,
  //         cartData.total,
  //       ],
  //       (err, res) => {
  //         if (err) reject(err);
  //         else resolve(res);
  //       }
  //     );
  //   });
  // }

  static getusercart(userId) {
    // const query = `SELECT uc.cartId, uc.userId, (SELECT u.email FROM users u WHERE u.id = uc.userId) AS email, (SELECT u.phone FROM users u WHERE u.id = uc.userId) AS phoneNo ,(SELECT u.name FROM users u WHERE u.id=uc.userId) As customer_name, uc.address, uc.totalQnty, uc.total_price, uc.date, uc.orderStatus FROM usercart uc`;
    // if(userId > 0) query + ` WHERE userId = ${userId}`

    var query = `SELECT uc.cartId, uc.userId, (SELECT u.email FROM users u WHERE u.id = uc.userId) AS email, (SELECT u.phone FROM users u WHERE u.id = uc.userId) AS phoneNo ,(SELECT u.name FROM users u WHERE u.id=uc.userId) As customer_name, uc.address, uc.totalQnty, uc.total_price, uc.date, uc.orderStatus FROM usercart uc`;
    if (userId > 0) query += ` WHERE userId = ${userId}`;

    return new Promise((resolve, reject) => {
      dbConn.query(query, [userId], (err, res) => {
        if (err) reject(err);
        else resolve(res);
      });
    });
  }

  static getusercartByCartId(cartId) {
    const query =
      "SELECT uc.cartId, uc.userId, (SELECT u.email FROM users u WHERE u.id = uc.userId) AS email, (SELECT u.phone FROM users u WHERE u.id = uc.userId) AS phoneNo ,(SELECT u.name FROM users u WHERE u.id=uc.userId) As customer_name, uc.address, uc.totalQnty, uc.total_price, uc.date, uc.orderStatus FROM usercart uc WHERE cartId = ?";
    return new Promise((resolve, reject) => {
      dbConn.query(query, [cartId], (err, res) => {
        if (err) reject(err);
        else resolve(res);
      });
    });
  }

  static getusercartDetails(cartId) {
    const query =
      "SELECT cd.id, cd.cartId, cd.productId,(SELECT p.product_name FROM product p WHERE p.id = cd.productId) AS productName, cd.quantity, cd.price, cd.unitId,  (SELECT u.unit FROM unit u WHERE u.id = cd.unitId) AS unit, cd.total FROM cartdetail cd WHERE cd.cartId = ?";
    return new Promise((resolve, reject) => {
      dbConn.query(query, [cartId], (err, res) => {
        if (err) reject(err);
        else resolve(res);
      });
    });
  }

  static async createCart(cartData) {
    const query =
      "insert into usercart (userId,customer_name,address,totalQnty,total_price) values(?,?,?,?,?);SELECT cartId FROM usercart ORDER BY cartId DESC";
    return new Promise((resolve, reject) => {
      dbConn.query(
        query,
        [
          cartData.userId,
          cartData.name,
          cartData.address,
          cartData.totalQnty,
          cartData.totalPrice,
        ],
        (err, res) => {
          if (err) reject(err);
          else resolve(res);
        }
      );
    });
  }

  static createCartDetails(cartDetailsData) {
    const query =
      "insert into cartdetail (cartId,productId,quantity,price,unitId,total) values(?,?,?,?,?,?);SELECT cartId FROM cartDetail ORDER BY cartId DESC;";

    return new Promise((resolve, reject) => {
      dbConn.query(
        query,
        [
          cartDetailsData.cartId,
          cartDetailsData.productId,
          cartDetailsData.quantity,
          cartDetailsData.price,
          cartDetailsData.unitId,
          cartDetailsData.total,
        ],
        (err, res) => {
          if (err) reject(err);
          else resolve(res);
        }
      );
    });
  }

  static async updateCart(cartData) {
    const query =
      "update usercart set customer_name = ?, address = ?, total_price =?, deliverycharge =?,discount = ?,tax =?,total_payable =? where id = ?";

    return new Promise((resolve, reject) => {
      dbConn.query(
        query,
        [
          cartData.customer_name,
          cartData.address,
          cartData.total_price,
          cartData.deliverycharge,
          cartData.discount,
          cartData.tax,
          cartData.total_payable,
          Number(cartData.id),
        ],
        (err, res) => {
          if (err) reject(err);
          else resolve(res);
        }
      );
    });
  }

  static async cancelCart(cartId) {
    console.log("cartId", cartId);
    const query = "update usercart set orderStatus = ? where cartId = ?";
    return await new Promise((resolve, reject) => {
      dbConn.query(query, ["cancelled", cartId], (err, res) => {
        if (err) reject(err);
        else resolve(res);
      });
    });
  }

  static async acceptCart(cartId) {
    console.log("cartId", cartId);
    const query = "update usercart set orderStatus = ? where cartId = ?";
    return await new Promise((resolve, reject) => {
      dbConn.query(query, ["accepted", cartId], (err, res) => {
        if (err) reject(err);
        else resolve(res);
      });
    });
  }
  static async placedCart(cartId) {
    console.log("cartId", cartId);
    const query = "update usercart set orderStatus = ? where cartId = ?";
    return await new Promise((resolve, reject) => {
      dbConn.query(query, ["placed", cartId], (err, res) => {
        if (err) reject(err);
        else resolve(res);
      });
    });
  }

  static async deleteCart(id) {
    const query = "delete from usercart where id = ?";
    return new Promise((resolve, reject) => {
      dbConn.query(query, [Number(id)], (err, res) => {
        if (err) reject(err);
        else resolve(res);
      });
    });
  }
}

module.exports = Cart;
