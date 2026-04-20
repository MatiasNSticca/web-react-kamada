import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Category from '../src/models/Category.js';

dotenv.config();

const categories = [
  { name: 'merch', description: 'Merchandising de la banda', active: true },
  { name: 'discos', description: 'Álbumes y CDs', active: true },
  { name: 'accesorios', description: 'Accesorios varios', active: true },
  { name: 'otros', description: 'Otros productos', active: true },
];

async function seedCategories() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Conectado a MongoDB');

    for (const cat of categories) {
      const existing = await Category.findOne({ name: cat.name });
      if (!existing) {
        await Category.create(cat);
        console.log(`Categoría "${cat.name}" creada`);
      } else {
        console.log(`Categoría "${cat.name}" ya existe`);
      }
    }

    console.log('Categorías inicializadas correctamente');
    await mongoose.disconnect();
  } catch (error) {
    console.error('Error:', error.message);
  }
}

seedCategories();
