import React, { useEffect, useState } from 'react'
import { API_URL } from "../../config.js"

function useGetProduct() {

    const [products, setProducts] = useState([])
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)

    const postProducts = async () => {
        setLoading(true)
        setError(null)

        //  intenta ejecutar algo
        try {
           const response = await fetch(`${API_URL}products`)

        //  valida que no haya error en la consulta a la api
           if(!response.ok){
                throw new Error(`HPPT error status: ${response.status}`)
           }

        //  lo transforma en objeto JS: arrays y objs nativos de JS  
           const data = await response.json()
        //  guarda en el estado al respuesta de la api en obj JS
           setProducts(data)
        } catch (error) {
            console.error(error)
            setError(error)
            setProducts([])
        } finally {
            //  cual sea el resultado lo pasamos a false
            setLoading(false)
        }
    }
    //  al ejecutar el hook, necesitamos hacer el llamado a la api
    useEffect(() => {
        postProducts()
    }, [])
    //  cuando clave y valor se llaman igual se escribe una sola
    return { products, error, loading }   
}

export default useGetProduct