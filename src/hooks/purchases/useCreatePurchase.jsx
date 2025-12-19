import { useState } from "react";
import { savePurchase } from "../../utils/purchaseStorage";

function useCreatePurchase() {
    const [error, setError] = useState(null)

    const createPurchase = (purchaseData) => {
        setError(null)

        try {
            // validar que tenga items
            if (!purchaseData.items || purchaseData.items.length === 0) {
                throw new Error("El carrito está vacío");
            }

            // validar que tenga userId
            if (!purchaseData.userId) {
                throw new Error("Usuario no autenticado");
            }

            // valor total del pedido
            const total = purchaseData.items.reduce((sum, item) => {
                // sum es un acumulador -> se va a guardar cada total
                // item.price es el precio del producto
                // item.quantity es la cantidad de X producto en mi pedido
                return sum + (item.price * item.quantity)
            }, 0)

            const purchase = {
                userId: purchaseData.userId,
                items: purchaseData.items,
                total: total,
                status: purchaseData.status || "PENDING"
            }

            const savedPurchase = savePurchase(purchase)
            return savedPurchase
        } catch (error) {
            console.error("Error creating purchase:", error)
            setError(error)
            return null
        }
    }
    return {error, createPurchase}
}

export default useCreatePurchase