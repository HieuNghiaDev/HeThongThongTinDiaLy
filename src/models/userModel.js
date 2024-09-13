const db = require('../db/connecdb');

exports.authenticateUser = async (username, password) => {
    const query = 'SELECT * FROM user WHERE username = ? AND password = ?';
    try {
        const [rows] = await db.execute(query, [username, password]);
        console.log('Query results:', rows);
        return rows.length > 0 ? rows[0] : null;
    } catch (error) {
        console.error('Database error:', error);
        throw error;
    }
};

exports.createUser = async (username, password, email) => {
    const query = 'INSERT INTO user (username, password, email) VALUES (?, ?, ?)';
    try {
        const [result] = await db.execute(query, [username, password, email]);
        return result.insertId;
    } catch (error) {
        console.error('Lỗi tạo người dùng mới:', error);
        throw error;
    }
};