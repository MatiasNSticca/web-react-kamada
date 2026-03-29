import React from "react";
import { Link } from "react-router-dom";
import style from "./SpotifyCard.module.css"

function SpotifyCard() {
  return (
    <div className={style.footer__music}>
      <div className={style.footer__content}>
        <div className={style.footer__header}>
          <h6 className={style.footer__title}>Populares</h6>
        </div>
      </div>
      <div className={style.spotify__music}>
        <iframe
          style={{ borderRadius: "12px" }}
          src="https://open.spotify.com/embed/artist/5p3CzYVyNJ3qvuS6aXxo9R?utm_source=generator&theme=0"
          width="100%"
          height="152"
          frameBorder="0"
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          loading="lazy"
        ></iframe>
      </div>
    </div>
  );
}

export default SpotifyCard;
