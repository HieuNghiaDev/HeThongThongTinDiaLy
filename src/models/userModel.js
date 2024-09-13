const db = require('../db/connecdb');

// Hàm kiểm tra thông tin đăng nhập
const authenticateUser = (username, password, callback) => {
    const user = 'SELECT * FROM user WHERE username = ? AND password = ?';
    db.query(user, [username, password], (err, results) => {
        if (err) {
            callback(err, null);
            return;
        }
        if (results.length > 0) {
            callback(null, results[0]);
        } else {
            callback(null, null);
        }
    });
};

module.exports = { authenticateUser };