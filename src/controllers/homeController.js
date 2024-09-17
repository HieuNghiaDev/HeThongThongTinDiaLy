const Home = require('../models/homeModel');

exports.getHome = (req, res) => {
  if (!req.session.user) {
    return res.redirect('/login');
  }
  Home.getAllLocations((err, locations) => {
    if (err) {
      console.error('Database error:', err);
      locations = [];
    }
    res.render('home', { user: req.session.user, locations: locations });
  });
};
