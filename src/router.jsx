import { BrowserRouter, createBrowserRouter } from "react-router-dom"
import Layout from "./components/layout/Layout"
import EmptyLayout from "./components/layout/EmptyLayout"

import Home from "./pages/Home/Home"
import Eventos from "./pages/Eventos/Eventos"
import Tienda from "./pages/Tienda/Tienda"
import Galeria from "./pages/Galeria/Galeria"
import Nosotros from "./pages/Nosotros/Nosotros"
import Contacto from "./pages/Contacto/Contacto"

import Error404 from "./pages/Error404/Error404";

import InicioSesion from "./pages/InicioSesion/InicioSesion"
import Registro from "./pages/Registro/Registro"
import CreateProductPage from "./pages/CrearProducto/CreateProductPage"

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            {
                index: true,
                element: <Home />
            },
            {
                path: "eventos",
                element: <Eventos />,
            },
            {
                path: "tienda",
                element: <Tienda />,
            },
            {
                path: "galeria",
                element: <Galeria />,
            },
            {
                path: "nosotros",
                element: <Nosotros />,
            },
            {
                path: "contacto",
                element: <Contacto />,
            },
            {
                path: "*",
                element: <Error404 />
            }
        ]
    },
    
    {
        element: <EmptyLayout />,
        children: [
            {
                path: "products/create",
                element: <CreateProductPage />,
            },
            {
                path: "registro",
                element: <Registro />
            },
            {
                path: "inicio-sesion",
                element: <InicioSesion />
            },
        ]
    }
])

export default router