"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createAdmin = exports.createCountries = exports.createAreas = exports.createIdtypes = exports.createRoles = void 0;

var _Area = _interopRequireDefault(require("../Models/Security/Area.js"));

var _Country = _interopRequireDefault(require("../Models/Security/Country.js"));

var _IdType = _interopRequireDefault(require("../Models/Security/IdType.js"));

var _Role = _interopRequireDefault(require("../Models/Security/Role.js"));

var _User = _interopRequireDefault(require("../Models/Security/User.js"));

var _bcryptjs = _interopRequireDefault(require("bcryptjs"));

var _moment = _interopRequireDefault(require("moment"));

require("regenerator-runtime/runtime");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var createRoles = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
    var count;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return _Role["default"].count();

          case 3:
            count = _context.sent;

            if (!(count > 0)) {
              _context.next = 6;
              break;
            }

            return _context.abrupt("return");

          case 6:
            _context.next = 8;
            return Promise.all([new _Role["default"]({
              name: "ADMIN"
            }).save(), new _Role["default"]({
              name: "EMPLOYEE"
            }).save()]);

          case 8:
            _context.next = 13;
            break;

          case 10:
            _context.prev = 10;
            _context.t0 = _context["catch"](0);
            console.log(_context.t0);

          case 13:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 10]]);
  }));

  return function createRoles() {
    return _ref.apply(this, arguments);
  };
}();

exports.createRoles = createRoles;

var createIdtypes = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
    var count;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _context2.next = 3;
            return _IdType["default"].count();

          case 3:
            count = _context2.sent;

            if (!(count > 0)) {
              _context2.next = 6;
              break;
            }

            return _context2.abrupt("return");

          case 6:
            _context2.next = 8;
            return Promise.all([new _IdType["default"]({
              abbrev: "C.E",
              name: "CEDULA DE EXTRANJERIA"
            }).save(), new _IdType["default"]({
              abbrev: "C.C",
              name: "CEDULA DE CIUDADANIA"
            }).save(), new _IdType["default"]({
              abbrev: "PASAPORTE",
              name: "PASAPORTE"
            }).save(), new _IdType["default"]({
              abbrev: "PEP",
              name: "PERMISO ESPECIAL DE PERMANENCIA"
            }).save()]);

          case 8:
            _context2.next = 13;
            break;

          case 10:
            _context2.prev = 10;
            _context2.t0 = _context2["catch"](0);
            console.log(_context2.t0);

          case 13:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[0, 10]]);
  }));

  return function createIdtypes() {
    return _ref2.apply(this, arguments);
  };
}();

exports.createIdtypes = createIdtypes;

var createAreas = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
    var count;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            _context3.next = 3;
            return _Area["default"].count();

          case 3:
            count = _context3.sent;

            if (!(count > 0)) {
              _context3.next = 6;
              break;
            }

            return _context3.abrupt("return");

          case 6:
            _context3.next = 8;
            return Promise.all([new _Area["default"]({
              name: "ADMINISTRACION"
            }).save(), new _Area["default"]({
              name: "FINANCIERA"
            }).save(), new _Area["default"]({
              name: "COMPRAS"
            }).save(), new _Area["default"]({
              name: "INFRASTRUCTURA"
            }).save(), new _Area["default"]({
              name: "OPERACION"
            }).save(), new _Area["default"]({
              name: "TALENTO HUMANO"
            }).save(), new _Area["default"]({
              name: "SERVICIOS VARIOS"
            }).save()]);

          case 8:
            _context3.next = 13;
            break;

          case 10:
            _context3.prev = 10;
            _context3.t0 = _context3["catch"](0);
            console.log(_context3.t0);

          case 13:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[0, 10]]);
  }));

  return function createAreas() {
    return _ref3.apply(this, arguments);
  };
}();

exports.createAreas = createAreas;

var createCountries = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
    var count;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.prev = 0;
            _context4.next = 3;
            return _Country["default"].count();

          case 3:
            count = _context4.sent;

            if (!(count > 0)) {
              _context4.next = 6;
              break;
            }

            return _context4.abrupt("return");

          case 6:
            _context4.next = 8;
            return Promise.all([new _Country["default"]({
              abbrev: "co",
              name: "COLOMBIA"
            }).save(), new _Country["default"]({
              abbrev: "us",
              name: "ESTADOS UNIDOS"
            }).save()]);

          case 8:
            _context4.next = 13;
            break;

          case 10:
            _context4.prev = 10;
            _context4.t0 = _context4["catch"](0);
            console.log(_context4.t0);

          case 13:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[0, 10]]);
  }));

  return function createCountries() {
    return _ref4.apply(this, arguments);
  };
}();

exports.createCountries = createCountries;

var createAdmin = /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5() {
    var count, idType, role, country, area;
    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.prev = 0;
            _context5.next = 3;
            return _User["default"].count();

          case 3:
            count = _context5.sent;

            if (!(count > 0)) {
              _context5.next = 6;
              break;
            }

            return _context5.abrupt("return");

          case 6:
            _context5.next = 8;
            return _IdType["default"].findOne({
              where: {
                abbrev: "C.C"
              }
            });

          case 8:
            idType = _context5.sent;
            _context5.next = 11;
            return _Role["default"].findOne({
              where: {
                name: "ADMIN"
              }
            });

          case 11:
            role = _context5.sent;
            _context5.next = 14;
            return _Country["default"].findOne({
              where: {
                abbrev: "co"
              }
            });

          case 14:
            country = _context5.sent;
            _context5.next = 17;
            return _Area["default"].findOne({
              where: {
                name: "ADMINISTRACIÓN"
              }
            });

          case 17:
            area = _context5.sent;
            _context5.t0 = Promise;
            _context5.t1 = _User["default"];
            _context5.t2 = _bcryptjs["default"];
            _context5.next = 23;
            return _bcryptjs["default"].genSalt(10);

          case 23:
            _context5.t3 = _context5.sent;
            _context5.next = 26;
            return _context5.t2.hash.call(_context5.t2, "123", _context5.t3);

          case 26:
            _context5.t4 = _context5.sent;
            _context5.t5 = idType.id;
            _context5.t6 = role.id;
            _context5.t7 = country.id;
            _context5.t8 = area.id;
            _context5.t9 = (0, _moment["default"])();
            _context5.t10 = {
              idnumber: "3589879632",
              firstname: "ENRIQUE",
              secondname: "JOSE",
              firstlastname: "DE ARMAS",
              secondlastname: "OSIA",
              email: "admin@hotmail.com",
              username: "admin",
              password: _context5.t4,
              reset_password: false,
              idtypeId: _context5.t5,
              roleId: _context5.t6,
              countryId: _context5.t7,
              areaId: _context5.t8,
              createdAt: _context5.t9
            };
            _context5.t11 = new _context5.t1(_context5.t10).save();
            _context5.t12 = [_context5.t11];
            _context5.next = 37;
            return _context5.t0.all.call(_context5.t0, _context5.t12);

          case 37:
            _context5.next = 42;
            break;

          case 39:
            _context5.prev = 39;
            _context5.t13 = _context5["catch"](0);
            console.log(_context5.t13);

          case 42:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, null, [[0, 39]]);
  }));

  return function createAdmin() {
    return _ref5.apply(this, arguments);
  };
}();

exports.createAdmin = createAdmin;