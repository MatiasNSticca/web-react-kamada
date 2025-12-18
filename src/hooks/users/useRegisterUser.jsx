import { useState } from "react";
import { API_URL } from "../../config.js";

function useRegiterUser() {
  const [error, setError] = useState(null);

  const registerUser = async (formData) => {
    try {
      setError(null);
      const response = await fetch(`${API_URL}users`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Error al registrar usuario");
      }

      const data = await response.json();

      //   elimina la contraseña de data
      const { password: _, ...userMithoutPassword } = data;

      return userMithoutPassword;
    } catch (error) {
      setError("Error al registrar usuario", error);
      return null;
    }
  };
  return { registerUser, error };
}

export default useRegiterUser;
