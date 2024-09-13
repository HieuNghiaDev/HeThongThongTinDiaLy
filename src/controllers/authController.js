const userModel = require('../models/userModel');

exports.getLogin = (req, res) => {
    res.render('login', { error: null });
};

exports.postLogin = async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await userModel.authenticateUser(username, password);
        if (user) {
            req.session.user = user;
            res.redirect('/'); // Chuyển hướng đến trang dashboard sau khi đăng nhập thành công
        } else {
            res.render('login', { error: 'Tên đăng nhập hoặc mật khẩu không đúng' });
        }
    } catch (error) {
        console.error('Lỗi đăng nhập:', error);
        res.status(500).render('error', { message: 'Đã xảy ra lỗi khi đăng nhập' });
    }
};

exports.getHome = (req, res) => {
    if (req.session.user) {
        res.render('home', { user: req.session.user });
    } else {
        res.redirect('/login');
    }
};

exports.logout = (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.error('Lỗi khi đăng xuất:', err);
        }
        res.redirect('/login');
    });
};

exports.getRegister = (req, res) => {
    res.render('register');
};

exports.postRegister = async (req, res) => {
    const { username, password, email } = req.body;
    try {
        const newUser = await userModel.createUser(username, password, email);
        if (newUser) {
            res.redirect('/login');
        } else {
            res.render('register', { error: 'Không thể đăng ký. Vui lòng thử lại.' });
        }
    } catch (error) {
        console.error('Lỗi đăng ký:', error);
        res.status(500).render('error', { message: 'Lỗi server khi đăng ký' });
    }
};