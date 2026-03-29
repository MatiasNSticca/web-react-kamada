import React from "react"
import { Link } from "react-router-dom";
import Button from "../../components/ui/Button/Button"
import style from "./Error404.module.css"

function Error404() {
  return (
    <div className={style.error404__container}>
      <div className={style.error404__header}>
        <h2 className={style.error404__title}>Error 404</h2>
        <p className={style.error404__subtitle}>Ups.. Pagina no encontrada</p>
      </div>

      <Button as={Link} to="/" variant="primary">
        Volver al inicio
      </Button>
    </div>
  );
}

export default Error404;
