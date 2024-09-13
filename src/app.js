const express = require('express');
const session = require('express-session');
const path = require('path');
const authController = require('./controllers/authController');

const app = express();
const port = 3000;

// Cấu hình EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// app.use(express.static(path.join(__dirname, 'src', 'public')));

app.use(express.static(path.join(__dirname, 'public')));

// app.set(express.static(path.join(__dirname, '/public')));
app.use(express.urlencoded({ extended: true }));
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: true,
}));

app.use('/', authController);

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});