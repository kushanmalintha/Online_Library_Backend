const announcementController = require("../controllers/announcementController");
const authenticateToken = require("../middlewares/token");
const express = require('express');
const router = express.Router();

router.get('/announcement', authenticateToken, announcementController.announcementGet);
router.post('/feedback', authenticateToken, announcementController.feedback);
module.exports = router;