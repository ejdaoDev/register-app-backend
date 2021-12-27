"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createUser = createUser;
exports.updateUser = updateUser;
exports.getUsers = getUsers;

var _bcryptjs = _interopRequireDefault(require("bcryptjs"));

var _Role = _interopRequireDefault(require("../../Models/Security/Role"));

var _IdType = _interopRequireDefault(require("../../Models/Security/IdType"));

var UserService = _interopRequireWildcard(require("../../Services/Security/UserService"));

var _CreateEmailService = _interopRequireDefault(require("../../Services/Security/CreateEmailService"));

var _Country = _interopRequireDefault(require("../../Models/Security/Country"));

var _User = _interopRequireDefault(require("../../Models/Security/User"));

var _Area = _interopRequireDefault(require("../../Models/Security/Area"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var Sequelize = require("../../database");

function createUser(_x) {
  return _createUser.apply(this, arguments);
}

function _createUser() {
  _createUser = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req) {
    var me, idtype, role, country, area;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return UserService.getAuthId(req);

          case 2:
            me = _context2.sent;
            _context2.prev = 3;
            _context2.next = 6;
            return _IdType["default"].findOne({
              where: {
                abbrev: req.body.idtype
              },
              attributes: ['id']
            });

          case 6:
            idtype = _context2.sent;
            _context2.next = 9;
            return _Role["default"].findOne({
              where: {
                name: req.body.role
              },
              attributes: ['id']
            });

          case 9:
            role = _context2.sent;
            _context2.next = 12;
            return _Country["default"].findOne({
              where: {
                abbrev: req.body.country
              },
              attributes: ['id']
            });

          case 12:
            country = _context2.sent;
            _context2.next = 15;
            return _Area["default"].findOne({
              where: {
                name: req.body.area
              },
              attributes: ['id']
            });

          case 15:
            area = _context2.sent;
            _context2.next = 18;
            return Sequelize.transaction( /*#__PURE__*/function () {
              var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(t) {
                return regeneratorRuntime.wrap(function _callee$(_context) {
                  while (1) {
                    switch (_context.prev = _context.next) {
                      case 0:
                        _context.t0 = _User["default"];
                        _context.t1 = idtype.id;
                        _context.t2 = role.id;
                        _context.t3 = country.id;
                        _context.t4 = area.id;
                        _context.t5 = req.body.idnumber;
                        _context.t6 = req.body.firstname;
                        _context.t7 = req.body.secondname;
                        _context.t8 = req.body.firstlastname;
                        _context.t9 = req.body.secondlastname;
                        _context.next = 12;
                        return (0, _CreateEmailService["default"])(req);

                      case 12:
                        _context.t10 = _context.sent;
                        _context.t11 = _bcryptjs["default"];
                        _context.next = 16;
                        return _bcryptjs["default"].genSalt(10);

                      case 16:
                        _context.t12 = _context.sent;
                        _context.next = 19;
                        return _context.t11.hash.call(_context.t11, "123", _context.t12);

                      case 19:
                        _context.t13 = _context.sent;
                        _context.t14 = me;
                        _context.t15 = me;
                        _context.t16 = req.body.createdAt;
                        _context.t17 = {
                          idtypeId: _context.t1,
                          roleId: _context.t2,
                          countryId: _context.t3,
                          areaId: _context.t4,
                          idnumber: _context.t5,
                          firstname: _context.t6,
                          secondname: _context.t7,
                          firstlastname: _context.t8,
                          secondlastname: _context.t9,
                          email: _context.t10,
                          password: _context.t13,
                          username: null,
                          createdById: _context.t14,
                          updatedById: _context.t15,
                          createdAt: _context.t16
                        };
                        _context.t18 = {
                          transaction: t
                        };
                        _context.next = 27;
                        return _context.t0.create.call(_context.t0, _context.t17, _context.t18);

                      case 27:
                      case "end":
                        return _context.stop();
                    }
                  }
                }, _callee);
              }));

              return function (_x4) {
                return _ref.apply(this, arguments);
              };
            }());

          case 18:
            return _context2.abrupt("return", true);

          case 21:
            _context2.prev = 21;
            _context2.t0 = _context2["catch"](3);
            console.log(_context2.t0);
            return _context2.abrupt("return", false);

          case 25:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[3, 21]]);
  }));
  return _createUser.apply(this, arguments);
}

function updateUser(_x2) {
  return _updateUser.apply(this, arguments);
}

