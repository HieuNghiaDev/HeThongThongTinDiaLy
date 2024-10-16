const userModel = require('../models/userModel');
const storeModel = require('../models/storeModel');

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
exports.getHome = async (req, res) => {
    // Kiểm tra xem người dùng đã đăng nhập hay chưa
    if (!req.session.user) {
        return res.redirect('/login');
    }

    try {
        const stores = await storeModel.getStores();
        const user = req.session.user;

        res.render('home', { 
            stores: stores,
            user: user
        });
    } catch (error) {
        console.error('Lỗi khi lấy dữ liệu cửa hàng:', error);
        res.render('home', { 
            stores: [],
            user: req.session.user
        });
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

exports.getAddStores = async (req, res) => { // Đánh dấu là async
    const user = req.session.user; // Lấy thông tin người dùng
    const stores = await storeModel.getStores(); // Lấy danh sách cửa hàng
    res.render('add-stores', { user, stores }); // Chuyển dữ liệu sang view
};

//lay du lieu cua cuahang
exports.getStores = async (req, res) => {
    try {
        const stores = await userModel.getStores();
        console.log('Dữ liệu stores:', stores);
        res.render('home', { stores });
    } catch (error) {
        console.error('Lỗi lấy dữ liệu cửa hàng:', error);
        res.status(500).render('error', { message: 'Lỗi server khi lấy dữ liệu cửa hàng' });
    }
}

// Xử lý tạo cửa hàng mới
exports.createStores = async (req, res) => { 
    console.log('du lieu tu form:', req.body);
    const { name_store, address, latitude, longitude, phone, img = '/images/shop_img/the-gioi-di-dong-logo.png', email } = req.body; // Lấy dữ liệu từ form

    // Validate required fields
    if (!name_store) {
        return res.status(400).render('add-stores', { error: 'Tên cửa hàng là bắt buộc' });
    }

    // Log the received data for debugging
    console.log('Received store data:', { name_store, address, latitude, longitude, phone, img, email });

    // Set default values to null if they are undefined
    const storeData = {
        name_store: name_store || null,
        address: address || null,
        latitude: latitude || null,
        longitude: longitude || null,
        phone: phone || null,
        img: img || null,
        email: email || null
    };

    try {
        const newStoreId = await storeModel.createStores(
            storeData.name_store,
            storeData.address,
            storeData.latitude,
            storeData.longitude,
            storeData.phone,
            storeData.img,
            storeData.email
        ); // Tạo cửa hàng mới
        res.redirect('/'); // Chuyển hướng về trang chủ sau khi tạo thành công
    } catch (error) {
        console.error('Lỗi tạo cửa hàng:', error); 
        res.status(500).render('error', { message: 'Lỗi server khi tạo cửa hàng' });
    }
};

// Xử lý tìm kiếm
exports.searchStores = async (req, res) => {
    const query = req.query.query;
    try {
        const stores = await storeModel.searchStores(query); 
        const user = req.session.user;

        res.render('home', { 
            stores: stores,
            user: user
        });
    } catch (error) {
        console.error('Lỗi khi tìm kiếm cửa hàng:', error);
        res.render('home', { 
            stores: [],
            user: req.session.user
        });
    }
};

// Thống kê cửa hàng
exports.statisticalShop = async (req, res) => {
    const storeId = req.query.id; // Get the store ID from the query parameters
    try {
        const store = await storeModel.getStoreById(storeId); // Fetch the store data by ID
        const user = req.session.user;

        if (!store) {
            // If the store is not found, render an error page or redirect
            return res.status(404).render('error', { message: 'Cửa hàng không tồn tại' });
        }

        res.render('statistical_shop', { 
            store: store,
            user: user
        });
    } catch (error) {
        console.error('Lỗi khi lấy dữ liệu cửa hàng:', error);
        res.render('error', { message: 'Lỗi server khi lấy dữ liệu cửa hàng' });
    }
};

// Xử lý xóa cửa hàng
exports.deleteStore = async (req, res) => {
    const { storeId } = req.body;
    try {
        await storeModel.deleteStore(storeId); 
        res.redirect('/');
    } catch (error) {
        console.error('Lỗi xóa cửa hàng:', error);
        res.status(500).render('error', { message: 'Lỗi server khi xóa cửa hàng' });
    }
};
