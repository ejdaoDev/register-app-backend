"use strict";

var _app = _interopRequireDefault(require("../app"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_app["default"].use("/api/auth", require("../Routes/Security/Auth.route"));

_app["default"].use("/api/user", require("../Routes/Security/User.route"));