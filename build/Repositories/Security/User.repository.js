"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.create = create;

var _bcryptjs = _interopRequireDefault(require("bcryptjs"));

var _Role = _interopRequireDefault(require("../../Models/Security/Role"));

var _UserRole = _interopRequireDefault(require("../../Models/Security/UserRole"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var User = require("../../Models/Security/User");

function create(_x) {
  return _create.apply(this, arguments);
}

function _create() {
  _create = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req) {
    var Sequelize;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            Sequelize = require("../../database");
            _context2.prev = 1;
            _context2.next = 4;
            return Sequelize.transaction( /*#__PURE__*/function () {
              var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(t) {
                var me, i, role;
                return regeneratorRuntime.wrap(function _callee$(_context) {
                  while (1) {
                    switch (_context.prev = _context.next) {
                      case 0:
                        _context.t0 = User;
                        _context.t1 = req.body.idtype;
                        _context.t2 = req.body.idnumber;
                        _context.t3 = req.body.firstname;
                        _context.t4 = req.body.secondname;
                        _context.t5 = req.body.firstlastname;
                        _context.t6 = req.body.secondlastname;
                        _context.t7 = req.body.email;
                        _context.t8 = req.body.username;
                        _context.t9 = _bcryptjs["default"];
                        _context.t10 = req.body.password;
                        _context.next = 13;
                        return _bcryptjs["default"].genSalt(10);

                      case 13:
                        _context.t11 = _context.sent;
                        _context.next = 16;
                        return _context.t9.hash.call(_context.t9, _context.t10, _context.t11);

                      case 16:
                        _context.t12 = _context.sent;
                        _context.t13 = {
                          "token": req.body.username
                        };
                        _context.t14 = {
                          idtypeId: _context.t1,
                          idnumber: _context.t2,
                          firstname: _context.t3,
                          secondname: _context.t4,
                          firstlastname: _context.t5,
                          secondlastname: _context.t6,
                          email: _context.t7,
                          username: _context.t8,
                          password: _context.t12,
                          token: _context.t13
                        };
                        _context.t15 = {
                          include: "token"
                        };
                        _context.t16 = {
                          transaction: t
                        };
                        _context.next = 23;
                        return _context.t0.create.call(_context.t0, _context.t14, _context.t15, _context.t16);

                      case 23:
                        _context.next = 25;
                        return User.findOne({
                          where: {
                            email: req.body.email
                          }
                        }, {
                          transaction: t
                        });

                      case 25:
                        me = _context.sent;
                        i = 0;

                      case 27:
                        if (!(i < req.body.roles.length)) {
                          _context.next = 36;
                          break;
                        }

                        _context.next = 30;
                        return _Role["default"].findOne({
                          where: {
                            name: req.body.roles[i]
                          }
                        });

                      case 30:
                        role = _context.sent;
                        _context.next = 33;
                        return _UserRole["default"].create({
                          userId: me.id,
                          roleId: role.id
                        }, {
                          transaction: t
                        });

                      case 33:
                        i++;
                        _context.next = 27;
                        break;

                      case 36:
                      case "end":
                        return _context.stop();
                    }
                  }
                }, _callee);
              }));

              return function (_x2) {
                return _ref.apply(this, arguments);
              };
            }());

          case 4:
            return _context2.abrupt("return", true);

          case 7:
            _context2.prev = 7;
            _context2.t0 = _context2["catch"](1);
            return _context2.abrupt("return", false);

          case 10:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[1, 7]]);
  }));
  return _create.apply(this, arguments);
}

;