/**
 * auth.js
 * @description :: routes of authentication APIs
 */

const express = require('express');
const router = express.Router();
const authController = require('../../controller/userapp/authController');
const fetchuser = require('../../middleware/fetchuser');

router.post('/register',authController.register);
router.post('/login', authController.login);
router.get('/get', fetchuser, authController.get);

module.exports = router;