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
    peticion_http.open("GET", "./series.xml");
    peticion_http.send();
  }
}

function muestra_contenido() {
  if (peticion_http.readyState === READY_STATE_COMPLETE) {
    if (peticion_http.status === HTTP_STATUS_OK) {
      let xml = peticion_http.responseXML;
      crearTabla(xml);
    }
  }
}

function crearTabla(xml) {
  let contenedor = document.getElementById("container");
  let tabla = document.createElement("table");
  contenedor.appendChild(tabla);

  console.log(xml.getElementsBytagName("titulo"));

  let titulo = xml.getElementsBytagName("titulo");
  let cadena = xml.getElementsBytagName("cadena");
  let director = xml.getElementsBytagName("director");
  let anyo = xml.getElementsBytagName("anyo");
  let terminada = xml.getElementsBytagName("terminada");

  crearColumna(titulo);
  crearColumna(cadena);
  crearColumna(director);
  crearColumna(anyo);
  crearColumna(terminada);
}

function crearColumna(etiqueta) {
  let columna = document.createElement("tr");

  for (let i = 0; i < etiqueta.length; i++) {
    let fila = document.createElement("td");
    fila.appendChild(etiqueta[i].textContent);
    columna.appendChild(fila);
  }
  tabla.appendChild(columna);
}
