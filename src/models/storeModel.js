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

// Lấy dữ liệu bán hàng cho cửa hàng
exports.getSalesDetails = async (storeId) => {
    const query = `
        SELECT 
            d.id AS STT,
            c.name_store AS Ten_cua_hang,
            sp.tensp AS Ten_san_pham,
            dm.ten_dmuc AS Loai,
            sp.gia AS Gia_tien,
            ct.so_luong AS So_luong_ban,
            d.ngay_tao AS Ngay_ban,
            (ct.so_luong * sp.gia) AS Tong_tien 
        FROM donhang d
        JOIN cuahang c ON d.id_shop = c.id
        JOIN chitietdonhang ct ON d.id = ct.id_dh
        JOIN sanpham sp ON ct.id_sp = sp.id
        JOIN doanhmuc dm ON sp.id_dmuc = dm.id
        WHERE d.id_shop = ?; 
    `;
    try {
        const [rows] = await db.execute(query, [storeId]);
        return rows;
    } catch (error) {
        console.error('Lỗi khi lấy dữ liệu bán hàng:', error);
        throw error;
    }
};
