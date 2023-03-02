let READY_STATE_COMPLETE = 4;
let HTTP_STATUS_OK = 200;
let xhr;
let productosList = [];
let tabla;
let mesajes = document.getElementById("mensajes");

window.onload = () => {
  document
    .getElementById("cargarProductos")
    .addEventListener("click", cargarProductos);

  document
    .getElementById("limpiarTabla")
    .addEventListener("click", limpiarTabla);

  document
    .getElementById("cargarProductosBDXMLHttpRequest")
    .addEventListener("click", cargarProductosBDXMLHttpRequest);

  document
    .getElementById("cargarProductosBDFetch")
    .addEventListener("click", cargarProductosBDFetch);
};

function cargarProductos() {
  console.log("Función cargarProductos");

  if (XMLHttpRequest) {
    xhr = new XMLHttpRequest();
    xhr.onreadystatechange = mostrarProductos;
    xhr.open("GET", "https://api.escuelajs.co/api/v1/products");
    xhr.send();
  }
}

function mostrarProductos() {
  if (xhr.readyState === READY_STATE_COMPLETE) {
    if (xhr.status === HTTP_STATUS_OK) {
      console.log("Función mostrarProductos");
      let json = JSON.parse(xhr.responseText);
      console.log(json);
      crearTabla(json);
      console.log(productosList);
    }
  }
}

function crearTabla(json) {
  console.log("Función crearTabla");

  let resultados = document.getElementById("resultados");
  resultados.innerHTML = "";
  tabla = document.createElement("table");
  resultados.appendChild(tabla);
  tabla.setAttribute("style", "border-collapse: collapse; text-align: center");
  let tr = document.createElement("tr");

  let rotulos = [
    "id",
    "title",
    "description",
    "price",
    "category_name",
    "image",
    "guardar",
  ];

  rotulos.forEach((rotulo) => {
    let th = document.createElement("th");
    th.setAttribute("style", "border: solid 2px");
    th.appendChild(document.createTextNode(rotulo));
    tr.appendChild(th);
  });
  tabla.appendChild(tr);

  for (let i = 0; i < json.length; i++) {
    let fila = document.createElement("tr");
    let objetoFila = json[i];

    let columna;

    //id
    columna = document.createElement("td");
    columna.appendChild(document.createTextNode(objetoFila.id));
    fila.appendChild(columna);

    //title
    columna = document.createElement("td");
    columna.appendChild(document.createTextNode(objetoFila.title));
    fila.appendChild(columna);

    //description
    columna = document.createElement("td");
    columna.appendChild(document.createTextNode(objetoFila.description));
    fila.appendChild(columna);

    //price
    columna = document.createElement("td");
    columna.appendChild(document.createTextNode(objetoFila.price));
    fila.appendChild(columna);

    //category_name
    columna = document.createElement("td");
    columna.appendChild(document.createTextNode(objetoFila.category.name));
    fila.appendChild(columna);

    //image
    columna = document.createElement("td");
    columna.appendChild(document.createTextNode(objetoFila.images[0]));
    columna.innerHTML = `<img src="${objetoFila.images[0]}">`;
    fila.appendChild(columna);

    //guardar
    columna = document.createElement("td");
    let btn = document.createElement("button");
    btn.innerHTML = "Guardar";
    btn.setAttribute("productoId", objetoFila.id);
    btn.addEventListener("click", (p) => {
      let producto = productosList.find(
        (p) => p.id == btn.getAttribute("productoId")
      );
      guardar(producto);
    });
    columna.appendChild(btn);
    fila.appendChild(columna);

    producto = {
      id: objetoFila.id,
      title: objetoFila.title,
      description: objetoFila.description,
      price: objetoFila.price,
      category_name: objetoFila.category.name,
      image: objetoFila.images[0],
    };

    productosList.push(producto);

    tabla.appendChild(fila);
  }
}

function guardar(producto) {
  console.log("Función guardar");
  console.log(JSON.stringify(producto));

  xhr = new XMLHttpRequest();
  xhr.addEventListener("load", (event) => {
    console.log(event.target.responseText);
    mensajes.innerHTML += event.target.result;
    mensajes.innerHTML += "</br>";
  });
  xhr.open("POST", "save_product.php");
  xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  xhr.send(JSON.stringify(producto));
}

function limpiarTabla() {
  console.log("Función limpiarTabla");

  let resultados = document.getElementById("resultados");
  resultados.innerHTML = "";
}

function cargarProductosBDXMLHttpRequest() {
  console.log("Función cargarProductosBDXMLHttpRequest");

  let xhr = new XMLHttpRequest();
  xhr.addEventListener("readystatechange", cargarProductosBD);
  xhr.open("GET", "get_products.php");
  xhr.send();
}

function cargarProductosBD(event) {
  if (event.target.readyState === READY_STATE_COMPLETE) {
        if (event.target.status === HTTP_STATUS_OK) {
          let data = JSON.parse(event.target.responseText);
          crearTablaBD(data);
        }
    }

}

function cargarProductosBDFetch() {
  console.log("Función cargarProductosBDFetch");

  fetch("get_products.php")
    .then((response) => response.json())
    .then((data) => crearTablaBD(data))
    .catch((error) => {
        console.error("Error:", error);
    });
}

function crearTablaBD(json) {
  console.log("Función crearTablaBD");

  let resultados = document.getElementById("resultados");
  resultados.innerHTML = "";
  tabla = document.createElement("table");
  resultados.appendChild(tabla);
  tabla.setAttribute("style", "border-collapse: collapse; text-align: center");
  let tr = document.createElement("tr");

  let rotulos = [
    "id",
    "title",
    "description",
    "price",
    "category_name",
    "image",
    "guardar",
  ];

  rotulos.forEach((rotulo) => {
    let th = document.createElement("th");
    th.setAttribute("style", "border: solid 2px");
    th.appendChild(document.createTextNode(rotulo));
    tr.appendChild(th);
  });
  tabla.appendChild(tr);

  for (let i = 0; i < json.length; i++) {
    let fila = document.createElement("tr");
    let objetoFila = json[i];

    let columna;

    //id
    columna = document.createElement("td");
    columna.appendChild(document.createTextNode(objetoFila.id));
    fila.appendChild(columna);

    //title
    columna = document.createElement("td");
    columna.appendChild(document.createTextNode(objetoFila.title));
    fila.appendChild(columna);

    //description
    columna = document.createElement("td");
    columna.appendChild(document.createTextNode(objetoFila.description));
    fila.appendChild(columna);

    //price
    columna = document.createElement("td");
    columna.appendChild(document.createTextNode(objetoFila.price));
    fila.appendChild(columna);

    //category_name
    columna = document.createElement("td");
    columna.appendChild(document.createTextNode(objetoFila.category_name));
    fila.appendChild(columna);

    //image
    columna = document.createElement("td");
    columna.appendChild(document.createTextNode(objetoFila.image));
    columna.innerHTML = `<img src="${objetoFila.image}">`;
    fila.appendChild(columna);

    //guardar
    columna = document.createElement("td");
    let btn = document.createElement("button");
    btn.innerHTML = "Guardar";
    btn.setAttribute("productoId", objetoFila.id);
    btn.addEventListener("click", (p) => {
      let producto = productosList.find(
        (p) => p.id == btn.getAttribute("productoId")
      );
      guardar(producto);
    });
    columna.appendChild(btn);
    fila.appendChild(columna);

    tabla.appendChild(fila);
  }
}
