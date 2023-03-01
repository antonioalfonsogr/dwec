READY_STATE_COMPLETE = 4;
HTTP_STATUS_OK = 200;
window.onload = inicio;

let personajes = [];

function inicio() {
  document.getElementById("cargar_personajes_xml").onclick =
    cargar_personajes_xml;
  document.getElementById("cargar_personajes_fetch").onclick =
    cargar_personajes_fetch;
  document.getElementById("guardar_episodios").onclick = obtener_episodios;
}

function cargar_personajes_xml() {
  console.log("cargar_personajes_xml");
  let min = document.getElementById("episodios_min").value;
  let max = document.getElementById("episodios_max").value;
  document.getElementById("personajes").innerHTML = "";
  document.getElementById("fichas").innerHTML = "";
  for (let i = min; i <= max; i++) {
    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
      if (
        xhr.readyState === READY_STATE_COMPLETE &&
        xhr.status === HTTP_STATUS_OK
      ) {
        let data = JSON.parse(xhr.responseText);
        document.getElementById(
          "resultados"
        ).innerHTML += `Personaje ${data.name} cargado <br>`;
        console.log(data);
        personajes.push(data);
        anyadir_a_select(data);
        generar_fichas(data);
      }
    };
    xhr.open("GET", `https://rickandmortyapi.com/api/character/${i}`);
    xhr.send();
  }
}

function cargar_personajes_fetch() {
  console.log("cargar_personajes_fetch");
  let min = document.getElementById("episodios_min").value;
  let max = document.getElementById("episodios_max").value;
  document.getElementById("personajes").innerHTML = "";
  document.getElementById("fichas").innerHTML = "";
  for (let i = min; i <= max; i++) {
    fetch(`https://rickandmortyapi.com/api/character/${i}`)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
      })
      .then((data) => {
        console.log(data);
        document.getElementById(
          "resultados"
        ).innerHTML += `Personaje ${data.name} cargado <br>`;
        personajes.push(data);
        anyadir_a_select(data);
        generar_fichas(data);
      })
      .catch((err) => console.log(err));
  }
}

function obtener_episodios() {
  console.log("obtener_episodios");

  let id_personaje = document.getElementById("personajes").value;

  for (const personaje of personajes) {
    if (personaje.id == id_personaje) {
      let episodios = personaje.episode;
      console.log(episodios);
      for (const episodio of episodios) {
        let xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
          if (
            xhr.readyState === READY_STATE_COMPLETE &&
            xhr.status === HTTP_STATUS_OK
          ) {
            let data = JSON.parse(xhr.responseText);
            document.getElementById(
              "resultados"
            ).innerHTML += `Episodio ${data.name} cargado <br>`;
            console.log(data);
            guardar_episodio(data);
          }
        };

        //TODO: Hay que hacer esto
        xhr.open("GET", episodio);
        xhr.send();
      }
    }
  }
}

function guardar_episodio(episodio) {
  fetch("guardar_episodio_rm.php", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(episodio),
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
    })
    .then((data) => {
      console.log(data);
      document.getElementById(
        "resultados"
      ).innerHTML += `${data.resultado}<br>`;
    })
    .catch((err) => console.log(err));
}

function anyadir_a_select(personaje) {
  console.log("generar_select");
  let select = document.getElementById("personajes");
  let option = document.createElement("option");
  option.setAttribute("value", personaje.id);
  option.innerHTML = personaje.name;
  select.appendChild(option);
}

function generar_fichas(data) {
  console.log("generar_fichas");
  let fichas = document.getElementById("fichas");
  let div = document.createElement("div");
  div.setAttribute("class", "ficha");
  div.setAttribute("id", data.id);
  let img = document.createElement("img");
  img.setAttribute("src", data.image);
  div.appendChild(img);
  let h3 = document.createElement("h3");
  h3.innerHTML = data.name;
  div.appendChild(h3);
  let p = document.createElement("p");
  p.innerHTML = data.species;
  div.appendChild(p);
  p = document.createElement("p");
  p.innerHTML = data.location.name;
  div.appendChild(p);
  p = document.createElement("p");
  p.innerHTML = data.created;
  div.appendChild(p);
  fichas.appendChild(div);
  fichas.appendChild(document.createElement("hr"));
}
