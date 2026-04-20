import { useState } from "react";
import { API_URL } from "../../config.js";

function useUpdateUser() {
  const [error, setError] = useState(null);

  const updateUser = async (userId, formData) => {
    try {
      setError(null);

      const token = localStorage.getItem("auth_token");

      const response = await fetch(`${API_URL}/users/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Error al actualizar usuario");
      }

      const data = await response.json();
      return data.data;

    } catch (error) {
      console.error("Error al actualizar usuario", error);
      setError(error.message);
      return null;
    }
  };
  
  return { updateUser, error };
}

export default useUpdateUser;
