<?php
header("Content-Type: application/json; charset=UTF-8");

//require_once "config_db.php";

define('DB_SERVER', 'mariadb');
define('DB_USERNAME', 'dwec');
define('DB_PASSWORD', 'dwec');
define('DB_NAME', 'dwec');

$conexion = new mysqli(DB_SERVER, DB_USERNAME, DB_PASSWORD, DB_NAME);

if ($conexion->connect_error) {
  $error = "Error en la conexion : "  . $conexion->connect_error;
  echo json_encode($error);
  exit(1);
}

$nombre = $puntuacion = "";
$error = "";

// Procesar datos cuando se realiza la petición
if ($_SERVER["REQUEST_METHOD"] == "POST") {
  $data = json_decode($_POST["objeto"], false);

  // Validar nombre
  $input_nombre = trim($data->nombre);
  if (empty($input_nombre)) {
    $error = "Introduzca un nombre.";
  } else {
    $nombre = $input_nombre;
  }

  // Validar puntuacion
  $input_puntuacion = trim($data->puntuacion);
  if (empty($input_puntuacion)) {
    $error += "Introduzca una puntuacion.";
  } else {
    $puntuacion = $input_puntuacion;
  }

  // Si no hay errores, procedemos a insertar en la BD
  if (empty($error)) {
    // Preparar la sentencia
    $sql = "INSERT INTO alumnos (alumno, puntuacion) VALUES (?, ?)";
    //$sql = "SELECT idAlumno, alumno, puntuacion FROM alumnos";

    if ($stmt = $conexion->prepare($sql)) {
      // Enlaza las variables a los parámetros
      //mysqli_stmt_bind_param($stmt, "sd", $param_nombre, $param_puntuacion);
      $stmt->bind_param('sd', $param_nombre, $param_puntuacion);

      // Establecer los parámetros
      $param_nombre = $nombre;
      $param_puntuacion = $puntuacion;

      // Ejecutar la sentencia
      if ($stmt->execute()) {
        // Se ha creado corretamente, devolver json con "ok"
        $mensaje = "Insertado correctamente en la BD";
        echo json_encode($mensaje);
        exit(1);
      } else {
        // Ha habido algún error. Devolver json con error de insercion en BD
        $error = "Error al insertar en la BD";
        echo json_encode($error);
        exit(1);
      }
    }
    // Cerramos la sentencia y la conexion
    mysqli_stmt_close($stmt);
    mysqli_close($link);
  } else {
    echo json_encode($error);
    exit(1);
  }
} else {
  $error = "No es un metodo post";
  echo json_encode($error);
}