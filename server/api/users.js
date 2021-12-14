const router = require('express').Router()
const { models: { User, Order, Product }} = require('../db')
const verifyAdmin = require('./authMiddleware')

//get all users with info only available to logged in admins
//api/users/admin
router.get('/admin', verifyAdmin , async (req, res, next) => {
  try {
    const AllUsers = await User.findAll();
    res.send(AllUsers);
  } catch (err) {
    next(err);
  }
});

//get user by id, only available to admin

router.get('/:userId', verifyAdmin, async (req, res, next) => {
  try {
  const id = req.params.userId
  const singleUser = await User.findByPk(id)
  if (!singleUser) {
      res.sendStatus(404)
      return
  }
  res.send(singleUser)
  } catch (error) {
      next (error)
  }
})

// get single user with associated order/s
router.get('/:userId', async (req, res, next) => {
  try {
  const id = req.params.userId
  const userWithOrders = await User.findByPk(id, {
    include: [{
      model: Order,
      as: 'orders',
      include: [{
        model: Product,
        as: 'products'
      }]
    }]
  })
  res.send(userWithOrders)
  } catch (error) {
      next (error)
  }
})

//admin post/create request with verifyAdmin middleware

router.post('/', verifyAdmin , async (req, res, next) => {
  try {
  res.status(201).send(await User.create(req.body))
  } catch (error) {
    next (error)
  }
} )

//admin put/update request with verifyAdmin middleware

router.put('/:userId', verifyAdmin, async (req, res, next) => {
  try {
  const id = req.params.userId
  const userToUpdate = await User.findByPk(id)
  res.send(await userToUpdate.update(req.body))
  } catch (error) {
    next (error)
  }
} )

//admin delete request with verifyAdmin middleware

router.delete('/:userId', verifyAdmin, async (req, res, next) => {
    try {
    const id = req.params.userId
    const userToDelete = await User.findByPk(id)
    await userToDelete.destroy()
    res.send(userToDelete)
  } catch (error) {
      next (error)
    }
  } )


module.exports = router
