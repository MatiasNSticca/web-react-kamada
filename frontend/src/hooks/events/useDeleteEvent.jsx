import { useState } from "react"
import { API_URL } from "../../config.js"


function useDeleteEvent() {
    const [error, setError] = useState()

    const deleteEvent = async (eventId) => {
        setError(null)
        
        const token = localStorage.getItem("auth_token")
        
        try {
            const response = await fetch(`${API_URL}/events/${eventId}`,{
                method:"DELETE",
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })

            if(!response.ok) {
                const errorData = await response.json()
                throw new Error(errorData.message || `HTTP error status: ${response.status}`)
            }

            return true
        } catch (error) {
            console.error(error)
            setError(error)
            return false
        }
    }
    return { error, deleteEvent }
}

export default useDeleteEvent