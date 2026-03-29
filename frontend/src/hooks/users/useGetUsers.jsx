import { useState } from "react";
import { API_URL } from "../../config.js";

function useGetUsers() {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const getUsers = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(`${API_URL}users`);

      if (!response.ok) {
        throw new Error("Error al obtener usuarios");
      }

      const data = await response.json();

      return data.map(user => {
        const { password: _, ...userWithoutPassword } = user;
        return userWithoutPassword;
      });

    } catch (error) {
      setError("Error al obtener usuarios", error);
      return [];
    } finally {
      setLoading(false);
    }
  };
  
  return { getUsers, error, loading };
}

export default useGetUsers;
