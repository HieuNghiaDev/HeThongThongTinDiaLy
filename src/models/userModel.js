const db = require('../db/connecdb');

exports.authenticateUser = async (username, password) => {
    const query = 'SELECT * FROM users WHERE username = ? AND password = ?';
    try {
        console.log('Executing query:', query);
        console.log('With parameters:', username, password);
        const [results] = await db.execute(query, [username, password]);
        console.log('Query results:', results);
        return results.length > 0 ? results[0] : null;
    } catch (error) {
        console.error('Database error:', error);
        throw error;
    }
};

exports.createUser = async (username, password, email) => {
    const query = 'INSERT INTO users (username, password, email) VALUES (?, ?, ?)';
    try {
        const [result] = await db.execute(query, [username, password, email]);
        return result.insertId;
    } catch (error) {
        console.error('Lỗi tạo người dùng mới:', error);
        throw error;
    }
};