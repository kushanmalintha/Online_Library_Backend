const libraryController = require("../controllers/libraryController");
const authenticateToken = require("../middlewares/token");
const express = require('express');
const router = express.Router();

router.post('/announcement/write', authenticateToken, libraryController.announcementWrite);
router.get('/announcement/get', authenticateToken, libraryController.announcementGet);
router.post('/feedback/write', authenticateToken, libraryController.feedbackWrite);
router.delete('/user/delete/:user_id', authenticateToken, libraryController.deleteUser);
router.post('/addbooknew', authenticateToken, libraryController.addBookNew);
router.put('/addbookexist/:book_id', authenticateToken, libraryController.addBookExist);
router.put('/user/makeadmin/:user_id', authenticateToken, libraryController.makeAdmin);
router.get('/reservation/:reservation_id', authenticateToken, libraryController.reservationLookup);
router.get('/finerate', libraryController.getFineRate);
router.put('/finerate', authenticateToken, libraryController.updateFineRate);
router.get('/borrowedbooks/:user_id', authenticateToken, libraryController.getBorrowedBooks);
router.post('/returnbook/:user_id', authenticateToken, libraryController.returnBook);
module.exports = router;
