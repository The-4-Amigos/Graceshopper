const Sequelize = require('sequelize')
const db = require('../db')


module.exports = db.define('product', {
    name: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    image: {
        type: Sequelize.TEXT,
        defaultValue: 'https://www.liquor.com/thmb/d9fYsp52ncAy1eajXuzIZQMNaCk=/440x440/filters:max_bytes(150000):strip_icc()/__opt__aboutcom__coeus__resources__content_migration__liquor__2019__01__18135838__what-to-do-with-port_article2_720x720-56a0d00bd52744b8b202a20bd718ab53.jpg'
    },
    ABV: {
        type: Sequelize.INTEGER,
    },
    stockAmount: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
            min: 0
        }
    },
    price: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
        validate: {
            min: 0
        }
    },
    description: {
        type: Sequelize.STRING,
        defaultValue: 'If life gives you lemons, make lemonade'
    },
    alcoholType: {
        type: Sequelize.ENUM('tequila', 'whiskey', 'wine', 'rum'),
        allowNull: false
    }
})