const faker = require('faker');
let tequilaBottleImages = [
  'https://images.unsplash.com/photo-1516535794938-6063878f08cc?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8dGVxdWlsYSUyMGJvdHRsZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60',
  'https://images.unsplash.com/photo-1630956792643-37202d382297?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8dGVxdWlsYSUyMGJvdHRsZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60',
  'https://images.unsplash.com/photo-1522128483605-23607c944cbb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OXx8dGVxdWlsYSUyMGJvdHRsZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60',
];
let rumBottleImages = [
  'https://media.istockphoto.com/photos/bottle-on-shore-picture-id1207907785?b=1&k=20&m=1207907785&s=170667a&w=0&h=nNhdJBZX61SUx75joIPLZaRD63kmDWVYCkM3BbYj4_w=',
  'https://cdn.pixabay.com/photo/2012/12/13/11/48/water-69742__340.jpg',
  'https://cdn.pixabay.com/photo/2019/12/07/12/20/old-monk-4679243__340.jpg',
];
let whiskeyBottleImages = [
  'https://images.unsplash.com/photo-1602166242292-93a00e63e8e8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8d2hpc2tleSUyMGJvdHRsZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60',
  'https://images.unsplash.com/photo-1608706634832-8453b8675932?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8d2hpc2tleSUyMGJvdHRsZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60',
  'https://images.unsplash.com/photo-1580537922571-ca7180cd700e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8d2hpc2tleSUyMGJvdHRsZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60',
];
let wineBottleImages = [
  'https://images.unsplash.com/photo-1557682204-e53b55fd750c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8d2luZSUyMGJvdHRsZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60',
  'https://images.unsplash.com/photo-1584916201218-f4242ceb4809?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8d2luZSUyMGJvdHRsZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60',
  'https://images.unsplash.com/photo-1610631787813-9eeb1a2386cc?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8N3x8d2luZSUyMGJvdHRsZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60',
];

function assignLiquorTypes(type) {
  if (type === 'tequila') {
    return tequilaBottleImages;
  }
  if (type === 'rum') {
    return rumBottleImages;
  }
  if (type === 'whiskey') {
    return whiskeyBottleImages;
  }
  if (type === 'wine') {
    return wineBottleImages;
  }
}

let products = [];

for (let i = 1; i <= 150; i++) {
  let name = faker.name.lastName();
  let ABV = faker.datatype.number({ min: 0, max: 85 });
  let stockAmount = faker.datatype.number({ min: 0, max: 1500 });
  let price = faker.datatype.number({ min: 40, max: 120 });
  let description = faker.lorem.words(12);
  let alcoholType = faker.random.arrayElement([
    'tequila',
    'rum',
    'whiskey',
    'wine',
  ]);
  let image = faker.random.arrayElement(assignLiquorTypes(alcoholType));

  products.push({
    name,
    ABV,
    stockAmount,
    price,
    description,
    alcoholType,
    image,
  });
}

let users = [];

for (let i = 1; i <= 100; i++) {
  let username = faker.internet.userName();
  let password = 'password123';
  let fullName = faker.fake('{{name.firstName}} {{name.lastName}}');
  let email = faker.internet.email();
  let address = `${faker.address.streetAddress()}, ${faker.address.city()}, ${faker.address.state()} ${faker.address.zipCode()}`;
  let dob = faker.date.between('1965-01-01', '2000-01-01');

  users.push({
    username,
    password,
    fullName,
    email,
    address,
    dob,
  });
}

let orders = [];

for (let i = 1; i <= 200; i++) {
  let fulfilled = faker.datatype.boolean();
  let userId = faker.datatype.number({ min: 1, max: 100 });

  orders.push({
    fulfilled,
    userId,
  });
}

let productOrders = [];

for (let i = 1; i <= 200; i++) {
  let orderId = i;
  let productId = faker.datatype.number({ min: 1, max: 150 });

  productOrders.push({
    orderId,
    productId,
  });
}

module.exports = {
  products,
  users,
  orders,
  productOrders,
};
