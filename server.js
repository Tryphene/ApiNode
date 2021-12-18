let express = require("express");
let bodyParser = require("body-parser");
let session = require("express-session");
let cookieParser = require("cookie-parser");
let logger = require("morgan");
let router = express.Router();
let y = require("./app.js");

let app = express();

app.set("view engine", "ejs");
// app.set("views", "./views");

// Middleware
app.use(logger("dev"));
app.use("/assets", express.static("public"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(
  session({
    secret: "keyboardcat",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);
app.use("/", y);

app.listen(8086, () => {
  console.log("Listening on port 8086...");
});

module.exports = app;
