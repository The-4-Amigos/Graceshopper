const router = require('express').Router();
const {
  models: { Product },
} = require('../db');
const User = require('../db/models/User');
module.exports = router;
//OUTSTANDING:
// - Need to create "Cart" & "Order" models in the db folder
// - Need to import above mentioned modles on the top of this file
// - Need to comment out the include on line 24

router.get('/', async (req, res, next) => {
  try {
    const AllProducts = await Product.findAll();
    res.send(AllProducts);
  } catch (err) {
    next(err);
  }
});

//get a single product:
router.get('/:productId', async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.productId, {
      //include: { Cart, Order },
      //Getting an error stating that Cart & Order are not defined
    });
    res.send(product);
  } catch (err) {
    next(err);
  }
});

//post request (an admin is creating a product)
//confirmed in insomina
router.post('/', async (req, res, next) => {
  try {
    res.status(201).send(await Product.create(req.body));
  } catch (error) {
    next(error);
  }
});

//PUT request (an admin updating a product)
// how to figure out thr isAdmin (demo isAdmin next to include)
router.put('/:productId', async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.productId, {
      include: User,
    });
    await product.update();
    res.send(product);
  } catch (error) {
    next(error);
  }
});

router.delete('/:productId', async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.productId, {});
    await product.destroy();
    res.send(product);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
