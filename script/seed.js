'use strict';
const {
	db,
	models: { User, Product, Order },
} = require('../server/db');
const Orders = require('../server/db/models/Orders');
const ProductOrders = require('../server/db/models/ProductOrders');
const { products, users, orders, productOrders } = require('./seedData');

/**
 * seed - this function clears the database, updates tables to
 *      match the models, and populates the database.
 */
async function seed() {
	await db.sync({ force: true }); // clears db and matches models to tables
	console.log('db synced!');

	const admins = [
		{
			username: 'JoseAdmin',
			fullName: 'Jose Admin',
			isAdmin: 'true',
			password: 'admin456',
			dob: '1999-04-01',
			email: 'fsajose@aol.com',
		},
		{
			username: 'MiliAdmin',
			fullName: 'Mili Admin',
			isAdmin: 'true',
			password: 'admin123',
			dob: '2000-05-11',
			email: 'fsamili@aol.com',
		},
	];

	await Promise.all(
		admins.map((admin) => {
			return User.create(admin);
		})
	);

	await Promise.all(
		users.map((user) => {
			return User.create(user);
		})
	);

	await Promise.all(
		products.map((product) => {
			return Product.create(product);
		})
	);

	await Promise.all(
		orders.map((order) => {
			return Order.create(order);
		})
	);

	
		
	let unfulfilled = []
	
	for (let i = 1; i <= 15; i++) {
		let fulfilled = false;
		let userId = i;
		
		unfulfilled.push({
			fulfilled,
			userId,
		});
	}

	await Promise.all(
		unfulfilled.map((order) => {
			return Order.create(order);
		})
	);

	await Promise.all(
		productOrders.map((productOrder) => {
			return ProductOrders.findOrCreate({
				where: {
					orderId: productOrder.orderId,
					productId: productOrder.productId,
				},
			});
		})
	);

	console.log(`seeded ${users.length} users`);
	console.log(`seeded successfully`);
}

/*
 We've separated the `seed` function from the `runSeed` function.
 This way we can isolate the error handling and exit trapping.
 The `seed` function is concerned only with modifying the database.
*/
async function runSeed() {
	console.log('seeding...');
	try {
		await seed();
	} catch (err) {
		console.error(err);
		console.log('This is productOrder', productOrders[0]);
		process.exitCode = 1;
	} finally {
		console.log('closing db connection');
		await db.close();
		console.log('db connection closed');
	}
}

/*
  Execute the `seed` function, IF we ran this module directly (`node seed`).
  `Async` functions always return a promise, so we can use `catch` to handle
  any errors that might occur inside of `seed`.
*/
if (module === require.main) {
	runSeed();
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed;
