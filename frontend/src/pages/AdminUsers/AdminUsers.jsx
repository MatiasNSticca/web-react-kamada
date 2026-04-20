import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import style from "./AdminUsers.module.css";
import Button from "../../components/ui/Button/Button";
import useAuth from "../../hooks/users/useAuth";
import useGetUsers from "../../hooks/users/useGetUsers";
import useDeleteUser from "../../hooks/users/useDeleteUser";
import useUpdateUser from "../../hooks/users/useUpdateUser";
import Input from "../../components/ui/Inputs/Input";

function AdminUsers() {
  const { user: currentUser, isAuthenticated, isMaster } = useAuth();
  const { getUsers, loading: loadingUsers } = useGetUsers();
  const { deleteUser } = useDeleteUser();
  const { updateUser } = useUpdateUser();
  
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [isCreating, setIsCreating] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    role: "comprador",
  });

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    const usersData = await getUsers();
    setUsers(usersData || []);
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
    const token = localStorage.getItem("auth_token");
    
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:3001/api'}/users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(form)
      });

      const data = await response.json();

      if (response.ok) {
        setSuccessMessage("Usuario creado exitosamente!");
        setIsCreating(false);
        setForm({ username: "", email: "", password: "", role: "comprador" });
        loadUsers();
        setTimeout(() => setSuccessMessage(""), 3000);
      } else {
        alert(data.message || "Error al crear usuario");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error al crear usuario");
    }
  };

  const handleEditUser = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("auth_token");
    
    const updateData = {
      username: form.username,
      email: form.email,
      role: form.role,
    };
    
    if (form.password) {
      updateData.password = form.password;
    }

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:3001/api'}/users/${editingUser._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(updateData)
      });

      const data = await response.json();

      if (response.ok) {
        setSuccessMessage("Usuario actualizado exitosamente!");
        setEditingUser(null);
        setForm({ username: "", email: "", password: "", role: "comprador" });
        loadUsers();
        setTimeout(() => setSuccessMessage(""), 3000);
      } else {
        alert(data.message || "Error al actualizar usuario");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error al actualizar usuario");
    }
  };

  const handleDeleteUser = async (userId) => {
    if (window.confirm("¿Estás seguro de que deseas eliminar este usuario?")) {
      const success = await deleteUser(userId);
      if (success) {
        setSuccessMessage("Usuario eliminado exitosamente!");
        loadUsers();
        setTimeout(() => setSuccessMessage(""), 3000);
      }
    }
  };

  const startEdit = (user) => {
    setEditingUser(user);
    setForm({
      username: user.username || "",
      email: user.email || "",
      password: "",
      role: user.role || "comprador",
    });
    setIsCreating(false);
  };

  const getRoleLabel = (role) => {
    const labels = {
      master_admin: "Master Admin",
      admin_medio: "Admin",
      comprador: "Comprador"
    };
    return labels[role] || role;
  };

  if (!isAuthenticated) {
    return <h1 className={style.adminUsers__header}>No hay usuario registrado</h1>;
  }

  if (!isMaster) {
    return <h1 className={style.adminUsers__header}>Acceso denegado</h1>;
  }

  return (
    <section className={style.adminUsers}>
      <div className={style.adminUsers__container}>
        <div className={style.adminUsers__headerTitle}>
          <h2 className={style.adminUsers__title}>Gestión de Usuarios</h2>
          <Button 
            variant="primary" 
            onClick={() => {
              setIsCreating(true);
              setEditingUser(null);
              setForm({ username: "", email: "", password: "", role: "comprador" });
            }}
          >
            Crear usuario
          </Button>
        </div>

        {successMessage && (
          <div className={style.adminUsers__success}>
            {successMessage}
          </div>
        )}

        {(isCreating || editingUser) && (
          <div className={style.adminUsers__formContainer}>
            <h3>{isCreating ? "Crear nuevo usuario" : "Editar usuario"}</h3>
            <form 
              className={style.adminUsers__form} 
              onSubmit={isCreating ? handleCreateUser : handleEditUser}
            >
              <Input
                label="Usuario"
                LabelId="username"
                name="username"
                type="text"
                onChange={handleInputChange}
                value={form.username}
                isRequired={true}
                placeholder="Nombre de usuario"
              />
              <Input
                label="Correo"
                LabelId="email"
                name="email"
                type="email"
                onChange={handleInputChange}
                value={form.email}
                isRequired={true}
                placeholder="Correo del usuario"
              />
              <Input
                label={isCreating ? "Contraseña" : "Nueva Contraseña (opcional)"}
                LabelId="password"
                name="password"
                type="password"
                onChange={handleInputChange}
                value={form.password}
                isRequired={isCreating}
                placeholder={isCreating ? "Contraseña" : "Nueva contraseña"}
              />
              <div className={style.adminUsers__select}>
                <label htmlFor="role">Rol</label>
                <select
                  name="role"
                  value={form.role}
                  id="role"
                  onChange={handleInputChange}
                >
                  <option value="comprador">Comprador</option>
                  <option value="admin_medio">Administrador</option>
                </select>
              </div>
              <div className={style.adminUsers__buttons}>
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

        <div className={style.adminUsers__table}>
          {loadingUsers ? (
            <p>Cargando...</p>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>Usuario</th>
                  <th>Correo</th>
                  <th>Rol</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {users.map((u) => (
                  <tr key={u._id}>
                    <td>{u.username}</td>
                    <td>{u.email}</td>
                    <td>
                      <span className={`${style.adminUsers__roleBadge} ${u.role === 'master_admin' || u.role === 'admin_medio' ? style.adminUsers__roleAdmin : style.adminUsers__roleUser}`}>
                        {getRoleLabel(u.role)}
                      </span>
                    </td>
                    <td>
                      <div className={style.adminUsers__actions}>
                        <Button 
                          variant="secondary" 
                          onClick={() => startEdit(u)}
                          disabled={u._id === currentUser._id || u.role === 'master_admin'}
                        >
                        Editar
                        </Button>
                        <Button 
                          variant="primary" 
                          onClick={() => handleDeleteUser(u._id)}
                          disabled={u._id === currentUser._id || u.role === 'master_admin'}
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
    </section>
  );
}

export default AdminUsers;
