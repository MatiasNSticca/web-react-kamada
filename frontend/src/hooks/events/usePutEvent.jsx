import { useState } from "react"
import { API_URL } from "../../config.js"


function usePutEvent() {
    const [error, setError] = useState(null)

    const putEvent = async (eventId, formData) => {
        setError(null)

        const token = localStorage.getItem("auth_token")

        try {
            const response = await fetch(`${API_URL}/events/${eventId}`, {
                method: "PUT",
                headers: {
                    "Content-type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(formData) 
            })

            if(!response.ok) {
                const errorData = await response.json()
                throw new Error(errorData.message || "Error al editar el evento")
            }

            const data = await response.json()

            return data.data
        } catch (error) {
            console.error("Error al editar el evento", error)
            setError(error)
            return null
        }
    }
    return { error, putEvent }
}

export default usePutEvent