const router = require('express').Router();
const Product = require('../db/product');

//out of scope:
//QUESTION - Which index file does the mounting of the API go to?
// router.get('/', async (req, res, next) => {
//     try {
//       const products = await Product.findAll();
//       res.send(products)

//     } catch (error) {
//         next(error)
//     }
// })

//get a single product:
router.get('/:productId', async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.productId, {
      include: { Cart, Order },
    });
    res.send(product);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
