window.addEventListener("load", inicio);

function inicio() {
    document.getElementById("buttonInputText").addEventListener("click", createInputText);
    document.getElementById("buttonInputPassword").addEventListener("click", createInputPassword);
    document.getElementById("buttonTextArea").addEventListener("click", createTextArea);
    document.getElementById("buttonLabel").addEventListener("click", createLabel);
    document.getElementById("buttonImage").addEventListener("click", createImage);
    document.getElementById("buttonCheckbox").addEventListener("click", createCheckbox);
    document.getElementById("buttonRadio").addEventListener("click", Radio);
    document.getElementById("buttonSubmit").addEventListener("click", Submit);
}

function createInputText() {
    let formulario = document.getElementById("formulario");
    let nombre = prompt("Intruduzca el nombre");
    let newInputText = document.createElement("input");
    newInputText.setAttribute("type", "text");
    newInputText.setAttribute("name", nombre);
    newInputText.setAttribute("id", nombre);
    formulario.appendChild(newInputText);
}

function createInputPassword() {
    let formulario = document.getElementById("formulario");
    let nombre = prompt("Intruduzca el nombre");
    let newInputPassword = document.createElement("input");
    newInputPassword.setAttribute("type", "password");
    newInputPassword.setAttribute("name", nombre);
    newInputPassword.setAttribute("id", nombre);
    formulario.appendChild(newInputPassword);
}

function createTextArea() {
    let formulario = document.getElementById("formulario");
    let nombre = prompt("Intruduzca el nombre");
    let newTextArea = document.createElement("textarea");
    newTextArea.setAttribute("name", nombre);
    newTextArea.setAttribute("id", nombre);
    newTextArea.setAttribute("cols", 40);
    newTextArea.setAttribute("row", 5);
    formulario.appendChild(newTextArea);
}

function createLabel() {
    let formulario = document.getElementById("formulario");
    let forAtrr = prompt("Intruduzca el for");
    let texto = prompt("Intruduzca el texto");
    let newLabel = document.createElement("label");
    newLabel.setAttribute("for", forAtrr);
    newLabel.appendChild(document.createTextNode(texto));
    formulario.appendChild(newLabel);
}

function createImage() {
    let formulario = document.getElementById("formulario");
    let nombre = prompt("Intruduzca el src");
    let newImage = document.createElement("img");
    newImage.setAttribute("src", nombre);
    newImage.setAttribute("alt", nombre);
    formulario.appendChild(newImage);
}

function createCheckbox() {
    let formulario = document.getElementById("formulario");
    let nombre = prompt("Intruduzca el nombre");
    let newCheckbox = document.createElement("input");
    newCheckbox.setAttribute("type", "checkbox");
    newCheckbox.setAttribute("name", nombre);
    newCheckbox.setAttribute("id", nombre);
    formulario.appendChild(newCheckbox);
}

function Radio() {
    let formulario = document.getElementById("formulario");
    let nombre = prompt("Intruduzca el nombre");
    let newCheckbox = document.createElement("input");
    newCheckbox.setAttribute("type", "radio");
    newCheckbox.setAttribute("name", nombre);
    newCheckbox.setAttribute("id", nombre);
    formulario.appendChild(newCheckbox);
}

function Submit() {
    let formulario = document.getElementById("formulario");
    let texto = prompt("Intruduzca el texto");
    let newLabel = document.createElement("button");
    newLabel.setAttribute("type", "submit");
    newLabel.appendChild(document.createTextNode(texto));
    formulario.appendChild(newLabel);
}