"use strict";

var _app = _interopRequireDefault(require("./app.js"));

var _express = _interopRequireDefault(require("express"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var sequelize = require("./database");

var path = require('path');

var PORT = process.env.PORT || 3000; //Middlewares

_app["default"].use(_express["default"].json());

_app["default"].use(_express["default"].urlencoded({
  extended: false
}));

_app["default"].use(_express["default"]["static"](path.join(__dirname, 'public/images'))); // Routes


require("./Routes/Routes"); // Server Start


_app["default"].listen(PORT, function () {
  console.log("start http://localhost:".concat(PORT)); // Conect with the db
  // Force true: DROP TABLES

  sequelize.sync({
    force: false
  }).then(function () {
    console.log("connect with db");
  })["catch"](function (error) {
    console.log("error", error);
  });
});