const { dbConn } = require("../../config/config");

class Product {
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

  static getallproduts() {
    const query = "select id,product_name,product_price,description,categoryId,(SELECT c.title FROM category c WHERE c.id=p.categoryId) AS categoryName,unit,(SELECT u.unit FROM unit u WHERE u.id=p.unit) AS unitName,image,discount,status from product p ";
    return new Promise((resolve, reject) => {
      dbConn.query(query, [], (err, res) => {
        if (err) reject(err);
        else resolve(res);
      });
    });
  }

  static getParticularProduct(id) {
    const query = "select id,product_name,product_price,description,categoryId,(SELECT c.title FROM category c WHERE c.id=p.categoryId) AS categoryName,unit,(SELECT u.unit FROM unit u WHERE u.id=p.unit) AS unitName,image,discount,status from product p where id = ?";
    return new Promise((resolve, reject) => {
      dbConn.query(query, [id], (err, res) => {
        console.log(err, res);
        if (err) reject(err);
        else resolve(res);
      });
    });
  }

  static getProductUnit() {
    const query = "select id, unit from unit";
    return new Promise((resolve, reject) => {
      dbConn.query(query, [], (err, res) => {
        console.log(err, res);
        if (err) reject(err);
        else resolve(res);
      });
    });
  }

  static getProductCategory() {
    const query = "select id, title from category;";
    return new Promise((resolve, reject) => {
      dbConn.query(query, [], (err, res) => {
        console.log(err, res);
        if (err) reject(err);
        else resolve(res);
      });
    });
  }

  static createProduct(productData) {
    const query =
      "insert into product (product_name,product_price,description,categoryId,unit,image,discount) values (?,?,?,(SELECT c.id FROM category c WHERE c.title = ?),(SELECT u.id FROM unit u WHERE u.unit = ?),?,?); SELECT id FROM product ORDER BY id DESC";
    return new Promise((resolve, reject) => {
      dbConn.query(
        query,
        [
            productData.product_name,
            productData.product_price,
            productData.description,
            productData.category,
            productData.unit,
            productData.file,
            productData.discount,
        ],
        (err, res) => {
          if (err) reject(err);
          else resolve(res);
        }
      );
    });
  }

  static updateProduct(productData) {
    const query =
      "update product set product_name = ?, product_price = ?, description =?, categoryId = (SELECT c.id FROM category c WHERE c.title = ?),unit = (SELECT u.id FROM unit u WHERE u.unit = ?),image = ?, discount = ? where id = ?";
    return new Promise((resolve, reject) => {
      dbConn.query(
        query,
        [
            productData.product_name,
            Number(productData.product_price),
            productData.description,
            productData.category,
            productData.unit,
            productData.image,
            Number(productData.discount),
          Number(productData.id),
        ],
        (err, res) => {
          if (err) reject(err);
          else resolve(res);
        }
      );
    });
  }

  static deleteProduct(id) {
    const query = "delete from product where id = ?";
    return new Promise((resolve, reject) => {
      dbConn.query(query, [Number(id)], (err, res) => {
        if (err) reject(err);
        else resolve(res);
      });
    });
  }
}

module.exports = Product;
