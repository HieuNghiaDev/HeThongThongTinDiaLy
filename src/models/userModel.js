const db = require('../db/connecdb');

// Kiểm tra thông tin đăng nhập
exports.authenticateUser = async (username, password) => {
    const query = 'SELECT * FROM user WHERE username = ? AND password = ?'; 
    try {
        const [rows] = await db.execute(query, [username, password]);
        console.log('kết quả kiểm tra thông tin đăng nhập:', rows);
        return rows.length > 0 ? rows[0] : null;
    } catch (error) {
        console.error('Lỗi kiểm tra thông tin đăng nhập:', error);
        throw error;
    }
};

// Tạo người dùng mới
exports.createUser = async (username, password, fullname, email) => {
    if (!username || !password || !fullname || !email) {
        throw new Error('Tất cả các trường là bắt buộc');
    }

    const query = 'INSERT INTO user (username, password, fullname, email) VALUES (?, ?, ?, ?)';
    try {
        const [result] = await db.execute(query, [username, password, fullname, email]);
        console.log('Người dùng mới đã được tạo:', result.insertId);
        return result.insertId;
    } catch (error) {
        console.error('Lỗi tạo người dùng mới:', error);
        throw error;
    }
};
