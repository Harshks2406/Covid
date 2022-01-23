"use strict";

var express = require('express');

var path = require('path');

var hbs = require('hbs');

var app = express();
var port = process.env.port || 2406;
var static_path = path.join(__dirname, './public');
var view_path = path.join(__dirname, '/views');
app.set('view engine', 'hbs');
app.set('views', view_path);
app.use(express["static"](static_path));
console.log(static_path);
app.get("", function (req, res) {
  res.render('index.hbs');
});
app.listen(port, function () {
  console.log("Server started on localhost:".concat(port));
});