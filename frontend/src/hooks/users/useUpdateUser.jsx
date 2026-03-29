import { useState } from "react";
import { API_URL } from "../../config.js";

function useUpdateUser() {
  const [error, setError] = useState(null);

  const updateUser = async (userId, formData) => {
    try {
      setError(null);

      const response = await fetch(`${API_URL}users/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Error al actualizar usuario");
      }

      const data = await response.json();

      const { password: _, ...userWithoutPassword } = data;

      return userWithoutPassword;

    } catch (error) {
      setError("Error al actualizar usuario", error);
      return null;
    }
  };
  
  return { updateUser, error };
}

export default useUpdateUser;
