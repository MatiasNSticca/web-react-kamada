import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Button from "../../components/ui/Button/Button";
import style from "./LoginUserPage.module.css";
import Input from "../../components/ui/Inputs/Input";
import useAuth from "../../hooks/users/useAuth";

function LoginUserPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  const from = location.state?.from?.pathname || "/";

  const initialForm = {
    email: "",
    password: "",
  };

  const [form, setForm] = useState(initialForm);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const result = await login(form.email, form.password);

    setLoading(false);

    if (result.success) {
      const destination = result.user?.role === "master_admin" || result.user?.role === "admin_medio" 
        ? "/admin/productos" 
        : from;
      navigate(destination, { replace: true });
    } else {
      setError(result.error);
    }
  };

  const handleInputChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className={style.login__container}>
      <div className={style.login__header}>
        <h2 className={style.login__title}>Inicio de sesión</h2>
        <p className={style.login__subtitle}>Inicia sesión en Kamada</p>
      </div>

      <form className={style.login__form} onSubmit={handleFormSubmit}>
        <div className={style.form__content}>
          <Input
            label="Correo"
            LabelId="email"
            name="email"
            type="email"
            onChange={handleInputChange}
            value={form.email}
            isRequired={true}
            placeholder="Tu correo"
          />

          <Input
            label="Contraseña"
            LabelId="password"
            name="password"
            type="password"
            onChange={handleInputChange}
            value={form.password}
            isRequired={true}
            placeholder="Tu contraseña"
          />
        </div>

        {error && <p style={{ color: 'red' }}>{error}</p>}

        <Button type="submit" variant="primary" disabled={loading}>
          {loading ? "Iniciando..." : "Iniciar sesión"}
        </Button>
      </form>

      <Button as={Link} to="/" variant="secondary">
        Volver al inicio
      </Button>
    </div>
  );
}

export default LoginUserPage;
