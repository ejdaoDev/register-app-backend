const express = require('express');
const router = express.Router();
import * as AuthController from '../../Controllers/Security/Auth.controller';

router.post('/login', AuthController.login);

module.exports = router;