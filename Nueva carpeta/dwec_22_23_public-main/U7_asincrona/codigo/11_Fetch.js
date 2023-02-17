/*
		  fetch(direccion_servicio)
		    .then(funcion_que_recibe_el_objeto_de_la_respuesta_si_la_peticion_finaliza_bien)
		    .catch(funcion_que_recibe_el_error_producido_durante_la_petición);


      // EJEMPLO CORTO

		  fetch('http://example.com/movies.json')
		    .then(response => response.json())
		    .then(data => console.log(data));
			  .catch( err => console.log(err) );
      
      // EJEMPLO LARGO
        
			fetch('/echo/json/', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(objeto_datos)
			})
			.then(function (response) {
				return response.json();
			})
			.then(function (result) {
				alert(result);
			})
			.catch (function (error) {
				console.log('Request failed', error);
			});
			

		   */

// Fetch sobre fichero
fetch("holamundo.txt")
  .then((response) => response.text())
  .then((texto) => {
    console.log(texto);
  })
  .catch((error) => {
    console.log(error);
  });

// Fetch sobre fichero XML
fetch("catalogo.xml")
  .then((response) => response.text())
  .then((str) => new window.DOMParser().parseFromString(str, "text/xml"))
  .then((data) => console.log(data))
  .catch((err) => console.log(err));

// Fetch sobre fichero json (hipercorto)
fetch("personajes.json")
  .then((response) => response.json())
  .then((data) => console.log(data))
  .catch((err) => console.log(err));

// Fetch sobre fichero json
fetch("https://covid-vacuna.app/data/latest.json")
  .then((response) => {
    if (response.ok) {
      return response.json();
    }
  })
  .then((data) => {
    procesar_respuesta(data);
  })
  .catch((err) => console.log(err));

// Fetch configurando método, cabeceras y el cuerpo
fetch("actualizar_comunidad.php", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify(comunidad)
})
  .then((response) => {
    if (response.ok) {
      return response.json();
    }
  })
  .then((data) => {
    for (let i = 0; i < comunidades.length; i++) {
      if (data.ccaa === comunidades[i].ccaa) {
        comunidades[i] = data;
      }
    }
    document.getElementById("resultados").innerHTML = "Comunidad actualizada";
    procesar_comunidades(comunidades);
  })
  .catch((err) => console.log(err));
