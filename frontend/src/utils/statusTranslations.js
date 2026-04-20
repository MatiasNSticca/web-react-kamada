export const statusData = [
    "AVAILABLE",
    "OUT_OF_STOCK",
    "DISCONTINUED"
]

export const statusTranslations = {
    "AVAILABLE": "Disponible",
    "OUT_OF_STOCK": "Sin stock",
    "DISCONTINUED": "Descontinuo"
}

export const translateStatus = (status) => {
    // el OR no seria necesario pero se pone por las dudas, asi no queda undefined
    return statusTranslations[status] || status
}