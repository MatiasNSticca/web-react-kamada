import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import User from '../src/models/User.js';

dotenv.config();

async function createMasterRemote() {
  if (!process.env.MONGODB_URI) {
    console.error('ERROR: Define MONGODB_URI');
    process.exit(1);
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Conectado a MongoDB');

    const email = process.argv[2] || 'admin@kamada.com';
    const password = process.argv[3] || 'admin123';

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      existingUser.role = 'master_admin';
      existingUser.permisos = [
        'crear_productos', 'editar_productos', 'eliminar_productos',
        'crear_eventos', 'editar_eventos', 'eliminar_eventos',
        'ver_usuarios', 'editar_usuarios', 'eliminar_usuarios', 'asignar_roles'
      ];
      await existingUser.save();
      console.log(`✅ Usuario ${email} promoted a master_admin`);
    } else {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      await User.create({
        username: 'admin',
        email,
        password: hashedPassword,
        role: 'master_admin',
        permisos: [
          'crear_productos', 'editar_productos', 'eliminar_productos',
          'crear_eventos', 'editar_eventos', 'eliminar_eventos',
          'ver_usuarios', 'editar_usuarios', 'eliminar_usuarios', 'asignar_roles'
        ],
        datosPersonales: {
          nombre: 'Administrador',
          apellido: 'Master'
        }
      });
      console.log(`✅ Usuario master creado: ${email} / ${password}`);
    }

    await mongoose.disconnect();
    console.log('✅ Desconectado');
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

createMasterRemote();