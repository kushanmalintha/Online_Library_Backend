const transactionContoller = require("../controllers/transactionController");
const authenticateToken = require("../middlewares/token");
const express = require('express');
const router = express.Router();

router.post('/transaction/:user_id/:book_id', authenticateToken, transactionContoller.transaction);
router.get('/transactions/:userId', authenticateToken, transactionContoller.getUserTransactions);

module.exports = router;
