const router = require('express').Router();
const Orders = require('../db/models/Orders');
const Product = require('../db/models/Product');
const ProductOrders = require('../db/models/ProductOrders');

router.get('/', (req, res, next) => {
	// o: this should be changed to an async / await for consistency
	Orders.findAll()
		.then((orders) => res.status(200).json(orders))
		.catch(next);
});

router.get('/:id', async (req, res, next) => {
	try {

		// o: can be a Order.findOne since you are only getting one thing
		const userOrder = await Orders.findAll({
			where: {
				userId: req.params.id,
			},
			include: [{ model: Product }],
		});
		res.status(200).send(userOrder);
	} catch (err) {
		console.log('This is the error in order route', err);
		next(err);
	}
});

router.get('/byorder/:orderId', async (req, res, next) => {
	try {
		// o: don't forget to check for when the order with id of orderId is not found
		const orderById = await Orders.findOne({
			where: {
				id: req.params.orderId,
			},
			include: [{ model: Product }],
		});
		res.status(200).send(orderById);
	} catch (err) {
		console.log(
			'This error appears when trying to get an order by the order id',
			err
		);
		next(err);
	}
});

router.post('/:userId', async (req, res, next) => {
	Orders.findOrCreate({
		where: {
			userId: req.params.userId,
			fulfilled: false,
		},
	})
		.spread((order) => {
			const { orderItem } = req.body;
			Product.findOrCreate({
				where: {
					title: orderItem.title,
					orderId: +order.id,
					productId: orderItem.productId,
					price: orderItem.price,
				},
			})
				.then((item) => {
					item[0].update({ quantity: +req.body.quantity });
				})
				.then((updatedItem) => res.status(204).json(updatedItem));
		})
		.catch(next);
});

router.delete('/:orderId/:productId', (req, res, next) => {
	Orders.destroy({
		where: {
			id: Number(req.params.orderId),
		},
	})
		.then(() => res.sendStatus(204))
		.catch(next);
});

module.exports = router;
