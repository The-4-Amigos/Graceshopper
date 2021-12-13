// o: delete this file if not being used
const router = require("express").Router();
const {
  models: { Product },
} = require("../db");

router.get("/", async (req, res, next) => {
  try {
    const data = await Product.findAll();
    res.send(data);
  } catch (err) {
    console.log(
      "there was an error inside of the routes folder api/index ",
      err
    );
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const data = await Product.findOne({
      where: {
        id: req.params.id,
      },
    });
    res.send(data);
  } catch (err) {
    console.log(
      "there was an error inside of the routes folder api/index ",
      err
    );
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const data = await Product.findByPk(req.params.id);
    await data.destroy();
    res.send(data);
  } catch (err) {
    console.log(
      "there was an error inside of the routes folder api/index  THE DELETE ONE",
      err
    );
  }
});
module.exports = router;