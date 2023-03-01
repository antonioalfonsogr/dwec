/*
  JSON (Javascript Object Notation)
- Sintaxis para guardar e intercambiar datos.
- Texto escrito en notación de objetos de Javascript. 
- JSON es más corto que XML, más rápido de leer y escribir y puede usar arrays.

 SINTAXIS:
        - Datos: "nombre": "valor" //Siempre el nombre va entre comillas
        - Valor: número, booleano y null sin comillas; cadena (comillas); objetos (llaves); 
          array (corchetes). No podemos enviar funciones, fechas ni undefined.
        Ej. let ada = {"nombre":"Chema", "nacimiento":1982, "pais":"España"} */

// OBJETOS: nombre del objeto y entre llaves, par nombre:valor
let objeto1 = {
  nombre: "Chema",
  nacimiento: 1982,
  pais: "España",
};

// Acceso: utilizamos la notación punto o corchetes (son equivalentes)
console.log(`${objeto1.nombre}:${objeto1.nacimiento}:${objeto1.pais}`);
console.log(`${objeto1["nombre"]}:${objeto1["nacimiento"]}:${objeto1["pais"]}`);

// Recorrer los nombres de un objeto
for (let x in objeto1) {
  let node_text = document.createTextNode(`${x}:${objeto1[x]}`);
  let node_br = document.createElement("br");
  document.getElementById("resultado").appendChild(node_text);
  document.getElementById("resultado").appendChild(node_br);
}

// Objetos que contienen otros objetos
let objeto2 = {
  nombre: "Chema",
  nacimiento: 1982,
  pais: "España",
  hijos: {
    hijo1: "Pepito Durán",
    hijo2: "Juanita Durán",
    hijo3: "Ramiro Durán",
  },
};

// Acceso a un objeto dentro de otro objeto
let y = objeto2.hijos.hijo1; //objeto2.hijos["hijo1"];
console.log(`Hijo 1 es ${y}`);

// ARRAYS: nombre del array, y entre corchetes los valores
let hijos = {
  hijos: ["Pepito Durán", "Juanita Durán", "Ramiro Durán"],
};
let objeto3 = {
  nombre: "Chema",
  nacimiento: 1982,
  pais: "España",
  hijos: ["Pepito Durán", "Juanita Durán", "Ramiro Durán"],
};

// Acceso
let z = objeto3.hijos[1];
console.log(`Hijo 2 es ${z}`);

// Recorrer los elementos de un array
let z1 = "";
for (let i in objeto3.hijos) {
  z1 += `${objeto3.hijos[i]}, `;
}

let node_text = document.createTextNode(`Todos los hijos:${z1} `);
let node_br = document.createElement("br");
document.getElementById("resultado").appendChild(node_text);
document.getElementById("resultado").appendChild(node_br);

let z2 = "";
for (let i = 0; i < objeto3.hijos.length; i++) {
  z2 += `${objeto3.hijos[i]}, `;
}

node_text = document.createTextNode(`Todos los hijos:${z2} `);
node_br = document.createElement("br");
document.getElementById("resultado").appendChild(node_text);
document.getElementById("resultado").appendChild(node_br);
