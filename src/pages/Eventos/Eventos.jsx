import React from "react";
import { Link } from "react-router-dom";
import Card from "../../components/ui/Cards/card-evento/EventoCard";
import Button from "../../components/ui/Button/Button";
import style from "./Eventos.module.css";

function Eventos() {
  return (
    <>
      <section className={style.eventos}>
        <div className={style.eventos__container}>
          <div className={style.eventos__header}>
            <h2 className={style.eventos__title}>Proximos eventos</h2>
            <p className={style.eventos__subtitle}>Compra tus entradas</p>
          </div>

          <div className={style.eventos__cards}>
            <Card
              imgSrc="/images/album/album-1.jpg"
              title="Presentacion Leal"
              subtitle="Velez"
              buttonLabel="Comprar"
              onClick={() =>
                console.log("Añadido al carrito | 🤣 Back para futuro")
              }
            />

            <Card
              imgSrc="/images/album/album-2.jpg"
              title="Presentacion Plagas"
              subtitle="Luna Park"
              buttonLabel="Comprar"
              onClick={() =>
                console.log("Añadido al carrito | 🤣 Back para futuro")
              }
            />

            <Card
              imgSrc="/images/album/album-3.jpg"
              title="Presentacion Ovisparos"
              subtitle="Estadio Huracan"
              buttonLabel="Comprar"
              onClick={() =>
                console.log("Añadido al carrito | 🤣 Back para futuro")
              }
            />

            <Card
              imgSrc="/images/album/album-4.jpg"
              title="Presentacion Sajelodonte"
              subtitle="Velez"
              buttonLabel="Comprar"
              onClick={() =>
                console.log("Añadido al carrito | 🤣 Back para futuro")
              }
            />
          </div>

          {/* <Button as={Link} to="/eventos" variant="primary">
            Ver eventos
          </Button> */}
        </div>
      </section>
    </>
  );
}

export default Eventos;
