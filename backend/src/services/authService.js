import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || '7d'
  });
};

export const register = async (userData) => {
  const { username, email, password } = userData;

  const existingUser = await User.findOne({ $or: [{ email }, { username }] });
  if (existingUser) {
    const field = existingUser.email === email ? 'email' : 'username';
    throw new Error(`El ${field} ya está en uso`);
  }

  const user = await User.create(userData);
  
  const token = generateToken(user._id);
  
  return {
    token,
    user: user.toJSON()
  };
};

export const login = async (email, password) => {
  if (!email || !password) {
    throw new Error('Email y contraseña son requeridos');
  }

  const user = await User.findOne({ email }).select('+password');
  
  if (!user || !(await user.comparePassword(password))) {
    throw new Error('Credenciales inválidas');
  }

  if (!user.activo) {
    throw new Error('Tu cuenta ha sido desactivada');
  }

  const token = generateToken(user._id);

  return {
    token,
    user: user.toJSON()
  };
};

export const getMe = async (userId) => {
  const user = await User.findById(userId);
  if (!user) {
    throw new Error('Usuario no encontrado');
  }
  return user.toJSON();
};

export default { register, login, getMe };
