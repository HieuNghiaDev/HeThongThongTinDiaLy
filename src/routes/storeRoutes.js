const express = require('express');
const router = express.Router();
const storeController = require('../controllers/storeController');

// Lấy tất cả cửa hàng
router.get('/', storeController.getAllStores);

// Lấy cửa hàng theo ID
router.get('/:id', storeController.getStoreById);

// Lấy dữ liệu cửa hàng cho bản đồ
router.get('/map-data', storeController.getStoresForMap);

// Thêm cửa hàng mới
router.post('/', storeController.addStore);

// Cập nhật thông tin cửa hàng
router.put('/:id', storeController.updateStore);

// Xóa cửa hàng
router.delete('/:id', storeController.deleteStore);

module.exports = router;