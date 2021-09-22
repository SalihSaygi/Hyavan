import Product from '../models/productModel.js';

export const isProductOwner = (req, res) => {
  const { id } = req.params;

  const productData = await Product.findById({ id });

  return productData.ownerId == req.user.sellerId;
};
