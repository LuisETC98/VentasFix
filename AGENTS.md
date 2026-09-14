# DIRECTRICES DE DESARROLLO ESTRICTAS: PROYECTO VENTASFIX

## 1\. Contexto y Objetivos

Eres un equipo de agentes de desarrollo de software Senior (Antigravity). Tu objetivo es construir el sistema "VentasFix", un Backoffice web para administración de Usuarios, Productos y Clientes basado en una arquitectura Cliente-Servidor.

****REGLA DE ORO:**** Este proyecto será evaluado mediante una rúbrica estricta. Cíñete EXACTAMENTE a los requerimientos detallados abajo. No omitas campos, no obvies validaciones y respeta rigurosamente los códigos de estado HTTP y los patrones de diseño (MVC en backend, Componentes reutilizables en Frontend).

## 2\. Stack Tecnológico Obligatorio

-   ****Frontend:**** React 19, Vite 8, Tailwind CSS v4.
-   ****Backend:**** Java 21, Maven, Spring Boot (Última versión estable con Java 21).
-   ****Base de Datos:**** MySQL 8.0.45.
-   ****ORM:**** Spring Data JPA (Hibernate).
-   ****Seguridad:**** Spring Security con JWT (JSON Web Tokens) y cifrado BCrypt.

## 3\. Estructura de Carpetas del Proyecto (Diseño Multi-capa)

Crea la siguiente estructura para garantizar la separación de responsabilidades:

VentasFix/  
├── backend/  
│   └── src/main/java/com/ventasfix/  
│       ├── config/           # CorsConfig, SecurityConfig (Filtros JWT)  
│       ├── controllers/      # Controladores REST (Endpoints expuestos)  
│       ├── dto/              # Data Transfer Objects (Validaciones de entrada)  
│       ├── models/           # Entidades JPA (Mapeo estricto a MySQL)  
│       ├── repositories/     # Interfaces de Spring Data JPA  
│       ├── security/         # JwtUtil, UserDetailsServiceImpl  
│       └── services/         # Lógica de negocio (Reglas del examen)  
└── frontend/  
    └── src/  
        ├── assets/             
        ├── components/       # Componentes REUTILIZABLES obligatorios  
        ├── context/          # AuthContext (Manejo de estado global JWT)  
        ├── pages/            # Vistas del requerimiento  
        ├── routes/           # ProtectedRoute y enrutador principal  
        └── services/         # Clientes Axios/Fetch con interceptores JWT  
  

## 4\. Requerimientos del Backend (Base de Datos y Modelos)

****REGLA CRÍTICA:**** Ningún método de escritura (Crear, Actualizar) debe almacenar datos vacíos. TODOS los campos listados abajo son OBLIGATORIOS en la Base de Datos (`nullable = false`) y deben ser validados en los DTOs usando `@NotNull` y `@NotBlank`.

### 4.1. Entidad: Usuario

-   `id`: Long, PK, Autoincremental.
-   `rut`: String, Unique.
-   `nombre`: String.
-   `apellido`: String.
-   `email`: String, Unique. ****Regla de negocio:**** Debe ser el username y SIEMPRE debe validarse que termine en `@ventasfix.cl`.
-   `password`: String. ****Regla de negocio:**** Debe almacenarse CIFRADA con `BCryptPasswordEncoder`.

### 4.2. Entidad: Producto (Incluye impuestos)

-   `id`: Long, PK, Autoincremental.
-   `sku`: String, Unique.
-   `nombre`: String.
-   `descripcionCorta`: String.
-   `descripcionLarga`: String.
-   `imagen`: String (URL o path, solo admite 1 por producto).
-   `precioNeto`: Integer/Double.
-   `precioVenta`: Integer/Double. ****Regla de negocio:**** NO se debe enviar por el frontend. El servicio Backend debe calcularlo automáticamente al guardar/actualizar: `precioVenta = precioNeto + (precioNeto * 0.19)`.
-   `stockActual`: Integer.
-   `stockMinimo`: Integer.
-   `stockBajo`: Integer.
-   `stockAlto`: Integer.

### 4.3. Entidad: Cliente (Clientes empresa)

-   `id`: Long, PK, Autoincremental.
-   `rutEmpresa`: String, Unique.
-   `rubro`: String.
-   `razonSocial`: String.
-   `telefono`: String.
-   `direccion`: String.
-   `nombreContacto`: String.
-   `emailContacto`: String.

## 5\. Endpoints del API REST (Controladores y Códigos HTTP)

****REGLA PARA LA RÚBRICA (CÓDIGOS HTTP):**** Es OBLIGATORIO que el controlador retorne las respuestas con los códigos HTTP exactos indicados en cada punto. Todos estos endpoints (excepto el login) requieren un token JWT válido en el header `Authorization: Bearer <token>`. Base Path: `/api`.

### Autenticación (Público)

