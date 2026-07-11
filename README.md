\# Sistema de Gestión Veterinaria



Sistema web desarrollado con arquitectura de microservicios para la administración de propietarios y mascotas.



La solución incluye autenticación mediante JWT, gestión de propietarios, gestión de mascotas, comunicación entre microservicios, frontend en Angular, base de datos MySQL y ejecución completa mediante Docker Compose.



\---



\## 1. Descripción general



El sistema permite:



\- Iniciar sesión mediante usuario y contraseña.

\- Generar y validar tokens JWT.

\- Registrar propietarios.

\- Consultar propietarios.

\- Modificar propietarios.

\- Eliminar propietarios.

\- Registrar mascotas.

\- Consultar mascotas.

\- Modificar mascotas.

\- Eliminar mascotas.

\- Asociar mascotas con propietarios.

\- Validar la existencia de propietarios desde el servicio de mascotas.

\- Ejecutar todos los componentes mediante Docker Compose.



\---



\## 2. Tecnologías utilizadas



\### Backend



\- Java

\- Spring Boot

\- Spring Security

\- Spring Data JPA

\- JWT

\- OpenFeign

\- Maven

\- MySQL Connector



\### Frontend



\- Angular

\- TypeScript

\- HTML

\- CSS



\### Infraestructura



\- Docker

\- Docker Compose

\- MySQL Community Server



\---



\## 3. Arquitectura



El sistema está compuesto por los siguientes servicios:



| Componente | Puerto | Descripción |

|---|---:|---|

| Frontend | 4200 | Aplicación web Angular |

| Auth Service | 8081 | Autenticación y generación de JWT |

| Owner Service | 8082 | Administración de propietarios |

| Pet Service | 8083 | Administración de mascotas |

| MySQL | 3307 | Base de datos publicada en el equipo local |



Dentro de la red de Docker, MySQL utiliza el puerto interno `3306`.



\---



\## 4. Estructura del proyecto



```text

veterinary-system/

├── auth-service/

├── owner-service/

├── pet-service/

├── veterinary-frontend/

├── docker-compose.yml

└── README.md

```



\### Descripción de carpetas



\#### auth-service



Microservicio encargado de:



\- Validar credenciales.

\- Generar tokens JWT.

\- Exponer el endpoint de autenticación.

\- Proteger el acceso mediante seguridad basada en token.



\#### owner-service



Microservicio encargado de:



\- Registrar propietarios.

\- Consultar propietarios.

\- Actualizar propietarios.

\- Eliminar propietarios.

\- Persistir información en MySQL.



\#### pet-service



Microservicio encargado de:



\- Registrar mascotas.

\- Consultar mascotas.

\- Actualizar mascotas.

\- Eliminar mascotas.

\- Asociar mascotas con propietarios.

\- Validar propietarios mediante OpenFeign.



\#### veterinary-frontend



Aplicación Angular encargada de:



\- Mostrar la pantalla de inicio de sesión.

\- Administrar el token JWT.

\- Proteger rutas mediante guards.

\- Enviar el token mediante interceptor.

\- Mostrar formularios y tablas.

\- Consumir los microservicios.



\---



\## 5. Funcionalidades implementadas



\### Autenticación



\- Inicio de sesión.

\- Generación de JWT.

\- Validación del token.

\- Protección de endpoints.

\- Interceptor HTTP en Angular.

\- Guard de autenticación.

\- Cierre de sesión.



\### Gestión de propietarios



\- Alta de propietarios.

\- Consulta de propietarios.

\- Actualización de propietarios.

\- Eliminación de propietarios.

\- Persistencia en MySQL.

\- Validación de información.



\### Gestión de mascotas



\- Alta de mascotas.

\- Consulta de mascotas.

\- Actualización de mascotas.

\- Eliminación de mascotas.

\- Asociación con propietario.

\- Validación del propietario antes de registrar la mascota.

\- Persistencia en MySQL.

\- Filtros de búsqueda.



\### Docker



\- Imagen Docker para Auth Service.

\- Imagen Docker para Owner Service.

\- Imagen Docker para Pet Service.

\- Imagen Docker para Angular.

\- Contenedor MySQL.

\- Red interna de Docker.

\- Volumen persistente para MySQL.

\- Ejecución completa mediante Docker Compose.



\---



\## 6. Requisitos previos



Para ejecutar el proyecto se necesita:



\- Docker Desktop instalado.

\- Docker Compose disponible.

\- Puertos libres:

&#x20; - `4200`

&#x20; - `8081`

&#x20; - `8082`

&#x20; - `8083`

&#x20; - `3307`



Para validar Docker:



```powershell

docker --version

docker compose version

```



\---



\## 7. Imágenes Docker requeridas



Las imágenes utilizadas por Docker Compose son:



