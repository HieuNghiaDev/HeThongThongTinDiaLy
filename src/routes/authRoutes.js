const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Thêm route GET cho trang đăng nhập
router.get('/login', authController.getLogin);
router.post('/login', authController.postLogin);

module.exports = router;