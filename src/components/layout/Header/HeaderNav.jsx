import React from "react";
import { Link, NavLink } from "react-router-dom"
import style from "./HeaderNav.module.css"
import Button from "../../ui/Button/Button"

function HeaderNav({ isOpen, toggleMenu }) {
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

        {/* Botones login */}
        <li>
          <Button as={Link} to="/registro" variant="primary" onClick={toggleMenu}>
            Registrarme
          </Button>
        </li>

        <li>
          <Button as={Link} to="/inicio-sesion" variant="secondary" onClick={toggleMenu}>
            Iniciar sesión
          </Button>
        </li>
      </ul>
    </nav>
  );
}

export default HeaderNav;

