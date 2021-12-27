"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var UserController = _interopRequireWildcard(require("../../Controllers/Security/User.controller"));

var _Middlewares = require("../../Middlewares/Middlewares");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var express = require("express");

var router = express.Router();
router.post("/", _Middlewares.verifyToken, _Middlewares.isAdmin, UserController.create);
router.get("/", _Middlewares.verifyToken, _Middlewares.isAdmin, UserController.getAll);
router.get("/:id", _Middlewares.verifyToken, _Middlewares.isAdmin, UserController.getOne);
router.put("/:id", _Middlewares.verifyToken, _Middlewares.isAdmin, UserController.update);
router["delete"]("/:id", _Middlewares.verifyToken, _Middlewares.isAdmin, UserController.deleteOne);
router.post("/getNewEmail", UserController.getNewEmail);
module.exports = router;