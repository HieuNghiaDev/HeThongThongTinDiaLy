const storesModel = require('../models/storesModel');

// Lấy tất cả cửa hàng
exports.getAllStores = async (req, res) => {
    try {
        const stores = await storesModel.getAllStores();
        res.json(stores);
    } catch (error) {
        console.error('Lỗi khi lấy danh sách cửa hàng:', error);
        res.status(500).json({ error: 'Đã xảy ra lỗi khi lấy danh sách cửa hàng' });
    }
};

//lấy dữ liệu cho bản đồ
exports.getStoresForMap = async (req, res) => {
    try {
        const stores = await storeModel.getStoresForMap();
        res.json(stores); // Gửi dữ liệu dưới dạng JSON về client
    } catch (error) {
        console.error('Lỗi khi lấy dữ liệu cửa hàng:', error);
        res.status(500).json({ error: 'Đã xảy ra lỗi khi lấy dữ liệu cửa hàng' });
    }
};

// // Thêm cửa hàng mới
// exports.addStore = async (req, res) => {
//     const { ten, kinh_do, vi_do } = req.body;
//     try {
//         const newStore = await storesModel.addStore(ten, kinh_do, vi_do);
//         res.status(201).json(newStore);
//     } catch (error) {
//         console.error('Lỗi khi thêm cửa hàng mới:', error);
//         res.status(500).json({ error: 'Đã xảy ra lỗi khi thêm cửa hàng mới' });
//     }
// };

// // Cập nhật thông tin cửa hàng
// exports.updateStore = async (req, res) => {
//     const { id } = req.params;
//     const { ten, kinh_do, vi_do } = req.body;
//     try {
//         const updatedStore = await storesModel.updateStore(id, ten, kinh_do, vi_do);
//         if (updatedStore) {
//             res.json(updatedStore);
//         } else {
//             res.status(404).json({ error: 'Không tìm thấy cửa hàng để cập nhật' });
//         }
//     } catch (error) {
//         console.error('Lỗi khi cập nhật thông tin cửa hàng:', error);
//         res.status(500).json({ error: 'Đã xảy ra lỗi khi cập nhật thông tin cửa hàng' });
//     }
// };

// // Xóa cửa hàng
// exports.deleteStore = async (req, res) => {
//     const { id } = req.params;
//     try {
//         const result = await storesModel.deleteStore(id);
//         if (result) {
//             res.json({ message: 'Đã xóa cửa hàng thành công' });
//         } else {
//             res.status(404).json({ error: 'Không tìm thấy cửa hàng để xóa' });
//         }
//     } catch (error) {
//         console.error('Lỗi khi xóa cửa hàng:', error);
//         res.status(500).json({ error: 'Đã xảy ra lỗi khi xóa cửa hàng' });
//     }
// };
