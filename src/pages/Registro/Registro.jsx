import React from "react"
import { Link } from "react-router-dom"
import Button from "../../components/ui/Button/Button"
import style from "./Registro.module.css"

function Registro() {
  return (
    <div className={style.registro__container}>
      <div className={style.registro__header}>
        <h2 className={style.registro__title}>Registro</h2>
        <p className={style.registro__subtitle}>Proximamente podras registrarte en Kamada</p>
      </div>

      <Button as={Link} to="/" variant="primary">
        Volver al inicio
      </Button>
    </div>
  );
}

export default Registro;
