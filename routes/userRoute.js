const userContoller = require("../controllers/userController");
const authenticateToken = require("../middlewares/token");
const express = require('express');
const router = express.Router();

router.get('/users/:user_id', authenticateToken, userContoller.user);
module.exports = router;