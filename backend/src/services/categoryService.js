import Category from '../models/Category.js';

export const getAllCategories = async (query = {}) => {
  const { active, search } = query;
  
  const filter = {};
  
  if (active !== undefined) {
    filter.active = active === 'true';
  }

  const categories = await Category.find(filter).sort({ name: 1 });
  return categories;
};

export const getCategoryById = async (id) => {
  const category = await Category.findById(id);
  
  if (!category) {
    throw new Error('Categoría no encontrada');
  }
  
  return category;
};

export const createCategory = async (categoryData) => {
  const existingCategory = await Category.findOne({ name: categoryData.name });
  
  if (existingCategory) {
    throw new Error('La categoría ya existe');
  }
  
  const category = await Category.create(categoryData);
  return category;
};

export const updateCategory = async (id, categoryData) => {
  const category = await Category.findByIdAndUpdate(
    id,
    categoryData,
    { new: true, runValidators: true }
  );

  if (!category) {
    throw new Error('Categoría no encontrada');
  }

  return category;
};

export const deleteCategory = async (id) => {
  const category = await Category.findByIdAndDelete(id);

  if (!category) {
    throw new Error('Categoría no encontrada');
  }

  return category;
};

export default {
  getAllCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory
};
