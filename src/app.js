const express = require('express');
const session = require('express-session');
const path = require('path');
const authRoutes = require('./routes/authRoutes');

const app = express();
const port = 3000;

// Cấu hình views
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// app.use(express.static(path.join(__dirname, 'src', 'public')));

app.use(express.static(path.join(__dirname, 'public')));

// app.set(express.static(path.join(__dirname, '/public')));
app.use(express.urlencoded({ extended: true }));
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: true,
}));

app.use('/auth', authRoutes);

app.get('/', (req, res) => {
    res.render('home');
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});