function _updateUser() {
  _updateUser = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(req) {
    var me, idtype, role, country, area;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 2;
            return UserService.getAuthId(req);

          case 2:
            me = _context4.sent;
            _context4.prev = 3;
            _context4.next = 6;
            return _IdType["default"].findOne({
              where: {
                abbrev: req.body.idtype
              },
              attributes: ['id']
            });

          case 6:
            idtype = _context4.sent;
            _context4.next = 9;
            return _Role["default"].findOne({
              where: {
                name: req.body.role
              },
              attributes: ['id']
            });

          case 9:
            role = _context4.sent;
            _context4.next = 12;
            return _Country["default"].findOne({
              where: {
                abbrev: req.body.country
              },
              attributes: ['id']
            });

          case 12:
            country = _context4.sent;
            _context4.next = 15;
            return _Area["default"].findOne({
              where: {
                name: req.body.area
              },
              attributes: ['id']
            });

          case 15:
            area = _context4.sent;
            _context4.next = 18;
            return Sequelize.transaction( /*#__PURE__*/function () {
              var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(t) {
                return regeneratorRuntime.wrap(function _callee3$(_context3) {
                  while (1) {
                    switch (_context3.prev = _context3.next) {
                      case 0:
                        _context3.t0 = _User["default"];
                        _context3.t1 = idtype.id;
                        _context3.t2 = role.id;
                        _context3.t3 = country.id;
                        _context3.t4 = area.id;
                        _context3.t5 = req.body.idnumber;
                        _context3.t6 = req.body.firstname;
                        _context3.t7 = req.body.secondname;
                        _context3.t8 = req.body.firstlastname;
                        _context3.t9 = req.body.secondlastname;
                        _context3.next = 12;
                        return (0, _CreateEmailService["default"])(req);

                      case 12:
                        _context3.t10 = _context3.sent;
                        _context3.t11 = me;
                        _context3.t12 = {
                          idtypeId: _context3.t1,
                          roleId: _context3.t2,
                          countryId: _context3.t3,
                          areaId: _context3.t4,
                          idnumber: _context3.t5,
                          firstname: _context3.t6,
                          secondname: _context3.t7,
                          firstlastname: _context3.t8,
                          secondlastname: _context3.t9,
                          email: _context3.t10,
                          updatedById: _context3.t11
                        };
                        _context3.t13 = {
                          where: {
                            id: req.params.id
                          }
                        };
                        _context3.t14 = {
                          transaction: t
                        };
                        _context3.next = 19;
                        return _context3.t0.update.call(_context3.t0, _context3.t12, _context3.t13, _context3.t14);

                      case 19:
                      case "end":
                        return _context3.stop();
                    }
                  }
                }, _callee3);
              }));

              return function (_x5) {
                return _ref2.apply(this, arguments);
              };
            }());

          case 18:
            return _context4.abrupt("return", true);

          case 21:
            _context4.prev = 21;
            _context4.t0 = _context4["catch"](3);
            console.log(_context4.t0);
            return _context4.abrupt("return", false);

          case 25:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[3, 21]]);
  }));
  return _updateUser.apply(this, arguments);
}

function getUsers(_x3) {
  return _getUsers.apply(this, arguments);
}

function _getUsers() {
  _getUsers = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(req) {
    var me, Users, UserToGet;
    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            if (!(req.params.id === undefined)) {
              _context5.next = 10;
              break;
            }

            _context5.next = 3;
            return UserService.getAuthId(req);

          case 3:
            me = _context5.sent;
            _context5.next = 6;
            return _User["default"].findAll({
              include: [{
                model: _Role["default"]
              }, {
                model: _Country["default"]
              }, {
                model: _Area["default"]
              }, {
                model: _IdType["default"]
              }],
              where: {
                createdById: me
              },
              attributes: {
                exclude: ['password', 'username', 'reset_password', 'updatedBy']
              }
            });

          case 6:
            Users = _context5.sent;
            return _context5.abrupt("return", Users);

          case 10:
            _context5.next = 12;
            return _User["default"].findOne({
              include: [{
                model: _Role["default"],
                attributes: ['name']
              }, {
                model: _IdType["default"],
                attributes: ['abbrev']
              }],
              where: {
                id: req.params.id
              },
              attributes: {
                exclude: ['password', 'username', 'reset_password']
              }
            });

          case 12:
            UserToGet = _context5.sent;

            if (!UserToGet) {
              _context5.next = 17;
              break;
            }

            return _context5.abrupt("return", UserToGet);

          case 17:
            return _context5.abrupt("return", false);

          case 18:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  }));
  return _getUsers.apply(this, arguments);
}