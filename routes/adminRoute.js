const adminController = require("../controllers/adminController");
const authenticateToken = require("../middlewares/token");
const express = require('express');
const router = express.Router();

router.post('/admincheck', authenticateToken, adminController.adminCheckController);
module.exports = router;
