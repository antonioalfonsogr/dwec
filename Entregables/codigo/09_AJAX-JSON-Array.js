let READY_STATE_COMPLETE = 4;
let HTTP_STATUS_OK = 200;

window.onload = inicio;

function inicio() {
  document.getElementById("mostrar").addEventListener("click", mostrar);
}

function mostrar() {
  let xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function () {
    if (
      this.readyState == READY_STATE_COMPLETE &&
      this.status == HTTP_STATUS_OK
    ) {
      // Al hacer parse de un array recibimos un array
      let alumnos = JSON.parse(this.responseText);

      // Recorremos el array
      for (let i = 0; i < alumnos.length; i++) {
        document.getElementById("parrafo").innerHTML += alumnos[i] + "<br/>";
      }

      // Para convertir un array Javascript en cadena JSON usamos stringfy
      let cadena = JSON.stringify(alumnos);
      document.getElementById("parrafo").innerHTML +=
        "El array " + alumnos + "en modo cadena es " + cadena + "<br/>";
    }
  };
  xhr.open("GET", "09_AJAX-JSON-Array.php");
  xhr.send();
}
