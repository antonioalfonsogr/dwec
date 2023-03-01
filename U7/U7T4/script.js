let READY_STATE_COMPLETE = 4;
let HTTP_STATUS_OK = 200;
let peticion_http;
let container = document.getElementById("container");

window.onload = boton;

function boton() {
  let boton = document.getElementById("boton");
  boton.addEventListener("click", carga_contenido);
}

function carga_contenido() {
  if (window.XMLHttpRequest) {
    peticion_http = new XMLHttpRequest();
  } else {
    alert("No tienes soporte para AJAX");
    return; // Salimos y no hacemos la petición
  }

  // Preparamos la petición
  if (peticion_http) {
    // en la petición, me suscribo al evento "ReadyStateChange", y le
    // digo que me llame a muestra_contenido cada vez que suceda (que cambie el estado)
    peticion_http.onreadystatechange = muestra_contenido;
    peticion_http.open("GET", "series.json");
    peticion_http.send();
  }
}

function muestra_contenido() {
  if (peticion_http.readyState === READY_STATE_COMPLETE) {
    if (peticion_http.status === HTTP_STATUS_OK) {
      let json = JSON.parse(peticion_http.responseText);
      crearTabla(json);
    }
  }
}

let tabla;

function crearTabla(json) {
  let contenedor = document.getElementById("container");
  tabla = document.createElement("table");
  contenedor.appendChild(tabla);

  for (let i = 0; i < json.series.length; i++) {
    let fila = document.createElement("tr");
    let objetoFila = json.series[i]

    for (const clave in objetoFila) {
      let columna = document.createElement("td");
      columna.appendChild(document.createTextNode(objetoFila[clave]));
      console.log(objetoFila[clave]);
      fila.appendChild(columna);
    }
  tabla.appendChild(fila);
  }
}


