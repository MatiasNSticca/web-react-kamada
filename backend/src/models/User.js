import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'El username es requerido'],
    trim: true,
    maxlength: 50,
    unique: true
  },
  email: {
    type: String,
    required: [true, 'El email es requerido'],
    trim: true,
    lowercase: true,
    unique: true
  },
  password: {
    type: String,
    required: [true, 'La contraseña es requerida'],
    minlength: 6,
    select: false
  },
  role: {
    type: String,
    enum: ['master_admin', 'admin_medio', 'comprador'],
    default: 'comprador'
  },
  permisos: [{
    type: String,
    enum: [
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
  }],
  datosPersonales: {
    nombre: { type: String, trim: true },
    apellido: { type: String, trim: true },
    telefono: { type: String, trim: true },
    direccion: {
      calle: { type: String, trim: true },
      ciudad: { type: String, trim: true },
      provincia: { type: String, trim: true },
      codigoPostal: { type: String, trim: true }
    }
  },
  activo: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

userSchema.methods.toJSON = function() {
  const obj = this.toObject();
  delete obj.password;
  return obj;
};

const User = mongoose.model('User', userSchema);

export default User;
