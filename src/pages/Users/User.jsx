import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import style from "./User.module.css";
import Button from "../../components/ui/Button/Button";
import HeaderNav from "../../components/layout/Header/HeaderNav";


function User() {
  const [user, setUser] = useState(null);

  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      try {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setUser(JSON.parse(userData));
      } catch (error) {
        console.error("Error parsing user data:", error);
        localStorage.removeItem("user");
      }
    }
  }, []);

  if (!user) {
    return <h1 className={style.header}>No hay usuario registrado</h1>;
  }

  return (
    <>

      <div className={style.user}>
      <HeaderNav isOpen={isOpen} toggleMenu={() => setIsOpen(!isOpen)} />
        <div className={style.user__container}>
          <div className={style.user__header}>
            <h2 className={style.user__title}>¡Bienvenido a Kamada!</h2>
            <p className={style.user__subtitle}>Usuario: {user.name}</p>
            <p className={style.user__subtitle}>Correo: {user.email}</p>
          </div>
          <div className={style.user__btn}>
            <Button as={Link} to="/products/create" variant="primary">
              Crear producto
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}

export default User;
