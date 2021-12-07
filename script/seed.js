'use strict'

const {db, models: {User, Product} } = require('../server/db')

//dummy data array for Product model

const products = [{
  name: 'Tila Tequila',
  price: 76.99,
}, {
  name: 'Rose Rum',
  alcoholType: 'rum',
  price: 89.99,
  description: 'It’s not fun without rum.'
}, {
  name: 'Walter Whiskey',
  alcoholType: 'whiskey',
  price: 68.99,
  description: 'Too much of anything is bad, but too much good whiskey is barely enough.'
}, {
  name: 'Willow Wine',
  alcoholType: 'wine',
  price: 87.99,
  description: 'Age is just a number. It’s totally irrelevant unless, of course, you happen to be a bottle of wine'
}];

/**
 * seed - this function clears the database, updates tables to
 *      match the models, and populates the database.
 */
async function seed() {
  await db.sync({ force: true }) // clears db and matches models to tables
  console.log('db synced!')

  // Creating Users
  const users = await Promise.all([
    User.create({ username: 'cody', password: '123' }),
    User.create({ username: 'murphy', password: '123' }),
  ])

  await Promise.all(products.map(product => {
    return Product.create(product)
  }))

  console.log(`seeded ${users.length} users`)
  console.log(`seeded successfully`)
  return {
    users: {
      cody: users[0],
      murphy: users[1]
    }
  }
}

/*
 We've separated the `seed` function from the `runSeed` function.
 This way we can isolate the error handling and exit trapping.
 The `seed` function is concerned only with modifying the database.
*/
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

/*
  Execute the `seed` function, IF we ran this module directly (`node seed`).
  `Async` functions always return a promise, so we can use `catch` to handle
  any errors that might occur inside of `seed`.
*/
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
