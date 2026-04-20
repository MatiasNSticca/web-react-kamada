import { useState } from "react";
import { API_URL } from "../../config.js";

function useDeleteUser() {
  const [error, setError] = useState(null);

  const deleteUser = async (userId) => {
    try {
      setError(null);

      const token = localStorage.getItem("auth_token");

      const response = await fetch(`${API_URL}/users/${userId}`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Error al eliminar usuario");
      }

      return true;

    } catch (error) {
      console.error("Error al eliminar usuario", error);
      setError(error.message);
      return false;
    }
  };
  
  return { deleteUser, error };
}

export default useDeleteUser;
