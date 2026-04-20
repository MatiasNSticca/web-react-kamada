import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../contex/CartContext";
import useCreatePurchase from "../../hooks/purchases/useCreatePurchase";
import useAuth from "../../hooks/users/useAuth";
import style from "./carrito.module.css";

function CartPage() {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const { cartItems, removeFromCart, updateQuantity, clearCart, getCartTotal } =
    useCart();
  const { createPurchase, error: purchaseError } = useCreatePurchase();
  const [processing, setProcessing] = useState(false);

  const handleCheckout = async () => {
    if (!isAuthenticated) {
      alert("Debes iniciar sesión para realizar una compra");
      navigate("/users/login");
      return;
    }

    if (cartItems.length === 0) {
      alert("El carrito está vacío");
      return;
    }

    setProcessing(true);

    const purchaseData = {
      userId: user.id,
      items: cartItems.map((item) => ({
        id: item.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
      })),
      status: "PENDING",
    };

    const purchase = createPurchase(purchaseData);

    if (purchase) {
      alert("¡Compra realizada con éxito!");
      clearCart();
      navigate("/purchases");
    } else {
      alert("Error al realizar la compra. Intenta nuevamente.");
    }

    setProcessing(false);
  };

  if (cartItems.length === 0) {
    return (
      <section className={style.carrito}>
        <div className={style.carrito__empty}>
          <h2 className={style.carrito__title}>Tu carrito está vacío</h2>
          <p>Agrega productos para comenzar a comprar</p>
          <button
            className={style.carrito__btn}
            onClick={() => navigate("/tienda")}
          >
            Ver productos
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className={style.carrito}>
      <div className={style.carrito__container}>
        <h1 className={style.carrito__title}>Carrito de Compras</h1>

        {purchaseError && (
          <p className={style.carrito__error}>
            {purchaseError.message || purchaseError}
          </p>
        )}
        <div className={style.carrito__content}>
          <div className={style.carrito__items}>
            {cartItems.map((item) => (
              <div key={item.id} className={style.carrito__item}>
                <img
                  src={item.image}
                  alt={item.name}
                  className={style.carrito__img}
                />
                <div className={style.carrito__info}>
                  <h3 className={style.carrito__itemTitle}>{item.name}</h3>
                  <p className={style.carrito__price}>
                    Precio unitario: ${item.price}
                  </p>
                  <div className={style.carrito__quantity}>
                    <label>
                      Cantidad:
                      <input
                        type="number"
                        min="1"
                        max={item.stock}
                        value={item.quantity}
                        onChange={(e) => {
                          try {
                            updateQuantity(
                              item.id,
                              parseInt(e.target.value) || 1,
                            );
                          } catch (error) {
                            alert(error.message);
                          }
                        }}
                        className={style.carrito__input}
                      />
                    </label>
                    {/* <span className={style.carrito__stock}>Stock disponible: {item.stock}</span> */}
                  </div>
                  <p className={style.carrito__subtotal}>
                    Subtotal: ${item.price * item.quantity}
                  </p>
                </div>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className={style.carrito__btnEliminar}
                >
                  Eliminar
                </button>
              </div>
            ))}
          </div>

          <div className={style.carrito__footer}>
            <h2 className={style.carrito__total}>Total: ${getCartTotal()}</h2>
            <div className={style.carrito__actions}>
              <button
                onClick={handleCheckout}
                disabled={processing || !isAuthenticated}
                className={style.carrito__btnPrimary}
              >
                {processing ? "Procesando..." : "Finalizar Compra"}
              </button>
              <button
                onClick={clearCart}
                className={style.carrito__btnSecondary}
              >
                Vaciar Carrito
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CartPage;
