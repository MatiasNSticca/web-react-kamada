import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const email = process.argv[2] || 'admin@kamada.com';

async function promoteToMaster() {
  if (!process.env.MONGODB_URI) {
    console.log('ERROR: MONGODB_URI no está definida');
    process.exit(1);
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Conectado a MongoDB');

    const User = (await import('../src/models/User.js')).default;

    const user = await User.findOneAndUpdate(
      { email },
      { 
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
        ]
      },
      { new: true }
    );

    if (user) {
      console.log(`✅ Usuario ${email} promovido a master_admin`);
    } else {
      console.log(`❌ Usuario ${email} no encontrado`);
    }

    await mongoose.disconnect();
  } catch (error) {
    console.error('Error:', error.message);
  }
}

promoteToMaster();