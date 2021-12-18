let connection = require("../db/connexion");

class User {
  constructor(row) {
    this.row = row;
  }

  get id() {
    return this.row.id;
  }

  get user() {
    return this.row.user;
  }

  get contact() {
    return this.row.contact;
  }

  static select(cb) {
    connection.query(
      "SELECT * FROM `contact` ORDER BY id DESC",
      (error, results) => {
        if (error) throw error;
        cb(results.map((res) => new User(res)));
      }
    );
  }

  static recherche(contact, cb) {
    connection.query(
      "SELECT * FROM `contact` WHERE `contact` = ?",
      [contact],
      (error, results) => {
        if (error) throw error;
        cb(results.map((res) => new User(res)));
      }
    );
  }

  static create(user, contact, cb) {
    connection.query(
      "INSERT contact SET user = ?, contact = ?",
      [user, contact],
      (error, results) => {
        if (error) throw error;
        cb(results);
      }
    );
  }

  static update(user, contact, id, cb) {
    connection.query(
      "UPDATE contact SET user = ?, contact = ? WHERE id = ?",
      [user, contact, id],
      (error, results) => {
        if (error) throw error;
        cb(results);
      }
    );
  }

  static delete(id, cb) {
    connection.query(
      "DELETE FROM `contact` WHERE id = ?",
      [id],
      (error, results) => {
        if (error) throw error;
        cb(results);
      }
    );
  }

  static find(id, cb) {
    connection.query(
      "SELECT * FROM `contact` WHERE id = ? ",
      [id],
      (error, results) => {
        if (error) throw error;
        cb(new User(results[0]));
      }
    );
  }

  // con.connect(function(err) {
  //     if (err) throw err;
  //     var sql = "DELETE FROM customers WHERE address = 'Mountain 21'";
  //     con.query(sql, function (err, result) {
  //       if (err) throw err;
  //       console.log("Number of records deleted: " + result.affectedRows);
  //     });
  //   });
}

module.exports = User;
