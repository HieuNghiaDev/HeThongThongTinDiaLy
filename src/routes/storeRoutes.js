const express = require('express');
const router = express.Router();
const storeController = require('../controllers/storesController');

// Lấy tất cả cửa hàng
router.get('/', storeController.getAllStores);

// Lấy dữ liệu cho bản đồ
router.get('/', storeController.getStoresForMap);

module.exports = router;