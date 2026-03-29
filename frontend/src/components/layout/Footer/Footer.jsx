import React from "react"
import { Link } from "react-router-dom"
import Button from "../../ui/Button/Button"
import style from "./Footer.module.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Icons } from "../../../assets/icons/icons"
import SpotifyCard from "../../Reproductor/SpotifyCard";



function Footer() {

  const handleClick = () => {
    console.log("Redirigiendo a la pagina de Eventos")

    setTimeout(() => {
      console.log("En pagina de Eventos")
    }, 1000)
  }

  return (
    <div className={style.footer}>
      <div className={style.footer__container}>

        <div className={style.row1}>
          <div className={style.footer__logo}>
            <img src="/images/footer/footer.jpg" alt="Logo de Kamada" className={style.footer__img} />
            <p className={style.footer__subtitle}>¡Un Kamada nunca amaga!</p>
          </div>

          <div className={style.footer__redes}>
            <div className={style.footer__header}>
              <h6 className={style.footer__title}>Redes sociales</h6>
            </div>
            
            <ul className={style.redes__lista}>
              <li className={style.redes__items}> 
                <FontAwesomeIcon 
                  icon={Icons.spotify} 
                  className={style.icon}
                />
                <Link to="https://open.spotify.com/artist/5p3CzYVyNJ3qvuS6aXxo9R?si=EKsyepaDS-eY5uQrNMBHkA">
                  Spotify
                </Link>
              </li>
              <li className={style.redes__items}> 
                <FontAwesomeIcon 
                  icon={Icons.youtube} 
                  className={style.icon}
                />
                <Link to="https://www.youtube.com/@Lakamada">
                  Youtube
                </Link>
              </li>
              <li className={style.redes__items}> 
                <FontAwesomeIcon 
                  icon={Icons.instagram} 
                  className={style.icon}
                />
                <Link to="https://www.instagram.com/lakamada/?hl=es">
                  Instagram
                </Link>
              </li>
            </ul>
          </div>

          <Button as={Link} to="/eventos" variant="primary" onClick={handleClick}>
            Comprar entradas
          </Button>
        </div>

        <div className={style.row2}>
          <SpotifyCard />
        </div>

        <div className={style.footer__copy}>
          <p>© UTN Desarrollo Web | Matias Sticca</p>
        </div>

      </div>
    </div>
  )
}

export default Footer