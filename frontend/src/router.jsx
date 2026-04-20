import { createBrowserRouter } from "react-router-dom"
import Layout from "./components/layout/Layout"
import EmptyLayout from "./components/layout/EmptyLayout"
import AdminLayout from "./components/layout/AdminLayout/AdminLayout"

import Home from "./pages/Home/Home"
import Eventos from "./pages/Eventos/Eventos"
import Tienda from "./pages/Tienda/tienda"
import Galeria from "./pages/Galeria/Galeria"
import Nosotros from "./pages/Nosotros/Nosotros"
import Contacto from "./pages/Contacto/Contacto"
import Carrito from "./pages/Carrito/carrito"


import Error404 from "./pages/Error404/Error404";

import CreateProductPage from "./pages/Producto/CreateProductPage"
import EditProductPage from "./pages/Producto/EditProductPage."
import RegisterUserPage from "./pages/Registro/RegisterUserPage"
import LoginUserPage from "./pages/Login/LoginUserPage"
import User from "./pages/Users/User"
import AdminUsers from "./pages/AdminUsers/AdminUsers"
import AdminProductos from "./pages/Admin/AdminProductos"
import AdminEventos from "./pages/Admin/AdminEventos"
import Perfil from "./pages/Perfil/Perfil"
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute"

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
                path: "mi-perfil",
                element: (
                    <ProtectedRoute requireAdmin={false}>
                        <Perfil />
                    </ProtectedRoute>
                )
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
                path: "registro",
                element: <RegisterUserPage />
            },
            {
                path: "login",
                element: <LoginUserPage />
            },
        ]
    },

    // Rutas de Admin con Sidebar
    {
        element: (
            <ProtectedRoute requireAdmin={true}>
                <AdminLayout />
            </ProtectedRoute>
        ),
        children: [
            {
                path: "admin/productos",
                element: <AdminProductos />
            },
            {
                path: "admin/eventos",
                element: <AdminEventos />
            },
            {
                path: "admin/usuarios",
                element: (
                    <ProtectedRoute requireMaster={true}>
                        <AdminUsers />
                    </ProtectedRoute>
                )
            },
            {
                path: "admin/perfil",
                element: <Perfil />
            },
        ]
    }
])

export default router
