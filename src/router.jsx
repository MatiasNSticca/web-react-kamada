import { createBrowserRouter } from "react-router-dom"
import Layout from "./components/layout/Layout"
import EmptyLayout from "./components/layout/EmptyLayout"

import Home from "./pages/Home/Home"
import Eventos from "./pages/Eventos/Eventos"
import Tienda from "./pages/Tienda/Tienda"
import Galeria from "./pages/Galeria/Galeria"
import Nosotros from "./pages/Nosotros/Nosotros"
import Contacto from "./pages/Contacto/Contacto"
import Carrito from "./pages/Carrito/Carrito"


import Error404 from "./pages/Error404/Error404";

import CreateProductPage from "./pages/Producto/CreateProductPage"
import EditProductPage from "./pages/Producto/EditProductPage."
import RegisterUserPage from "./pages/Registro/RegisterUserPage"
import LoginUserPage from "./pages/Login/LoginUserPage"
import User from "./pages/Users/User"

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
                path: "carrito",
                element: <Carrito />,
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
                path: "products/edit/:id",
                element: <EditProductPage />,
            },
            {
                path: "registro",
                element: <RegisterUserPage />
            },
            {
                path: "users",
                element: <User />
            },
            {
                path: "login",
                element: <LoginUserPage />
            },
        ]
    }
])

export default router