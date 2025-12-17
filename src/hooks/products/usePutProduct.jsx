import React, { useState } from "react"
import { API_URL } from "../../config.js"


function usePutProduct() {
    const [error, setError] = useState(null)

    const putProduct = async (productId, formData) => {
        setError(null)

        try {
            const response = await fetch(`${API_URL}products/${productId}`, {
                method: "PUT",
                headers: {
                    "Content-type": "Application/json"
                },
                body: JSON.stringify(formData) 
            })

            if(!response.ok) {
                throw new Error("Error al editar el producto")
            }

            const data = await response.json()

            return data
        } catch (error) {
            console.error("Error al editar el producto", error)
            setError(error)
            return null
        }
    }
    return { error, putProduct }
}

export default usePutProduct