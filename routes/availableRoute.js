const availableController = require("../controllers/availableController");
const authenticateToken = require("../middlewares/token");
const express = require('express');
const router = express.Router();

router.get('/availability/:book_id', authenticateToken, availableController.available);
module.exports = router;