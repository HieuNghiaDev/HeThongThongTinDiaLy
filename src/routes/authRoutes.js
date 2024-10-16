const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.get('/login', authController.getLogin);
router.post('/login', authController.postLogin);
router.get('/', [authController.getHome, authController.getStores]);
router.get('/add-store', authController.getAddStores)
router.post('/abc', authController.createStores)
router.get('/logout', authController.logout);
router.get('/register', authController.getRegister);
router.post('/register', authController.postRegister);
router.get('/search', authController.searchStores);
router.get('/statistical_shop', authController.statisticalShop);
router.post('/delete-store', authController.deleteStore);

module.exports = router;
