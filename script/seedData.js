const faker = require('faker');

let tequilaBottleImages = [
  'https://images.unsplash.com/photo-1516535794938-6063878f08cc?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8dGVxdWlsYSUyMGJvdHRsZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60',
  'https://images.unsplash.com/photo-1630956792643-37202d382297?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8dGVxdWlsYSUyMGJvdHRsZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60',
  'https://images.unsplash.com/photo-1522128483605-23607c944cbb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OXx8dGVxdWlsYSUyMGJvdHRsZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60',
  'https://cloudfront.omsphoto.com/wp-content/uploads/2019/11/OMS-photo-drink-photography-tequila-047.jpg',
  'https://media.istockphoto.com/photos/silver-patron-tequila-picture-id458134703?k=20&m=458134703&s=612x612&w=0&h=tWq26eChXMZjcgW2IBOuA6u9YcKdgUwUTKntoTvm5Zs=',
  'https://c1.wallpaperflare.com/preview/486/159/708/tequila-bottle-glass-tequila-bottle.jpg',
  'https://hauteliving.com/wp-content/uploads/2021/03/IMG_8308-533x800.jpg',
];
let rumBottleImages = [
  'https://media.istockphoto.com/photos/bottle-on-shore-picture-id1207907785?b=1&k=20&m=1207907785&s=170667a&w=0&h=nNhdJBZX61SUx75joIPLZaRD63kmDWVYCkM3BbYj4_w=',
  'https://cdn.pixabay.com/photo/2012/12/13/11/48/water-69742__340.jpg',
  'https://cdn.pixabay.com/photo/2019/12/07/12/20/old-monk-4679243__340.jpg',
  'https://images.unsplash.com/photo-1575739263357-efe1118edb47?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fHJ1bSUyMGJvdHRsZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60',
  'https://images.unsplash.com/photo-1515777714766-d662e374bdd4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OXx8cnVtJTIwYm90dGxlfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
  'https://images.unsplash.com/photo-1613140505986-c64dd5894d97?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cnVtJTIwYm90dGxlfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
  'https://robbreport.com/wp-content/uploads/2021/01/Mount-Gay-Photo-Mount-Gay-1703-MS-2019-Bottle-Alone-HR-OS.jpg?w=1000',
  'https://robbreport.com/wp-content/uploads/2021/01/CRITERION_LIFESTYLE-8743.jpg',
];
let whiskeyBottleImages = [
  'https://images.unsplash.com/photo-1602166242292-93a00e63e8e8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8d2hpc2tleSUyMGJvdHRsZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60',
  'https://images.unsplash.com/photo-1608706634832-8453b8675932?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8d2hpc2tleSUyMGJvdHRsZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60',
  'https://images.unsplash.com/photo-1580537922571-ca7180cd700e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8d2hpc2tleSUyMGJvdHRsZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60',
  'https://images.unsplash.com/photo-1534221905680-192a9a88ac81?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8N3x8d2hpc2tleSUyMGJvdHRsZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60',
  'https://images.unsplash.com/photo-1548176483-2388add17dee?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8d2hpc2tleSUyMGJvdHRsZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60',
  'https://images.unsplash.com/photo-1617799981270-211cfe1f24d2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OXx8d2hpc2tleSUyMGJvdHRsZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60',
  'https://images.unsplash.com/photo-1587425647049-31e744ec850e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTJ8fHdoaXNrZXklMjBib3R0bGV8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60',
];
let wineBottleImages = [
  'https://images.unsplash.com/photo-1557682204-e53b55fd750c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8d2luZSUyMGJvdHRsZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60',
  'https://images.unsplash.com/photo-1584916201218-f4242ceb4809?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8d2luZSUyMGJvdHRsZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60',
  'https://images.unsplash.com/photo-1610631787813-9eeb1a2386cc?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8N3x8d2luZSUyMGJvdHRsZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60',
  'https://www.kdwine.com/thumb/thumbme.html?src=/images/sites/kdwine/labels/flavium-crianza-bierzo_1.jpg&w=160&h=160',
  'https://assets.architecturaldigest.in/photos/6008436388d5cb634511ebbf/master/w_1600%2Cc_limit/fratelli.jpg',
  'https://i.pinimg.com/originals/20/6b/b2/206bb21b63bf833e57231aff6b422810.jpg',
  'https://images.pexels.com/photos/2912108/pexels-photo-2912108.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
  'https://www.vinboundmarketing.com/wp-content/uploads/2021/01/Alex-Fortson-Photography-6.jpg',
  'https://www.vinboundmarketing.com/wp-content/uploads/2021/01/Alex-Fortson-Photography-6.jpg',
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

for (let i = 1; i <= 50; i++) {
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

for (let i = 1; i <= 13; i++) {
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

for (let i = 1; i <= 30; i++) {
  let fulfilled = true;
  let userId = faker.datatype.number({ min: 1, max: 13 });

  orders.push({
    fulfilled,
    userId,
  });
}

let productOrders = [];

for (let i = 1; i <= 45; i++) {
  let orderId = i;
  let productId = faker.datatype.number({ min: 1, max: 50 });

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
