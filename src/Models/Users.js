const { query } = require("../Config/db");
const db = require("../Config/db");

exports.createNewUsers = (data) => {
    return new Promise((resolve, reject) => {
        db.query(
          `INSERT INTO users (${Object.keys(data)}) VALUES (${Object.values(
            data
          ).map((item) => `"${item}"`)})`,
          (err, result, field) => {
            if (err) {
              return reject(err);
            }
    
            return resolve(result);
          }
        );
      });
}

exports.getUserById = (id) => {
    return new Promise((resolve, reject) => {
      db.query(
        `SELECT * FROM users WHERE id = ${id}`,
        (err, result, field) => {
          if (err) {
            return reject(err);
          }
  
          return resolve(result);
        }
      );
    });
  };

exports.getEmailUser = (email) => {
    return new Promise((resolve, reject) => {
        db.query(
          `SELECT * FROM users WHERE email = "${email}"`,
          (err, result, field) => {
            if (err) {
              return reject(err);
            }
    
            return resolve(result);
          }
        );
      });
}

exports.getPassword = (password) => {
    return new Promise((resolve, reject) => {
        db.query(
          `SELECT * FROM users WHERE password = "${password}"`,
          (err, result, field) => {
            if (err) {
              return reject(err);
            }
    
            return resolve(result);
          }
        );
      });
}

exports.deleteUser = (id) => {
    return new Promise((resolve, reject) => {
      db.query(`DELETE FROM users WHERE id=${id}`, (err, result, field) => {
        if(err) {
          return reject(err);
        }
  
        return resolve(result);
      })
    })
  }