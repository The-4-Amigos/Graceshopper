const router = require('express').Router();
module.exports = router;

router.use('/users', require('./users'));

//redirect(mount?) to product file: (may be out side of my scope)
//router.use('/products', require('./products'));

router.use((req, res, next) => {
  const error = new Error('Not Found');
  error.status = 404;
  next(error);
});
