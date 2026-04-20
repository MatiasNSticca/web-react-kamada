import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import useAuth from "../../../hooks/users/useAuth";
import Button from "../../ui/Button/Button";
import "./AdminSidebar.css";

function AdminSidebar({ isOpen, toggleMenu }) {
  const { user, isMaster, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const navItems = [
    { path: "/admin/productos", label: "Productos", icon: "" },
    { path: "/admin/eventos", label: "Eventos", icon: "" },
    ...(isMaster ? [{ path: "/admin/usuarios", label: "Usuarios", icon: "" }] : []),
    { path: "/admin/perfil", label: "Mi Perfil", icon: "" },
  ];

  return (
    <>
      {/* Botón hamburguesa siempre visible */}
      <button 
        className={`hamburger-btn ${isOpen ? 'open' : ''}`} 
        onClick={toggleMenu}
        aria-label="Abrir menú"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>

      <aside className={`admin-sidebar ${isOpen ? 'sidebar-open' : ''}`}>
        <div className="sidebar-header">
          <h2>Admin</h2>
          <p className="user-info">{user?.username}</p>
          <span className="user-role">{isMaster ? "Master" : "Admin"}</span>
        </div>

        <nav className="sidebar-nav">
          {navItems.map((item) => (
            <NavLink 
              key={item.path}
              to={item.path} 
              className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
              onClick={toggleMenu}
            >
              <span className="nav-icon">{item.icon}</span>
              <span className="nav-label">{item.label}</span>
            </NavLink>
          ))}
        </nav>

        <div className="sidebar-footer">
          <Button onClick={handleLogout} variant="secondary" >
          Cerrar Sesión
          </Button>
        </div>
      </aside>
    </>
  );
}

export default AdminSidebar;
