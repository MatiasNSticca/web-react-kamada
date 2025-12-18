import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../../components/ui/Button/Button";
import style from "./LoginUserPage.module.css";
import Input from "../../components/ui/Inputs/Input";
import useAuth from "../../hooks/users/useAuth";
import useLogin from "../../hooks/users/useLogin";

function LoginUserPage() {
  const navigate = useNavigate();

  // autentica y guardar sesion
  const { login: loginUser } = useAuth();
  // llama al Back aseguradno las credenciales correctas
  const { login, error } = useLogin();

  const initialForm = {
    email: "",
    password: "",
  };

  const [form, setForm] = useState(initialForm);

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    // manda al back las credenciales, si responde con un usuario es valido
    const user = await login(form.email, form.password);

    if (user) {
      // si el user es valido guardamos en sessionStorage
      loginUser(user);
      alert("Login!")
      navigate("/users");
    }
  };

  const handleInputChange = (e) => {
    // esta logica permite mantener intactos los estados que no modificamos
    // del estado que modificamos obtenemos el name y value y esto setea el estado form
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
    console.log({name: e.target.name, value: e.target.value})
  };

  return (
    <div className={style.login__container}>
      <div className={style.login__header}>
        <h2 className={style.login__title}>Inicio de sesion</h2>
        <p className={style.login__subtitle}>Inicia sesion en Kamada</p>
      </div>

      <form className={style.login__form} onSubmit={handleFormSubmit}>
        <div className={style.form__content}>
          <Input
            label="Correo"
            LabelId="email"
            type="email"
            onChange={handleInputChange}
            value={form.email}
            isRequired={true}
            placeholder="Tu correo"
          />

          <Input
            label="Contraseña"
            LabelId="password"
            type="password"
            onChange={handleInputChange}
            value={form.password}
            isRequired={true}
            placeholder="Tu contraseña"
          />
        </div>

        {/* error puede ser null (falsy). si hay error lo muestra en el formulario */}
        {error && <p> {error.message || error} </p>}

        <Button type="submit" variant="primary">
          Iniciar sesion
        </Button>
      </form>

      <Button as={Link} to="/" variant="secondary">
        Volver al inicio
      </Button>
    </div>
  );
}

export default LoginUserPage;
