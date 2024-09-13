const express = require('express');
const router = express.Router();
const userModel = require('../models/userModel');

// router.get('/login', (req, res) => {
//     res.render('login');
// });

router.get('/login', (req, res) => {
    if (req.session.user) {
        // Nếu người dùng đã đăng nhập, chuyển hướng về trang chủ
        return res.redirect('/');
    }
    res.render('login');
});

// Xử lý đăng nhập 
router.post('/login', (req, res) => {
    const username = req.body.username;
	const password = req.body.password;
    
    // Kiểm tra thông tin đăng nhập với cơ sở dữ liệu
    userModel.authenticateUser(username, password, (err, user) => {
        if (err) {
            return;
        }
        if (user) {
            req.session.user = username;
            res.redirect('/');
        } else {
            res.render('login');
        }
    });
});

// Trang chủ
router.get('/', (req, res) => {
    if (req.session.user) {
        res.render('index', { username: req.session.user });
    } else {
        res.redirect('/login');
    }
});

router.get('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(400).send({ message: err });
        }
        res.redirect('/login');
    });
})

module.exports = router;