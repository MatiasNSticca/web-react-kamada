import React from "react";
import { Link, NavLink } from "react-router-dom"
import style from "./HeaderNav.module.css"
import Button from "../../ui/Button/Button"
import useAuth from "../../../hooks/users/useAuth"
import { useCart } from "../../../contex/CartContext"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Icons } from "../../../assets/icons/icons"


function HeaderNav({ isOpen, toggleMenu }) {

  const { user, isAuthenticated, isAdmin, isMaster, logout } = useAuth()
  const { getCartItemsCount } = useCart()
  const cartCount = getCartItemsCount()

  const getLinkClass = ({ isActive }) =>
    `${style.nav__link} ${isActive ? style.active : ""}`;

  const handleLogout = () => {
    logout();
    toggleMenu();
  };

  return (
    <nav className={style.nav}>
      <div className={style.nav__logo}>
        <Link to="/">
          <img src="/images/logo/logo.jpg" alt="Logo de Kamada" />
        </Link>
      </div>

      {/* Botón hamburguesa */}
      <button
        className={`${style.nav__toggle} ${isOpen ? style.open : ""}`}
        onClick={toggleMenu}
        aria-label="Abrir menú"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>

      {/* Menú - Visible para usuarios NO admin */}
      {!isAdmin && (
        <ul className={`${style.nav__list} ${isOpen ? style["nav__list--open"] : ""}`}>

          <li className={style.nav__item}>
            <NavLink to="/" className={getLinkClass} end onClick={toggleMenu}>
              Inicio
            </NavLink>
          </li>

          <li className={style.nav__item}>
            <NavLink to="/eventos" className={getLinkClass} onClick={toggleMenu}>
              Eventos
            </NavLink>
          </li>

          <li className={style.nav__item}>
            <NavLink to="/tienda" className={getLinkClass} onClick={toggleMenu}>
              Tienda
            </NavLink>
          </li>

          <li className={style.nav__item}>
            <NavLink to="/galeria" className={getLinkClass} onClick={toggleMenu}>
              Galería
            </NavLink>
          </li>

          <li className={style.nav__item}>
            <NavLink to="/nosotros" className={getLinkClass} onClick={toggleMenu}>
              Nosotros
            </NavLink>
          </li>

          <li className={style.nav__item}>
            <NavLink to="/contacto" className={getLinkClass} onClick={toggleMenu}>
              Contacto
            </NavLink>
          </li>

          <li> 
            <NavLink to="/carrito" style={{ position: "relative" }}>
              <FontAwesomeIcon icon={Icons.carrito}/>
              {cartCount > 0 && 
                  <span
                    style={{
                      position: "absolute",
                      top: "-8px",
                      right: "-8px",
                      backgroundColor: "#ff4444",
                      color: "white",
                      borderRadius: "50%",
                      width: "20px",
                      height: "20px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "12px",
                    }}
                  >
                    {cartCount}
                  </span>
                }
            </NavLink>
          </li>

          {/* Botones login/registro */}
          {!isAuthenticated && (
            <>
              <li>
                <Button as={Link} to="/registro" variant="primary" onClick={toggleMenu}>
                  Registrarme
                </Button>
              </li>

              <li>
                <Button as={Link} to="/login" variant="secondary" onClick={toggleMenu}>
                  Iniciar sesión
                </Button>
              </li>
            </>
          )}

          {/* Botón logout */}
          {isAuthenticated && (
            <li>
              <Button onClick={handleLogout} variant="primary">
                Cerrar sesión
              </Button>
            </li>
          )}
        </ul>
      )}
    </nav>
  );
}

export default HeaderNav;
