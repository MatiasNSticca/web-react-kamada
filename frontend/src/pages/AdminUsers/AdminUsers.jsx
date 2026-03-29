import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import style from "./AdminUsers.module.css";
import Button from "../../components/ui/Button/Button";
import HeaderNav from "../../components/layout/Header/HeaderNav";
import useAuth from "../../hooks/users/useAuth";
import useGetUsers from "../../hooks/users/useGetUsers";
import useDeleteUser from "../../hooks/users/useDeleteUser";
import useUpdateUser from "../../hooks/users/useUpdateUser";
import useRegisterUser from "../../hooks/users/useRegisterUser";
import Input from "../../components/ui/Inputs/Input";

function AdminUsers() {
  const { user, isAuthenticated, isAdmin } = useAuth();
  const { getUsers, loading: loadingUsers } = useGetUsers();
  const { deleteUser } = useDeleteUser();
  const { updateUser } = useUpdateUser();
  const { registerUser } = useRegisterUser();
  
  const [isOpen, setIsOpen] = useState(false);
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [isCreating, setIsCreating] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "user",
  });

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    const usersData = await getUsers();
    setUsers(usersData);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleCreateUser = async (e) => {
    e.preventDefault();
    const newUser = await registerUser(form);
    if (newUser) {
      alert("Usuario creado exitosamente");
      setIsCreating(false);
      setForm({ name: "", email: "", password: "", role: "user" });
      loadUsers();
    }
  };

  const handleEditUser = async (e) => {
    e.preventDefault();
    const updatedUser = await updateUser(editingUser.id, {
      name: form.name,
      email: form.email,
      role: form.role,
      password: form.password || undefined,
    });
    if (updatedUser) {
      alert("Usuario actualizado exitosamente");
      setEditingUser(null);
      setForm({ name: "", email: "", password: "", role: "user" });
      loadUsers();
    }
  };

  const handleDeleteUser = async (userId) => {
    if (window.confirm("¿Estás seguro de que deseas eliminar este usuario?")) {
      const success = await deleteUser(userId);
      if (success) {
        alert("Usuario eliminado exitosamente");
        loadUsers();
      }
    }
  };

  const startEdit = (user) => {
    setEditingUser(user);
    setForm({
      name: user.name || "",
      email: user.email || "",
      password: "",
      role: user.role || "user",
    });
    setIsCreating(false);
  };

  if (!isAuthenticated) {
    return <h1 className={style.header}>No hay usuario registrado</h1>;
  }

  if (!isAdmin) {
    return <h1 className={style.header}>Acceso denegado</h1>;
  }

  return (
    <>
      <HeaderNav isOpen={isOpen} toggleMenu={() => setIsOpen(!isOpen)} />
      <div className={style.admin}>
        <div className={style.admin__container}>
          <div className={style.admin__header}>
            <h2 className={style.admin__title}>Gestión de Usuarios</h2>
            <Button 
              variant="primary" 
              onClick={() => {
                setIsCreating(true);
                setEditingUser(null);
                setForm({ name: "", email: "", password: "", role: "user" });
              }}
            >
              Crear usuario
            </Button>
          </div>

          {(isCreating || editingUser) && (
            <div className={style.form__container}>
              <h3>{isCreating ? "Crear nuevo usuario" : "Editar usuario"}</h3>
              <form 
                className={style.admin__form} 
                onSubmit={isCreating ? handleCreateUser : handleEditUser}
              >
                <Input
                  label="Nombre"
                  LabelId="name"
                  type="text"
                  onChange={handleInputChange}
                  value={form.name}
                  isRequired={true}
                  placeholder="Nombre del usuario"
                />
                <Input
                  label="Correo"
                  LabelId="email"
                  type="email"
                  onChange={handleInputChange}
                  value={form.email}
                  isRequired={true}
                  placeholder="Correo del usuario"
                />
                <Input
                  label={isCreating ? "Contraseña" : "Nueva Contraseña (opcional)"}
                  LabelId="password"
                  type="password"
                  onChange={handleInputChange}
                  value={form.password}
                  isRequired={isCreating}
                  placeholder={isCreating ? "Contraseña" : "Nueva contraseña"}
                />
                <div className={style.input__select}>
                  <label htmlFor="role">Rol</label>
                  <select
                    name="role"
                    value={form.role}
                    id="role"
                    onChange={handleInputChange}
                  >
                    <option value="user">Usuario</option>
                    <option value="admin">Administrador</option>
                  </select>
                </div>
                <div className={style.form__buttons}>
                  <Button type="submit" variant="primary">
                    {isCreating ? "Crear" : "Guardar cambios"}
                  </Button>
                  <Button 
                    type="button" 
                    variant="secondary"
                    onClick={() => {
                      setIsCreating(false);
                      setEditingUser(null);
                    }}
                  >
                    Cancelar
                  </Button>
                </div>
              </form>
            </div>
          )}

          <div className={style.users__table}>
            {loadingUsers ? (
              <p>Cargando...</p>
            ) : (
              <table>
                <thead>
                  <tr>
                    <th>Nombre</th>
                    <th>Correo</th>
                    <th>Rol</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((u) => (
                    <tr key={u.id}>
                      <td>{u.name}</td>
                      <td>{u.email}</td>
                      <td>
                        <span className={`${style.role__badge} ${u.role === 'admin' ? style.role__admin : style.role__user}`}>
                          {u.role === 'admin' ? 'Admin' : 'Usuario'}
                        </span>
                      </td>
                      <td>
                        <div className={style.action__buttons}>
                          <Button 
                            variant="secondary" 
                            onClick={() => startEdit(u)}
                            disabled={u.id === user.id}
                          >
                            Editar
                          </Button>
                          <Button 
                            variant="primary" 
                            onClick={() => handleDeleteUser(u.id)}
                            disabled={u.id === user.id}
                          >
                            Eliminar
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default AdminUsers;
