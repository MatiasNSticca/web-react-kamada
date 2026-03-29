import { useState } from "react";
import useAuth from "../../hooks/users/useAuth";
import Input from "../../components/ui/Inputs/Input";
import Button from "../../components/ui/Button/Button";
import style from "../Users/User.module.css";

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
    <div className={style.container}>
      <h2 className={style.title}>Mi Perfil</h2>
      
      <div className={style.userInfo}>
        <p><strong>Rol:</strong> {getRoleLabel(user?.role)}</p>
        <p><strong>Email:</strong> {user?.email}</p>
        <p><strong>Usuario:</strong> {user?.username}</p>
      </div>

      {message.text && (
        <div className={`${style.message} ${style[message.type]}`}>
          {message.text}
        </div>
      )}

      <form onSubmit={handleSubmit} className={style.form}>
        <h3 className={style.subtitle}>Datos de Cuenta</h3>
        
        <Input
          label="Usuario"
          LabelId="username"
          type="text"
          name="username"
          value={form.username}
          onChange={handleChange}
          isRequired={true}
        />

        <Input
          label="Email"
          LabelId="email"
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          isRequired={true}
        />

        <h3 className={style.subtitle}>Datos Personales</h3>

        <Input
          label="Nombre"
          LabelId="nombre"
          type="text"
          name="nombre"
          value={form.nombre}
          onChange={handleChange}
        />

        <Input
          label="Apellido"
          LabelId="apellido"
          type="text"
          name="apellido"
          value={form.apellido}
          onChange={handleChange}
        />

        <Input
          label="Teléfono"
          LabelId="telefono"
          type="tel"
          name="telefono"
          value={form.telefono}
          onChange={handleChange}
        />

        <h3 className={style.subtitle}>Cambiar Contraseña (opcional)</h3>

        <Input
          label="Contraseña Actual"
          LabelId="currentPassword"
          type="password"
          name="currentPassword"
          value={form.currentPassword}
          onChange={handleChange}
        />

        <Input
          label="Nueva Contraseña"
          LabelId="newPassword"
          type="password"
          name="newPassword"
          value={form.newPassword}
          onChange={handleChange}
          placeholder="Mínimo 6 caracteres"
        />

        <Button type="submit" variant="primary">
          Guardar Cambios
        </Button>
      </form>
    </div>
  );
}

export default Perfil;
