const db = require('../db/connecdb');

const Home = {
  getAllStores: function(callback) {
    const query = 'SELECT latitude, longitude FROM cuahang';
    db.query(query, (err, results) => {
      if (err) {
        return callback(err, null);
      }
      callback(null, results);
    });
  }
};

module.exports = Home;
