const userModel = require('../models/userModel');

exports.getLogin = (req, res) => {
    res.render('login', { error: null });
};

exports.postLogin = async (req, res) => {
    try {
        const { username, password } = req.body;
        console.log('Attempting login for:', username);
        const user = await userModel.authenticateUser(username, password);
        if (user) {
            req.session.user = user;
            console.log('Login successful for:', username);
            res.redirect('/');
        } else {
            console.log('Login failed for:', username);
            res.render('login', { error: 'Tên đăng nhập hoặc mật khẩu không đúng' });
        }
    } catch (error) {
        console.error('Lỗi đăng nhập:', error);
        res.status(500).json({ error: 'Đã xảy ra lỗi khi đăng nhập' });
    }
};

exports.logout = (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.error('Lỗi đăng xuất:', err);
            return res.status(500).render('error', { message: 'Không thể đăng xuất' });
        }
        res.redirect('/auth/login');
    });
};

exports.getRegister = (req, res) => {
    res.render('auth/register');
};

exports.postRegister = async (req, res) => {
    const { username, password, email } = req.body;
    try {
        const newUser = await userModel.createUser(username, password, email);
        if (newUser) {
            res.redirect('/auth/login');
        } else {
            res.render('auth/register', { error: 'Không thể đăng ký. Vui lòng thử lại.' });
        }
    } catch (error) {
        console.error('Lỗi đăng ký:', error);
        res.status(500).render('error', { message: 'Lỗi server khi đăng ký' });
    }
};