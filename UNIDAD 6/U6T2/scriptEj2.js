window.addEventListener("load", inicio);

function inicio() {
    document.getElementById("introduzcaUnTexto").addEventListener("click", introduzcaUnTexto);
    document.getElementById("borrarPrimerLi").addEventListener("click", borrarPrimerLi);
    document.getElementById("borrarUltimoLi").addEventListener("click", borrarUltimoLi);
}

function introduzcaUnTexto() {
    let lista = document.getElementById("lista");
    let nuevoLi = document.createElement("li");
    let texto = document.createTextNode(prompt("Introduzca el texto:"));
    nuevoLi.appendChild(texto);
    lista.appendChild(nuevoLi);
}

function borrarPrimerLi() {
    let lista = document.getElementById("lista");
    lista.removeChild(lista.firstElementChild);
}

function borrarUltimoLi() {
    let lista = document.getElementById("lista");
    lista.removeChild(lista.lastElementChild);
}
