const { dbConn } = require("../../config/config");

class User {
  static async checkUserexistance(email) {
    const query = "select COUNT(email) AS isEmail from users where email = ?";
    return new Promise((resolve, reject) => {
      dbConn.query(query, [email], (err, res) => {
        console.log(err, res);
        if (err) reject(err);
        else resolve(res[0].isEmail);
      });
    });
  }

  static async getUsers() {
    const query = "SELECT * FROM users";
    return new Promise((resolve, reject) => {
      dbConn.query(query, [], (err, res) => {
        if (err) reject(err);
        else resolve(res);
      });
    });
  }

  static async getUser(email) {
    const query =
      "select id AS userId, name, address, email, password, phone, second_address AS secondAddress, role from users where email = ?";
    return new Promise((resolve, reject) => {
      dbConn.query(query, [email], (err, res) => {
        console.log(err, res);
        if (err) reject(err);
        else resolve(res);
      });
    });
  }

  static async getAllCounts(){
    var query = 'SELECT COUNT(id) AS userCount FROM users; SELECT COUNT(id) AS productCount FROM product; SELECT COUNT(cartId) AS orderCount FROM usercart;';
    return new Promise((resolve, reject)=>{
        dbConn.query(query,
            [],
            (err,res)=>{
            if(err) reject(err);
            else resolve(res);
        })
    })
  }

  static async createUser(userData) {
    const query =
      "insert into users (name,address,email,password,phone,second_address) values (?,?,?,?,?,?)";
    return new Promise((resolve, reject) => {
      dbConn.query(
        query,
        [
          userData.name,
          userData.address,
          userData.userEmail,
          userData.password,
          userData.phone,
          userData.second_address,
        ],
        (err, res) => {
          if (err) reject(err);
          else resolve(res);
        }
      );
    });
  }

  static async updateUser(userData) {
    const query =
      "update users set name = ?, address = ?, password =?, phone =?,second_address = ? where id = ?";
    return new Promise((resolve, reject) => {
      dbConn.query(
        query,
        [
          userData.name,
          userData.address,
          userData.password,
          userData.phone,
          userData.second_address,
          Number(userData.id),
        ],
        (err, res) => {
          if (err) reject(err);
          else resolve(res);
        }
      );
    });
  }

  static async deleteUser(id) {
    const query = "delete from users where id = ?";
    return new Promise((resolve, reject) => {
      dbConn.query(query, [Number(id)], (err, res) => {
        if (err) reject(err);
        else resolve(res);
      });
    });
  }
}

module.exports = User;
