const { query } = require("../Config/db");
const db = require("../Config/db");

exports.createNewOrder = (data) => {
  return new Promise((resolve, reject) => {
    db.query(
      `INSERT INTO orders (${Object.keys(data)}) VALUES (${Object.values(
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

exports.getOrderById = (id) => {
  return new Promise((resolve, reject) => {
    db.query(`SELECT * FROM orders WHERE id = ${id}`, (err, result, field) => {
      if (err) {
        return reject(err);
      }

      return resolve(result);
    });
  });
};

exports.getOrderUserById = (id) => {
  return new Promise((resolve, reject) => {
    db.query(
      `SELECT * FROM orders INNER JOIN users ON users.id WHERE orders.user_id = ${id}`,
      (err, result, field) => {
        if (err) {
          return reject(err);
        }

        return resolve(result);
      }
    );
  });
};

exports.getAllOrderUserById = () => {
  return new Promise((resolve, reject) => {
    db.query(
      `SELECT * FROM orders INNER JOIN users ON users.id WHERE orders.user_id = users.id`,
      (err, result, field) => {
        if (err) {
          return reject(err);
        }

        return resolve(result);
      }
    );
  });
};

exports.getAllOrders = () => {
  return new Promise((resolve, reject) => {
    db.query(`SELECT * FROM orders`, (err, result, field) => {
      if (err) {
        return reject(err);
      }

      return resolve(result);
    });
  });
};

exports.deleteOrder = (id) => {
  return new Promise((resolve, reject) => {
    db.query(`DELETE FROM orders WHERE id=${id}`, (err, result, field) => {
      if (err) {
        return reject(err);
      }

      return resolve(result);
    });
  });
};

exports.updateOrders = (id, data) => {
  return new Promise((resolve, reject) => {
    const keys = Object.keys(data);
    const values = Object.values(data);

    db.query(
      `UPDATE orders SET ${keys.map(
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

// Pagination, Sort, Limit 
exports.getConditionOrder = (condition) => {
    return new Promise ((resolve, reject) => {
      db.query(`SELECT * FROM orders ORDER BY ${condition.sort} ${condition.order} LIMIT ${condition.limit}  OFFSET ${condition.offset}`, 
      (err, result, field) => {
        if(err){
          return reject(err);
        }
  
        return resolve(result)
      })
    })
}

// Count
exports.getCountOrder = (condition) => {
    return new Promise ((resolve, reject) => {
      db.query(`SELECT COUNT(*) as total FROM orders`, 
      (err, result, field) => {
        if(err){
          return reject(err);
        }
  
        return resolve(result)
      })
    })
  }