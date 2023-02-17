// Cuando se carga el documento comienza iniciar()
let READY_STATE_COMPLETE = 4;
let HTTP_STATUS_OK = 200;
window.onload = iniciar;
let request;

function iniciar() {
  document.getElementById("enviar").addEventListener("click", lanzar_peticion, true);
}

function lanzar_peticion() {
  if (window.XMLHttpRequest) {
    request = new XMLHttpRequest();
    carga_async("http://localhost:8090/U7_asincrona/teoria/codigo/fecha.php");
  } else {
    alert("No tienes soporte para AJAX");
  }
}

// Carga el contenido de la url de forma asíncrona con Ajax
function carga_async(url) {
  if (request) {
    // Carga el indicador Ajax antes de realizar la petición.
    document.getElementById("indicador").innerHTML = "<img src='./ajax-loader.gif'/>";

    console.log(request.readyState); // Estado 0
    //Si existe el objeto miXHR abrimos la url (asíncrona)
    request.open("GET", url, true);
    console.log(request.readyState); // Estado 1
    // En cada cambio de estado llama a estado_peticion
    request.onreadystatechange = estado_peticion;
    // Hacemos la petición al servidor con GET y sin parámetros
    request.send();

    console.log("justo después del send");
  }
}

// Se llama en cada cambio de estado de la petición.
// 1. readyState == 4 cuando la petición ha terminado.
// 2. Status === 200 encontrado; === 404 no encontrado…
function estado_peticion() {
  console.log(request.readyState);
  if (request.readyState === READY_STATE_COMPLETE && request.status === HTTP_STATUS_OK) {
    // Desactivamos el indicador AJAX.
    document.getElementById("indicador").innerHTML = "";
    // Metemos en el contenedor resultados las  respuestas de la petición AJAX.
    div_txt(document.getElementById("resultados"), request.responseText);
  }
}

// Función para modificar el contenido de un div;
function div_txt(nodo, texto) {
  while (nodo.firstChild) {
    // Eliminamos todos los hijos de ese objeto.
    nodo.removeChild(nodo.firstChild);
  }
  // Cuando ya no tenga hijos, agregamos un hijo con  el texto que recibela función.
  nodo.appendChild(document.createTextNode(texto));
}
