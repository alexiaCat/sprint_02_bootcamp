# IMPLEMENTACIÓN DE API BACKEND NODE EXPRESS
## Descripción del Proyecto
Para el segundo Sprint, el objetivo es adecuar el diseño existente para que esté disponible a través de una API RESTful. En este Sprint, se agregará el nuevo campo "password" a la tabla "users" con un mínimo de 8 caracteres, con el propósito de autenticar a los usuarios.

## Requerimientos para el Segundo Sprint
- Construir una API RESTful con Express para el manejo de los bootcamps.
- Implementar la autenticación mediante JWT (JSON Web Token).
- Utilizar PostgreSQL como base de datos.

## Instrucciones de configuración
1. Clona este repositorio en tu máquina local.

2. Instala las dependencias del proyecto ejecutando el siguiente comando en la raíz del proyecto: `npm install`

3. Crea la base de datos en PostgreSQL llamada `db_jwtbootcamp`

4. Configura la conexión a la base de datos:
   - Dentro de la carpeta config, en el archivo db.config.js está el modelo de datos.
   - Agrega un archivo .env en la raíz del proyecto reemplazando cada valor con tu configuración de entorno.

## Instrucciones para ejecutar el servidor
Para iniciar el servidor, ejecuta el siguiente comando en la raíz del proyecto: `npm start`

## Rutas de la API

### Registro y Autenticación de Usuarios

- **POST /api/signup**
  - Acción: Registro de un nuevo usuario
  - Acceso: Público
  - Descripción: Permite registrar un nuevo usuario en la API. Los campos requeridos para el registro son: `email`, `password`, `firstName` y `lastName`.

- **POST /api/signin**
  - Acción: Inicio de sesión en la API
  - Acceso: Público
  - Descripción: Permite iniciar sesión en la API proporcionando las credenciales de usuario (correo electrónico y contraseña). Una vez autenticado, se generará un token JWT que deberá incluirse en las solicitudes posteriores a rutas protegidas.

### Acceso a Información de Usuarios

- **GET /api/user/:id**
  - Acción: Obtener información del usuario según su ID
  - Acceso: Token requerido, previamente iniciada sesión
  - Descripción: Permite obtener la información de un usuario específico mediante su ID. Se requiere incluir el token de autenticación en el encabezado `Authorization`.

- **GET /api/user**
  - Acción: Lista información de todos los usuarios y los Bootcamp registrados
  - Acceso: Token requerido, previamente iniciada sesión
  - Descripción: Proporciona una lista con información de todos los usuarios y los bootcamps a los que están registrados. Es necesario incluir el token de autenticación en el encabezado `Authorization`.

### Actualización y Eliminación de Usuarios

- **PUT /api/user/:id**
  - Acción: Actualiza los campos de firstName y lastName de un usuario según su ID
  - Acceso: Token requerido, previamente iniciada sesión
  - Descripción: Permite actualizar los campos `firstName` y `lastName` de un usuario específico mediante su ID. Se requiere incluir el token de autenticación en el encabezado `Authorization`.

- **DELETE /api/user/:id**
  - Acción: Elimina el usuario según su ID
  - Acceso: Token requerido, previamente iniciada sesión
  - Descripción: Permite eliminar un usuario específico mediante su ID. Se requiere incluir el token de autenticación en el encabezado `Authorization`.

### Gestión de Bootcamps

- **POST /api/bootcamp**
  - Acción: Crea un bootcamp
  - Acceso: Token requerido, previamente iniciada sesión
  - Descripción: Permite crear un nuevo bootcamp. Para ello, es necesario incluir el token de autenticación en el encabezado `Authorization`.

- **POST /api/bootcamp/adduser**
  - Acción: Agrega usuarios previamente registrados al bootcamp
  - Acceso: Token requerido, previamente iniciada sesión
  - Descripción: Permite agregar usuarios previamente registrados a un bootcamp específico. Es necesario incluir el token de autenticación en el encabezado `Authorization`.

- **GET /api/bootcamp/:id**
  - Acción: Obtiene información de un bootcamp según su ID, y muestra los usuarios registrados en el bootcamp
  - Acceso: Token requerido, previamente iniciada sesión
  - Descripción: Permite obtener información de un bootcamp específico mediante su ID, incluyendo la lista de usuarios registrados en el bootcamp. Es necesario incluir el token de autenticación en el encabezado `Authorization`.

- **GET /api/bootcamp**
  - Acción: Lista todos los bootcamps
  - Acceso: Público
  - Descripción: Proporciona una lista con información de todos los bootcamps registrados. No se requiere autenticación para acceder a esta ruta.

## Notas Importantes
- Todas las rutas que requieren autenticación deben incluir el token JWT generado durante el inicio de sesión en el encabezado `Authorization` de la solicitud HTTP.

- La API está basada en Node.js y utiliza Express para el manejo de las rutas y PostgreSQL como base de datos.

- Para probar las rutas que requieren autenticación, asegúrate de haber iniciado sesión previamente y haber obtenido el token de autenticación.
