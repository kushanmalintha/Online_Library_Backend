const bookContoller = require("../controllers/bookController");
const authenticateToken = require("../middlewares/token");
const express = require('express');
const router = express.Router();

router.post('/books', authenticateToken, bookContoller.book);
router.get('/books/:bookId', authenticateToken, bookContoller.getBook);

module.exports = router;