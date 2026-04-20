import React, { useEffect, useState } from 'react'
import { API_URL } from "../../config.js"

function useGetEvents() {

    const [events, setEvents] = useState([])
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)

    const fetchEvents = async () => {
        setLoading(true)
        setError(null)

        try {
           const response = await fetch(`${API_URL}/events`)

           if(!response.ok){
                throw new Error(`HTTP error status: ${response.status}`)
           }

           const data = await response.json()
           setEvents(data.data || [])
        } catch (error) {
            console.error(error)
            setError(error)
            setEvents([])
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchEvents()
    }, [])
    
    return { events, error, loading, refetch: fetchEvents }   
}

export default useGetEvents