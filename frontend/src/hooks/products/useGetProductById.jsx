import React, { useState } from 'react'
import { API_URL } from "../../config.js"

function useGetProductById() {

    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)

    const getProductById = async (productId) => {
        setLoading(true)
        setError(null)

        //  intenta ejecutar algo
        try {
           const response = await fetch(`${API_URL}products/${productId}`)

        //  valida que no haya error en la consulta a la api
           if(!response.ok){
                throw new Error(`HPPT error status: ${response.status}`)
           }

        //  lo transforma en objeto JS: arrays y objs nativos de JS  
           const data = await response.json()
        //  guarda en el estado al respuesta de la api en obj JS
           return data

        } catch (error) {
            console.error(error)
            setError(error)
            return null
        } finally {
            //  cual sea el resultado lo pasamos a false
            setLoading(false)
        }
    }

    //  cuando clave y valor se llaman igual se escribe una sola
    return { getProductById, error, loading }   
}

export default useGetProductById