import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../src/models/User.js';

dotenv.config();

const masterUser = {
  username: 'admin',
  email: 'admin@kamada.com',
  password: 'admin123',
  role: 'master_admin',
  permisos: [
    'crear_productos',
    'editar_productos',
    'eliminar_productos',
    'crear_eventos',
    'editar_eventos',
    'eliminar_eventos',
    'ver_usuarios',
    'editar_usuarios',
    'eliminar_usuarios',
    'asignar_roles'
  ],
  datosPersonales: {
    nombre: 'Administrador',
    apellido: 'Master',
    telefono: '0000000000'
  }
};

async function createMasterUser() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Conectado a MongoDB');

    const existingUser = await User.findOne({ email: masterUser.email });

    if (existingUser) {
      console.log('El usuario master ya existe');
    } else {
      await User.create(masterUser);
      console.log('Usuario master creado correctamente');
      console.log('Email: admin@kamada.com');
      console.log('Password: admin123');
    }

    await mongoose.disconnect();
    console.log('Desconectado de MongoDB');
  } catch (error) {
    console.error('Error:', error.message);
  }
}

createMasterUser();
