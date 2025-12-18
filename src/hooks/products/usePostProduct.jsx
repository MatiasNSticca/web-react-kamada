import { useState } from "react"
import { API_URL } from "../../config.js"

function usePostProduct() {

    const [error, setError] = useState(null)

    const postProduct = async (formData) => {
        setError(null)

        try {
            const response = await fetch(`${API_URL}products`,{
                // metodo post es para la creacion
                method: "POST",
                headers: {
                    "Content-type": "application/json"
                },
                // body: es el cuerop del request y es por donde viaja la informacion
                body: JSON.stringify(formData)
            })
            // si no salio bien el request
            // este IF chequea un error de la API/Back
            if(!response.ok) {
                throw new Error(`HTTP error! status ${response.status}`)
            }
            // si no falla ejecuta esto, pasa la respuesta a objeto de js
            const res = response.json()
            console.log(res)
            return true
            // el catch atrapa todos los errores y lo muestra en la pantalla
        } catch (error) {
            console.error("Error al crear un nuevo producto", error)
            setError(error)
        }
    }
    return { error, postProduct } 
}

export default usePostProduct