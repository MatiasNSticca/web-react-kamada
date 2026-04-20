import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import style from "./RegisterUserPage.module.css";
import Input from "../../components/ui/Inputs/Input";
import Button from "../../components/ui/Button/Button";
import useAuth from "../../hooks/users/useAuth";

function RegisterUserPage() {
  const { register } = useAuth();
  const navigate = useNavigate();

  const initialForm = {
    username: "",
    email: "",
    password: "",
    datosPersonales: {
      nombre: "",
      apellido: "",
    }
  };

  const [form, setForm] = useState(initialForm);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const result = await register(form);

    setLoading(false);

    if (result.success) {
      navigate("/");
    } else {
      setError(result.error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    if (name === "nombre" || name === "apellido") {
      setForm(prev => ({
        ...prev,
        datosPersonales: {
          ...prev.datosPersonales,
          [name]: value
        }
      }));
    } else {
      setForm(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  return (
    <div className={style.registro__container}>
      <div className={style.registro__header}>
        <h2 className={style.registro__title}>Registrarme</h2>
        <p className={style.registro__subtitle}>
          Regístrate en Kamada
        </p>
      </div>

      <form className={style.registro__form} onSubmit={handleFormSubmit}>
        <div className={style.form__content}>
          <Input
            label="Usuario"
            LabelId="username"
            name="username"
            type="text"
            onChange={handleInputChange}
            value={form.username}
            isRequired={true}
            placeholder="Tu nombre de usuario"
          />

          <Input
            label="Nombre"
            LabelId="nombre"
            name="nombre"
            type="text"
            onChange={handleInputChange}
            value={form.datosPersonales.nombre}
            isRequired={true}
            placeholder="Tu nombre"
          />

          <Input
            label="Apellido"
            LabelId="apellido"
            name="apellido"
            type="text"
            onChange={handleInputChange}
            value={form.datosPersonales.apellido}
            placeholder="Tu apellido"
          />

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
            placeholder="Tu contraseña (mínimo 6 caracteres)"
          />
        </div>

        {error && <p className={style.registro__error}>{error}</p>}

        <Button type="submit" variant="primary" disabled={loading}>
          {loading ? "Registrando..." : "Registrarme"}
        </Button>
      </form>

      <Button as={Link} to="/" variant="secondary">
        Volver al inicio
      </Button>
    </div>
  );
}

export default RegisterUserPage;
