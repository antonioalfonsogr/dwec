let users = [];

window.onload = () => {
	// Suscribirnos al evento click del botón de Usuario aleatorio
	document
		.getElementById("btnGetRandomUser")
		.addEventListener("click", get_users);
	// Suscribirnos al evento click del botón de Guardar Usuario
	document.getElementById("btnSaveUsers").addEventListener("click", save_users);
};

function get_users() {
	// Obtener un usuario aleatorio
	fetch("https://randomuser.me/api/?nat=es")
		.then((response) => response.json())
		.then((data) => {
			// Mostrar el usuario en la página
			show_user(data.results[0]);
		});
}

function show_user(user) {
	// Obtener el elemento donde vamos a mostrar los usuarios
	const divUsers = document.getElementById("users");
	// Limpiar el elemento
	divUsers.innerHTML = "";
	// Generate bootstrap card with random user data
	const card = document.createElement("div");
	card.classList.add("card");
	card.classList.add("col-4");
	card.classList.add("m-2");

	const img = document.createElement("img");
	img.src = user.picture.large;
	img.classList.add("card-img-top");
	const cardBody = document.createElement("div");
	cardBody.classList.add("card-body");
	const name = document.createElement("h5");
	name.classList.add("card-title");
	name.innerHTML = `${user.name.first} ${user.name.last}`;

	const ul = document.createElement("ul");
	ul.classList.add("list-group");
	const phone = document.createElement("li");
	phone.classList.add("list-group-item");
	phone.innerHTML = `Phone: ${user.phone}`;
	const street_name = document.createElement("li");
	street_name.classList.add("list-group-item");
	street_name.innerHTML = `Street: ${user.location.street.name}`;
	const email = document.createElement("li");
	email.classList.add("list-group-item");
	email.innerHTML = `Email: ${user.email}`;
	ul.appendChild(phone);
	ul.appendChild(street_name);
	ul.appendChild(email);

	const save_buton = document.createElement("a");
	save_buton.classList.add("btn");
	save_buton.classList.add("btn-success");
	save_buton.innerHTML = "Add to table";
	save_buton.addEventListener("click", () => {
		users.push(user);
		console.log(users);
		generate_users_table();
	});
	cardBody.appendChild(name);
	cardBody.appendChild(ul);
	cardBody.appendChild(save_buton);
	card.appendChild(img);
	card.appendChild(cardBody);

	divUsers.appendChild(card);
}

function generate_users_table() {
	// Generate bootstrap 5 table with users
	const table = document.createElement("table");
	table.classList.add("table");
	table.classList.add("table-striped");

	const thead = document.createElement("thead");
	const tr = document.createElement("tr");
	const th_name = document.createElement("th");
	th_name.innerHTML = "Name";
	const th_phone = document.createElement("th");
	th_phone.innerHTML = "Phone";
	const th_street = document.createElement("th");
	th_street.innerHTML = "Street";
	const th_email = document.createElement("th");
	th_email.innerHTML = "Email";
	tr.appendChild(th_name);
	tr.appendChild(th_phone);
	tr.appendChild(th_street);
	tr.appendChild(th_email);
	thead.appendChild(tr);
	table.appendChild(thead);

	const tbody = document.createElement("tbody");
	users.forEach((user) => {
		const tr = document.createElement("tr");
		const td_name = document.createElement("td");
		td_name.innerHTML = `${user.name.first} ${user.name.last}`;
		const td_phone = document.createElement("td");
		td_phone.innerHTML = user.phone;
		const td_street = document.createElement("td");
		td_street.innerHTML = user.location.street.name;
		const td_email = document.createElement("td");
		td_email.innerHTML = user.email;
		tr.appendChild(td_name);
		tr.appendChild(td_phone);
		tr.appendChild(td_street);
		tr.appendChild(td_email);
		tbody.appendChild(tr);
	});
	table.appendChild(tbody);

	const divUsers = document.getElementById("users_table");
	divUsers.innerHTML = "";
	divUsers.appendChild(table);
}

function save_users() {
	// Guardar los usuarios en la base de datos
	users_to_save = users.map((user) => {
		return {
			name: `${user.name.first} ${user.name.last}`,
			phone: user.phone,
			street: user.location.street.name,
			email: user.email,
      image: user.picture.large
		};
	});

	fetch("save_users.php", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(users_to_save),
	})
		.then((response) => response.json())
		.then((data) => {
			console.log("Success:", data);
		})
		.catch((error) => {
			console.error("Error:", error);
		});
}
