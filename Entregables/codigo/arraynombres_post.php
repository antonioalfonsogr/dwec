<?php
//Array de nombres
$a = array(
  "Fran", "Álvaro", "Guillermo", "Gonzalo", "Raúl", "Rafael", "Pedro",
  "DJ", "Luis", "César", "Ángela", "Óscar", "Alicia", "DC", "Isidro",
  "Sebas"
);

// Tomamos el valor del input procedente de la peticion POST en formato JSON en la variable alumno

$sugerencia = "";

if ($_SERVER["REQUEST_METHOD"] == "POST") {
  $request_body = file_get_contents('php://input');
  $data = json_decode($request_body, false);

  // Limpiamos el nombre y lo pasamos a minúsculas
  $nombre_alumno = strtolower(trim($data->alumno));
  if (empty($nombre_alumno)) {
    $error = "Introduzca un nombre de alumno.";
  }

  $long = strlen($nombre_alumno);

  foreach ($a as $nom) { // Cada elemento del array lo pasa a $nom en cada iteración
    if (stristr($nombre_alumno, substr($nom, 0, $long))) { // Si coincide la cadena pasada con los primeros caracteres de algún elemento del array
      if ($sugerencia === "") { // Si no hay texto en sugerencia
        $sugerencia = $nom;
      } else {
        $sugerencia = "$sugerencia, $nom";
      }
    }
  }
}

echo ($sugerencia === "") ? "No hay sugerencias" : $sugerencia;
