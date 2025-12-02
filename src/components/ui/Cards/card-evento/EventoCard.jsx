import React from "react"
import { Link } from "react-router-dom"
import style from "./EventoCard.module.css"
import Button from "../../Button/Button"

function Card({ 
  imgSrc, 
  title, 
  subtitle, 
  buttonLabel = "Comprar", 
  onClick 
}) {
  
  return (
    <>
      <article className={style.card}>
        <img className={style.card__img} src={imgSrc} alt={title} />
        
        <div className={style.card__content}>
          <div className={style.card__text}>
            <h3 className={style.card__title}>{title}</h3>
            <p className={style.card__subtitle}>{subtitle}</p>
          </div>

          <Button variant="secondary" onClick={onClick}>
            {buttonLabel}
          </Button>
        </div>
      </article>
    </>

  )
}

export default Card