```text

veterinary-auth-service:latest

veterinary-owner-service:latest

veterinary-pet-service:latest

veterinary-frontend:latest

container-registry.oracle.com/mysql/community-server:8.4

```



Para consultar las imágenes disponibles:



```powershell

docker images

```



\---



\## 8. Ejecución del sistema



Abrir PowerShell y entrar a la carpeta principal:



```powershell

cd C:\\Users\\gusta\\Downloads\\veterinary-system

```



Levantar todos los servicios:



```powershell

docker compose up -d

```



Consultar el estado:



```powershell

docker compose ps

```



Para mostrar también contenedores detenidos:



```powershell

docker compose ps -a

```



Los cinco contenedores deben aparecer con estado `Up`.



\---



\## 9. Contenedores del sistema



Los contenedores son:



```text

veterinary-mysql

veterinary-auth-container

veterinary-owner-container

veterinary-pet-container

veterinary-frontend-container

```



Para consultar todos los contenedores:



```powershell

docker ps -a

```



\---



\## 10. Acceso al sistema



\### Frontend



```text

http://localhost:4200

```



\### Auth Service



```text

http://localhost:8081

```



\### Owner Service



```text

http://localhost:8082

```



\### Pet Service



```text

http://localhost:8083

```



\### MySQL



```text

Host: localhost

Puerto: 3307

Usuario: root

Contraseña: root

```



\---



\## 11. Credenciales de acceso



```text

Usuario: admin

Contraseña: admin123

```



\---



\## 12. Bases de datos



El sistema utiliza las siguientes bases de datos:



```text

veterinary\_owners

veterinary\_pets

```



Las bases de datos se crean automáticamente mediante las URL de conexión configuradas en Docker Compose.



\---



\## 13. Variables de entorno



\### Auth Service



```text

AUTH\_USERNAME

AUTH\_PASSWORD

JWT\_SECRET

```



\### Owner Service



```text

SPRING\_DATASOURCE\_URL

SPRING\_DATASOURCE\_USERNAME

SPRING\_DATASOURCE\_PASSWORD

JWT\_SECRET

```



\### Pet Service



```text

SPRING\_DATASOURCE\_URL

SPRING\_DATASOURCE\_USERNAME

SPRING\_DATASOURCE\_PASSWORD

JWT\_SECRET

OWNER\_SERVICE\_URL

```



\### MySQL



```text

MYSQL\_ROOT\_PASSWORD

MYSQL\_ROOT\_HOST

```



\---



\## 14. Comunicación entre servicios



El servicio de mascotas se comunica con el servicio de propietarios mediante OpenFeign.



Dentro de Docker se utiliza:



```text

http://owner-service:8082

```



No se utiliza `localhost` entre contenedores, porque cada contenedor tiene su propia interfaz de red.



\---



\## 15. Seguridad JWT



El sistema utiliza la misma clave JWT en los tres servicios:



```text

01234567890123456789012345678901

```



Esta clave se utiliza únicamente para fines de desarrollo y pruebas.



En un ambiente productivo debe almacenarse en un gestor de secretos y no incluirse directamente en el archivo Docker Compose.



\---



\## 16. Comandos principales



\### Levantar el sistema



```powershell

docker compose up -d

```



\### Consultar estado



```powershell

docker compose ps

```



\### Ver todos los contenedores



```powershell

docker compose ps -a

```



\### Ver logs generales



```powershell

docker compose logs

```



\### Ver logs en tiempo real



```powershell

docker compose logs -f

```



\### Ver logs de Auth Service



```powershell

docker compose logs -f auth-service

```



\### Ver logs de Owner Service



```powershell

docker compose logs -f owner-service

```



\### Ver logs de Pet Service



```powershell

docker compose logs -f pet-service

```



\### Ver logs de MySQL



```powershell

docker compose logs -f mysql

```



\### Ver logs del frontend



```powershell

docker compose logs -f frontend

```



\### Detener el sistema



```powershell

docker compose down

```



\### Reiniciar servicios



```powershell

docker compose restart

```



\### Reiniciar un servicio específico



```powershell

docker compose restart owner-service

```



\---



\## 17. Persistencia de datos



MySQL utiliza el volumen:



```text

veterinary-system\_veterinary-mysql-data

```



Este volumen permite conservar la información aunque los contenedores se detengan.



Para detener el sistema sin eliminar información:



```powershell

docker compose down

```



No debe utilizarse el siguiente comando cuando se requiera conservar los datos:



```powershell

docker compose down -v

```



La opción `-v` elimina el volumen y borra la información de MySQL.



\---



\## 18. Validación de MySQL



Para probar la conexión:



```powershell

docker exec -it veterinary-mysql mysql -uroot -proot

```



Consultar bases de datos:



```sql

SHOW DATABASES;

```



Seleccionar la base de propietarios:



```sql

USE veterinary\_owners;

SHOW TABLES;

```



