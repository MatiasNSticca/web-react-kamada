import { useState } from "react";
import { API_URL } from "../../config.js";

function useDeleteUser() {
  const [error, setError] = useState(null);

  const deleteUser = async (userId) => {
    try {
      setError(null);

      const response = await fetch(`${API_URL}users/${userId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Error al eliminar usuario");
      }

      return true;

    } catch (error) {
      setError("Error al eliminar usuario", error);
      return false;
    }
  };
  
  return { deleteUser, error };
}

export default useDeleteUser;
