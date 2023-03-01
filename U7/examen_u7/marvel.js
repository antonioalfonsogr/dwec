const API_BASE_URL = "https://gateway.marvel.com/";
const PRIVATE_API_KEY = "19a89b6785b90d7b82e2dfd0b03f4615aa688720";
const PUBLIC_API_KEY = "b3f6c0aab03f7be97203ecfeb7bc1b11";
const TS = "1000";
//const HASH = md5(TS + PRIVATE_API_KEY + PUBLIC_API_KEY);

let xhr
let personajesCargados;

window.onload = () => {
  document
    .getElementById("cargarPersonajes")
    .addEventListener("click", cargarPersonajes);

  document
    .getElementById("guardarEnBDXML")
    .addEventListener("click", guardarEnBDXML);

  document
    .getElementById("recuperarDeBDFetch")
    .addEventListener("click", recuperarDeBDFetch);

  document
    .getElementById("limpiarTabla")
    .addEventListener("click", limpiarTabla);
};

function cargarPersonajes() {
    console.log("Función cargarPersonajes");

//  fetch(`${API_BASE_URL}/v1/public/characters?apikey=${PUBLIC_API_KEY}&hash=${HASH}&ts=${TS}&limit=10&offset=0`)

    fetch("marvel.json")
    .then((response) => {
        if (response.ok) return response.json();
    })
    .then((personajes) => {
        console.log(personajes);
        personajesCargados = personajes.data.results;
        console.log(personajesCargados);
        pintarPersonajes(personajes.data.results)
        
    })
    .catch(
        console.log("Error al cargar personajes.")
    );
}

function pintarPersonajes(results){
    console.log("Función pintarPersonajes");

    console.log(results);

    results.forEach(element => {

        document.getElementById("resultados").innerHTML += 
        
        `<div class="card" style="width: 18rem;">
            <img src="${element.thumbnail.path}/portrait_uncanny.${element.thumbnail.extension}" class="card-img-top" alt="${element.name}">
            <div class="card-body">
                <h5 class="card-title">${element.name}</h5>
                <p class="card-text">Modified: ${element.modified}</p>
                <p class="card-text">Comics: ${element.comics.items.forEach(item => {item.name + "</br>"})}</p>
                <p class="card-text">ID: ${element.id}</p>
                    <div class="form-check form-switch">
                    <input class="form-check-input" type="checkbox" id="flexSwitchCheckDefault">
                    <label class="form-check-label" for="flexSwitchCheckDefault">Guardar</label>
                    </div>
            </div>
        </div>`

        document.getElementById("resultados").innerHTML += "</br>";

    });
}       

function guardarEnBDXML() {
    console.log("Función guardarEnBDXML");
    let personajesGuardar;
    personajesGuardar = document.getElementById("resultados");
//    console.log(personajesGuardar);

    let personajesGuardarJson;
    personajesCargados.forEach(personaje => {
        console.log(personaje)
        if(personaje){
            let personajeJson = {
                id: personaje.id,
                name: personaje.name,
                modified: personaje.modified,
                path: personaje.thumbnail.path + "/portrait_uncanny." + personaje.thumbnail.extension
            };
            personajesGuardarJson.push(personajeJson);
        }
        console.log(personajesGuardarJson)
    })

    xhr = new XMLHttpRequest();
    xhr.open('POST', 'save_marvel_characters.php');
    xhr.setRequestHeader("Content-type", "application/json");
    xhr.onreadystatechange = () => {
        if (xhr.readyState === 4 && xhr.status === 200){
        }else {
            alert("Error de servidor al guardar personajes.")
        }
    }
    xhr.send(personajesGuardar);
}

function recuperarDeBDFetch() {
    console.log("Función recuperarDeBDFetch");
}

function limpiarTabla() {
    console.log("Función limpiarTabla");

    document.getElementById("resultados").innerHTML = "";
}
