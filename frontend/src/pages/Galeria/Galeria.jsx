import React from "react";
import { Link } from "react-router-dom";
import ImageGrid from "../../components/ui/Image/ImageGrid";
import style from "./Galeria.module.css";

function Galeria() {
  return (
    <>
      <section className={style.galeria}>
        <div className={style.galeria__container}>
          <div className={style.galeria__header}>
            <h2 className={style.galeria__title}>Galeria</h2>
            <p className={style.galeria__subtitle}>Ultimos recitales</p>
          </div>
          <div className={style.galeria__grid}>
            <div className={style["grid__item--1"]}>
              <ImageGrid imgSrc="/images/eventos/foto-show-1.jpeg" />
            </div>

            <div className={style["grid__item--2"]}>
              <ImageGrid
                imgSrc="/images/eventos/foto-show-2.jpeg"
                title="Foto del evento de Kamada"
              />
            </div>

            <div className={style["grid__item--3"]}>
              <ImageGrid
                imgSrc="/images/eventos/foto-show-3.jpeg"
                title="Foto del evento de Kamada"
              />
            </div>

            <div className={style["grid__item--4"]}>
              <ImageGrid
                imgSrc="/images/eventos/foto-show-4.jpeg"
                title="Foto del evento de Kamada"
              />
            </div>

            <div className={style["grid__item--5"]}>
              <ImageGrid
                imgSrc="/images/eventos/foto-animation.png"
                title="Logo del album Sajelodonte"
              />
            </div>

            <div className={style["grid__item--6"]}>
              <ImageGrid
                imgSrc="/images/eventos/foto-show-5.jpeg"
                title="Foto del evento de Kamada"
              />
            </div>

            <div className={style["grid__item--7"]}>
              <ImageGrid
                imgSrc="/images/eventos/foto-show-6.jpeg"
                title="Foto del evento de Kamada"
              />
            </div>

            <div className={style["grid__item--8"]}>
              <ImageGrid
                imgSrc="/images/eventos/foto-show-7.jpeg"
                title="Foto del evento de Kamada"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Galeria;
