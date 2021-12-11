const db = require('./db');

const User = require('./models/User');
const Product = require('./models/Product');
const Order = require('./models/Orders');

//associations could go here!
User.hasMany(Order);
Order.belongsTo(User);

Order.belongsToMany(Product, { through: 'ProductOrder' });
Product.belongsToMany(Order, { through: 'ProductOrder' });

//This user is specficaly an admin..
//..
User.hasMany(Product);
Product.belongsTo(User);

module.exports = {
  db,
  models: {
    User,
    Product,
    Order,
  },
};
