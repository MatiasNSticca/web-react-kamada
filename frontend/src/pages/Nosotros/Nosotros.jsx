import React from "react";
import style from "./Nosotros.module.css";

function Nosotros() {
  return (
    <>
      <section className={style.nosotros}>
        <div className={style.nosotros__container}>
          <img className={style.nosotros__img} src="/images/nosotros/nosotros.jpg" alt="Foto de Kelo y Saje" />
          <div className={style.nosotros__conten}>
            <h2 className={style.nosotros__title}>Nosotros</h2>
            <p className={style.nosotros__subtitle}>
              La banda argentina Kamada, compuesta por Kelo y Saje, se refiere,
              principalmente a su discografía, que incluye álbumes como Kamada
              Tres Cuatro (2013), Kamada Clásicos (2018), Sajelodonte (2019),
              Leal (2020), OSNIS (2022), PLAGAS (2023) y GENERALA SESSIONS
              (2024).También hay publicaciones relacionadas con sus creaciones,
              como el disco. Kamada Tres Cuatro disponible en Bandcamp, y
              artículos de prensa que analizan su trabajo y trayectoria en el
              hip hop argentino.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}

export default Nosotros;
