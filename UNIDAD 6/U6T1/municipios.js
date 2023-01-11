//Dispones del código de una página web en html: pagina.html.
//Introduce en el apartado de script el código necesario para extraer:
//Para agregar texto en la página deberás introducir una etiqueta div con el id=info y
//añadir en ella toda la información detallada mediante:
//let info = document.getElementById(“info”);
//info.innerHTML = “Texto informativo”;

//El número de párrafos de la página.
let parrafos = document.getElementsByTagName("p");
console.log("número de párrafos: " + parrafos.length);

//El texto del segundo párrafo.
let segundoParrafo = parrafos[1].textContent;
console.log("texto segundo párrafo: " + segundoParrafo);

//El número de enlaces de la página.
let enlaces = document.getElementsByTagName("a");
console.log("número de enlaces: " + enlaces.length);

//La dirección del primer enlace.
let primerEnlace = enlaces[0].attributes.getNamedItem("href").value;
console.log("dirección del primer enlace: " + primerEnlace);

//La dirección del penúltimo enlace.
let penultimateEnlace =
  enlaces[enlaces.length - 2].attributes.getNamedItem("href").value;
console.log("dirección del penultimo enlace: " + penultimateEnlace);

//El número de enlaces que apuntan a /wiki/Municipio
let enlacesWikiMunicipio = 0;

for (let i = 0; i < enlaces.length; i++) {
  enlaces[i].attributes.getNamedItem("href").value.includes("/wiki/Municipio")
    ? enlacesWikiMunicipio++
    : null;
}

console.log("enlances /wiki/Municipio: " + enlacesWikiMunicipio);

//El número de enlaces del primer párrafo.
let enlacesPrimerParrafo = parrafos[0].getElementsByTagName("a");
console.log("enlaces primer párrafo: " + enlacesPrimerParrafo.length);
