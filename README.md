# IMPLEMENTACIÓN DE API BACKEND NODE EXPRESS

## Descripción del Proyecto
El equipo de desarrollo de software está trabajando en un proyecto para el acceso a datos a través de una aplicación desarrollada en Node.js. Este proyecto se basa en el diseño de acceso a datos mediante Sequelize y las relaciones necesarias para la gestión de cursos Bootcamp para una empresa de adiestramiento específica. El primer Sprint del proyecto ya se ha completado y abarcó el diseño e implementación en Node.js para el registro de cursos Bootcamp y de usuarios para los mismos.

Para el segundo Sprint, el objetivo es adecuar el diseño existente para que esté disponible a través de una API RESTful. En este Sprint, se agregará el nuevo campo "password" a la tabla "users" con un mínimo de 8 caracteres, con el propósito de autenticar a los usuarios. La base de datos sigue el modelo entidad-relación mostrado a continuación:

[Inserta aquí una imagen o diagrama del modelo entidad-relación]

La empresa de adiestramiento requiere que los usuarios puedan participar en distintos bootcamps, y a su vez, distintos bootcamps pueden tener distintos usuarios, como se implementó en el primer Sprint.

## Requerimientos para el Segundo Sprint
- Construir una API RESTful con Express para el manejo de los bootcamps.
- Implementar la autenticación mediante JWT (JSON Web Token).
- Utilizar PostgreSQL como base de datos.
