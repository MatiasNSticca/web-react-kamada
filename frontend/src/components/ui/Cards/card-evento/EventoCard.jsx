import React from "react"
import { Link } from "react-router-dom"
import style from "./EventoCard.module.css"
import Button from "../../Button/Button"

function Card({ 
  imgSrc, 
  title, 
  subtitle, 
  date,
  price,
  buttonLabel = "Comprar", 
  onClick,
  disabled = false
}) {
  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString('es-AR', { 
      day: '2-digit', 
      month: 'long', 
      year: 'numeric' 
    });
  };

  return (
    <>
      <article className={style.card}>
        <img className={style.card__img} src={imgSrc} alt={title} />
        
        <div className={style.card__content}>
          <div className={style.card__text}>
            <h3 className={style.card__title}>{title}</h3>
            {date && <p className={style.card__date}>{formatDate(date)}</p>}
            <p className={style.card__subtitle}>{subtitle}</p>
            {price !== undefined && <p className={style.card__price}>${price}</p>}
          </div>

          <Button 
            variant="secondary" 
            onClick={onClick}
            disabled={disabled}
          >
            {buttonLabel}
          </Button>
        </div>
      </article>
    </>
  )
}

export default Card