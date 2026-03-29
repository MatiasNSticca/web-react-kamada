# Kamada E-commerce

E-commerce para la banda de rock Kamada. Proyecto final de la carrera de Desarrollo Web.

## 🚀 Características

- **Autenticación**: Sistema de login/registro con JWT
- **Roles de usuario**: Master Admin, Admin Medio, Comprador
- **Gestión de productos**: CRUD completo de productos y categorías
- **Gestión de eventos**: CRUD de recitales
- **Carrito de compras**: Carrito de compras con persistencia
- **Gestión de usuarios**: Panel de administración de usuarios (solo Master Admin)

## 🛠️ Tecnologías

### Frontend
- React 19
- React Router DOM 7
- Vite
- CSS Modules

### Backend
- Node.js
- Express
- MongoDB (Mongoose)
- JWT (JSON Web Tokens)
- bcryptjs (encriptación de contraseñas)

## 📁 Estructura del Proyecto

```
kamada-react/
├── backend/                 # Servidor API REST
│   ├── index.js            # Entry point
│   ├── .env               # Variables de entorno
│   ├── package.json       # Dependencias backend
│   └── src/
│       ├── config/         # Configuración DB
│       ├── models/         # Modelos Mongoose
│       ├── services/       # Lógica de negocio
│       ├── controllers/    # Controladores HTTP
│       ├── routes/         # Rutas API
│       ├── middleware/     # JWT middleware
│       └── scripts/        # Scripts utilitarios
│
└── frontend/               # Aplicación React
    ├── src/
    │   ├── components/     # Componentes React
    │   ├── pages/          # Páginas
    │   ├── hooks/          # Custom hooks
    │   ├── config.js       # Configuración API
    │   └── router.jsx      # Rutas React
    ├── package.json       # Dependencias frontend
    └── vite.config.js     # Configuración Vite
```

## ⚡ Instalación y Ejecución

### Requisitos
- Node.js 18+
- MongoDB (local o Atlas)

### Paso 1: Instalar dependencias

```bash
# Frontend
cd frontend
npm install

# Backend
cd ../backend
npm install
```

### Paso 2: Configurar MongoDB

Edita el archivo `backend/.env` con tu URI de MongoDB:

```env
PORT=3001
MONGODB_URI=mongodb://localhost:27017/kamada_ecommerce
JWT_SECRET=tu_secreto_aqui
FRONTEND_URL=http://localhost:5173
```

### Paso 3: Crear usuario master admin

```bash
cd backend
npm run create-master
```

### Paso 4: Ejecutar el proyecto

```bash
# Terminal 1 - Backend
cd backend
npm run dev

# Terminal 2 - Frontend
cd frontend
npm run dev
```

## 🔑 Credenciales por defecto

| Rol | Email | Contraseña |
|-----|-------|------------|
| Master Admin | admin@kamada.com | admin123 |

## 📡 Endpoints API

### Autenticación
| Método | Endpoint | Descripción |
|--------|----------|-------------|
| POST | `/api/auth/register` | Registrar usuario |
| POST | `/api/auth/login` | Iniciar sesión |
| GET | `/api/auth/me` | Obtener usuario actual |

### Productos
| Método | Endpoint | Descripción | Auth |
|--------|----------|-------------|------|
| GET | `/api/products` | Listar productos | ❌ |
| GET | `/api/products/:id` | Ver producto | ❌ |
| POST | `/api/products` | Crear producto | ✅ Admin |
| PUT | `/api/products/:id` | Editar producto | ✅ Admin |
| DELETE | `/api/products/:id` | Eliminar producto | ✅ Admin |

### Categorías
| Método | Endpoint | Descripción | Auth |
|--------|----------|-------------|------|
| GET | `/api/categories` | Listar categorías | ❌ |
| POST | `/api/categories` | Crear categoría | ✅ Master |

### Usuarios
| Método | Endpoint | Descripción | Auth |
|--------|----------|-------------|------|
| GET | `/api/users` | Listar usuarios | ✅ Admin |
| GET | `/api/users/:id` | Ver usuario | ✅ |
| PUT | `/api/users/:id` | Editar usuario | ✅ |
| DELETE | `/api/users/:id` | Eliminar usuario | ✅ Master |
| PUT | `/api/users/:id/role` | Cambiar rol | ✅ Master |
| PUT | `/api/users/me/update` | Actualizar mi perfil | ✅ |

### Eventos
| Método | Endpoint | Descripción | Auth |
|--------|----------|-------------|------|
| GET | `/api/events` | Listar eventos | ❌ |
| POST | `/api/events` | Crear evento | ✅ Admin |
| PUT | `/api/events/:id` | Editar evento | ✅ Admin |
| DELETE | `/api/events/:id` | Eliminar evento | ✅ Admin |

## 🎨 Roles y Permisos

### Master Admin
- Acceso total al sistema
- Puede crear/editar/eliminar admins medios
- Gestionar todos los usuarios

### Admin Medio
- CRUD de productos y eventos
- Ver y editar usuarios (no admins)
- No puede eliminar usuarios ni crear otros admins

### Comprador
- Navegar por la tienda
- Agregar productos al carrito
- Finalizar compras
- Editar su propio perfil
