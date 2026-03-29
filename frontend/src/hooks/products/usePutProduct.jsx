import React, { useState } from "react"
import { API_URL } from "../../config.js"


function usePutProduct() {
    const [error, setError] = useState(null)

    const putProduct = async (productId, formData) => {
        setError(null)

        const token = localStorage.getItem("auth_token")

        try {
            const response = await fetch(`${API_URL}/products/${productId}`, {
                method: "PUT",
                headers: {
                    "Content-type": "Application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(formData) 
            })

            if(!response.ok) {
                const errorData = await response.json()
                throw new Error(errorData.message || "Error al editar el producto")
            }

            const data = await response.json()

            return data.data
        } catch (error) {
            console.error("Error al editar el producto", error)
            setError(error)
            return null
        }
    }
    return { error, putProduct }
}

export default usePutProduct
