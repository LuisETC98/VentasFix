# PLAN DE PRUEBAS UNITARIAS: PROYECTO VENTASFIX

## 1\. Objetivo y Alcance

Este documento define la estrategia estricta de pruebas unitarias para el proyecto "VentasFix". El objetivo es garantizar la fiabilidad del código desarrollado por los agentes, validando el comportamiento aislado de las capas de negocio (Backend) y componentes visuales (Frontend) antes de cualquier despliegue.

****REGLA DE ORO PARA AGENTES (EVIDENCIA):****

Es de CARÁCTER OBLIGATORIO que todas las pruebas pasen exitosamente. Como prueba de este hito, el agente de IA deberá generar capturas de pantalla de la terminal mostrando los tests en color verde (éxito).

Estas capturas ****DEBEN**** ser guardadas estrictamente en la ruta: `/capturas/pruebas_unitarias/` (ubicada en la raíz del proyecto). No se aceptará otra ubicación.

## 2\. Estrategia de Pruebas Backend (Java + Spring Boot)

****Stack Tecnológico Exigido:**** JUnit 5 y Mockito.

### 2.1. Reglas de Aislamiento

-   ****Prohibido el uso de**** **`**@SpringBootTest**`** ****para pruebas puramente unitarias.**** Esta anotación levanta el contexto completo de Spring (incluyendo la conexión a base de datos), lo que ralentiza el proceso y lo convierte en un test de integración.
-   Utilizar la anotación `@ExtendWith(MockitoExtension.class)` a nivel de clase de prueba.
-   Los Repositorios (interfaces que extienden de `JpaRepository`) ****SIEMPRE**** deben ser mockeados usando la anotación `@Mock`.
-   Los Servicios que contienen la lógica de negocio deben ser instanciados usando la anotación `@InjectMocks`.

### 2.2. Casos de Uso Obligatorios a Testear

1.  ****Lógica de UsuarioService:****
2.  -   ****Test 1:**** Validar que al intentar crear un usuario con un email que NO termina en `@ventasfix.cl`, el servicio arroje una excepción de validación.
    -   ****Test 2:**** Verificar que, al pasar las validaciones, el método llame internamente a `BCryptPasswordEncoder` para cifrar la contraseña ANTES de invocar el método `save()` del repositorio.
3.  ****Lógica de ProductoService:****
4.  -   ****Test 1:**** Verificar la regla de negocio del cálculo del precio: Si se envía un producto con `precioNeto = 1000`, el servicio debe calcular e inyectar `precioVenta = 1190` (sumando el 19% del IVA) antes de guardarlo.
5.  ****Validación de DTOs:****
6.  -   Garantizar mediante tests que los métodos bloqueen e informen errores si se envían datos nulos o vacíos en cualquiera de las 3 entidades (Usuarios, Productos, Clientes).

## 3\. Estrategia de Pruebas Frontend (React + Vite)

****Stack Tecnológico Exigido:**** Vitest y React Testing Library (RTL).

### 3.1. Reglas de Componentes

-   Las pruebas no deben evaluar estados internos del componente (ej. variables, hooks). Deben evaluar el ****comportamiento y visualización en el DOM****, interactuando con elementos a través de roles (`screen.getByRole`, `screen.getByText`).
-   Todas las llamadas externas (Fetch, Axios) a la API del backend deben ser obligatoriamente simuladas (mockeadas) mediante la función `vi.mock()` de Vitest.

### 3.2. Casos de Uso Obligatorios a Testear

1.  ****Componente DataTable.jsx (Tabla Reutilizable):****
2.  -   ****Test 1:**** Renderizado dinámico. Inyectar un arreglo con 3 objetos mock y verificar que la tabla dibuje exactamente 3 filas (`<tr>`).
    -   ****Test 2:**** Validar que cada fila posea renderizados y visibles los botones de acción ("Editar" y "Eliminar").
3.  ****Formulario de Login (Login.jsx):****
4.  -   ****Test 1:**** Interacción y validación. Simular un click en el botón de submit con el formulario vacío y verificar que aparezcan en pantalla los mensajes de error correspondientes.
    -   ****Test 2:**** Mockear una respuesta `200 OK` de la API, enviar credenciales válidas y validar que la función de redirección al `Dashboard` es llamada correctamente.

## 4\. Flujo de Ejecución y Entrega de Evidencia

Para dar por cumplido este plan, el agente de IA o equipo de desarrollo debe:

1.  Asegurarse de que exista la estructura de carpetas de evidencia:
    
    /  
    └── capturas/  
        └── pruebas\_unitarias/  <-- AQUI SE GUARDA LA EVIDENCIA  
      
    
2.  ****Para Backend:**** Ejecutar `mvn test` (o `./mvnw test`). Tomar captura del log donde se indica la cantidad de tests corridos y exitosos. Guardar como `/capturas/pruebas_unitarias/backend_tests_result.png`.
3.  ****Para Frontend:**** Ejecutar `npm run test` (o equivalente en Vitest). Tomar captura del resumen en terminal. Guardar como `/capturas/pruebas_unitarias/frontend_tests_result.png`.