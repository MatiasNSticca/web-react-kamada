import authService from '../services/authService.js';

export const registerUser = async (req, res, next) => {
  try {
    const { username, email, password, datosPersonales } = req.body;
    
    const userData = {
      username,
      email,
      password,
      datosPersonales,
      role: 'comprador'
    };

    const result = await authService.register(userData);

    res.status(201).json({
      success: true,
      data: result
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

export const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    
    const result = await authService.login(email, password);

    res.status(200).json({
      success: true,
      data: result
    });
  } catch (error) {
    res.status(401).json({
      success: false,
      message: error.message
    });
  }
};

export const getCurrentUser = async (req, res, next) => {
  try {
    const user = await authService.getMe(req.user.id);

    res.status(200).json({
      success: true,
      data: user
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error.message
    });
  }
};

export default { registerUser, loginUser, getCurrentUser };
