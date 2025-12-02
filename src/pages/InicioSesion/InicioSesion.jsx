import React from "react"
import { Link } from "react-router-dom"
import Button from "../../components/ui/Button/Button"
import style from "./InicioSesion.module.css"

function InicioSesion() {
  return (
    <div className={style.iniciosesion__container}>
      <div className={style.iniciosesion__header}>
        <h2 className={style.iniciosesion__title}>Inicio de sesion</h2>
        <p className={style.iniciosesion__subtitle}>Proximamente podrás iniciar sesion</p>
      </div>

      <Button as={Link} to="/" variant="primary">
        Volver al inicio
      </Button>
    </div>
  );
}

export default InicioSesion;
