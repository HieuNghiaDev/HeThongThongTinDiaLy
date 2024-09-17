const express = require('express');
const session = require('express-session');
const path = require('path');
const authRoutes = require('./routes/authRoutes');
const storeRoutes = require('./routes/homeRoutes');

const app = express();

// Cấu hình views
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: true,
}));

// Sử dụng routes
// app.use('/', authRoutes);

// Sử dụng routes
app.use(authRoutes);
app.use(storeRoutes);

// app.get('/', (req, res) => {
//     res.render('home');
// });

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});