import { useState, useEffect } from 'react'
import { API_URL } from "../../config.js"

function useGetCategories() {

    const [categories, setCategories] = useState([])
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)

    const fetchCategories = async () => {
        setLoading(true)
        setError(null)

        try {
           const response = await fetch(`${API_URL}/categories`)

           if(!response.ok){
                throw new Error(`HTTP error status: ${response.status}`)
           }

const data = await response.json()
            setCategories(data.data || data || [])
        } catch (error) {
            console.error(error)
            setError(error)
            setCategories([])
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchCategories()
    }, [])
    
    return { categories, error, loading, refetch: fetchCategories }   
}

export default useGetCategories
