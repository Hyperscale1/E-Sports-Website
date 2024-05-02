const config = require("../config.json");
const express = require("express");
const session = require("express-session");
const passport = require("passport");
const app = express();
const multer = require("multer");
const mysql = require("mysql");
const path = require("path");
var MySQLStore = require("express-mysql-session")(session);


var multerStorage = multer.memoryStorage();
app.use(multer({ storage: multerStorage }).any());
app.use(express.static("public"));
app.set("views", path.join(__dirname, "/views"));
app.set("view engine", "ejs");
var connection = mysql.createConnection({
  host: config["SQLInformation"].host,
  user: config["SQLInformation"].username,
  password: config["SQLInformation"].password,
  database: config["SQLInformation"].database,
  charset: "utf8mb4",
});

app.use(
  session({
    // key: 'faxkey',
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: false,
    store: new MySQLStore({}, connection),
    cookie: { maxAge: 31556952000 },
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.listen(config["siteInformation"].processPort, async function () {
  logger(
    `Server started on port ${config["siteInformation"].processPort}`,
    {
      color: "green",
    }
  );
});

logger = function (str, options) {
  let build = [];
  if ((options.color = "red")) options.color = "91";
  if ((options.color = "blue")) options.color = "94";
  if ((options.color = "yellow")) options.color = "93";
  if ((options.color = "green")) options.color = "92";
  if (options.bold) build.push(`\x1b[1m`);
  if (options.color) build.push(`\x1b[${options.color}m`);
  if (options.title) build.push(`[${options.title}]: \x1b[0m`);
  console.log(`${build.join("")} ${str}`);
};

app.get("/", async function (req, res) {
  res.render("index", {req : req});
});

app.get("/about", async function(req, res) {
  res.render("about", {req : req});
})

app.get('/team', async function(req, res) {
  res.render('team', {req, res})
})

app.get('/careers', async function(req, res) {
  res.render('careers', {req, res})
})