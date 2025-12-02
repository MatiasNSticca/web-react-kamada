import React, { useState } from "react";
import { Link } from "react-router-dom"
import style from "./TiendaCard.module.css"
import Button from "../../Button/Button";

function TiendaCard({ 
    imgSrc, 
    title, 
    description, 
    pricing, 
    buttonLabel = "Comprar", 
    onClick 
}) {

    const [selectedColor, setSelectedColor] = useState("black")

    const colores = [
        { value: "black", label: "Negro" },
        { value: "white", label: "Blanco" },
        { value: "gray", label: "Gris" },
    ]

  return (
    <>
      <article className={style.card}>
        <img className={style.card__img} src={imgSrc} alt={title} />
        
        <div className={style.card__content}>
            <div className={style.card__text}>
                <h5 className={style.card__title}>{title}</h5>
                <p className={style.card__pricing}>{pricing}</p>
                <p className={style.card__descripton}>{description}</p>
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
    </>
  )
}

export default TiendaCard