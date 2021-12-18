let mysql = require("mysql");
let connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "node-api",
});

connection.connect();

module.exports = connection;
