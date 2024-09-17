const userModel = require('../models/userModel');

exports.getLogin = (req, res) => {
    res.render('login', { error: null });
};

// Đăng nhập
exports.postLogin = async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await userModel.authenticateUser(username, password); // Kiểm tra thông tin đăng nhập
        if (user) {
            req.session.user = user;
            res.redirect('/'); // Chuyển hướng đến trang chủ sau khi đăng nhập thành công
        } else {
            res.render('login', { error: 'Tên đăng nhập hoặc mật khẩu không đúng' });
        }
    } catch (error) {
        console.error('Lỗi đăng nhập:', error);
        res.status(500).render('error', { message: 'Đã xảy ra lỗi khi đăng nhập' });
    }
};

// Trang chủ
exports.getHome = (req, res) => {
    if (req.session.user) {
        res.render('home', { user: req.session.user });
    } else {
        res.redirect('/login');
    }
};

// Đăng xuất
exports.logout = (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.error('Lỗi khi đăng xuất:', err);
        }
        res.redirect('/login');
    });
};

// Đăng ký
exports.getRegister = (req, res) => {
    res.render('register');
};

// Xử lý đăng ký
exports.postRegister = async (req, res) => { 
    const { username, password,fullname, email, repassword } = req.body; // Lấy dữ liệu từ form

    if (password !== repassword) {
        return res.render('register', { error: 'Mật khẩu và mật khẩu nhập lại không khớp' });
    }

    try {
        const newUser = await userModel.createUser(username, password,fullname, email); // Tạo người dùng mới
        if (newUser) {
            res.redirect('/login');
        } else {
            res.render('register', { error: 'Không thể đăng ký. Vui lòng thử lại.' }); // Hiển thị thông báo lỗi
        }
    } catch (error) {
        console.error('Lỗi đăng ký:', error); 
        res.status(500).render('error', { message: 'Lỗi server khi đăng ký' });
    }
};