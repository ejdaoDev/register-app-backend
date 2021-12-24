const express = require("express");
const router = express.Router();
import * as UserController from "../../Controllers/Security/User.controller";
import { verifyToken, isAdmin } from "../../Middlewares/Middlewares";
const storage = require('../../multer');
const multer = require('multer');

const uploader = multer({storage}).single('photo'); 
router.get("/",  verifyToken, isAdmin, UserController.getAllUsers);
router.get("/:id",  verifyToken, isAdmin, UserController.getUser);
router.put("/:id",  verifyToken, isAdmin, UserController.editUser);
router.delete("/:id", verifyToken, isAdmin, UserController.deleteUser);
router.post("/create",uploader, verifyToken, isAdmin, UserController.create);
router.post("/register", UserController.register);

module.exports = router;
