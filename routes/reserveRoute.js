const reserveContoller = require("../controllers/reserveController");
const authenticateToken = require("../middlewares/token");
const express = require('express');
const router = express.Router();

router.post('/reserve/:user_id/:book_id', authenticateToken, reserveContoller.reserve);
router.delete('/reservation/delete/:reservation_id/:book_id', authenticateToken, reserveContoller.reserveDelete);
module.exports = router;
