window.addEventListener("load", inicio);

function inicio(){
    let cuerpo = document.getElementsByTagName("body");
    let formulario = document.createElement("form");
    formulario.setAttribute("id","formulario")
    cuerpo[0].appendChild(formulario);

    let divNombreDisco = crearDiv();
    formulario.appendChild(divNombreDisco);
    divNombreDisco.appendChild(crearLabel("Nombre del disco: ", "nombreDisco"));
    divNombreDisco.appendChild(crearInput("text", "nombreDisco"));

    let divGrupoCantante = crearDiv();
    formulario.appendChild(divGrupoCantante);
    divGrupoCantante.appendChild(crearLabel("Grupo de música o cantante: ", "grupoCantante"));
    divGrupoCantante.appendChild(crearInput("text", "grupoCantante"));

    let divYearPublicacion = crearDiv();
    formulario.appendChild(divYearPublicacion);
    divYearPublicacion.appendChild(crearLabel("Año de publicación: ", "yearPublicacion"));
    divYearPublicacion.appendChild(crearInput("number", "yearPublicacion"));

    let divTipoMusica = crearDiv();
    formulario.appendChild(divTipoMusica);
    divTipoMusica.appendChild(crearLabel("Tipo de música: ", "tipoMusica"));
    let etiquetaSelect = crearSelect("tipoMusica");
    divTipoMusica.appendChild(etiquetaSelect);
    etiquetaSelect.appendChild(crearOption("seleccionar", "Seleccionar"));
    etiquetaSelect.appendChild(crearOption("rock", "Rock"));
    etiquetaSelect.appendChild(crearOption("pop", "Pop"));
    etiquetaSelect.appendChild(crearOption("puck", "Punk"));
    etiquetaSelect.appendChild(crearOption("indie", "Indie"));

    let divLocalizacion = crearDiv();
    formulario.appendChild(divLocalizacion);
    divLocalizacion.appendChild(crearLabel("Localización: ", "localizacion"));
    divLocalizacion.appendChild(crearInput("text", "localizacion"));

    let divPrestado = crearDiv();
    formulario.appendChild(divPrestado);
    divPrestado.appendChild(crearLabel("Prestado: ", "prestado"));
    divPrestado.appendChild(crearInput("checkbox", "prestado"));
}

function crearDiv(){
    return document.createElement("div");
}

function crearLabel(texto, attFor){
    let etiqueta = document.createElement("label");
    etiqueta.setAttribute("for", attFor);
    etiqueta.appendChild(document.createTextNode(texto));
    return etiqueta;
}

function crearInput(tipo, nombreId){
    let etiqueta = document.createElement("input");
    etiqueta.setAttribute("type", tipo);
    etiqueta.setAttribute("name", nombreId);
    etiqueta.setAttribute("id", nombreId);
    return etiqueta;
}

function crearSelect(nameId){
    let etiqueta = document.createElement("select");
    etiqueta.setAttribute("name", nameId);
    etiqueta.setAttribute("id", nameId);
    return etiqueta;
}

function crearOption(valor, texto){
    let etiqueta = document.createElement("option");
    etiqueta.setAttribute("value", valor);
    etiqueta.appendChild(document.createTextNode(texto));
    return etiqueta;
}