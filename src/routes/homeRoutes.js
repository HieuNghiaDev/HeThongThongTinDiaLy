const express = require('express');
const router = express.Router();
const homeController = require('../controllers/homeController');

// Lấy tất cả cửa hàng
router.get('/', homeController.showMap);

module.exports = router;