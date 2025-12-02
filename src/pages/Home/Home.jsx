import React from "react";
import { Link } from "react-router-dom";
import style from "./Home.module.css";
import Eventos from "../Eventos/Eventos";
import Tienda from "../Tienda/Tienda";
import Galeria from "../Galeria/Galeria";
import Contacto from "../Contacto/Contacto";

function Home() {
  return (
    <>
      <main>
        <section className={style.eventos__preview}>
          <Eventos />
        </section>

        <section className={style.tienda__preview}>
          <Tienda />
        </section>

        <section className={style.galeria__preview}>
          <Galeria />
        </section>

        <section className={style.formulario__preview}>
          <Contacto />
        </section>
      </main>
    </>
  );
}

export default Home;
