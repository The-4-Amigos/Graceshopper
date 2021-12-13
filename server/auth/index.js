const router = require('express').Router()
const { models: {User }} = require('../db')
const Orders = require('../db/models/Orders');
const Products = require('../db/models/Product');
module.exports = router

router.post('/login', async (req, res, next) => {
  try {
    res.send({ token: await User.authenticate(req.body)});
    console.log('admin token from auth index folder', { token: await User.authenticate(req.body)}) 
  } catch (err) {
    next(err)
  }
})


router.post('/signup', async (req, res, next) => {
  try {
    // o: protect against someone making themselves an admin here 
    //  by destructuring
    const user = await User.create(req.body)
    res.send({token: await user.generateToken()})
  } catch (err) {
    if (err.name === 'SequelizeUniqueConstraintError') {
      res.status(401).send('User already exists')
    } else {
      console.log('This is the user and orders error', err)
      next(err)
    }
  }
})

router.get('/me', async (req, res, next) => {
  try {
    const UserWithOrders = await User.findByToken((req.headers.authorization), {
      include:[{
        model: Orders,
        as: 'orders',
        include: [{
          model: Products,
          as: 'products'
        }]
      }]
    })
    res.send(UserWithOrders)
  } catch (ex) {
    console.log('This is the user and orders error', ex)
    next(ex)
  }
})

