const router = require('express').Router();
const Orders = require('../db/models/Orders');
const ProductOrders = require('../db/models/ProductOrders');
const Product = require('../db/models/Product');

// helper functions
const findCart = (userId) =>
	Orders.findAll({
		where: {
			userId,
			fulfilled: false,
		},
	});

const findCartItem = (orderId, productId) =>
	ProductOrders.findOne({
		where: {
			orderId,
			productId,
		},
	});

// Routes
router.get('/:id', async (req, res, next) => {
	try {
		const cart = await Orders.findAll({
			where: {
				userId: req.params.id,
				fulfilled: false,
			},
			include: [{ model: Product }],
		});
		// console.log('This is the cart from the user order route', userOrder);
		res.status(200).send(cart);
	} catch (err) {
		console.log('This is the error in cart route', err);
		next(err);
	}
});

router.post('/', async (req, res, next) => {
	try {
		const order = req.cart;
		var newProductOrder;
		newProductOrder = await ProductOrders.findOne({
			where: {
				productId: req.body.productId,
				orderId: order.id,
			},
		});

		if (newProductOrder) {
			let newQuantity = 0;

			newQuantity = newProductOrder.quantity + req.body.quantity;

			await newProductOrder.update({
				quantity: newQuantity,
			});
		} else {
			newProductOrder = await ProductOrders.create({
				productId: req.body.productId,
				quantity: req.body.quantity,
				price: req.body.price,
				orderId: order.id,
			});
		}

		const product = await Product.findOne({
			where: {
				id: req.body.productId,
			},
		});

		res.json({ newProductOrder, product });
	} catch (err) {
		next(err);
	}
});

router.put('/:id', async (req, res, next) => {
	try {
		var order = await Orders.findOne({
			where: {
				userId: req.params.id,
			},
		});

		var productOrder = await ProductOrders.findOne({
			where: {
				productId: req.body.productId,
				orderId: order.id,
			},
		});

		var product = await Product.findOne({
			where: {
				id: req.body.productId,
			},
		});

		await productOrder.update({
			quantity: req.body.quantity,
		});
		console.log('This is req.body:', req.body)
		res.json({ productOrder, product });
	} catch (err) {
		console.log('This is the error from the cart put route:', err)
		next(err);
	}
});

router.delete('/:id', async (req, res, next) => {
	try {
		const cart = await Orders.findAll({
			where: {
				userId: req.params.id,
				fulfilled: false,
			},
		});
		const cartItem = await findCartItem(cart[0].dataValues.id, req.params.id);
		if (!cartItem) {
			return res.sendStatus(404);
		}
		await cartItem.destroy();
		res.sendStatus(204);
	} catch (error) {
		next(error);
	}
});

module.exports = router;
