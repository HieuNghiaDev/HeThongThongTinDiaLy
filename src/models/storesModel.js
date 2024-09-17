const db = require('../db/connecdb');

exports.getAllStores = async () => {
    const query = 'SELECT name, latitude, longitude FROM cuahang';
    try {
        const [rows] = await db.execute(query);
        console.log('Danh sách cửa hàng:', rows);
        return rows;
    } catch (error) {
        console.error('Lỗi khi lấy danh sách cửa hàng:', error);
        throw error;
    }
};

// Lấy dữ liệu cho bản đồ
exports.getStoresForMap = async (req, res) => {
    try {
        const query = 'SELECT name, latitude, longitude FROM cuahang';
        const [rows] = await db.execute(query);
        
        res.json(rows); 
    } catch (error) {
        console.error('Lỗi khi lấy dữ liệu cửa hàng:', error);
        res.status(500).json({ error: 'Đã xảy ra lỗi khi lấy dữ liệu cửa hàng' });
    }
};