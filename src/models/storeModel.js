const db = require('../db/connecdb');

exports.getStores = async () => {
    const query = 'SELECT * FROM cuahang';
    try {
        const [rows] = await db.execute(query);
        console.log('Dữ liệu cửa hàng:', rows);
        return rows;
    } catch (error) {
        console.error('Lỗi lấy dữ liệu cửa hàng:', error);
        throw error;
    }
};

exports.craeteStores = async () => {
    const query = 'INSERT INTO cuahang (name_store, address, latitude, longitude, phone, img, email) VALUES (?, ?, ?, ?, ?, ?, ?)';

    try {
        const [result] = await db.execute(query, [name_store, address, latitude, longitude, phone, img, email]);
        console.log('Cua Hang moi da duoc tao', result.insertId);
        return result.insertId;
    } catch (error) {
        console.error('Lỗi tạo người dùng mới:', error);
        throw error;
    }
}