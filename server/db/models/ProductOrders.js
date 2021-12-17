const Sequelize = require('sequelize')
const db = require('../db')

const ProductOrders = db.define('productOrders', {
  orderId: {
    type: Sequelize.INTEGER,
  },
  productId: {
    type: Sequelize.INTEGER,
  },
  quantity: {
    type: Sequelize.INTEGER,
    defaultValue: 1,
    allowNull: false
  }
})

module.exports = ProductOrders