import React from "react";
import { Link } from "react-router-dom";
import Formulario from "../../components/Formulario/Formulario";
import style from "./Contacto.module.css";

function Contacto() {
  return (
    <>
      <div className={style.formulario__container}>
        <div className={style.formulario__header}>
          <h2 className={style.formulario__title}>Formulario de contacto</h2>
          <p className={style.formulario__subtitle}>Contactate con nosotros</p>
        </div>

        <Formulario />
      </div>
    </>
  );
}

export default Contacto;
