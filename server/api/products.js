const router = require("express").Router();
const {
  models: { Product },
} = require("../db");
module.exports = router;
//OUTSTANDING:
// - Need to create "Cart" & "Order" models in the db folder
// - Need to import above mentioned modles on the top of this file
// - Need to comment out the include on line 24

router.get("/", async (req, res, next) => {
  try {
    const AllProducts = await Product.findAll();
    res.send(AllProducts);
  } catch (error) {
    next(error);
  }
});


//get a single product:
router.get("/:productId", async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.productId, {
      //include: { Cart, Order },
      //Getting an error stating that Cart & Order are not defined
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

module.exports = router;
