const Db = require("../database/sql");
const connection = Db;

function addProducts(insertValues) {
  return new Promise((resolve, reject) => {
    const insertQuery =
      "INSERT INTO products (name, price, image, quantity) VALUES (?, ?, ?, ?)";
    connection.query(insertQuery, insertValues, (queryErr, results) => {
      if (queryErr) {
        console.error("Error inserting product:", queryErr);
        reject(queryErr);
      } else {
        resolve(results);
      }
    });
  });
}

function takeProduct(productId) {
  return new Promise((resolve, reject) => {
    const selectQuery = "SELECT * FROM products WHERE id = ?";
    connection.query(selectQuery, [productId], (queryErr, results) => {
      if (queryErr || results.length === 0) {
        console.error(queryErr);
      } else {
        resolve(results);
      }
    });
  });
}

function ProductDetailed() {
  return new Promise((resolve, reject) => {
    const tableName = "products";
    const query = `SELECT * FROM ${tableName}`;

    connection.query(query, (queryErr, results) => {
      if (queryErr) {
        console.error("Error executing query:", queryErr);
        reject(queryErr);
      } else {
        resolve(results);
      }
    });
  });
}

function DeteleProduct(email) {
  return new Promise((resolve, reject) => {
    const query = "DELETE FROM `products` WHERE id = ?";
    connection.query(query, [email], (err, result) => {
      if (err) {
        console.error(err);
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
}

module.exports = {
  addProducts,
  takeProduct,
  ProductDetailed,
  DeteleProduct,
};
