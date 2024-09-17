const db = require('../config/db');

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
