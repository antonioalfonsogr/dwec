let READY_STATE_COMPLETE = 4;
let HTTP_STATUS_OK = 200;

window.onload = inicio;

function inicio() {
  document.getElementById("mostrar").addEventListener("click", mostrar);
}

function mostrar() {
  let puntos = document.getElementById("puntuacion").value;
  let objeto = {
    tabla: "alumnos",
    valor: parseInt(puntos),
  };

  let xhr = new XMLHttpRequest();
  let txt = "";
  xhr.onreadystatechange = function () {
    if (
      this.readyState == READY_STATE_COMPLETE &&
      this.status == HTTP_STATUS_OK
    ) {
      console.log(this.responseText);
      let array = JSON.parse(this.responseText);
      for (x in array) {
        txt += array[x].alumno + " : " + array[x].puntuacion + "<br/>";
      }
      document.getElementById("texto").innerHTML = txt;
    }
  };
  let parametros = JSON.stringify(objeto);

  xhr.open("POST", "10_AJAX-JSON-BBDD.php", true);
  xhr.setRequestHeader("Content-type", "application/json");
  xhr.send(parametros);
}
