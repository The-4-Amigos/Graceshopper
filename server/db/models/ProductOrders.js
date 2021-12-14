const Sequelize = require('sequelize')
const db = require('../db')

const ProductOrders = db.define('productOrders', {
  orderId: {
    type: Sequelize.INTEGER,
    // allowNull: false,
  },
  productId: {
    type: Sequelize.INTEGER,
  },
  price: {
    type: Sequelize.INTEGER,
    defaultValue: null
  },
  quantity: {
    type: Sequelize.INTEGER,
    defaultValue: 1,
    allowNull: false
  }
})

module.exports = ProductOrders