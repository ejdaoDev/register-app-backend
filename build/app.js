"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _morgan = _interopRequireDefault(require("morgan"));

var _InicialSetup = require("./Libs/InicialSetup");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var app = (0, _express["default"])();
(0, _InicialSetup.createRoles)();
(0, _InicialSetup.createIdtypes)();
app.use((0, _morgan["default"])('dev'));
var _default = app;
exports["default"] = _default;