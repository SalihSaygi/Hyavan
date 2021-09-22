import Product from '../models/productModel.js';

const getProducts = (req, res) => {
  const productsPerPage = 10;
  const page = Number(req.query.pageNumber) || 1;

  const keyword = req.query.keyword
    ? {
        name: {
          $regex: req.query.keyword,
          $options: 'i',
        },
      }
    : {};

  const count = await Product.countDocuments({ ...keyword });
  const products = await Product.find({ ...keyword })
    .limit(productsPerPage)
    .skip(productsPerPage * (page - 1));

  const roundedDownPages = Math.ceil(count / productsPerPage);

  res.json({ products, page, pages: roundedDownPages });
};

const getProductById = (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    res.json(product);
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
};

const deleteProduct = (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    await product.remove();
    res.json({ message: 'Product removed' });
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
};

const createProduct = (req, res) => {
  const { name, price, image, brand, category, countInStock, description } =
    req.body;

  const product = new Product({
    name: name,
    price: price,
    user: req.user,
    image: image,
    brand: brand,
    category: category,
    countInStock: countInStock,
    numReviews: 0,
    description: description || 'No description available.',
  });

  const createdProduct = await product.save();
  res.status(201).json(createdProduct);
};

const updateProduct = (req, res) => {
  Product.findByIdAndUpdate(req.params.id, req.body, { new: true }).then(
    product => {
      if (product) {
        await product.save();
        res
          .status(201)
          .json({ message: 'Updated product with id ' + req.params.id });
      } else {
        res.status(404).json({
          message: "Couldn't find the report with id: " + req.params.id,
        });
        throw new Error('Coul');
      }
    }
  );
};

const createProductReview = (req, res) => {
  const { rating, comment } = req.body;

  const product = await Product.findById(req.params.id);

  if (product) {
    const alreadyReviewed = product.reviews.find(
      r => r.user.toString() === req.user._id.toString()
    );

    if (alreadyReviewed) {
      res.status(400);
      throw new Error('Product already reviewed');
    }

    const review = {
      name: req.user.name,
      rating: Number(rating),
      comment,
      user: req.user._id,
    };

    product.reviews.push(review);

    product.numReviews = product.reviews.length;

    product.rating =
      product.reviews.reduce((acc, item) => item.rating + acc, 0) /
      product.reviews.length;

    await product.save();
    res.status(201).json({ message: 'Review added' });
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
};

const getTopProducts = (req, res) => {
  const products = await Product.find()
    .sort({ rating: -1 })
    .limit(topProductsLimit);

  res.json(products);
};

export {
  getProducts,
  getProductById,
  deleteProduct,
  createProduct,
  updateProduct,
  createProductReview,
  getTopProducts,
};
