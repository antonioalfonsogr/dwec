<?php

header("Content-Type: application/json; charset=UTF-8");
header('Access-Control-Allow-Origin: *');

//$objeto = json_decode($_GET["objeto"],false);
$objeto = json_decode($_POST["objeto"], false);
//$objeto = json_decode('{"tabla":"alumnos","valor":111}');
$servidor = "mariadb";
$usuario = "root";
$password = "dwec";
$bbdd = "dwec";

//Crear la conexión
$conexion = new mysqli($servidor, $usuario, $password, $bbdd);
mysqli_set_charset($conexion, "utf8");

//Comprobamos la conexión
if ($conexion->connect_error) {
  die("Error en la conexion: " + $conexion->connect_error);
} else {
  //Conexión correcta

  //Creamos la consulta SQL
  $sql = "SELECT idAlumno, alumno, puntuacion FROM $objeto->tabla WHERE puntuacion >= $objeto->valor";

  $resultado = $conexion->query($sql);

  $salida = array();

  if ($resultado && $resultado->num_rows > 0) {
    $salida =  $resultado->fetch_all(MYSQLI_ASSOC);
  }

  echo json_encode($salida);
}

$conexion->close();
