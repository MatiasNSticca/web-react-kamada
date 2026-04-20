export const checkRole = (allowedRoles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: 'No autorizado'
      });
    }

    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: 'Acceso denegado - No tienes permisos suficientes'
      });
    }

    next();
  };
};

export const checkPermission = (requiredPermission) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: 'No autorizado'
      });
    }

    if (req.user.role === 'master_admin') {
      return next();
    }

    if (!req.user.permisos || !req.user.permisos.includes(requiredPermission)) {
      return res.status(403).json({
        success: false,
        message: 'Acceso denegado - Permiso requerido'
      });
    }

    next();
  };
};

export default { checkRole, checkPermission };
