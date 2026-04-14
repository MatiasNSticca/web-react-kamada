import { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

const CART_STORAGE_KEY = "cart";

function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const savedCart = localStorage.getItem(CART_STORAGE_KEY);
    if (savedCart) {
      try {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setCartItems(JSON.parse(savedCart));
      } catch (error) {
        console.error("Error al cargar el carrito:", error);
        localStorage.removeItem(CART_STORAGE_KEY);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product, quantity = 1) => {
    const productId = product._id || product.id;
    
    // Manejar tanto productos como eventos
    const productStock = product.stock || product.ticketsAvailable || 0;
    const isAvailable = product.available !== undefined ? product.available : (product.active !== false);

    if (!isAvailable || productStock < quantity) {
      throw new Error("Producto no disponible o sin stock suficiente");
    }

    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === productId);

      if (existingItem) {
        const newQuantity = existingItem.quantity + quantity;
        if (newQuantity > productStock) {
          throw new Error("No hay suficiente stock");
        }
        return prevItems.map((item) =>
          item.id === productId ? { ...item, quantity: newQuantity } : item
        );
      } else {
        return [
          ...prevItems,
          {
            id: productId,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: quantity,
            stock: productStock,
            type: product.type || 'producto',
            description: product.description,
          },
        ];
      }
    });
  };

  const removeFromCart = (productId) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => item.id !== productId)
    );
  };

  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }

    setCartItems((prevItems) => {
      const item = prevItems.find((item) => item.id === productId);
      if (item && quantity > item.stock) {
        throw new Error("No hay suficiente stock");
      }
      return prevItems.map((item) =>
        item.id === productId ? { ...item, quantity } : item
      );
    });
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const getCartTotal = () => {
    return cartItems.reduce((total, item) => {
      return total + item.price * item.quantity;
    }, 0);
  };

  const getCartItemsCount = () => {
    return cartItems.reduce((count, item) => count + item.quantity, 0);
  };

  const value = {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getCartTotal,
    getCartItemsCount,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart debe usarse dentro de CartProvider");
  }
  return context;
}

// eslint-disable-next-line react-refresh/only-export-components
export { CartProvider, useCart };
