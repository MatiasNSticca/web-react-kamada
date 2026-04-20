import React, { useState } from "react"
import { API_URL } from "../../config.js"


function useDeleteProduct() {
    const [error, setError] = useState()

    const deleteProduct = async (productId) => {
        setError(null)
        
        const token = localStorage.getItem("auth_token")
        
        try {
            const response = await fetch(`${API_URL}/products/${productId}`,{
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
    return { error, deleteProduct }
}

export default useDeleteProduct
