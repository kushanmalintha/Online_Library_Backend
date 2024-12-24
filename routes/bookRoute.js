const bookContoller = require("../controllers/bookController");
const authenticateToken = require("../middlewares/token");
const express = require('express');
const router = express.Router();

router.post('/books', authenticateToken, bookContoller.book);
module.exports = router;