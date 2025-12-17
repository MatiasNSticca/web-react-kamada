import React, { useState, useEffect } from 'react'
import style from "./User.module.css"

function User() {
  const [user, setUser] = useState(null);

  useEffect(() => {
  const userData = localStorage.getItem('user');
  if (userData) {
    try {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setUser(JSON.parse(userData));
    } catch (error) {
      console.error('Error parsing user data:', error);
      // Opcional: limpiar localStorage si está corrupto
      localStorage.removeItem('user');
    }
  }
}, []);

  if (!user) {
    return <h1 className={style.header}>No hay usuario registrado</h1>;
  }

  return (
    <div className={style.user__container}>
      <h1 className={style.header}>Hola {user.name}</h1>
      <p>Email: {user.email}</p>
      {/* Agrega más campos si es necesario */}
    </div>
  )
}

export default User