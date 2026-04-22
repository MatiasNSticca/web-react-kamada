import { useState } from "react";
import { API_URL } from "../../config.js"

function useLogin() {
    const [error, setError] = useState(null)

    const login = async (email, password) => {
        setError(null)

        try {
            if(!API_URL) {
                throw new Error("Ingrese envs")
            }

            const response = await fetch(`${API_URL}/auth/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ email, password })
            })

            if(!response.ok){
                const errorData = await response.json()
                throw new Error(errorData.message || "Credenciales incorrectas")
            }

            const data = await response.json()

            if (data.success && data.token) {
                localStorage.setItem("auth_token", data.token)
                localStorage.setItem("user", JSON.stringify(data.user))
                return data.user
            } else {
                throw new Error(data.message || "Credenciales incorrectas")
            }

        } catch (error) {
            console.error(error)
            setError(error.message || "Error al conectar con el servidor")
            return null
        }
    }
    return { login, error }
}

export default useLogin