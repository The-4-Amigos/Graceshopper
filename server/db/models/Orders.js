const Sequelize = require('sequelize');
const db = require('../db');

module.exports = db.define('order', {
  fulfilled: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
});

//order date
//query for the total?
//user id fk
//product id fk

//retireve by date
