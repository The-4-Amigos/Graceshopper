const router = require('express').Router();
const Orders = require('../db/models/Orders');
const ProductOrders = require('../db/models/ProductOrders');
const Product = require('../db/models/Product');

// Routes
router.get('/:id', async (req, res, next) => {
	try {
		const cart = await Orders.findOne({
			where: {
				userId: req.params.id,
				fulfilled: false,
			},
			include: [{ model: Product }],
		});
		res.status(200).send(cart);
	} catch (error) {
		next(error);
	}
});

router.post('/:id', async (req, res, next) => {
	try {
		let order = await Orders.findOne({
			where: {
				userId: req.params.id,
				fulfilled: false,
			},
			include: Product,
		});
		let productOrder;
		if (order=== null) {
			let newOrder = await Orders.create({
				userId: req.params.id,
				fulfilled: false,
			});

			productOrder = await ProductOrders.findOrCreate({
				where: {
					orderId: newOrder.id,
					productId: req.body.productId,
				},
			});
		} else {
			productOrder = await ProductOrders.findOrCreate({
				where: {
					orderId: order.id,
					productId: req.body.productId,
				},
			});
		}

		res.json(productOrder);
	} catch (error) {
		next(error);
	}
});

router.put('/:id', async (req, res, next) => {
	try {
		let order = await Orders.findOne({
			where: {
				userId: req.params.id,
				fulfilled: false,
			},
			include: Product,
		});

		let productOrder = await ProductOrders.findOne({
			where: {
				orderId: order.id,
				productId: req.body.productId,
			},
		});

		let updatedOrder = await productOrder.update(req.body);
		res.json(updatedOrder);
	} catch (error) {
		next(error);
	}
});

router.delete('/:id', async (req, res, next) => {
	try {
		const cart = await Orders.findOne({
			where: {
				userId: req.params.id,
				fulfilled: false,
			},
			include: Product,
		});
		const cartItem = await ProductOrders.findOne({
			where: {
				orderId: cart.id,
				productId: req.body.item.product.id,
			},
		});
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
