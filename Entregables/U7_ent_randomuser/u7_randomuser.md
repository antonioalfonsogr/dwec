# Ejercicio 1

La empresa de Redes Sociales `Chebook` quiere crear una aplicación web que permita crear usuarios, mostrarlos en una tarjeta, y guardarlos en una BD. Para ello, se ha decidido utilizar la API de `Random User` para obtener los datos de los usuarios.

La aplicación deberá generar usuarios aleatoriamente mediante un botón `Generar usuario`, que realizará una petición `GET` a la URL `https://randomuser.me/api/?nat=es` y mostrarlos en una `card` de bootstrap con los siguientes campos:

- Foto del usuario
- Nombre
- Dirección
- Teléfono
- E-mail
- Un botón para añadir el usuario a una tabla que se generará en la página, debajo de la `card`.

Cuando se pulse otra vez el botón anterior, la `card` se actualizará con los datos de otro usuario, borrándose los datos anteriores. 

En definitiva, la tabla de abajo se irá rellenando con los usuarios que se vayan generando y se haya pulsado el botón de añadir.

La aplicación contará también con un botón `Guardar usuarios en la BD (XMLHttpRequest)` que realizará una petición `POST` a la URL `save_users.php` para guardar los usuarios en la BD, enviando para ello un objeto `JSON` que será un array con los datos de los usuarios que aparecen en la tabla, con el siguiente formato:
  
    [
        {
            "name": "Juan García",
            "phone": "666666666",
            "street": "Calle Falsa 123",
            "email": "movidas@alixar.org",
            "image": "https://randomuser.me/api/portraits/men/26.jpg__" (pongo __ para que moodle no lo interprete como una imagen)
        },
    ]


La aplicación también contará con un botón `Guardar usuarios en la BD (Fetch)` que hará lo mismo que la anterior, pero utilizando `Fetch` en lugar de `XMLHttpRequest`.

- Justo antes de la tarjeta, habrá un contenedor `<div>` que mostrará los mensajes de éxito o error que se produzcan como respuesta del servidor.

- OJO: Los errores en la `Console` del navegador se tendrán en cuenta (hay un ítem específico para ello en la rúbrica). No se tendrán en cuenta todas las trazas que pongáis mediante `console.log` y que aparezcan en la `Console`, solo las que se produzcan como consecuencia de errores en la aplicación. 


# NOTA PREVIA A LA RESOLUCIÓN DEL EJERCICIO

- Deberemos tener la tabla `users` creada en la base de datos, se proporciona el fichero `users.sql` con la sentencias para importarlas en el phpMyAdmin.
- Si no funcionase la red, la petición original a la web de Random User, podemos sustituir la URL por alguno de los ficheros json que se proporcionan con el ejercicio.
- Se proporciona el fichero `save_users.php` que se encarga de guardar los usuarios en la base de datos.


## <ins>Instrucciones para la Entrega</ins>

- Entregar ÚNICA Y EXCLUSIVAMENTE los ficheros necesarios. Serán ficheros sueltos, correspondientes a los ejercicios (EjX.html EjX.js siendo X el número del ejercicio).

- Evita ñ y acentos en los nombres.

- **Deberán subirse a GitHub** los ficheros en la carpeta correspondiente (entregable_U7) que se encontrará dentro de la carpeta U7.