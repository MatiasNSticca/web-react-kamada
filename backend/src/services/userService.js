import User from '../models/User.js';

export const getAllUsers = async (query = {}) => {
  const { page = 1, limit = 20, role, activo, search } = query;

  const filter = {};

  if (role) {
    filter.role = role;
  }

  if (activo !== undefined) {
    filter.activo = activo === 'true';
  }

  if (search) {
    filter.$or = [
      { username: { $regex: search, $options: 'i' } },
      { email: { $regex: search, $options: 'i' } }
    ];
  }

  const users = await User.find(filter)
    .select('-password')
    .sort({ createdAt: -1 })
    .skip((page - 1) * limit)
    .limit(parseInt(limit));

  const total = await User.countDocuments(filter);

  return {
    users,
    pagination: {
      page: parseInt(page),
      limit: parseInt(limit),
      total,
      pages: Math.ceil(total / limit)
    }
  };
};

export const getUserById = async (id) => {
  const user = await User.findById(id).select('-password');

  if (!user) {
    throw new Error('Usuario no encontrado');
  }

  return user;
};

export const createUser = async (userData) => {
  const { username, email } = userData;

  const existingUser = await User.findOne({ $or: [{ email }, { username }] });
  if (existingUser) {
    const field = existingUser.email === email ? 'email' : 'username';
    throw new Error(`El ${field} ya está en uso`);
  }

  const user = await User.create(userData);
  return user.toJSON();
};

export const updateUser = async (id, userData, requestingUserId) => {
  const user = await User.findById(id);

  if (!user) {
    throw new Error('Usuario no encontrado');
  }

  if (userData.password) {
    delete userData.password;
  }

  if (userData.role || userData.permisos) {
    const requestingUser = await User.findById(requestingUserId);
    
    if (requestingUser.role !== 'master_admin') {
      throw new Error('No tienes permisos para cambiar roles o permisos');
    }
    
    if (user.role === 'master_admin' && requestingUserId.toString() !== id.toString()) {
      throw new Error('No puedes modificar a otro master_admin');
    }
  }

  const updatedUser = await User.findByIdAndUpdate(
    id,
    userData,
    { new: true, runValidators: true }
  ).select('-password');

  return updatedUser;
};

export const deleteUser = async (id, requestingUserId) => {
  const userToDelete = await User.findById(id);

  if (!userToDelete) {
    throw new Error('Usuario no encontrado');
  }

  if (userToDelete._id.toString() === requestingUserId.toString()) {
    throw new Error('No puedes eliminarte a ti mismo');
  }

  if (userToDelete.role === 'master_admin') {
    throw new Error('No puedes eliminar un usuario master_admin');
  }

  await User.findByIdAndDelete(id);
  return { message: 'Usuario eliminado correctamente' };
};

export const updateMyProfile = async (userId, updateData) => {
  const allowedFields = ['username', 'email', 'datosPersonales'];
  
  const filteredData = {};
  allowedFields.forEach(field => {
    if (updateData[field] !== undefined) {
      filteredData[field] = updateData[field];
    }
  });

  if (updateData.password) {
    const user = await User.findById(userId).select('+password');
    const isMatch = await user.comparePassword(updateData.currentPassword);
    
    if (!isMatch) {
      throw new Error('La contraseña actual es incorrecta');
    }
    
    filteredData.password = updateData.password;
  }

  const user = await User.findByIdAndUpdate(
    userId,
    filteredData,
    { new: true, runValidators: true }
  ).select('-password');

  return user;
};

export const changeUserRole = async (userId, newRole, requestingUserId) => {
  const requestingUser = await User.findById(requestingUserId);

  if (requestingUser.role !== 'master_admin') {
    throw new Error('Solo el master_admin puede cambiar roles');
  }

  const userToChange = await User.findById(userId);

  if (!userToChange) {
    throw new Error('Usuario no encontrado');
  }

  if (userToChange.role === 'master_admin') {
    throw new Error('No puedes cambiar el rol de un master_admin');
  }

  let permisos = [];
  switch (newRole) {
    case 'admin_medio':
      permisos = [
        'crear_productos',
        'editar_productos',
        'eliminar_productos',
        'crear_eventos',
        'editar_eventos',
        'eliminar_eventos',
        'ver_usuarios',
        'editar_usuarios'
      ];
      break;
    case 'comprador':
      permisos = [];
      break;
    default:
      throw new Error('Rol inválido');
  }

  userToChange.role = newRole;
  userToChange.permisos = permisos;
  await userToChange.save();

  return userToChange.toJSON();
};

export default {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  updateMyProfile,
  changeUserRole
};
