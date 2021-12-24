"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.login = void 0;

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _config = _interopRequireDefault(require("../../config"));

var _bcryptjs = _interopRequireDefault(require("bcryptjs"));

var _Role = _interopRequireDefault(require("../../Models/Security/Role"));

var _Token = _interopRequireDefault(require("../../Models/Security/Token"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var User = require("../../Models/Security/User");

var _require = require("sequelize"),
    Op = _require.Op;

var login = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
    var _req$body, username, password, user, comparePass, token;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _req$body = req.body, username = _req$body.username, password = _req$body.password;
            _context.next = 3;
            return User.findOne({
              where: _defineProperty({}, Op.or, [{
                email: username
              }, {
                username: username
              }]),
              include: {
                model: _Role["default"],
                attributes: ["name"]
              }
            });

          case 3:
            user = _context.sent;
            if (!user) res.status(401).json({
              error: "invalid credentials"
            });
            _context.next = 7;
            return _bcryptjs["default"].compare(password, user.password);

          case 7:
            comparePass = _context.sent;
            if (!comparePass) res.status(401).json({
              error: "invalid credentials"
            });
            token = _jsonwebtoken["default"].sign({
              username: username
            }, _config["default"].SECRET, {
              expiresIn: 86400
            });
            _context.next = 12;
            return _Token["default"].update({
              token: token
            }, {
              where: {
                userId: user.id
              }
            });

          case 12:
            if (user) res.status(200).json({
              user: user,
              token: token
            });

          case 13:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function login(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.login = login;