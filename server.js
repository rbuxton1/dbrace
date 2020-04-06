const express = require('express');
const app = express();
const mysql = require('mysql');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');

console.log("Started NodeJS component!");

var db = mysql.createPool({
  host: process.env.DB,
  user: "dbraceUser",
  password: process.env.DB_PASS,
  database: "dbrace"
})

app.set("view engine", "ejs");
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(session({secret: "i hate js"}));

app.get("/", function(req, res){
  db.query("SELECT name, points FROM `member` ORDER BY points DESC", function(err, sqlRes){
    res.render("index", {members: sqlRes});
  });
});

app.get("/login", function(req, res){
  res.render("login");
});
app.post("/login", function(req, res){
  if(req.body.password == process.env.PASSWORD){
    req.session.active = true;
    res.redirect("/admin");
  } else {
    res.redirect("/login");
  }
});

app.get("/admin", function(req, res){
  db.query("SELECT * FROM `member` ORDER BY name", function(err, sqlRes){
    res.render("admin", {user: req.session.active, members: sqlRes});
  });
});
app.post("/admin/addpoints", function(req, res){
  db.query("UPDATE `member` SET points = points + ? WHERE id = ?", [req.body.points, req.body.id], function(err, sqlRes){
    res.redirect("/admin");
  });
});
app.post("/admin/adduser", function(req, res){
  db.query("INSERT INTO `member`(`id`, `name`, `email`, `points`, `last`) VALUES (NULL, ?, ?, 0,DATE(NOW()))", [req.body.name, req.body.email], function(err, sqlRes){
    res.redirect("/admin");
  });
});

app.get("/logout", function(req, res){
  req.session.active = false;
  res.redirect("/");
})

app.listen(3000, function(){ console.log("Listening on port 3000!"); });
