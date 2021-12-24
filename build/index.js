"use strict";

var _app = _interopRequireDefault(require("./app"));

var _express = _interopRequireDefault(require("express"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var sequelize = require('./database');

var PORT = process.env.PORT || 4000;

_app["default"].use(_express["default"].json());

_app["default"].use(_express["default"].urlencoded({
  extended: false
}));

_app["default"].get("/", function (req, res) {
  res.json("Hola Mundo");
}); // Models


require("./Models/Models");

require("./Libs/InicialSetup"); // Routes


_app["default"].use("/api/auth", require("./Routes/Security/Auth.route"));

_app["default"].use("/api/users", require("./Routes/Security/User.route")); // Server Start


_app["default"].listen(PORT, function () {
  console.log("La app ha arrancado en http://localhost:".concat(PORT)); // Conect with the db
  // Force true: DROP TABLES

  sequelize.sync({
    force: false
  }).then(function () {
    console.log("Nos hemos conectado a la base de datos");
  })["catch"](function (error) {
    console.log("Se ha producido un error", error);
  });
});