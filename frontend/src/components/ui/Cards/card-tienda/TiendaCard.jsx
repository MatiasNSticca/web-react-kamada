import React, { useState } from "react";
import style from "./TiendaCard.module.css";
import Button from "../../Button/Button";
import useDeleteProduct from "../../../../hooks//products/useDeleteProduct";
import useGetProduct from "../../../../hooks/products/useGetProduct";
import { useNavigate } from "react-router-dom";
import useAuth from "../../../../hooks/users/useAuth"
import { useCart } from "../../../../contex/CartContext";
import Toast from "../../../ui/Toast/Toast";


function TiendaCard( { products = [] } ) {

  const navigate = useNavigate();
  const { isAuthenticated, isAdmin } = useAuth()
  const { addToCart } = useCart();
  const { error, deleteProduct } = useDeleteProduct();
  const { refetch } = useGetProduct();
  const [cartError, setCartError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");


  const handleAddToCart = (e, product) => {
    e.stopPropagation();
    setCartError(null);

    if (!product.available) {
      setCartError("El producto no está disponible");
      return;
    }

    if (product.stock <= 0) {
      setCartError("No hay stock disponible");
      return;
    }

    try {
      addToCart(product, 1);
      setSuccessMessage(`${product.name} agregado al carrito`);
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (error) {
      setCartError(error.message);
    }
  };

  const handleDeleteProduct = async (e, productId) => {
    e.stopPropagation()
    if(window.confirm("¿Estás seguro que quieres eliminar el producto?")) {
      const response = await deleteProduct(productId)
      if(response) {
        setSuccessMessage("Producto eliminado exitosamente!");
        refetch();
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
      {successMessage && (
        <Toast 
          message={successMessage} 
          type="success" 
          onClose={() => setSuccessMessage("")} 
        />
      )}
      
      {cartError && (
        <Toast 
          message={cartError} 
          type="error" 
          onClose={() => setCartError(null)} 
        />
      )}
      
      {products.map((product) => (
        <div key={product._id} className={style.card}>
          <img className={style.card__img} src={product.image} alt={product.name} />

          <div className={style.card__content}>
            <div className={style.card__text}>
              <h5 className={style.card__title}>{product.name}</h5>
              <p className={style.card__pricing}>${product.price}</p>
              <p className={style.card__descripton}>{product.description}</p>
              <p className={style.card__descripton_status}>
                {product.available ? "Disponible" : "No disponible"}
              </p>
              <p className={style.card__descripton}>Stock: {product.stock}</p>
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

            {/* Todos pueden agregar al carrito (registrados o no) */}
            <Button onClick={ (e) => handleAddToCart(e, product) } variant="primary">
              Agregar al carrito
            </Button>
            
            {/* Solo admins pueden editar y eliminar */}
            {isAdmin && (
              <>
                <Button onClick={ (e) => handleEditProduct(e, product._id) } variant="primary">
                  Editar
                </Button>
                <Button onClick={ (e) => handleDeleteProduct(e, product._id) } variant="secondary">
                  Eliminar
                </Button>
              </>
            )}
          </div>
        </div>
      ))}
      { error && <p style={{ color: 'red', marginTop: '10px' }}>{error.message || error}</p> }
      { cartError && <p style={{ color: 'red', marginTop: '10px' }}>{cartError.message || cartError}</p> }
    </div>
  );
}

export default TiendaCard;
