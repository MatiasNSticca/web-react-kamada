import React, { useState } from "react";
import { Link } from "react-router-dom"
import style from "./TiendaCard.module.css"
import Button from "../../Button/Button";
import useGetProduct from "../../../../hooks/useGetProduct";

function TiendaCard({ 
    // imgSrc, 
    title, 
    // description, 
    // pricing, 
    buttonLabel = "Comprar", 
    onClick 
}) {

    const [selectedColor, setSelectedColor] = useState("black")

    const {loading, products, error} = useGetProduct()

    if(error) {
        return <h2>{error.message || "Error al cargar productos"}</h2>
    }

    if(loading) {
        return <h2>Cargando productos...</h2>
    }

    //  Empty state (estado vacio)
    //  es una situacion donde no hay productos
    if(!products || products.length === 0) {
        return <h2>No hay productos disponibles</h2>
    }

    const colores = [
        { value: "black", label: "Negro" },
        { value: "white", label: "Blanco" },
        { value: "gray", label: "Gris" },
    ]

  return (
    <>
        {products.map((product) => (
            
            <article key={product.id} className={style.card}>
                <img key={product.image} className={style.card__img} src={product.image} />
                
                <div className={style.card__content}>
                    <div className={style.card__text}>
                        <h5 className={style.card__title}>{product.name}</h5>
                        <p key={product.price} className={style.card__pricing}>{product.price}</p>
                        <p key={product.description} className={style.card__descripton}>{product.description}</p>
                        <p key={product.stock} className={style.card__descripton}>Stock: {product.stock}</p>
                    </div>

                    <div className={style.card__color}>
                        {colores.map((c) => (
                            <label key={c.value} className={style.color__label}>
                                <input 
                                    type="radio"
                                    name={`color-${title}`}
                                    value={c.value}
                                    checked={selectedColor === c.value}
                                    onChange={() => setSelectedColor(c.value)} 
                                />

                                <span
                                    className=
                                    {`${style.color__circle} ${style[c.value]}
                                    ${selectedColor === c.value ? style.selected : ""}`}
                                >
                                </span>
                            </label>
                        ))}
                    </div>

                    <Button variant="secondary" onClick={onClick}>
                        {buttonLabel}
                    </Button>

                </div>
            </article>

        ))}
    </>
  )
}

export default TiendaCard