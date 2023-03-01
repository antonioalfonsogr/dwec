let xhr;

window.onload = () => {
  document
    .getElementById("modificarDatos")
    .addEventListener("click", modificarDatos);
};

window.onload = () => {
  document
    .getElementById("cargarDatosXML")
    .addEventListener("click", cargarDatosXML);
};

window.onload = () => {
  document
    .getElementById("cargarDatosFetch")
    .addEventListener("click", cargarDatosFetch);
};

function modificarDatos() {
  console.log("Modificar Datos");
}

function cargarDatosXML() {
  console.log("Cargar Datos XML");

  if (XMLHttpRequest.request) {
    xhr = new XMLHttpRequest();
    xhr.onreadystatechange = comprobar;
    xhr.open("GET", "latest.json");
    xhr.send();
  }
}

function comprobar() {
  if (xhr.readyState === READY_STATE_COMPLETE && xhr.status === 200) {
    console.log("comprobar ok");
    console.log(JSON.parse(xhr.responseText));
    let comunidades = JSON.parse(xhr.responseText);

    let comunidadesJson = [];
    comunidades.forEach((comunidad) => {
      if (comunidad.ccaa !== "Totales") {
        let comunidadJson = {
          ccaa: comunidad.ccaa,
          dosisEntregadas: comunidad.dosisEntregadas,
          dosisAdministradas: comunidad.dosisAdministradas,
          dosisPautaCompletada: comunidad.dosisPautaCompletada,
          porcentajeEntregadas: comunidad.porcentajeEntregadas,
          porcentajePoblacionAdministrada:
            comunidad.porcentajePoblacionAdministrada,
          porcentajePoblacionCompletas: comunidad.porcentajePoblacionCompletas,
        };
        comunidadJson.push(comunidadJson);
      }
    });
    console.log(comunidadesJson);

    insertarComunidades(comunidadesJson);
  }
}

function insertarComunidades(comunidades) {
  console.log("Insertar Comunidades");
  fetch("insertar_comunidades.php", {
    method: "POST",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify(comunidades),
  })
    .then((response) => {
      if (response.ok) return response.json();
    })
    .then((data) => {
      console.log(data);
      construirTabla(data);
    });
}

function insertarComunidadesXmlHttpRq(comunidades) {
  xhr = new XMLHttpRequest();
  xhr.open("POST", "insertar_comunidades-php");
  xhr.setRequestHeader("Content-type", "application/json");
  let comunidadesJson = JSON.stringify(comunidades);
  xhr.onreadystatechange = () => {
    if (xhr.readyState === READY_STATE_COMPLETE && xhr.status === 200) {
      let ccaaJson = JSON.parse(xhr.responseText);
      console.log(ccaaJson);
      construirTabla(ccaaJson);
    }
  };
  xhr.send(comunidadesJson);
}

function construirTabla(comunidades) {
  let divTabla = document.getElementById("tabla");
  let tabla = document.createElement("table");
  tabla.setAttribute("style", "border-collapse: collapse; text-align: center");
  let tr = document.createElement("tr");
  tr.setAttribute("style", "border: solid 2px");

  let rotulos = [
    "Comunidad",
    "D. Entregadas",
    "D. Admin",
    "D. Completada",
    "% Entregadas",
    "% Pob Admin",
    "% Pob Completa",
  ];

  rotulos.forEach((rotulo) => {
    let th = document.createElement("th");
    th.setAttribute("style", "border: solid 2px");
    th.appendChild(document.createTextNode(rotulo));
    tr.appendChild(th);
  });

  tabla.appendChild(tr);

  comunidades.forEach((comunidades) => {
    let tr = document.createElement("tr");

    for (let comunidadKey in comunidades) {
      let td = document.createElement("td");
      td.setAttribute("style", "border: solid 2px");
      td.appendChild(document.createTextNode(comunidades[comunidadKey]));
      tr.appendChild(td);
    }

    tabla.appendChild(tr);
  });

  divTabla.appendChild(tabla);
}

function cargarDatosFetch() {
  console.log("Cargar Datos Fetch");
}
