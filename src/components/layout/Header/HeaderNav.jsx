import React from "react";
import { Link, NavLink } from "react-router-dom"
import style from "./HeaderNav.module.css"
import Button from "../../ui/Button/Button"
import useAuth from "../../../hooks/users/useAuth"

function HeaderNav({ isOpen, toggleMenu }) {

  const { isAuthenticated, logout } = useAuth()

  const getLinkClass = ({ isActive }) =>
    `${style.nav__link} ${isActive ? style.active : ""}`;

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

      {/* Menú */}
      <ul className={`${style.nav__list} ${isOpen ? style["nav__list--open"] : ""}`}>

       { !isAuthenticated && <li className={style.nav__item}>
          <NavLink to="/" className={getLinkClass} end onClick={toggleMenu}>
            Inicio
          </NavLink>
        </li>}

        { !isAuthenticated && <li className={style.nav__item}>
          <NavLink to="/eventos" className={getLinkClass} onClick={toggleMenu}>
            Eventos
          </NavLink>
        </li>}

        <li className={style.nav__item}>
          <NavLink to="/tienda" className={getLinkClass} onClick={toggleMenu}>
            Tienda
          </NavLink>
        </li>

        { !isAuthenticated && <li className={style.nav__item}>
          <NavLink to="/galeria" className={getLinkClass} onClick={toggleMenu}>
            Galería
          </NavLink>
        </li>}

        { !isAuthenticated && <li className={style.nav__item}>
          <NavLink to="/nosotros" className={getLinkClass} onClick={toggleMenu}>
            Nosotros
          </NavLink>
        </li>}

        { !isAuthenticated && <li className={style.nav__item}>
          <NavLink to="/contacto" className={getLinkClass} onClick={toggleMenu}>
            Contacto
          </NavLink>
        </li>}

        { isAuthenticated && <li className={style.nav__item}>
          <NavLink to="/products/create" className={getLinkClass} onClick={toggleMenu}>
            Crear producto
          </NavLink>
        </li>}

        {/* Botones login */}
        { !isAuthenticated && <li>
          <Button as={Link} to="/registro" variant="primary" onClick={toggleMenu}>
            Registrarme
          </Button>
        </li>}

        { !isAuthenticated && <li>
          <Button as={Link} to="/login" variant="secondary" onClick={toggleMenu}>
            Iniciar sesión
          </Button>
        </li>}

        { isAuthenticated && <li>
          <Button onClick={() => { logout(); toggleMenu(); }} variant="primary">
            Cerrar sesion
          </Button>
        </li>}
      </ul>
    </nav>
  );
}

export default HeaderNav;

