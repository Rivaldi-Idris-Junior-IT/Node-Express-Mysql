const { query } = require("../Config/db");
const db = require("../Config/db");

exports.createNewCategory = (data) => {
  return new Promise((resolve, reject) => {
    db.query(
      `INSERT INTO categories (${Object.keys(data)}) VALUES (${Object.values(
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
};

exports.getCategoryById = (id) => {
  return new Promise((resolve, reject) => {
    db.query(
      `SELECT * FROM categories WHERE id = ${id}`,
      (err, result, field) => {
        if (err) {
          return reject(err);
        }

        return resolve(result);
      }
    );
  });
};

exports.getAllCategories = () => {
  return new Promise((resolve, reject) => {
    db.query(`SELECT * FROM categories`, (err, result, field) => {
      if (err) {
        return reject(err);
      }

      return resolve(result);
    });
  });
};

exports.updateCategory = (id, data) => {
  return new Promise((resolve, reject) => {
    const keys = Object.keys(data);
    const values = Object.values(data);

    db.query(
      `UPDATE categories SET ${keys.map(
        (key, index) => `${key} = "${values[index]}"`
      )} WHERE id = ${id}`,
      (err, result, field) => {
        if (err) {
          return reject(err);
        }

        return resolve(result);
      }
    );
  });
};

exports.deleteCategory = (id) => {
  return new Promise((resolve, reject) => {
    db.query(`DELETE FROM categories WHERE id=${id}`, (err, result, field) => {
      if (err) {
        return reject(err);
      }

      return resolve(result);
    });
  });
};
