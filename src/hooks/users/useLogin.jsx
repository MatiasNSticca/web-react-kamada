import { useState } from "react";
import { API_URL } from "../../config.js"

function useLogin() {
    const [error, setError] = useState(null)

    const login = async (email, password) => {
        setError(null)

        try {
            // buena practicar para validar la API
            if(!API_URL) {
                throw new Error("Ingrese envs")
            }

            const response = await fetch(`${API_URL}users`)

            if(!response.ok){
                throw new Error("Error al iniciar sesion", response.status)
            }

            const data = await response.json()

            const user = data.find((user) => user.email.trim().toLowerCase() === email.trim().toLowerCase() && user.password.trim() === password.trim())

            if(!user) {
                setError("Credenciales incorrectas")
                return null
            }

            const { password: _, ...userWithoutPassword } = user
            return userWithoutPassword

        } catch (error) {
            console.error(error)
            setError("Error al conectar con el servidor", error)
            return null
        }
    }
    return { login, error }
}

export default useLogin