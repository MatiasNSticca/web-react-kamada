import React, { useEffect, useState } from 'react'
import { API_URL } from "../../config.js"

function useGetProduct() {

    const [products, setProducts] = useState([])
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)

    const fetchProducts = async () => {
        setLoading(true)
        setError(null)

        try {
           const response = await fetch(`${API_URL}/products`)

           if(!response.ok){
                throw new Error(`HTTP error status: ${response.status}`)
           }

           const data = await response.json()
           setProducts(data.data || [])
        } catch (error) {
            console.error(error)
            setError(error)
            setProducts([])
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchProducts()
    }, [])
    
    return { products, error, loading, refetch: fetchProducts }   
}

export default useGetProduct
