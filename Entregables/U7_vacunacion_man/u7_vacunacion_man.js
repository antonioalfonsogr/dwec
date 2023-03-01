lista_comunidades = [];

window.onload = () => {
	document
		.getElementById("modificar_datos")
		.addEventListener("click", modificar_datos);

	document.getElementById("cargar_xml").addEventListener("click", cargar_xml);
	document
		.getElementById("cargar_fetch")
		.addEventListener("click", cargar_fetch);
};

function modificar_datos() {
	console.log("modificar_datos");
	let comunidad = {
		ccaa: document.getElementById("select_comunidades").value,
		dosisEntregadas: document.getElementById("dosis_entregadas").value,
		dosisAdministradas: document.getElementById("dosis_admin").value,
		dosisPautaCompletada: document.getElementById("dosis_completa").value,
		porcentajeEntregadas: document.getElementById("por_entrega").value,
		porcentajePoblacionAdministradas:
			document.getElementById("por_admin").value,
		porcentajePoblacionCompletas: document.getElementById("por_completo").value,
	};
	console.log(comunidad);

	fetch("actualizar_comunidad.php", {
		method: "POST",
		headers: {
			"Content-type": "application/json",
		},
		body: JSON.stringify(comunidad),
	})
		.then((response) => {
			if (response.ok) return response.json();
		})
		.then((comunidad) => {
			resultados = document.getElementById("resultado");
			resultados.innerHTML = "Comunidad actualizada";
			actualizar_datos_nuestra_tabla(comunidad);
		});
}

function actualizar_datos_nuestra_tabla(comunidad) {
	lista_comunidades.forEach((ca) => {
		if (ca.ccaa === comunidad.ccaa) {
			ca.dosisEntregadas = comunidad.dosisEntregadas;
			ca.dosisAdministradas = comunidad.dosisAdministradas;
			ca.dosisPautaCompletada = comunidad.dosisPautaCompletada;
			ca.porcentajeEntregadas = comunidad.porcentajeEntregadas;
			ca.porcentajePoblacionAdministradas =
				comunidad.porcentajePoblacionAdministradas;
			ca.porcentajePoblacionCompletas = comunidad.porcentajePoblacionCompletas;
		}
	});
	construir_tabla(lista_comunidades);
}

function cargar_xml() {
	console.log("cargar_xml");

	// Primer paso, crear el XMLHttpRequest
	let xhr = new XMLHttpRequest();
	// Segundo paso, una función anónima que recoge y trata los datos recibidos
	xhr.onreadystatechange = () => {
		console.log("onreadystatechange - peticion a WEB covid19");
		if (xhr.readyState === 4 && xhr.status === 200) {
			resultados = document.getElementById("resultado");
			resultados.innerHTML = "Datos actualizados (XML)";
			let comunidades = JSON.parse(xhr.responseText);
			// Proceso las comunidades para filtrar "cositas"
			procesar_comunidades(comunidades);
			generar_select();
			// Hago la petición mediante POST a insertar_comunidades.php para insertarlo en la BD
			enviar_insertar_comunidades(lista_comunidades);
		}
	};
	// Tercer paso, configurar la petición (método y url)
	xhr.open("GET", "latest.json");
	// Cuarto paso, realizar la petición mediante el send
	xhr.send();
}

function cargar_fetch() {
	console.log("cargar_fetch");
	fetch("latest.json")
		.then((response) => {
			if (response.ok) return response.json();
		})
		.then((comunidades) => {
			resultados = document.getElementById("resultado");
			resultados.innerHTML = "Datos actualizados (Fetch)";
			procesar_comunidades(comunidades);
			generar_select();
			// Hago la petición mediante POST a insertar_comunidades.php para insertarlo en la BD
			enviar_insertar_comunidades(lista_comunidades);
		})
		.catch((error) => {
			console.log(error);
		});
}

function generar_select() {
	let select_comunidades = document.getElementById("select_comunidades");
	select_comunidades.innerHTML = "";

	lista_comunidades.forEach((comunidad) => {
		let option = document.createElement("option");
		option.value = comunidad.ccaa;
		option.text = comunidad.ccaa;
		select_comunidades.appendChild(option);
	});
}

function procesar_comunidades(comunidades) {
	// Limpio la variable global, donde guardo...
	lista_comunidades = [];

	// ... todas las comunidades menos la de "Totales", y los campos que no me interesan
	comunidades.forEach((comunidad) => {
		if (comunidad.ccaa != "Totales") {
			let item = {
				ccaa: comunidad.ccaa,
				dosisEntregadas: comunidad.dosisEntregadas,
				dosisAdministradas: comunidad.dosisAdministradas,
				dosisPautaCompletada: comunidad.dosisPautaCompletada,
				porcentajeEntregadas: comunidad.porcentajeEntregadas,
				porcentajePoblacionAdministradas:
					comunidad.porcentajePoblacionAdministradas,
				porcentajePoblacionCompletas: comunidad.porcentajePoblacionCompletas,
			};
			lista_comunidades.push(item);
		}
	});
	return lista_comunidades;
}

function enviar_insertar_comunidades(comunidades) {
	console.log(comunidades);
	fetch("insertar_comunidades.php", {
		method: "POST",
		headers: {
			"Content-type": "application/json",
		},
		body: JSON.stringify(comunidades),
	})
		.then((response) => {
			if (response.ok) return response.json();
		})
		.then((comunidades) => {
			console.log(comunidades);
			construir_tabla(comunidades);
		});
}

function construir_tabla(comunidades) {
	// Primero limpio el div por si hubiese restos de anteriores tablas
	let div_tabla = document.getElementById("tabla");
	div_tabla.innerHTML = "";
	let tabla = document.createElement("table");

	// Pongo en un array los títulos de la cabecera
	let rotulos = [
		"Comunidad",
		"D. Entregadas",
		"D. Admin",
		"D. Completa",
		"% Entregadas",
		"% Pobl. Admin",
		"% Pobl. Completa",
	];

	// Y los voy recorriendo e insertando en la tabla
	let tr = document.createElement("tr");
	rotulos.forEach((rotulo) => {
		th = document.createElement("th");
		th.appendChild(document.createTextNode(rotulo));
		tr.appendChild(th);
	});
	tabla.appendChild(tr);

	// Ahora genero los datos de la tabla
	comunidades.forEach((comunidad) => {
		let tr = document.createElement("tr");

		for (const campo in comunidad) {
			let td = document.createElement("td");
			td.appendChild(document.createTextNode(comunidad[campo]));
			tr.appendChild(td);
		}
		tabla.appendChild(tr);
	});

	div_tabla.appendChild(tabla);
}
