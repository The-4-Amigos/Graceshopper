const faker = require('faker');

const oldProducts = [
  {
    name: 'Tito Tequila',
    price: faker.datatype.number({ min: 40, max: 120 }),
    stockAmount: 345,
    ABV: 40,
    alcoholType: 'tequila',
    image:
      'https://cdn.shopify.com/s/files/1/0363/8621/products/IMG_2530_large.jpg?v=1638336249',
  },
  {
    name: 'Rose Rum',
    stockAmount: 789,
    ABV: 40,
    price: faker.datatype.number({ min: 40, max: 120 }),
    alcoholType: 'rum',
    description: 'It’s not fun without rum.',
    image:
      'https://cdn.shopify.com/s/files/1/0363/8621/products/CC4FB7E5-A900-4F09-A6CE-0CD2003DE775_1_105_c_large.jpg?v=1633748278',
  },
  {
    name: 'Walter Whiskey',
    stockAmount: 928,
    ABV: 60,
    price: faker.datatype.number({ min: 40, max: 120 }),
    alcoholType: 'whiskey',
    description:
      'Too much of anything is bad, but too much good whiskey is barely enough.',
    image:
      'https://cdn.shopify.com/s/files/1/0363/8621/products/AE5384CB-0D2F-4D18-904B-DCDE0A8D9DFF_1_201_a_large.jpg?v=1637385276',
  },
  {
    name: 'Willow Wine',
    stockAmount: 987,
    ABV: 11,
    price: faker.datatype.number({ min: 40, max: 120 }),
    alcoholType: 'wine',
    description:
      'Age is just a number. It’s totally irrelevant unless, of course, you happen to be a bottle of wine',
    image:
      'https://cdn.shopify.com/s/files/1/0363/8621/products/IMG_2325_large.jpg?v=1636156142',
  },
  {
    name: faker.fake('{{name.firstName}} {{name.lastName}}'),
    stockAmount: faker.datatype.number({ min: 0, max: 1500 }),
    ABV: faker.datatype.number({ min: 0, max: 85 }),
    price: faker.datatype.number({ min: 40, max: 120 }),
    alcoholType: 'wine',
    description:
      'Age is just a number. It’s totally irrelevant unless, of course, you happen to be a bottle of wine',
    image:
      'https://cdn.shopify.com/s/files/1/0363/8621/products/IMG_2325_large.jpg?v=1636156142',
  },
];

let products = [];

for (let i = 1; i <= 150; i++) {
  let name = faker.name.lastName();
  let image = faker.random.arrayElement([
    'https://cdn.shopify.com/s/files/1/0363/8621/products/IMG_2530_large.jpg?v=1638336249',
    'https://cdn.shopify.com/s/files/1/0363/8621/products/CC4FB7E5-A900-4F09-A6CE-0CD2003DE775_1_105_c_large.jpg?v=1633748278',
    'https://cdn.shopify.com/s/files/1/0363/8621/products/AE5384CB-0D2F-4D18-904B-DCDE0A8D9DFF_1_201_a_large.jpg?v=1637385276',
    'https://cdn.shopify.com/s/files/1/0363/8621/products/IMG_2325_large.jpg?v=1636156142',
  ]);
  let ABV = faker.datatype.number({ min: 0, max: 85 });
  let stockAmount = faker.datatype.number({ min: 0, max: 1500 });
  let price = faker.datatype.number({ min: 40, max: 120 });
  let description = faker.lorem.words(12);
  let alcoholType = faker.random.arrayElement([
    'tequila',
    'whiskey',
    'wine',
    'rum',
  ]);

  products.push({
    name,
    image,
    ABV,
    stockAmount,
    price,
    description,
    alcoholType,
  });
}

let users = [];

for (let i = 1; i <= 100; i++) {
  let username = faker.internet.userName();
  let password = 'password123';
  let fullName = faker.fake('{{name.firstName}} {{name.lastName}}');
  let email = faker.internet.email();
  let address = `${faker.address.streetAddress()} ${faker.address.city()} ${faker.address.state()} ${faker.address.zipCode()}`;
  let dob = faker.date.between('1965-01-01', '2000-01-01');
  let isAdmin = false;

  users.push({
    username,
    password,
    fullName,
    email,
    address,
    dob,
    isAdmin,
  });
}

module.exports = {
  products,
  users,
};
