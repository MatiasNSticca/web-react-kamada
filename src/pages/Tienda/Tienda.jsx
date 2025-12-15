import React from "react";
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
            <TiendaCard />
          </div>
        </div>
      </section>
    </>
  );
}

export default Tienda;
