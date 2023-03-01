window.onload = start;

let list_criminals = [];
let resultados;

function start() {
	// subscribe to button btn_load
	document
		.getElementById("btn_load")
		.addEventListener("click", get_criminals_from_fbi);
	// subscribe to button btn_clear
	document.getElementById("btn_clear").addEventListener("click", clear);
	// subscribe to button btn_get_criminals
	document
		.getElementById("btn_get_criminals_xml")
		.addEventListener("click", get_criminals_from_db_xml);
	document
		.getElementById("btn_get_criminals_fetch")
		.addEventListener("click", get_criminals_from_db_fetch);

	// get results
	resultados = document.getElementById("resultados");
}

function get_criminals_from_fbi() {
	// create XMLHttpRequest object
	var xhr = new XMLHttpRequest();
	// subscribe to events
	xhr.addEventListener("readystatechange", generate_criminals_table_fbi);
	// open connection
	xhr.open("GET", "https://api.fbi.gov/@wanted");
	// send request
	xhr.send();
}

function generate_table_header(generate_save_button = true) {
	// generate table with uid, title, description, aliases, images and a button to save
	let table = document.createElement("table");
	let tr = document.createElement("tr");
	let th = document.createElement("th");
	th.innerHTML = "uid";
	tr.appendChild(th);
	th = document.createElement("th");
	th.innerHTML = "title";
	tr.appendChild(th);
	th = document.createElement("th");
	th.innerHTML = "description";
	tr.appendChild(th);
	th = document.createElement("th");
	th.innerHTML = "aliases";
	tr.appendChild(th);
	th = document.createElement("th");
	th.innerHTML = "images";
	tr.appendChild(th);
	if (generate_save_button) {
		th = document.createElement("th");
		th.innerHTML = "save";
		tr.appendChild(th);
	}
	table.appendChild(tr);

	return table;
}

function generate_criminal_row(criminal, generate_save_button = true) {
	let tr = document.createElement("tr");
	let td = document.createElement("td");
	td.innerHTML = criminal.uid;
	tr.appendChild(td);
	td = document.createElement("td");
	td.innerHTML = criminal.title;
	tr.appendChild(td);
	td = document.createElement("td");
	td.innerHTML = criminal.description;
	tr.appendChild(td);
	td = document.createElement("td");
	td.innerHTML = criminal.aliases;
	tr.appendChild(td);
	// create image
	td = document.createElement("td");
	let img = document.createElement("img");
	img.src = criminal.images;
	td.appendChild(img);
	tr.appendChild(td);
	// create button
	if (generate_save_button) {
		td = document.createElement("td");
		let btn = document.createElement("button");
		btn.innerHTML = "Guardar";
		btn.setAttribute("data-uid", criminal.uid);
		btn.addEventListener("click", (c) => {
			// search criminal in list_criminals
			let criminal = list_criminals.find(
				(c) => c.uid == btn.getAttribute("data-uid")
			);
			save_criminal(criminal);
		});
		td.appendChild(btn);
		tr.appendChild(td);
	}
	return tr;
}

function generate_criminals_table_fbi(event) {
	if (event.target.readyState == 4 && event.target.status == 200) {
		resultados.innerHTML = "Criminales cargados desde FBI";
		// get response
		let data = JSON.parse(event.target.responseText);
		// get list
		let divFBI = document.getElementById("divFBI");
		// clear list
		divFBI.innerHTML = "";
		list_criminals = [];

		let table = generate_table_header();
		divFBI.appendChild(table);

		// fill table with data.items in a loop
		data.items.forEach((criminal_fbi) => {
			criminal = {
				uid: criminal_fbi.uid,
				title: criminal_fbi.title,
				description: criminal_fbi.description,
				aliases: criminal_fbi.aliases,
				images: criminal_fbi.images[0].thumb,
			};
			list_criminals.push(criminal);
			table.appendChild(generate_criminal_row(criminal));
		});
	} else {
		resultados.innerHTML = "Error al cargar los criminales";
	}
}

function clear() {
	resultados.innerHTML = "Tabla limpiada.";
	let list = document.getElementById("divFBI");
	list.innerHTML = "";
}

function get_criminals_from_db_xml() {
	resultados.innerHTML = "Criminales cargados desde la base de datos (XML)";
	// create XMLHttpRequest object
	let xhr = new XMLHttpRequest();
	// subscribe to events
	xhr.addEventListener("readystatechange", process_criminals);
	// open connection
	xhr.open("GET", "get_criminals.php");
	// send request
	xhr.send();
}

function process_criminals(event) {
	if (event.target.readyState == 4 && event.target.status == 200) {
		let data = JSON.parse(event.target.responseText);
		generate_criminals_table_db(data);
	} else {
		resultados.innerHTML = "Error al cargar los criminales";
	}
}

function get_criminals_from_db_fetch() {
	resultados.innerHTML = "Criminales cargados desde la base de datos (fetch)";
	fetch("get_criminals.php")
		.then((response) => response.json())
		.then((data) => generate_criminals_table_db(data));
}

function generate_criminals_table_db(data) {
	// get list
	let divFBI = document.getElementById("divFBI");
	// clear list
	divFBI.innerHTML = "";
	list_criminals = [];

	let table = generate_table_header(false);
	divFBI.appendChild(table);
	// fill table with data.items in a loop

	data.forEach((criminal_db) => {
		criminal = {
			uid: criminal_db.uid,
			title: criminal_db.title,
			description: criminal_db.description,
			aliases: criminal_db.aliases,
			images: criminal_db.images,
		};
		list_criminals.push(criminal);
		table.appendChild(generate_criminal_row(criminal, false));
	});
}

function save_criminal(criminal) {
	resultados.innerHTML = `Criminal ${criminal.title} guardado`;
	console.log(criminal);
	// create XMLHttpRequest object
	let xhr = new XMLHttpRequest();
	// subscribe to events. Another way to do it is using the onload and onerror properties, like we
	// did in the previous lessons.
	xhr.addEventListener("load", (event) => {
		console.log(event.target.responseText);
	});
	xhr.addEventListener("error", error);
	// open connection
	xhr.open("POST", "save_criminal.php");
	// send request
	xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
	xhr.send(JSON.stringify(criminal));
}
