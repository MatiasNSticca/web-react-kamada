import React, { useState } from "react";
import style from "./TiendaCard.module.css";
import Button from "../../Button/Button";
import useDeleteProduct from "../../../../hooks//products/useDeleteProduct";
import { Navigate, useNavigate } from "react-router-dom";
import { statusTranslations } from "../../../../utils/statusTranslations";

function TiendaCard( { products = [] } ) {

  const navigate = useNavigate();

  const {error, deleteProduct} = useDeleteProduct()

  const handleDeleteProduct = async (e, productId) => {
    e.stopPropagation()
    if(window.confirm("¿Estas seguro que queres eliminar el producto?")) {
      const response = await deleteProduct(productId)
      if(response) {
        window.location.reload()
      }
    }
  }

  const handleEditProduct = (e, productId) => {
    e.stopPropagation()
    navigate(`/products/edit/${productId}`)
  }

  const [selectedColor, setSelectedColor] = useState("black");

  const colores = [
    { value: "black", label: "Negro" },
    { value: "white", label: "Blanco" },
    { value: "gray", label: "Gris" },
  ];

  return (
    <div className={style.container__cards}>
      {products.map((product) => (
        <div key={product.id} className={style.card}>
          <img className={style.card__img} src={product.image} />

          <div className={style.card__content}>
            <div className={style.card__text}>
              <h5 className={style.card__title}>{product.name}</h5>
              <p className={style.card__pricing}>${product.price}</p>
              <p className={style.card__descripton}>{product.description}</p>
              <p className={style.card__descripton_status}>{statusTranslations[product.status] || product.status}</p>
              <p className={style.card__descripton}>Stock {product.stock}</p>
            </div>

            <div className={style.card__color}>
              {colores.map((c) => (
                <label key={c.value} className={style.color__label}>
                  <input
                    type="radio"
                    value={c.value}
                    checked={selectedColor === c.value}
                    onChange={() => setSelectedColor(c.value)}
                  />

                  <span
                    className={`${style.color__circle} ${style[c.value]}
                      ${selectedColor === c.value ? style.selected : ""}`}
                  ></span>
                </label>
              ))}
            </div>

            <Button variant="primary">Comprar</Button>
            <Button onClick={ (e) => handleDeleteProduct(e, product.id) } variant="secondary">Eliminar</Button>
            <Button onClick={ (e) => handleEditProduct(e, product.id) } variant="secondary">✏️ Editar</Button>
          </div>
        </div>
      ))}
      { error && <p> {error.message || error} </p> }
    </div>
  );
}

export default TiendaCard;
