"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = CreateEmailService;

var _User = _interopRequireDefault(require("../../Models/Security/User"));

var _Country = _interopRequireDefault(require("../../Models/Security/Country"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var _require = require("sequelize"),
    Op = _require.Op;

function CreateEmailService(_x) {
  return _CreateEmailService.apply(this, arguments);
}

function _CreateEmailService() {
  _CreateEmailService = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req) {
    var email, oldInfo, oldEmail;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (!(req.params.id === undefined)) {
              _context.next = 7;
              break;
            }

            _context.next = 3;
            return Generate(req);

          case 3:
            email = _context.sent;
            return _context.abrupt("return", email);

          case 7:
            _context.next = 9;
            return _User["default"].findOne({
              include: [{
                model: _Country["default"],
                attributes: ['abbrev']
              }],
              where: {
                id: req.params.id
              },
              attributes: ['firstname', 'firstlastname', 'email', 'countryId']
            });

          case 9:
            oldInfo = _context.sent;

            if (!(oldInfo.firstname !== req.body.firstname || oldInfo.firstlastname !== req.body.firstlastname)) {
              _context.next = 16;
              break;
            }

            _context.next = 13;
            return Generate(req);

          case 13:
            return _context.abrupt("return", _context.sent);

          case 16:
            if (!(oldInfo.country.abbrev !== req.body.country)) {
              _context.next = 21;
              break;
            }

            oldEmail = oldInfo.email.replace("@cidenet.com.".concat(oldInfo.country.abbrev), "@cidenet.com.".concat(req.body.country));
            return _context.abrupt("return", oldEmail);

          case 21:
            return _context.abrupt("return", oldInfo.email);

          case 22:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _CreateEmailService.apply(this, arguments);
}

function Generate(_x2) {
  return _Generate.apply(this, arguments);
}

function _Generate() {
  _Generate = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req) {
    var _req$body, firstname, firstlastname, country, firstnameWitoutSpaces, firstlastnameWitoutSpaces, email, existEmail, count, emailWithId;

    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _req$body = req.body, firstname = _req$body.firstname, firstlastname = _req$body.firstlastname, country = _req$body.country; //Eliminamos los espacios de los nombres y se pasan los caracteres a minusculas

            firstnameWitoutSpaces = firstname.replace(/\s+/g, '').toLowerCase().trim();
            firstlastnameWitoutSpaces = firstlastname.replace(/\s+/g, '').toLowerCase().trim(); //Se consulta en la BBDD si existe un email que contenga la combinación

            email = firstnameWitoutSpaces + firstlastnameWitoutSpaces;
            _context2.next = 6;
            return _User["default"].findOne({
              where: {
                email: _defineProperty({}, Op.like, "%".concat(email, "%"))
              },
              paranoid: false
            });

          case 6:
            existEmail = _context2.sent;

            if (existEmail) {
              _context2.next = 11;
              break;
            }

            return _context2.abrupt("return", email + '@cidenet.com.' + country);

          case 11:
            _context2.next = 13;
            return _User["default"].count({
              where: {
                email: _defineProperty({}, Op.like, "%".concat(email, "%"))
              },
              paranoid: false
            });

          case 13:
            count = _context2.sent;

          case 14:
            if (!(existEmail !== 0)) {
              _context2.next = 22;
              break;
            }

            emailWithId = email + count;
            _context2.next = 18;
            return _User["default"].count({
              where: {
                email: _defineProperty({}, Op.like, "%".concat(emailWithId, "%"))
              },
              paranoid: false
            });

          case 18:
            existEmail = _context2.sent;
            count++;
            _context2.next = 14;
            break;

          case 22:
            return _context2.abrupt("return", emailWithId + '@cidenet.com.' + country);

          case 23:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));
  return _Generate.apply(this, arguments);
}