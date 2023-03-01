let READY_STATE_COMPLETE = 4;
let HTTP_STATUS_OK = 200;
window.onload = inicio;

function inicio() {
  document.getElementById("nombre").addEventListener("keyup", mostrar_nombre);
}

function mostrar_nombre(e) {
  console.log(e.keyCode);
  let cadena = e.target.value;
  //let cadena = document.getElementById("nombre").value;

  if (cadena.length == 0) {
    //Si al levantar la tecla no hay nada (ej.al borrar)
    document.getElementById("sugerencia").innerHTML = "";
    return;
  } else {
    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
      if (xhr.readyState == READY_STATE_COMPLETE && xhr.status == HTTP_STATUS_OK) {
        document.getElementById("sugerencia").innerHTML = xhr.responseText;
      }
    };
    xhr.open("GET", "arraynombres_get.php?nombre=" + cadena);
    xhr.send();
  }
}
