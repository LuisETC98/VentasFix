# Documentación y Reporte de Pruebas Postman - API VentasFix

Este directorio contiene la suite completa de pruebas automatizadas para evaluar el estado, disponibilidad, seguridad, lógica de negocio y códigos de estado HTTP de la API REST del sistema **VentasFix** (Spring Boot 4 / Java 21 / MySQL 8 / Spring Security JWT).

---

## 1. Resumen de Ejecución de Pruebas (Newman CLI)

```text
┌─────────────────────────┬────────────────────┬───────────────────┐
│                         │           executed │            failed │
├─────────────────────────┼────────────────────┼───────────────────┤
│              iterations │                  1 │                 0 │
├─────────────────────────┼────────────────────┼───────────────────┤
│                requests │                 26 │                 0 │
├─────────────────────────┼────────────────────┼───────────────────┤
│            test-scripts │                 26 │                 0 │
├─────────────────────────┼────────────────────┼───────────────────┤
│      prerequest-scripts │                  3 │                 0 │
├─────────────────────────┼────────────────────┼───────────────────┤
│              assertions │                 45 │                 0 │
├─────────────────────────┴────────────────────┴───────────────────┤
│ total run duration: 3.2s                                         │
├──────────────────────────────────────────────────────────────────┤
│ total data received: 5.18kB (approx)                             │
├──────────────────────────────────────────────────────────────────┤
│ average response time: 108ms                                     │
└──────────────────────────────────────────────────────────────────┘
```

**Resultado:** `45 de 45 aserciones superadas exitosamente (100% de cobertura y éxito).`

---

## 2. Estructura de Casos de Prueba Evaluados

### Carpeta 01: Autenticación y Control de Acceso
1. **01 - Login Exitoso (`POST /api/auth/login`)**:
   - Envía credenciales de administrador (`admin@ventasfix.cl` / `admin123`).
   - Verifica código `200 OK`.
   - Verifica presencia de token JWT no vacío.
   - Extrae e inyecta dinámicamente el token JWT en las variables de entorno/colección (`jwt_token`).
   - Valida tiempo de respuesta < 1500 ms.
2. **02 - Login Fallido - Password Errónea (`POST /api/auth/login`)**:
   - Envía contraseña incorrecta.
   - Verifica código `401 Unauthorized`.
3. **03 - Login Fallido - Usuario Inexistente (`POST /api/auth/login`)**:
   - Envía email inexistente.
   - Verifica código `401 Unauthorized`.
4. **04 - Seguridad - Denegar Acceso Sin Token JWT (`GET /api/dashboard/stats`)**:
   - Intenta consumir ruta privada sin cabecera `Authorization`.
   - Verifica rechazo con código `403 Forbidden` / `401 Unauthorized`.
5. **05 - Seguridad - Denegar Acceso Con Token Inválido (`GET /api/usuarios`)**:
   - Envía token falso o malformado.
   - Verifica rechazo con código `403 Forbidden` / `401 Unauthorized`.

---

### Carpeta 02: Usuarios (CRUD y Validaciones)
1. **01 - Listar Todos los Usuarios (`GET /api/usuarios`)**:
   - Requiere Bearer Token.
   - Valida código `200 OK`.
   - Valida estructura de datos (id, rut, nombre, apellido, email) y que los correos terminen en `@ventasfix.cl`.
2. **02 - Obtener Usuario por ID (`GET /api/usuarios/1`)**:
   - Valida código `200 OK` y coincidencia de ID.
3. **03 - Crear Usuario Nuevo (`POST /api/usuarios`)**:
   - Genera datos aleatorios en Pre-request Script para garantizar idempotencia.
   - Valida código `201 Created`.
   - Captura y almacena `test_usuario_id`.
4. **04 - Validación - Rechazar Email sin Dominio `@ventasfix.cl` (`POST /api/usuarios`)**:
   - Envía email con dominio `@gmail.com`.
   - Valida rechazo con código `400 Bad Request`.
5. **05 - Validación - Rechazar DTO con Campos Vacíos (`POST /api/usuarios`)**:
   - Envía campos vacíos.
   - Valida rechazo con código `400 Bad Request` por validaciones `@NotBlank`.
6. **06 - Actualizar Usuario Existente (`PUT /api/usuarios/{{test_usuario_id}}`)**:
   - Modifica nombre y apellido del usuario creado.
   - Valida código `200 OK` y persistencia del cambio.
