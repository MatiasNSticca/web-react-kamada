import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../contex/CartContext";
import useCreatePurchase from "../../hooks/purchases/useCreatePurchase";
import useAuth from "../../hooks/users/useAuth";

function CartPage() {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const { cartItems, removeFromCart, updateQuantity, clearCart, getCartTotal } = useCart();
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
      <div>
        <h2> Tu carrito está vacío </h2>
        <p> Agrega productos para comenzar a comprar </p>
        <button onClick={() => navigate("/tienda")}>
          Ver productos
        </button>
      </div>
    );
  }

  return (
    <div>
      <h1> Carrito de Compras </h1>

      {purchaseError && (
        <p> {purchaseError.message || purchaseError} </p>
      )}

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "15px",
          marginBottom: "20px",
        }}
      >
        {cartItems.map((item) => (
          <div
            key={item.id}
            style={{
              border: "1px solid #ccc",
              padding: "15px",
              borderRadius: "8px",
              display: "flex",
              gap: "15px",
            }}
          >
            <img
              src={item.image}
              alt={item.name}
              style={{ width: "100px", height: "100px", objectFit: "cover" }}
            />
            <div style={{ flex: 1 }}>
              <h3> {item.name} </h3>
              <p> Precio unitario: ${item.price} </p>
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <label>
                  Cantidad:
                  <input
                    type="number"
                    min="1"
                    max={item.stock}
                    value={item.quantity}
                    onChange={(e) => {
                      try {
                        updateQuantity(item.id, parseInt(e.target.value) || 1);
                      } catch (error) {
                        alert(error.message);
                      }
                    }}
                    style={{ marginLeft: "5px", width: "60px" }}
                  />
                </label>
                <span> Stock disponible: {item.stock} </span>
              </div>
              <p> Subtotal: ${item.price * item.quantity} </p>
            </div>
            <button
              onClick={() => removeFromCart(item.id)}
              style={{
                padding: "5px 10px",
                backgroundColor: "#ff4444",
                color: "white",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              Eliminar
            </button>
          </div>
        ))}
      </div>

      <div
        style={{
          padding: "15px",
          border: "1px solid #ccc",
          borderRadius: "8px",
        }}
      >
        <h2> Total: ${getCartTotal()} </h2>
        <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
          <button
            onClick={handleCheckout}
            disabled={processing || !isAuthenticated}
            style={{
              padding: "10px 20px",
              backgroundColor: "#4CAF50",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: processing ? "not-allowed" : "pointer",
              fontSize: "16px",
            }}
          >
            {processing ? "Procesando..." : "Finalizar Compra"}
          </button>
          <button
            onClick={clearCart}
            style={{
              padding: "10px 20px",
              backgroundColor: "#ff4444",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            Vaciar Carrito
          </button>
        </div>
        {/* { !isAuthenticated && (
          <p style={{ color: "orange", marginTop: "10px" }}>
            Debes iniciar sesión para realizar una compra
          </p>
        )} */}
      </div>
    </div>
  );
}

export default CartPage;
