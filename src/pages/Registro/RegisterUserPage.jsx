import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import style from ".//RegisterUserPage.module.css";
import Input from "../../components/ui/Inputs/Input";
import Button from "../../components/ui/Button/Button";
import useRegiterUser from "../../hooks/users/useRegisterUser";
import useAuth from "../../hooks/users/useAuth";

function RegisterUserPage() {

  const { error, registerUser } = useRegiterUser();
  const { login } = useAuth()

  const navigate = useNavigate();

  const initialForm = {
    name: "",
    email: "",
    password: "",
  };

  const [form, setForm] = useState(initialForm);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    console.log(e.target.value);
    const success = await registerUser(form);
    if(success) {
      login(success)
      alert("Usuario creado")
      navigate("/users");
    }
  };

  const handleInputChange = (e) => {
    // esta logica permite mantener intactos los estados que no modificamos
    // del estado que modificamos obtenemos el name y value y esto setea el estado form
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }

  return (
    <div className={style.registro__container}>
      <div className={style.registro__header}>
        <h2 className={style.registro__title}>Registrarme</h2>
        <p className={style.registro__subtitle}>
          Registrate en Kamada
        </p>
      </div>

      <form className={style.registro__form} onSubmit={handleFormSubmit}>
        <div className={style.form__content}>
          <Input
            label="Nombre"
            LabelId="name"
            type="text"
            onChange={handleInputChange}
            value={form.name}
            isRequired={true}
            placeholder="Tu nombre"
          />

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
          Registarme
        </Button>
      </form>

      <Button as={Link} to="/" variant="secondary">
        Volver al inicio
      </Button>
    </div>
  );
}

export default RegisterUserPage;
