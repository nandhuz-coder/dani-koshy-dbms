const Db = require("../database/sql");
const connection = Db;

function addProducts(insertValues) {
  return new Promise((resolve, reject) => {
    const insertQuery =
      "INSERT INTO products (name, price, image) VALUES (?, ?, ?)";
    connection.query(insertQuery, insertValues, (queryErr, results) => {
      if (queryErr) {
        console.error("Error inserting product:", queryErr);
        reject(queryErr);
      } else {
        console.log(results);
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

module.exports = {
  addProducts,
  takeProduct,
};
