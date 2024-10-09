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

exports.createStores = async (name_store, address, latitude, longitude, phone, img, email) => {
    const query = 'INSERT INTO cuahang (name_store, address, latitude, longitude, phone, img, email) VALUES (?, ?, ?, ?, ?, ?, ?)';
    
    try {
        const [result] = await db.execute(query, [name_store, address, latitude, longitude, phone, img, email]);
        console.log('Cửa hàng mới đã được tạo : ', result.insertId);
        return result.insertId;
    } catch (error) {
        console.error('Lỗi khi tạo cửa hàng mới :', error);
        throw error;
    }
};

// Tìm kiếm cửa hàng
exports.searchStores = async (query) => {
    const sql = 'SELECT * FROM cuahang WHERE name_store LIKE ? OR address LIKE ?';
    const searchQuery = `%${query.trim()}%`;
    console.log('Searching for:', searchQuery);
    try {
        const [rows] = await db.execute(sql, [searchQuery, searchQuery]);
        console.log('Results:', rows);
        return rows;
    } catch (error) {
        console.error('Lỗi khi tìm kiếm cửa hàng:', error);
        throw error;
    }
};