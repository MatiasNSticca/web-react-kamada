import React, { useState } from 'react'
import { API_URL } from "../../config.js"

function useGetProductById() {

    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)

    const getProductById = async (productId) => {
        setLoading(true)
        setError(null)

        try {
           const response = await fetch(`${API_URL}/products/${productId}`)

           if(!response.ok){
                throw new Error(`HTTP error status: ${response.status}`)
           }

           const data = await response.json()
           return data.data

        } catch (error) {
            console.error(error)
            setError(error)
            return null
        } finally {
            setLoading(false)
        }
    }

    return { getProductById, error, loading }   
}

export default useGetProductById
