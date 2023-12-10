const mysql = require("mysql2");

// Create a connection to the database
const Db = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  database: "dani",
  waitForConnections: true,
});

module.exports = Db;
