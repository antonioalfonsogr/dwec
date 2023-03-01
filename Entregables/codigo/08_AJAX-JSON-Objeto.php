<?php
//Para evitar que los warning salgan en la pantalla y se traten como texto JSON
error_reporting(0);
header('Content-Type: application/json');

$objeto = array('nombre' => "Chema", 'nacimiento' => 1982, 'ciudad' => "Cádiz");

// Codificamos el objeto a JSON
$miJSON = json_encode($objeto);

// Lo enviamos como respuesta
echo $miJSON;
