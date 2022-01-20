# Bootcamp Full Stack Web Developer #


## Práctica Final - Módulo: Fundamentos de React


Se trata de una aplicación de tipo dashboard que será la interfaz gráfica desde 
la que podremos gestionar el API de anuncios "Nodepop".

Se usa un backend proporcionado por el profesor para centrar esta práctica únicamente en React, y se puede descargar para su posterior uso con esta aplicación desde el siguiente enlace: [https://github.com/davidjj76/nodepop-api](https://github.com/davidjj76/nodepop-api)

Los datos del backend son almacenados en una base de datos SQLite en el directorio "/data".
Las fotos subidas al backend son almacenadas en el directorio "/uploads" y servidas 
por el backend como contenido estático en "/public".

## NodePop Frontend

La aplicación Frontend es una SPA (Single Page Application) desarrollada con 
React como librería principal.
En la aplicación se implementarán una serie de rutas, 
divididas en dos grupos: Públicas y Protegidas. En cada una de la rutas se 
renderizará un componente principal tal como se explica a continuación:

1. Públicas: Accesibles para cualquier usuario.
	- /auth: Registro y Login de usuario
2. Privadas: Accesibles SOLO para usuarios autenticados. Cualquier acceso 
de un usuario no autenticado a cualquiera de estas rutas redireccionará a 
"/auth".
	- /: redirecciona a /adverts
	- /adverts: Página principal de la aplicación donde se muestran los anuncios
	- /adverts/:id: Página de detalle de cada anuncio
	- /adverts/new: Página con formulario para creación de anuncio con o sin imagen
	- Cualquier otra url que no coincida, redireccionará a un componente 
"NotFoundPage" que informará al usuario de que la página solicitada no 
existe (la típica 404).

Funcionalidad de cada página-componente:


1. AuthPage:
 	- Formulario para el registro de nuevos usuarios.
	- Formulario con inputs para recoger email y password del usuario. 
	- Opción “Recordar contraseña” mediante el cual podremos indicar que 
guardamos en el localStorage el hecho de que hay un usuario logado, 
evitando tener que introducir credenciales en cada visita al sitio.
2. AdvertsPage: 
	- Listado de anuncios. Cada anuncio presenta: foto, nombre, precio, si es 
compra o venta y los tags.
	- Cuando no haya ningún anuncio que mostrar, se mostrará un mensaje con un
botón que redirige a la página de creación de anuncios.
	- Cada anuncio del listado tiene un enlace al detalle del anuncio (ruta
/adverts/:id).
	- Búsqueda por filtros. Formulario donde podremos 
introducir los filtros que queremos aplicar sobre el listado. Además incorpora un botón para limpiar ese formulario y volver a todos los anuncios. Los filtros posibles son:
		- Filtro por nombre
		- Filtro por rango de precios
		- Filtro tipo de anuncio (compra/venta/ambos)
		- Filtro por tags (podremos seleccionar uno o varios tags de los disponibles).
3. AdvertDetailsPage:
	- Detalle del anuncio cuyo id es recogido de la URL. Siempre mostrará la foto del 
anuncio o un placeholder en su lugar si no existe foto.
	- Si el anuncio no existe redirigirá a "NotFoundPage".
	- Botón para poder borrar el anuncio. Una vez pulsado muestra una 
confirmación al usuario. Tras el borrado se redirecciona 
al listado de anuncios.
4. NewAdvertPage:
	- Formulario con todos los campos necesarios para crear un nuevo 
anuncio:
		- Nombre
		- Compra / Venta
		- Tags disponibles.
		- Precio
		- Foto (opcional)
	- Todos los campos, excepto la foto serán requeridos para crear un 
anuncio. El botón "crear anuncio" permanecerá deshabilitado mientras no se completen los campos requeridos.
	- Tras la creación del anuncio se redirecciona automáticamente a la página de detalle del anuncio.



Además de estos componentes, se muestra siempre un "NavBar" desde el cual se puede navegar a la ruta principal que contiene los anuncios y a la ruta de creación de un nuevo anuncio. También muestra el nombre del usuario logueado y la opción de "Cerrar sesión", que al igual que el botón "Eliminar anuncio", muestra una confirmación al usuario para que pueda cerrar sesión.


## Instrucciones

Desde el directorio del proyecto:

Instalar dependencias:

	npm install

En ese proceso se creará la carpeta "node_modules" con todas las dependencias del proyecto.

Arrancar el proyecto:

	npm start

Iniciará la aplicación en modo desarrollo. Sólo hay que ir a la ruta [http://localhost:3000](http://localhost:3000) desde el navegador (con el backend previamente arrancado).