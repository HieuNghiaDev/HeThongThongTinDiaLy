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
    console.log(searchQuery);
    try {
        const [rows] = await db.execute(sql, [searchQuery, searchQuery]);
        console.log('Results:', rows);
        return rows;
    } catch (error) {
        console.error('Lỗi khi tìm kiếm cửa hàng:', error);
        throw error;
    }
};

//xoa cua hang
exports.deleteStore = async (storeId) => {
    const query = 'DELETE FROM cuahang WHERE id = ?';
    try {
        const [result] = await db.execute(query, [storeId]);
        console.log('Cửa hàng đã được xóa:', storeId);
        return result;
    } catch (error) {
        console.error('Lỗi khi xóa cửa hàng:', error);
        throw error;
    }
};

// Lấy thông tin cửa hàng theo ID
exports.getStoreById = async (storeId) => {
    const query = 'SELECT * FROM cuahang WHERE id = ?';
    try {
        const [rows] = await db.execute(query, [storeId]);
        return rows[0]; // Return the first row (the store)
    } catch (error) {
        console.error('Lỗi khi lấy dữ liệu cửa hàng theo ID:', error);
        throw error;
    }
};
