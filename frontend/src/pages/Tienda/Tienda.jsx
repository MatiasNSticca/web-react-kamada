import React from "react";
import style from "./Tienda.module.css";
import TiendaCard from "../../components/ui/Cards/card-tienda/TiendaCard";
import useGetProduct from "../../hooks//products/useGetProduct";



function Tienda() {

  const { loading, products, error } = useGetProduct();

  if (error) {
    return <h2>{error.message || "Error al cargar productos"}</h2>;
  }

  if (loading) {
    return <h2>Cargando productos...</h2>;
  }

  //  Empty state (estado vacio)
  //  es una situacion donde no hay productos
  if (!products || products.length === 0) {
    return <h2>No hay productos disponibles</h2>;
  }

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
            <TiendaCard products={products}/>
          </div>
        </div>
      </section>
    </>
  );
}

export default Tienda;
