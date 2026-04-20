import { useState } from "react"
import { API_URL } from "../../config.js"

function usePostEvent() {

    const [error, setError] = useState(null)

    const postEvent = async (formData) => {
        setError(null)

        const token = localStorage.getItem("auth_token")

        try {
            const response = await fetch(`${API_URL}/events`,{
                method: "POST",
                headers: {
                    "Content-type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(formData)
            })
            
            if(!response.ok) {
                const errorData = await response.json()
                throw new Error(errorData.message || `HTTP error! status ${response.status}`)
            }
            
            const res = await response.json()
            console.log("Evento creado:", res)
            return res.data
        } catch (error) {
            console.error("Error al crear un nuevo evento", error)
            setError(error)
            return null
        }
    }
    return { error, postEvent } 
}

export default usePostEvent