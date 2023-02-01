let READY_STATE_COMPLETE = 4;
let HTTP_STATUS_OK = 200;

let peticion_http;

window.onload = boton;

function carga_contenido() {
  if (window.XMLHttpRequest) {
    peticion_http = new XMLHttpRequest();
  } else {
    alert("No tienes soporte para AJAX");
    return; // Salimos y no hacemos la petición
  }

  // Preparamos la petición
  if (peticion_http) {
    const texto = document.getElementById("texto");
    // en la petición, me suscribo al evento "ReadyStateChange", y le
    // digo que me llame a muestra_contenido cada vez que suceda (que cambie el estado)
    peticion_http.onreadystatechange = muestra_contenido;
    peticion_http.open("GET", `localidad.php?localidad=${texto}`);
    peticion_http.send();
  }
}

function muestra_contenido() {
  if (peticion_http.readyState === READY_STATE_COMPLETE) {
    if (peticion_http.status === HTTP_STATUS_OK) {
      let resultado = documet.getElementById("resultado");
      resultado.innerHTML = peticion_http.responseText;
      console.log(peticion_http.responseText);

      peticion_http.responseText === "SI"
        ? (resultado.style.color = "green")
        : (resultado.style.color = "red");
    }
  }
}

function boton() {
  let boton = document.getElementById("boton");
  boton.addEventListener("click", carga_contenido);
}
