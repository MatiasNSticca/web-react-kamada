import { useState } from "react";
import { API_URL } from "../../config.js";

function useGetUsers() {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const getUsers = async () => {
    try {
      setLoading(true);
      setError(null);

      const token = localStorage.getItem("auth_token");
      
      const response = await fetch(`${API_URL}/users`, {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Error al obtener usuarios");
      }

      const data = await response.json();
      return data.data || [];

    } catch (error) {
      console.error("Error al obtener usuarios", error);
      setError(error.message);
      return [];
    } finally {
      setLoading(false);
    }
  };
  
  return { getUsers, error, loading };
}

export default useGetUsers;
