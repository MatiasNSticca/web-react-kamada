import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { RouterProvider } from "react-router-dom"

import "./assets/styles/index.css"
import '@fortawesome/fontawesome-free/css/all.min.css'
import router from "./router"

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
