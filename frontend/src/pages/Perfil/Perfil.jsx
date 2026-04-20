import { useState } from "react";
import useAuth from "../../hooks/users/useAuth";
import Input from "../../components/ui/Inputs/Input";
import Button from "../../components/ui/Button/Button";
import style from "../Perfil/Perfil.module.css";

function Perfil() {
  const { user, updateProfile } = useAuth();
  const [form, setForm] = useState({
    username: user?.username || "",
    email: user?.email || "",
    nombre: user?.datosPersonales?.nombre || "",
    apellido: user?.datosPersonales?.apellido || "",
    telefono: user?.datosPersonales?.telefono || "",
    currentPassword: "",
    newPassword: "",
  });
  const [message, setMessage] = useState({ type: "", text: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage({ type: "", text: "" });

    const updateData = {
      username: form.username,
      email: form.email,
      datosPersonales: {
        nombre: form.nombre,
        apellido: form.apellido,
        telefono: form.telefono,
      },
    };

    if (form.newPassword) {
      updateData.password = form.newPassword;
      updateData.currentPassword = form.currentPassword;
    }

    const result = await updateProfile(updateData);

    if (result.success) {
      setMessage({ type: "success", text: "Perfil actualizado correctamente" });
      setForm((prev) => ({ ...prev, currentPassword: "", newPassword: "" }));
    } else {
      setMessage({ type: "error", text: result.error });
    }
  };

  const getRoleLabel = (role) => {
    const roles = {
      master_admin: "Administrador Master",
      admin_medio: "Administrador",
      comprador: "Comprador",
    };
    return roles[role] || role;
  };

  return (
    <div className={style.perfil}>
      <div className={style.perfil__container}>
        <h2 className={style.title}>Mi Perfil</h2>
        <div className={style.perfil__header}>
          <p>
            <strong>Rol:</strong> {getRoleLabel(user?.role)}
          </p>
          <p>
            <strong>Email:</strong> {user?.email}
          </p>
          <p>
            <strong>Usuario:</strong> {user?.username}
          </p>
        </div>
      </div>

      {message.text && (
        <div className={`${style.message} ${style[message.type]}`}>
          {message.text}
        </div>
      )}

      <form className={style.formulario__content} onSubmit={handleSubmit}>
        <div className="container">
          <h3 className={style.perfil__subtitle}>Datos de cuenta</h3>
          <div className={style.formulario__field}>
            <label htmlFor="nombre">Nombre</label>
            <input
              label="Usuario"
              LabelId="username"
              type="text"
              name="username"
              placeholder="Tu nombre"
              required
              value={form.username}
              onChange={handleChange}
            />
          </div>

          <div className={style.formulario__field}>
            <label htmlFor="correo">Correo</label>
            <input
              label="Email"
              LabelId="email"
              type="email"
              name="email"
              placeholder="Tu correo"
              required
              value={form.email}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="container">
          <h3 className={style.perfil__subtitle}>Informacion personal</h3>
          <div className={style.formulario__field}>
            <label htmlFor="nombre">Nombre</label>
            <input
              label="Nombre"
              LabelId="nombre"
              type="text"
              id="nombre"
              name="nombre"
              placeholder="Tu nombre"
              required
              value={form.nombre}
              onChange={handleChange}
            />
          </div>

          <div className={style.formulario__field}>
            <label htmlFor="correo">Apellido</label>
            <input
              label="Apellido"
              LabelId="apellido"
              type="text"
              id="apellido"
              name="apellido"
              placeholder="Tu apellido"
              required
              value={form.apellido}
              onChange={handleChange}
            />
          </div>

          <div className={style.formulario__field}>
            <label htmlFor="telefono">Teléfono</label>
            <input
              label="Teléfono"
              LabelId="telefono"
              type="tel"
              id="telefono"
              name="telefono"
              placeholder="Tu teléfono"
              required
              value={form.telefono}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="container">
          <h3 className={style.perfil__subtitle}>Restablecer contraseña</h3>
          <div className={style.formulario__field}>
            <label htmlFor="nombre">Contraseña actual</label>
            <input
              type="text"
              id="nombre"
              name="nombre"
              placeholder="Tu contraseña"
              required
              onChange={handleChange}
            />
          </div>

          <div className={style.formulario__field}>
            <label htmlFor="correo">Nueva contraseña</label>
            <input
              label="Nueva Contraseña"
              LabelId="newPassword"
              type="password"
              name="newPassword"
              value={form.newPassword}
              onChange={handleChange}
              placeholder="Mínimo 6 caracteres"
            />
          </div>
        </div>
        <Button type="submit" variant="primary">
          Enviar
        </Button>
      </form>
    </div>
  );
}

export default Perfil;
