// const express = require('express');
// const router = express.Router();
// const userModel = require('../models/userModel');

// // router.get('/login', (req, res) => {
// //     res.render('login');
// // });

// router.get('/login', (req, res) => {
//     if (req.session.user) {
//         // Nếu người dùng đã đăng nhập, chuyển hướng về trang chủ
//         return res.redirect('/');
//     }
//     res.render('login');
// });

// // Xử lý đăng nhập 
// router.post('/login', (req, res) => {
//     const username = req.body.username;
// 	const password = req.body.password;
    
//     // Kiểm tra thông tin đăng nhập với cơ sở dữ liệu
//     userModel.authenticateUser(username, password, (err, user) => {
//         if (err) {
//             return;
//         }
//         if (user) {
//             req.session.user = username;
//             res.redirect('/');
//         } else {
//             res.render('login');
//         }
//     });
// });

// // Trang chủ
// router.get('/', (req, res) => {
//     if (req.session.user) {
//         res.render('index', { username: req.session.user });
//     } else {
//         res.redirect('/login');
//     }
// });

// router.get('/logout', (req, res) => {
//     req.session.destroy((err) => {
//         if (err) {
//             return res.status(400).send({ message: err });
//         }
//         res.redirect('/login');
//     });
// })

// module.exports = router;

const userModel = require('../models/userModel');

exports.getLogin = (req, res) => {
    res.render('login');
};

exports.postLogin = async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await userModel.authenticateUser(username, password);
        if (user) {
            req.session.user = user;
            res.redirect('/');
        } else {
            res.render('login', { error: 'Tên đăng nhập hoặc mật khẩu không đúng' });
        }
    } catch (error) {
        console.error('Lỗi đăng nhập:', error);
        res.status(500).render('error', { message: 'Lỗi server khi đăng nhập' });
    }
};

exports.logout = (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.error('Lỗi đăng xuất:', err);
            return res.status(500).render('error', { message: 'Không thể đăng xuất' });
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