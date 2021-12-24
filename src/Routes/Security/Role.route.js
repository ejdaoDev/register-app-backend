const express = require("express");
const router = express.Router();
import * as RoleController from "../../Controllers/Security/Role.controller";
import { verifyToken, isAdmin } from "../../Middlewares/Middlewares";

router.get("/", verifyToken, isAdmin, RoleController.getAllRoles);

module.exports = router;