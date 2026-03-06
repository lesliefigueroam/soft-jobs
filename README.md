# Soft Jobs -- API y Frontend

Proyecto desarrollado para el desafío **Soft Jobs**. La aplicación
permite registrar usuarios, iniciar sesión y visualizar el perfil del
desarrollador autenticado utilizando **JWT** para la autenticación.

## Tecnologías utilizadas

### Backend

- Node.js
- Express
- PostgreSQL
- JWT (jsonwebtoken)
- bcryptjs
- cors
- dotenv

### Frontend

- React
- Axios
- React Router

## Instalación del proyecto

### 1. Clonar repositorio

```bash
git clone https://github.com/tu-usuario/soft-jobs.git
cd soft-jobs
```

### 2. Instalar dependencias

Backend:

```bash
cd servidor
npm install
```

Frontend:

```bash
cd ../cliente
npm install
```

## Variables de entorno

Crear un archivo `.env` dentro de la carpeta **servidor**.

Ejemplo:

    DB_USER=postgres
    DB_HOST=localhost
    DB_PASSWORD=tu_password
    DB_DATABASE=softjobs
    JWT_SECRET=secretkey

## Base de datos

Crear la tabla `usuarios` en PostgreSQL:

```sql
CREATE TABLE usuarios (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  rol VARCHAR(50),
  lenguage VARCHAR(50)
);
```

## Ejecutar el proyecto

### Backend

```bash
cd servidor
npm run dev
```

El servidor se ejecutará en:

    http://localhost:3000

### Frontend

```bash
cd cliente
npm run dev
```

El frontend se ejecutará en:

    http://localhost:5173

## Endpoints de la API

### Registrar usuario

POST `/usuarios`

Body:

```json
{
  "email": "dev@test.com",
  "password": "123456",
  "rol": "frontend",
  "lenguage": "javascript"
}
```

### Login

POST `/login`

Body:

```json
{
  "email": "dev@test.com",
  "password": "123456"
}
```

Respuesta:

```json
{
  "token": "jwt_token"
}
```

### Obtener datos del usuario

GET `/usuarios`

Headers:

    Authorization: Bearer <token>

Respuesta:

```json
{
  "email": "dev@test.com",
  "rol": "frontend",
  "lenguage": "javascript"
}
```

## Autenticación

La aplicación utiliza **JSON Web Tokens (JWT)** para proteger las rutas.
El token se genera al iniciar sesión y debe enviarse en el header
`Authorization` para acceder a la información del usuario.

## Funcionalidades

- Registro de usuarios
- Login con autenticación JWT
- Encriptación de contraseñas con bcrypt
- Middleware para verificación de token
- Perfil del usuario autenticado
- Conexión a base de datos PostgreSQL

## Autor

Proyecto realizado por **Leslie Figueroa Meneses** para Desafío Latam.
