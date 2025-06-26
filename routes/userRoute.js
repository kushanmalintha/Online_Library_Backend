const userController = require("../controllers/userController");
const authenticateToken = require("../middlewares/token");
const express = require('express');
const router = express.Router();

router.get('/users/getuser/:userId', authenticateToken, userController.getUser);
router.put('/users/updateuser/:userId', authenticateToken, userController.updateUser);

module.exports = router;