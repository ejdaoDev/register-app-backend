"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.login = void 0;

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _bcryptjs = _interopRequireDefault(require("bcryptjs"));

var _Role = _interopRequireDefault(require("../../Models/Security/Role"));

var _User = _interopRequireDefault(require("../../Models/Security/User"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var _require = require("sequelize"),
    Op = _require.Op;

var login = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
    var _req$body, email, password, user, comparePass, token;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _req$body = req.body, email = _req$body.email, password = _req$body.password;
            _context.next = 3;
            return _User["default"].findOne({
              include: [{
                model: _Role["default"],
                attributes: ['name']
              }],
              where: _defineProperty({}, Op.or, [{
                email: email
              }, {
                username: email
              }])
            });

          case 3:
            user = _context.sent;

            if (user) {
              _context.next = 8;
              break;
            }

            res.json({
              status: 204,
              data: {
                message: "invalid credentials"
              }
            });
            _context.next = 12;
            break;

          case 8:
            _context.next = 10;
            return _bcryptjs["default"].compare(password, user.password);

          case 10:
            comparePass = _context.sent;

            if (!comparePass) {
              res.json({
                status: 204,
                data: {
                  message: "invalid credentials"
                }
              });
            } else {
              token = _jsonwebtoken["default"].sign({
                id: user.id,
                role: user.role.name
              }, process.env.SECRET, {
                expiresIn: 86400 //24 Horas

              });
              res.json({
                status: 200,
                data: {
                  user: user,
                  token: token
                }
              });
            }

          case 12:
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