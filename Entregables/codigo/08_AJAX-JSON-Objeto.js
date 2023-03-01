let READY_STATE_COMPLETE = 4;
let HTTP_STATUS_OK = 200;

window.onload = inicio;

function inicio() {
	document.getElementById("mostrar").addEventListener("click", mostrar);
}

function mostrar() {
	console.log("mostrar");
	let xhr = new XMLHttpRequest();
	xhr.onreadystatechange = () => {
		console.log(`readyState: ${this.readyState} - status: ${this.status}`);
		if (
			this.readyState == READY_STATE_COMPLETE &&
			this.status == HTTP_STATUS_OK
		) {
			console.log(this.readyState);
			// Al hacer parse nos devuelve un objeto
			let objeto = JSON.parse(this.responseText);

			let texto = `${objeto.nombre} nació el año ${objeto.nacimiento} en ${objeto.ciudad}`;
			let node_text = document.createTextNode(texto);
			let node_br = document.createElement("br");

			// Mostramos los datos
			document.getElementById("parrafo").appendChild(node_text);
			document.getElementById("parrafo").appendChild(node_br);

			// Si queremos convertir un objeto Javascript en una cadena
			let cadena = JSON.stringify(objeto);
			document.getElementById(
				"parrafo"
			).innerHTML += `El objeto ${objeto} en modo cadena es ${cadena}`;
		}
	};
	xhr.open("GET", "08_AJAX-JSON-Objeto.php");
	xhr.send();
}
