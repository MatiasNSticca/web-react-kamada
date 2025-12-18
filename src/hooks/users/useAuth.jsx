import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const STORAGE_KEY = "user"

function useAuth() {

  const navigate = useNavigate();

    const [user, setUser] = useState(null)
    // si es null es falsy, si existe en thury

    useEffect (() => { 
        // verifica si existe la sesion y mantiene sincronizado el estado y el localStorage
        const storedUser = sessionStorage.getItem(STORAGE_KEY)
        if(storedUser) {
            try {
                // eslint-disable-next-line react-hooks/set-state-in-effect
                setUser(JSON.parse(storedUser))
            } catch (error) {
                console.error(error)
                sessionStorage.removeItem(STORAGE_KEY)
            }
        }
    }, [])

    // crea y guarda sesion
    const login = (userData) => {
        setUser(userData)
        sessionStorage.setItem(STORAGE_KEY, JSON.stringify(userData))
    }

    //  cierra la sesion
    const logout = () => {
        setUser(null)
        sessionStorage.removeItem(STORAGE_KEY)
        alert("Sesion cerrada")
        navigate("/");
    }

    return {
        user,
        login,
        logout,
        // este boleano verifica el valor del user
        isAuthenticated: user !== null
    }
}

export default useAuth