Seleccionar la base de mascotas:



```sql

USE veterinary\_pets;

SHOW TABLES;

```



Salir de MySQL:



```sql

exit;

```



\---



\## 19. Validación de servicios



Para revisar los puertos:



```powershell

docker compose ps

```



Para consultar salud de los servicios, cuando Actuator se encuentre habilitado:



```text

http://localhost:8081/actuator/health

http://localhost:8082/actuator/health

http://localhost:8083/actuator/health

```



La respuesta esperada es:



```json

{

&#x20; "status": "UP"

}

```



\---



\## 20. Pruebas manuales



Las pruebas pueden realizarse mediante:



\- Navegador web.

\- Postman.

\- PowerShell.

\- MySQL CLI.



Flujo recomendado:



1\. Iniciar sesión.

2\. Obtener el token JWT.

3\. Registrar un propietario.

4\. Consultar propietarios.

5\. Registrar una mascota asociada al propietario.

6\. Consultar mascotas.

7\. Modificar propietario.

8\. Modificar mascota.

9\. Eliminar mascota.

10\. Eliminar propietario.



\---



\## 21. Construcción de imágenes



\### Auth Service



```powershell

cd C:\\Users\\gusta\\Downloads\\veterinary-system\\auth-service

docker build -t veterinary-auth-service:latest .

```



\### Owner Service



```powershell

cd C:\\Users\\gusta\\Downloads\\veterinary-system\\owner-service

docker build -t veterinary-owner-service:latest .

```



\### Pet Service



```powershell

cd C:\\Users\\gusta\\Downloads\\veterinary-system\\pet-service

docker build -t veterinary-pet-service:latest .

```



\### Frontend



```powershell

cd C:\\Users\\gusta\\Downloads\\veterinary-system\\veterinary-frontend

docker build -t veterinary-frontend:latest .

```



Después regresar a la carpeta principal:



```powershell

cd C:\\Users\\gusta\\Downloads\\veterinary-system

docker compose up -d

```



\---



\## 22. Solución de problemas



\### Docker Compose no encuentra el archivo



Error:



```text

no configuration file provided: not found

```



Verificar que el archivo se llame exactamente:



```text

docker-compose.yml

```



No debe llamarse:



```text

docker-compose.yml.txt

```



\### Red Docker existente



Error relacionado con:



```text

network veterinary-network already exists

```



Eliminar la red anterior cuando no esté en uso:



```powershell

docker network rm veterinary-network

```



Después:



```powershell

docker compose up -d

```



\### MySQL rechaza la conexión



Error:



```text

Host is not allowed to connect to this MySQL server

```



La configuración de MySQL debe incluir:



```yaml

MYSQL\_ROOT\_HOST: "%"

```



Después se debe recrear el volumen durante la configuración inicial:



```powershell

docker compose down -v

docker compose up -d

```



Este procedimiento elimina los datos existentes.



\### Un servicio aparece como Exited



Consultar el error:



```powershell

docker compose ps -a

docker compose logs --tail 100 owner-service

docker compose logs --tail 100 pet-service

```



\### Puerto ocupado



Consultar el proceso que utiliza un puerto:



```powershell

netstat -ano | findstr :8082

```



Detener el proceso solamente después de identificarlo correctamente.



\---



\## 23. Buenas prácticas aplicadas



\- Separación por microservicios.

\- Autenticación centralizada.

\- Uso de JWT.

\- Persistencia separada por dominio.

\- Comunicación mediante OpenFeign.

\- Contenedores independientes.

\- Red interna de Docker.

\- Volumen persistente.

\- Variables de entorno.

\- Frontend desacoplado.

\- Ejecución mediante Docker Compose.



\---



\## 24. Mejoras futuras



\- Crear usuarios específicos de MySQL y evitar el uso de `root`.

\- Mover secretos a un archivo `.env`.

\- Implementar roles y permisos.

\- Agregar Swagger/OpenAPI.

\- Agregar pruebas unitarias con JUnit y Mockito.

\- Agregar pruebas de integración.

\- Agregar pruebas en Angular.

\- Implementar paginación.

\- Agregar Resilience4j.

\- Configurar timeouts de OpenFeign.

\- Implementar CI/CD.

\- Publicar imágenes en un registro.

\- Desplegar el sistema en la nube.

\- Configurar HTTPS.

\- Agregar monitoreo y métricas.

\- Agregar logs estructurados.

\- Crear manejo global de excepciones.

\- Evitar eliminar propietarios con mascotas asociadas.



\---



\## 25. Estado actual



El sistema se encuentra:



```text

Funcional

Dockerizado

Conectado a MySQL

Ejecutándose mediante Docker Compose

Disponible desde el navegador

```



\---



\## 26. Autor



\*\*Ing. Gustavo Iván Loyola Perez\*\*