7. **07 - Eliminar Usuario Creado (`DELETE /api/usuarios/{{test_usuario_id}}`)**:
   - Elimina el usuario de prueba creado.
   - Valida código `204 No Content` y cuerpo vacío.

---

### Carpeta 03: Productos (CRUD, Regla de Negocio IVA y Validaciones)
1. **01 - Listar Todos los Productos (`GET /api/productos`)**:
   - Valida código `200 OK` y lista no vacía.
2. **02 - Obtener Producto por ID (`GET /api/productos/1`)**:
   - Valida código `200 OK` y coincidencia de cálculo de IVA.
3. **03 - Crear Producto y Calcular IVA (+19%) (`POST /api/productos`)**:
   - Envía `precioNeto: 100000.0` (sin enviar `precioVenta`).
   - Valida código `201 Created`.
   - **Regla de Negocio Crítica:** Verifica que el backend calcule automáticamente `precioVenta = precioNeto + (precioNeto * 0.19)` ($119,000.0).
   - Almacena `test_producto_id`.
4. **04 - Validación - Rechazar Producto con Campos Nulos (`POST /api/productos`)**:
   - Envía campos en blanco y nulos.
   - Valida rechazo con código `400 Bad Request`.
5. **05 - Actualizar Producto y Recalcular IVA (`PUT /api/productos/{{test_producto_id}}`)**:
   - Modifica `precioNeto` a $200,000.0.
   - Valida código `200 OK`.
   - Verifica recálculo automático de `precioVenta` a $238,000.0 ($200,000 * 1.19).
6. **06 - Eliminar Producto Creado (`DELETE /api/productos/{{test_producto_id}}`)**:
   - Valida código `204 No Content`.

---

### Carpeta 04: Clientes (CRUD y Validaciones)
1. **01 - Listar Todos los Clientes (`GET /api/clientes`)**:
   - Valida código `200 OK` y atributos de empresa.
2. **02 - Obtener Cliente por ID (`GET /api/clientes/1`)**:
   - Valida código `200 OK`.
3. **03 - Crear Cliente Empresa (`POST /api/clientes`)**:
   - Envía RUT Empresa, razón social, rubro, contacto y teléfono.
   - Valida código `201 Created` y guarda `test_cliente_id`.
4. **04 - Validación - Rechazar Formato de Email Inválido (`POST /api/clientes`)**:
   - Envía correo malformado.
   - Valida rechazo con código `400 Bad Request` (`@Email`).
5. **05 - Validación - Rechazar Campos Obligatorios Vacíos (`POST /api/clientes`)**:
   - Valida rechazo con código `400 Bad Request`.
6. **06 - Actualizar Cliente Existente (`PUT /api/clientes/{{test_cliente_id}}`)**:
   - Actualiza rubro y dirección de la empresa.
   - Valida código `200 OK`.
7. **07 - Eliminar Cliente Creado (`DELETE /api/clientes/{{test_cliente_id}}`)**:
   - Valida código `204 No Content`.

---

### Carpeta 05: Dashboard (Métricas y Conteos)
1. **01 - Obtener Estadísticas Consolidadas (`GET /api/dashboard/stats`)**:
   - Valida código `200 OK`.
   - Verifica existencia de las 3 propiedades calculadas mediante `count()`:
     - `totalUsuarios`: Número >= 0.
     - `totalProductos`: Número >= 0.
     - `totalClientes`: Número >= 0.

---

## 3. Instrucciones para Importar y Ejecutar en Postman Desktop

1. Abrir **Postman Desktop**.
2. Hacer clic en **Import** (esquina superior izquierda).
3. Seleccionar o arrastrar los siguientes dos archivos:
   - `VentasFix_API_Collection.postman_collection.json`
   - `VentasFix_Environment.postman_environment.json`
4. En la esquina superior derecha, seleccionar el entorno **VentasFix - Localhost Environment**.
5. Hacer clic derecho sobre la colección **VentasFix API - Colección de Pruebas de Integración y Estado** y seleccionar **Run collection** (o presionar `Run`).
6. Presionar **Run VentasFix API**. Todos los tests pasarán en verde.

---

## 4. Instrucciones para Ejecutar desde la Consola (CLI) con Newman

Asegúrate de que el Backend esté en ejecución en el puerto 8080 (`http://localhost:8080`), luego ejecuta:

```bash
# Desde la carpeta pruebas_postman:
npx newman run VentasFix_API_Collection.postman_collection.json \
  -e VentasFix_Environment.postman_environment.json \
  --reporters cli,json \
  --reporter-json-export postman_test_results.json
```
