import { Routes, Route } from "react-router-dom"
import Layout from "./components/layout/Layout"
import EmptyLayout from "./components/layout/EmptyLayout"

import Home from "./pages/Home/Home"
import Eventos from "./pages/Eventos/Eventos"
import Tienda from "./pages/Tienda/Tienda"
import Galeria from "./pages/Galeria/Galeria"
import Nosotros from "./pages/Nosotros/Nosotros"
import Contacto from "./pages/Contacto/Contacto"

import CreateProductPage from "./pages/Producto/CreateProductPage"

import Registro from "./pages/Registro/Registro"
import LoginUserPage from "./pages/Login/LoginUserPage"
import Error404 from "./pages/Error404/Error404"


export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/eventos" element={<Eventos />} />
        <Route path="/tienda" element={<Tienda />} />
        <Route path="/galeria" element={<Galeria />} />
        <Route path="/nosotros" element={<Nosotros />} />
        <Route path="/contacto" element={<Contacto />} />
      </Route>

      <Route element={<EmptyLayout />}>
        <Route path="/registro" element={<Registro />} />
        <Route path="/login" element={<LoginUserPage />} />
        <Route path="/products/create" element={<CreateProductPage />} />
        <Route path="*" element={<Error404 />} />
      </Route>
    </Routes>
  );
}
