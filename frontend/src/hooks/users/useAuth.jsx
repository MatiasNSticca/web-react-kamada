import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { ENDPOINTS } from "../../config";

const TOKEN_KEY = "auth_token";
const USER_KEY = "user_data";

function useAuth() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedToken = localStorage.getItem(TOKEN_KEY);
    const storedUser = localStorage.getItem(USER_KEY);

    if (storedToken && storedUser) {
      try {
        setToken(storedToken);
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error("Error parsing stored user:", error);
        localStorage.removeItem(TOKEN_KEY);
        localStorage.removeItem(USER_KEY);
      }
    }
    setLoading(false);
  }, []);

  const login = useCallback(async (email, password) => {
    try {
      const response = await fetch(ENDPOINTS.auth.login, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Error al iniciar sesión");
      }

      const { token: newToken, user: userData } = data.data;

      localStorage.setItem(TOKEN_KEY, newToken);
      localStorage.setItem(USER_KEY, JSON.stringify(userData));

      setToken(newToken);
      setUser(userData);

      return { success: true, user: userData };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }, []);

  const register = useCallback(async (userData) => {
    try {
      const response = await fetch(ENDPOINTS.auth.register, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Error al registrar");
      }

      const { token: newToken, user: newUser } = data.data;

      localStorage.setItem(TOKEN_KEY, newToken);
      localStorage.setItem(USER_KEY, JSON.stringify(newUser));

      setToken(newToken);
      setUser(newUser);

      return { success: true, user: newUser };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    setToken(null);
    setUser(null);
    navigate("/");
  }, [navigate]);

  const updateProfile = useCallback(async (updateData) => {
    if (!token) return { success: false, error: "No autenticado" };

    try {
      const response = await fetch(ENDPOINTS.auth.updateProfile, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updateData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Error al actualizar perfil");
      }

      localStorage.setItem(USER_KEY, JSON.stringify(data.data));
      setUser(data.data);

      return { success: true, user: data.data };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }, [token]);

  const isAuthenticated = !!token && !!user;
  const isAdmin = user?.role === "admin_medio" || user?.role === "master_admin";
  const isMaster = user?.role === "master_admin";
  const isComprador = user?.role === "comprador";

  const hasPermission = useCallback((permission) => {
    if (!user) return false;
    if (user.role === "master_admin") return true;
    return user.permisos?.includes(permission);
  }, [user]);

  return {
    user,
    token,
    loading,
    isAuthenticated,
    isAdmin,
    isMaster,
    isComprador,
    hasPermission,
    login,
    register,
    logout,
    updateProfile,
  };
}

export default useAuth;
