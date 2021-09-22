const productConfig = {
  productsPerPage: 15,
  topProductsLimit: 5,
  exampleProduct: {
    name: 'Default Name',
    description: 'Default Description',
    user: req.user.id,
    image: '/img/default.jpg',
    brand: 'Default Brand',
    category: 'Default Category',
    countInStock: 0,
    numReviews: 0,
    price: 0,
  },
};
