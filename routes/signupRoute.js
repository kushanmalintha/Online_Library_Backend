const signupContoller = require("../controllers/signupController");
const express = require('express');
const router = express.Router();

router.post('/signup', signupContoller.signup);
module.exports = router;