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

## 📊 Esquema de la Base de Datos

### Productos (Products)
| Campo | Tipo | Requerido | Descripción |
|-------|------|-----------|-------------|
| `_id` | ObjectId | Sí | ID único del documento |
| `name` | String | Sí | Nombre del producto (máx 100 caracteres) |
| `description` | String | Sí | Descripción del producto (máx 500 caracteres) |
| `price` | Number | Sí | Precio del producto (min 0) |
| `image` | String | Sí | URL de la imagen del producto |
| `category` | ObjectId | Sí | Referencia a Category |
| `stock` | Number | Sí | Cantidad en stock (default 0) |
| `available` | Boolean | No | Si el producto está disponible (default true) |
| `sku` | String | No | Código SKU único |
| `createdAt` | Date | Sí | Fecha de creación |
| `updatedAt` | Date | Sí | Fecha de última modificación |

### Categorías (Categories)
| Campo | Tipo | Requerido | Descripción |
|-------|------|-----------|-------------|
| `_id` | ObjectId | Sí | ID único del documento |
| `name` | String | Sí | Nombre de la categoría (máx 50 caracteres, único) |
| `description` | String | No | Descripción de la categoría (máx 200 caracteres) |
| `image` | String | No | URL de imagen de la categoría |
| `active` | Boolean | No | Si la categoría está activa (default true) |
| `createdAt` | Date | Sí | Fecha de creación |
| `updatedAt` | Date | Sí | Fecha de última modificación |

### Usuarios (Users)
| Campo | Tipo | Requerido | Descripción |
|-------|------|-----------|-------------|
| `_id` | ObjectId | Sí | ID único del documento |
| `username` | String | Sí | Nombre de usuario único (máx 50 caracteres) |
| `email` | String | Sí | Email único (se guarda en minúsculas) |
| `password` | String | Sí | Contraseña hasheada con bcrypt (mín 6 caracteres) |
| `role` | String | No | Rol del usuario: `master_admin`, `admin_medio`, `comprador` (default: comprador) |
| `permisos` | Array | No | Array de strings con permisos granulares |
| `datosPersonales` | Object | No | Objeto con: nombre, apellido, telefono, direccion |
| `activo` | Boolean | No | Si el usuario está activo (default true) |
| `createdAt` | Date | Sí | Fecha de creación |
| `updatedAt` | Date | Sí | Fecha de última modificación |

### Eventos (Events)
| Campo | Tipo | Requerido | Descripción |
|-------|------|-----------|-------------|
| `_id` | ObjectId | Sí | ID único del documento |
| `title` | String | Sí | Título del evento (máx 100 caracteres) |
| `description` | String | Sí | Descripción del evento (máx 500 caracteres) |
| `date` | Date | Sí | Fecha del evento |
| `location` | String | Sí | Ubicación del evento |
| `venue` | String | No | Lugar específico |
| `image` | String | No | URL de imagen del evento |
| `price` | Number | No | Precio de la entrada (min 0) |
| `ticketsAvailable` | Number | No | Cantidad de entradas disponibles |
| `category` | String | No | Categoría: recital, festival, meetup, otro |
| `active` | Boolean | No | Si el evento está activo (default true) |
| `createdAt` | Date | Sí | Fecha de creación |
| `updatedAt` | Date | Sí | Fecha de última modificación |

## 📝 Ejemplos de Solicitudes POST

### Crear Producto
```bash
POST /api/products
Content-Type: application/json
Authorization: Bearer <token_jwt>

{
  "name": "Remera Oficial Kamada",
  "description": "Remera negra con logo bordado de la banda",
  "price": 15000,
  "image": "https://ejemplo.com/images/remera.jpg",
  "category": "64f1a2b3c9e8a10000000001",
  "stock": 50
}
```

### Crear Categoría
```bash
POST /api/categories
Content-Type: application/json
Authorization: Bearer <token_jwt>

{
  "name": "Merchandising",
  "description": "Productos de la banda",
  "image": "https://ejemplo.com/images/cat-merch.jpg"
}
```

### Registrar Usuario
```bash
POST /api/auth/register
Content-Type: application/json

{
  "username": "nuevo_usuario",
  "email": "usuario@ejemplo.com",
  "password": "password123",
  "datosPersonales": {
    "nombre": "Juan",
    "apellido": "Pérez",
    "telefono": "+5491112345678"
  }
}
```

### Iniciar Sesión (Login)
```bash
POST /api/auth/login
Content-Type: application/json

{
  "email": "admin@kamada.com",
  "password": "admin123"
}
```

### Crear Evento
```bash
POST /api/events
Content-Type: application/json
Authorization: Bearer <token_jwt>

{
  "title": "Recital en Buenos Aires",
  "description": "Show presentación nuevo disco",
  "date": "2025-06-15T21:00:00.000Z",
  "location": "Buenos Aires, Argentina",
  "venue": "Estadio José Amalfitani",
  "price": 25000,
  "ticketsAvailable": 5000,
  "category": "recital"
}
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
