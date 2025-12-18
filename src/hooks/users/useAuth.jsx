import { useEffect, useState } from "react";

function useAuth() {
    const [user, setUser] = useState(null)
    // si es null es falsy, si existe en thury

    useEffect (() => { 
        // verifica si existe la sesion y mantiene sincronizado el estado y el localStorage
        const storedUser = sessionStorage.getItem("user")
        if(storedUser) {
            try {
                // eslint-disable-next-line react-hooks/set-state-in-effect
                setUser(JSON.parse(storedUser))
            } catch (error) {
                console.error(error)
                sessionStorage.removeItem("user")
            }
        }
    }, [])

    // crea y guarda sesion
    const login = (userData) => {
        setUser(userData)
        sessionStorage.setItem("user", JSON.stringify(userData))
    }

    //  cierra la sesion
    const logout = () => {
        setUser(null)
        sessionStorage.removeItem("user")
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