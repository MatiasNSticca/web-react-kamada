// usar const en mayusculas para evitar errores y hacer cambios faciles
const STORAGE_KEY = "purchases"

// guardar compra nueva
export const savePurchase = (purchase) => {
    const purchases = getPurchase();

    const newPurchase = {
        ...purchase,
        date: new Date().toLocaleString(),
        id: Date.now()
    }

    purchases.push(newPurchase)

    localStorage.setItem(STORAGE_KEY, JSON.stringify(purchases))

    return purchases
}

// leer compras guardadas
export const getPurchase = () => {
    const purchases = localStorage.getItem(STORAGE_KEY)
    if(purchases) {
        JSON.parse(purchases)
    } else {
        return []
    }
}