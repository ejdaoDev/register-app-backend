const express = require("express");
const router = express.Router();
import * as IdTypeController from "../../Controllers/Security/IdType.controller";
import { verifyToken, isAdmin } from "../../Middlewares/Middlewares";
 
router.get("/", verifyToken, isAdmin, IdTypeController.getAllIdTypes);

module.exports = router;