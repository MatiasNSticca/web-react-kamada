import React from "react";
import { Link } from "react-router-dom";
import Button from "../../components/ui/Button/Button";
import style from "./Tienda.module.css";
import TiendaCard from "../../components/ui/Cards/card-tienda/TiendaCard";

function Tienda() {
  return (
    <>
      <section className={style.tienda}>
        <div className={style.tienda__container}>
          <div className={style.tienda__header}>
            <h2 className={style.tienda__title}>Tienda</h2>
            <p className={style.tienda__subtitle}>
              Adquiri tus productos de Kamada
            </p>
          </div>

          <div className={style.tienda__cards}>
            <TiendaCard
              imgSrc="/images/merch/merch-1.jpg"
              title="Remera"
              pricing="$17.650"
              description="Modelo Plagas"
              onClick={() =>
                console.log("Añadido al carrito | 🤣 Back para futuro")
              }
            />

            <TiendaCard
              imgSrc="/images/merch/merch-2.png"
              title="Remera"
              pricing="$12.500"
              description="Modelo Grafiti"
              onClick={() =>
                console.log("Añadido al carrito | 🤣 Back para futuro")
              }
            />

            <TiendaCard
              imgSrc="/images/merch/merch-3.png"
              title="Gorra"
              pricing="$8.900"
              description="Logo Kamada"
              onClick={() =>
                console.log("Añadido al carrito | 🤣 Back para futuro")
              }
            />

            <TiendaCard
              imgSrc="images/merch/merch-4.jpeg"
              title="Remera"
              pricing="$17.650"
              description="Modelo Kamada"
              onClick={() =>
                console.log("Añadido al carrito | 🤣 Back para futuro")
              }
            />

            <TiendaCard
              imgSrc="/images/merch/merch-5.jpeg"
              title="Remera"
              pricing="$15.990"
              description="Nunca Amaga"
              onClick={() =>
                console.log("Añadido al carrito | 🤣 Back para futuro")
              }
            />

            <TiendaCard
              imgSrc="/images/merch/merch-6.jpeg"
              title="Remera"
              pricing="$15.990"
              description="Hey Bro"
              onClick={() =>
                console.log("Añadido al carrito | 🤣 Back para futuro")
              }
            />
          </div>

          <Button as={Link} to="/tienda" variant="primary">
            Visitar tienda
          </Button>
        </div>
      </section>
    </>
  );
}

export default Tienda;
