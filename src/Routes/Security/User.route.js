const express = require("express");
const router = express.Router();
import * as UserController from "../../Controllers/Security/User.controller";
import { verifyToken, isAdmin } from "../../Middlewares/Middlewares";

router.post("/", verifyToken, isAdmin, UserController.create);
router.get("/", verifyToken, isAdmin, UserController.getAll);
router.get("/:id", verifyToken, isAdmin, UserController.getOne);
router.put("/:id", verifyToken, isAdmin, UserController.update);
router.delete("/:id", verifyToken, isAdmin, UserController.deleteOne);
router.post("/getNewEmail", UserController.getNewEmail);

module.exports = router;
