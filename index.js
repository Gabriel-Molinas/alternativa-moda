const express = require("express");
const morgan = require("morgan");
const path = require("path");
const app = express();

// settings
app.set("port", process.env.PORT);

//  view
app.set("view engine", "ejs");

// index page
app.get("/", function (req, res) {
  res.render("pages/index");
});

// Public
app.use(express.static(__dirname + "/public"));

// listening the app
app.listen(app.get("port"), () => {
  console.log("app on port", app.get("port"));
  console.log(process.env.GABRIEL);
});
