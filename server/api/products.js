<<<<<<< HEAD
const router = require('express').Router();
=======
const router = require("express").Router();
const verifyAdmin = require('./authMiddleware')
>>>>>>> 69fe49781c92ed0d8822c99c66658fad32626aa1
const {
  models: { Product },
} = require('../db');
const User = require('../db/models/User');
module.exports = router;

<<<<<<< HEAD
router.get('/', async (req, res, next) => {
=======

//get all products; available to all users/guests
router.get("/", async (req, res, next) => {
>>>>>>> 69fe49781c92ed0d8822c99c66658fad32626aa1
  try {
    const AllProducts = await Product.findAll();
    res.send(AllProducts);
  } catch (error) {
    next(error);
  }
});



//get all products admin only access with authentication middleware
router.get("/admin", verifyAdmin, async (req, res, next) => {
  try {
    const AllProducts = await Product.findAll();
    res.send(AllProducts);
  } catch (error) {
    next(error);
  }
});

//get a single product:
<<<<<<< HEAD
router.get('/:productId', async (req, res, next) => {
=======

router.get("/:productId", async (req, res, next) => {
>>>>>>> 69fe49781c92ed0d8822c99c66658fad32626aa1
  try {
    const product = await Product.findByPk(req.params.productId, {
    });
    if (!product) {
      res.sendStatus(404)
      return
    }
    res.send(product);
  } catch (error) {
    next(error);
  }
});

//get a single product admin only access with authentication middleware
router.get("/admin/:productId", verifyAdmin, async (req, res, next) => {
  try {

    const product = await Product.findByPk(req.params.productId, {
    });
    if (!product) {
      res.sendStatus(404)
      return
    }
    res.send(product);
  } catch (error) {
    next(error);
  }
});

<<<<<<< HEAD
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
=======
//admin post/create request with verifyAdmin middleware

router.post("/admin", verifyAdmin , async (req, res, next) => {
  try {
  res.status(201).send(await Product.create(req.body))
  } catch (error) {
    next (error)
  }
} )

//admin put/update request with verifyAdmin middleware

router.put('/:productId', verifyAdmin, async (req, res, next) => {
  try {
  const id = req.params.productId
  const productToUpdate = await Product.findByPk(id)
  res.send(await productToUpdate.update(req.body))
  } catch (error) {
    next (error)
  }
} )

//admin delete request with verifyAdmin middleware

router.delete("/:productId", verifyAdmin, async (req, res, next) => {
  try {
  const id = req.params.productId
  const productToDelete = await Product.findByPk(id)
  await productToDelete.destroy()
  res.send(productToDelete)
} catch (error) {
    next (error)
  }
} )
>>>>>>> 69fe49781c92ed0d8822c99c66658fad32626aa1

module.exports = router;
