import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { RouterProvider } from "react-router-dom"

import "./assets/styles/index.css"
import '@fortawesome/fontawesome-free/css/all.min.css'
import router from "./router"
import { CartProvider } from "./contex/CartContext"

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <CartProvider>
      <RouterProvider router={router} />
    </CartProvider>
  </StrictMode>
);
