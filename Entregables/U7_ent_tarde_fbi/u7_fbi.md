# Ejercicio 1

La empresa de seguridad privada *Prochegur* desea elaborar su propia versión de la aplicación *FBI Most Wanted* para poder gestionar los criminales más buscados por la policía. Para ello necesita disponer de una aplicación web, con las siguientes características:

- Un botón `Carga Criminales` que recupere los criminales (petición `GET` mediante el objeto `XMLHttpRequest` a la URL `https://api.fbi.gov/@wanted`) y los muestre en una tabla con los siguientes campos:

    - uid
    - title
    - description
    - aliases
    - images (este campo deberá mostrar una imagen pequeña de cada criminal, la cual se obtendrá de la propiedad `thumb` del objeto `images`)
    - Un botón `Guardar` que permita guardar el criminal en la base de datos de la aplicación. Para ello se deberá realizar una petición `POST` a la URL `save_criminal.php` con el siguiente formato (se muestra un ejemplo):

            [
              {
                "uid": "198fe2febc2a4ad14427bad3ca3ce78e2",
                "title": "ELIZABETH ANNA DUKE",
                "description": "Unlawful Possession of United States Identification; Conspiracy; Unlawful Storage of Explosives; Unlawful Possession of Firearms and Destructive Devices; Storage and Concealment of Stolen Explosives; Unlawful Possession of Five or More False Identification Documents; Possession of Counterfeit Social Security Cards; Aiding and Abetting; Unlawful Possession of Document-Making Implement",
                "aliases": [
                  "Betty Ann Duke",
                  "Elizabeth Ann Duke",
                  "Betty Weir",
                  "\"Betty Ann\""
                ],
                "images":"https://www.fbi.gov/wanted/topten/duke/@@images/image/large"
              },
              {
                //...
              }
            ]

El servidor responderá con un `JSON` con el estado de la petición y el mensaje de error en caso de que haya habido algún error. Algo así:

    {
      "result": "Criminal inserted properly.",
    }

  - Un botón `Limpiar tabla` que limpie la tabla de criminales.
  - Un botón `Carga criminales desde la BD (XMLHttpRequest)` que recupere los criminales de la base de datos y los muestre en la tabla, al igual que antes, pero desde la base de datos. Se hará realizando una petición mediante `XMLHttpRequest` y el método `GET` a la URL `get_criminals.php` y sin parámetros, que devolverá un `JSON` con los criminales de la base de datos.
  - Un botón `Carga criminales desde la BD (fetch)` que recupere los criminales de la base de datos y los muestre en la tabla, al igual que antes, pero utilizando la función `fetch` y la URL `get_criminals.php` y sin parámetros, que devolverá un `JSON` con los criminales de la base de datos.

  - Justo antes de la tabla, habrá un contenedor `<div>` que mostrará los mensajes de éxito o error que se produzcan como respuesta del servidor.

  - OJO: Los errores en `console.log `se tendrán en cuenta (hay un ítem específico para ello en la rúbrica). No se tendrán en cuenta todas las trazas que pongáis en `console.log`, solo las que se produzcan como consecuencia de errores en la aplicación. 


# NOTA PREVIA A LA RESOLUCIÓN DEL EJERCICIO

- Deberemos tener la tabla `criminals` creada en la base de datos, se proporciona el fichero `criminals.sql` con la sentencias para importarlas en el phpMyAdmin.
- Si no funcionase la red, la petición original a la web del FBI la podemos sustituir por el fichero `wanted.json` que se proporciona en el ejercicio.
- Se proporcionan los ficheros `save_criminal.php` y `get_criminals.php` que se encargan de guardar y recuperar los criminales de la base de datos.
  
## <ins>Instrucciones para la Entrega</ins>

- Entregar ÚNICA Y EXCLUSIVAMENTE los ficheros necesarios. Serán ficheros sueltos, correspondientes a los ejercicios (EjX.html EjX.js siendo X el número del ejercicio).

- Evita ñ y acentos en los nombres.

- **Deberán subirse a GitHub** los ficheros en la carpeta correspondiente (entregable_U7) que se encontrará dentro de la carpeta U7.
