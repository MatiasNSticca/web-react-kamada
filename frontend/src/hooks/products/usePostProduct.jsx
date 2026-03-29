import { useState } from "react"
import { API_URL } from "../../config.js"

function usePostProduct() {

    const [error, setError] = useState(null)

    const postProduct = async (formData) => {
        setError(null)

        const token = localStorage.getItem("auth_token")

        try {
            const response = await fetch(`${API_URL}/products`,{
                method: "POST",
                headers: {
                    "Content-type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(formData)
            })
            
            if(!response.ok) {
                const errorData = await response.json()
                throw new Error(errorData.message || `HTTP error! status ${response.status}`)
            }
            
            const res = await response.json()
            console.log("Producto creado:", res)
            return res.data
        } catch (error) {
            console.error("Error al crear un nuevo producto", error)
            setError(error)
            return null
        }
    }
    return { error, postProduct } 
}

export default usePostProduct
