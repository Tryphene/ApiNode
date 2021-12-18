let express = require("express");
let router = express.Router();
let mysql = require("mysql");
let connexion = require("./db/connexion");

let app = express();

router.get("/", (req, res, next) => {
  let User = require("./models/user");
  User.select(function (message) {
    res.render("index", { messages: message });
  });
});

router.get("/update/:id", (request, response) => {
  let User = require("./models/user");
  User.find(request.params.id, function (message) {
    response.render("updatePage", { message: message });
  });
});

router.post("/update/:id", (request, response) => {
  let User = require("./models/user");
  const t = request.body;
  User.update(t.user, t.contact, request.params.id, function () {
    console.log("Modifié");
  });
});

router.get("/register", (req, res, next) => {
  let User = require("./models/user");
  User.select(function (message) {
    res.render("register");
  });
});

router.get("/delete/:id", (req, res, next) => {
  let User = require("./models/user");
  User.delete(req.params.id, () => {
    res.redirect("/");
  });
});

// router.get("/recherche", (req, res, next) => {
//   let User = require("./models/user");
//   User.recherche(req.body.recherche, () => {
//     res.render("index", { messages: message });
//     console.log(message.id);
//   });
// });

router.post("/", (req, res, next) => {
  let User = require("./models/user");
  if (req.body.recherche.length > 0) {
    User.recherche(req.body.recherche, function (message) {
      res.render("index", { messages: message });
    });
  } else {
    User.select(function (message) {
      res.redirect("/");
    });
  }
});

// router.post("/register", (req, res, next) => {
//   let User = require("./models/user");
//   const t = req.body;
//   let user = "req.body.user";

//   let sql = "SELECT * FROM `contact` WHERE user = ?";
//   connexion.query(sql, [user], (err, resutls, fields) => {
//     if (err) throw err;
//     if (resutls.length > 0) {
//       res.redirect("/register");
//     } else {
//       User.create("resq.body.user", "0778956231", function () {
//         console.log("req.body.user");
//         res.redirect("/register");
//       });
//     }
//   });
// });

router.post("/register", (req, res, next) => {
  let User = require("./models/user");
  const t = req.body;
  let user = t.user;

  let sql = "SELECT * FROM `contact` WHERE user = ?";
  connexion.query(sql, [user], (err, resutls, fields) => {
    if (err) throw err;
    if (resutls.length > 0) {
      console.log("Nom déjà utilisé");
      res.redirect("/register");
    } else {
      User.create(req.body.user, req.body.contact, function () {
        console.log("Ajouté");
        res.redirect("/register");
      });
    }
  });
});

module.exports = router;
