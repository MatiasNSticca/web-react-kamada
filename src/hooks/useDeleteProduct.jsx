import React, { useState } from "react"
import { API_URL } from "../config.js"


function useDeleteProduct() {
    const [error, setError] = useState()

    const deleteProduct = async (productId) => {
        setError(null)
        try {
            const response = await fetch(`${API_URL}products/${productId}`,{
                method:"DELETE",
            })

            if(!response.ok) {
                throw new Error(`HTTP erroor status: ${response.status}`)
            }

            return true
        } catch (error) {
            console.error(error)
            setError(error)
        }
    }
    return { error, deleteProduct }
}

export default useDeleteProduct