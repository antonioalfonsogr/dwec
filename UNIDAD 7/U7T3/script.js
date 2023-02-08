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
    peticion_http.open("GET", "series.xml");
    peticion_http.send();
  }
}

function muestra_contenido() {
  if (peticion_http.readyState === READY_STATE_COMPLETE) {
    if (peticion_http.status === HTTP_STATUS_OK) {
      let xml = peticion_http.responseXML;
      console.log(xml)
      crearTabla(xml);
    
    }
  }
}

let tabla;

function crearTabla(xml) {
  let contenedor = document.getElementById("container");
  tabla = document.createElement("table");
  contenedor.appendChild(tabla);

  let titulos = xml.getElementsByTagName("titulo");
  let cadenas = xml.getElementsByTagName("cadena");
  let directores = xml.getElementsByTagName("director");
  let anyos = xml.getElementsByTagName("anyo");
  let terminadas = xml.getElementsByTagName("terminada");

  crearFila(titulos);
  crearFila(cadenas);
  crearFila(directores);
  crearFila(anyos);
  crearFila(terminadas);
}

function crearFila(etiquetas) {
  let fila = document.createElement("tr");
  fila.setAttribute("class", etiquetas[0].nodeName)

  for (let i = 0; i < etiquetas.length; i++) {
    let columna = document.createElement("td");
    columna.appendChild(document.createTextNode(etiquetas[i].textContent));

    if (etiquetas[0].nodeName === "anyo"){
      
      (parseInt(etiquetas[i].textContent) < 2000) ? columna.setAttribute("class", "rojo") :
      (parseInt(etiquetas[i].textContent) < 2010) ? columna.setAttribute("class", "amarillo") :
      columna.setAttribute("class", "verde") 
    }

    fila.appendChild(columna);
  }

  tabla.appendChild(fila);
}