-   `POST /auth/login`: Recibe email y password. Valida contra BCrypt. Retorna Token JWT. (Código: `200 OK`).

### 1\. Usuarios (Mapeo Examen)

-   ****1.1.**** `GET /usuarios`: Listar todos los usuarios. (Código: `200 OK`).
-   ****1.2.**** `GET /usuarios/{id}`: Obtener datos de un usuario por ID. (Código: `200 OK`).
-   ****1.3.**** `POST /usuarios`: Agregar nuevo usuario. Valida DTO nulos y correo `@ventasfix.cl`. (Código: `201 Created`).
-   ****1.4.**** `PUT /usuarios/{id}`: Actualizar usuario por ID. Valida DTO nulos. (Código: `200 OK`).
-   ****1.5.**** `DELETE /usuarios/{id}`: Eliminar usuario por ID de manera segura. (Código: `204 No Content`).

### 2\. Productos (Mapeo Examen)

-   ****2.1.**** `GET /productos`: Listar todos los productos. (Código: `200 OK`).
-   ****2.2.**** `GET /productos/{id}`: Obtener datos de un producto por ID. (Código: `200 OK`).
-   ****2.3.**** `POST /productos`: Agregar nuevo producto. Calcula precioVenta (+19%). (Código: `201 Created`).
-   ****2.4.**** `PUT /productos/{id}`: Actualizar producto por ID. Recalcula precioVenta. (Código: `200 OK`).
-   ****2.5.**** `DELETE /productos/{id}`: Eliminar producto por ID. (Código: `204 No Content`).

### 3\. Clientes (Mapeo Examen)

-   ****3.1.**** `GET /clientes`: Listar todos los clientes. (Código: `200 OK`).
-   ****3.2.**** `GET /clientes/{id}`: Obtener datos de un cliente por ID. (Código: `200 OK`).
-   ****3.3.**** `POST /clientes`: Agregar nuevo cliente. (Código: `201 Created`).
-   ****3.4.**** `PUT /clientes/{id}`: Actualizar cliente por ID. (Código: `200 OK`).
-   ****3.5.**** `DELETE /clientes/{id}`: Eliminar cliente por ID. (Código: `204 No Content`).

### 4\. Dashboard (Mapeo Examen)

-   ****4.1, 4.2 y 4.3.**** `GET /dashboard/stats`: Retorna un JSON con 3 propiedades: `totalUsuarios`, `totalProductos`, `totalClientes` calculados con un `count()` desde los repositorios. (Código: `200 OK`).

## 6\. Poblado de Datos Inicial (Seeding)

Para facilitar el desarrollo y la revisión, el backend ****debe**** incluir un mecanismo para precargar registros inventados (dummy data) al iniciar la aplicación.

-   Utiliza un `CommandLineRunner` o un archivo `data.sql`.
-   Genera al menos 2 registros válidos para Usuarios, 2 para Productos y 2 para Clientes.
-   Mantén este script de llenado simple y directo. Posteriormente se abordará un plan de pruebas exhaustivo, por ahora solo necesitamos datos visualizables.

## 7\. Requerimientos del Frontend (React)

### 7.1. Componentes Reutilizables (Exigencia de Rúbrica)

Debes crear obligatoriamente estos componentes para maximizar el puntaje:

1.  `DataTable.jsx`: Un componente que reciba como props `columns` (array) y `data` (array de objetos), y renderice la tabla. Debe incluir botones de acción (Editar/Eliminar) inyectados.
2.  `FormModal.jsx`: Un modal genérico que reciba un formulario dinámico o children para reutilizar en la creación/edición de todas las entidades.
3.  `Layout.jsx` / `Sidebar.jsx`: Componente envolvente para la navegación.

### 7.2. Vistas de Usuario (Pages)

Se deben desarrollar las siguientes rutas en el enrutador de React:

-   `/login` (`Login.jsx`): Interfaz gráfica para ingresar credenciales. Si el JWT se obtiene, lo guarda en `localStorage` o Contexto.
-   `/dashboard` (`Dashboard.jsx`): Vista inicial (protegida). Consume `GET /api/dashboard/stats` y muestra tarjetas con los totales.
-   `/usuarios` (`UsuariosMantenedor.jsx`): Consume el CRUD de usuarios. Utiliza `DataTable` y `FormModal`.
-   `/productos` (`ProductosMantenedor.jsx`): Consume el CRUD de productos. Utiliza `DataTable` y `FormModal`.
-   `/clientes` (`ClientesMantenedor.jsx`): Consume el CRUD de clientes. Utiliza `DataTable` y `FormModal`.

### 7.3. Interacción con Servicios (API Frontend)

-   Implementa Axios (o Fetch) dentro de `src/services/api.js`.
-   Es OBLIGATORIO implementar un Interceptor que detecte el JWT y lo adjunte a las cabeceras `Authorization: Bearer <token>` en todas las peticiones (salvo el login).