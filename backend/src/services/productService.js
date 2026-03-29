import Product from '../models/Product.js';

export const getAllProducts = async (query = {}) => {
  const { 
    page = 1, 
    limit = 20, 
    category, 
    available, 
    search,
    sortBy = 'createdAt',
    sortOrder = 'desc'
  } = query;

  const filter = {};
  
  if (category) {
    filter.category = category;
  }
  
  if (available !== undefined) {
    filter.available = available === 'true';
  }
  
  if (search) {
    filter.$text = { $search: search };
  }

  const sort = { [sortBy]: sortOrder === 'asc' ? 1 : -1 };

  const products = await Product.find(filter)
    .populate('category', 'name description')
    .sort(sort)
    .skip((page - 1) * limit)
    .limit(parseInt(limit));

  const total = await Product.countDocuments(filter);

  return {
    products,
    pagination: {
      page: parseInt(page),
      limit: parseInt(limit),
      total,
      pages: Math.ceil(total / limit)
    }
  };
};

export const getProductById = async (id) => {
  const product = await Product.findById(id).populate('category', 'name description');
  
  if (!product) {
    throw new Error('Producto no encontrado');
  }
  
  return product;
};

export const createProduct = async (productData) => {
  const product = await Product.create(productData);
  await product.populate('category', 'name description');
  return product;
};

export const updateProduct = async (id, productData) => {
  const product = await Product.findByIdAndUpdate(
    id,
    productData,
    { new: true, runValidators: true }
  ).populate('category', 'name description');

  if (!product) {
    throw new Error('Producto no encontrado');
  }

  return product;
};

export const deleteProduct = async (id) => {
  const product = await Product.findByIdAndDelete(id);

  if (!product) {
    throw new Error('Producto no encontrado');
  }

  return product;
};

export const updateStock = async (id, quantity) => {
  const product = await Product.findById(id);

  if (!product) {
    throw new Error('Producto no encontrado');
  }

  if (product.stock < quantity) {
    throw new Error('Stock insuficiente');
  }

  product.stock -= quantity;
  
  if (product.stock === 0) {
    product.available = false;
  }

  await product.save();
  return product;
};

export default {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  updateStock
};
