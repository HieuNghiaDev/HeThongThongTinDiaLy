const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',       
    password: '',    
    database: 'htttdl'
});

connection.connect((err) => {
    if (err) {
        console.error('Có lỗi khi kết nối với database:', err);
        return;
    }
    console.log('Kết nối với database thành công');
});

module.exports = connection;