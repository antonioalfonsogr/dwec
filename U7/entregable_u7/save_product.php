<?php
header("Content-Type: application/json; charset=UTF-8");

define('DB_SERVER', 'mariadb');
define('DB_USERNAME', 'dwec');
define('DB_PASSWORD', 'dwec');
define('DB_NAME', 'dwec');

$conexion = new mysqli(DB_SERVER, DB_USERNAME, DB_PASSWORD, DB_NAME);
$conexion->set_charset("utf8");

if ($conexion->connect_error) {
  $error = "Error en la conexion : "  . $conexion->connect_error;
  echo json_encode($error);
  exit(1);
}

$id = $title = $description = $category_name = $price = $image = "";

$error = "";

// Procesar datros cuando se realiza la petición
if (($request = file_get_contents('php://input')) && $_SERVER['REQUEST_METHOD'] === 'POST') {
  $data = json_decode($request, false);

  // Validar id
  if (property_exists($data, 'id') && isset($data->id) && !empty(trim($data->id))) {
    $id = trim($data->id);
  } else {
    $error = $error . "Insert ID of the product. ";
  }

  // Validar title
  if (property_exists($data, 'title') && isset($data->title) && !empty(trim($data->title))) {
    $title = trim($data->title);
  } else {
    $error = $error . "Insert title of the product. ";
  }

  // Validar description
  if (property_exists($data, 'description') && isset($data->description) && !empty(trim($data->description))) {
    $description = trim($data->description);
  } else {
    $error = $error . "Insert description of the product. ";
  }

  // Validar price
  if (property_exists($data, 'price') && isset($data->price) && !empty(trim($data->price))) {
    $price = trim($data->price);
  } else {
    $error = $error . "Insert price of the product. ";
  }

  // Validar category_name
  if (property_exists($data, 'category_name') && isset($data->category_name) && !empty(trim($data->category_name))) {
    $category_name = trim($data->category_name);
  } else {
    $error = $error . "Insert category_name of the product. ";
  }

  // Validar image
  if (property_exists($data, 'image') && isset($data->image) && !empty(trim($data->image))) {
    $image = trim($data->image);
  } else {
    $error = $error . "Insert image of the product. ";
  }

  // Si no hay errores, procedemos a insertar en la BD
  if (empty($error)) {
    // Preparar la sentencia
    $sql = "REPLACE INTO `products` (`id`,`title`, `description`,`price`, `category_name`, `image`) VALUES (?,?,?,?,?,?)";

    if ($stmt = $conexion->prepare($sql)) {
      // Enlaza las variables a los parámetros
      $stmt->bind_param(
        'ssssss',
        $param_id,
        $param_title,
        $param_description,
        $param_price,
        $param_category_name,
        $param_image,
      );

      // Establecer los parámetros
      $param_id = $id;
      $param_title = $title;
      $param_description = $description;
      $param_price = $price;
      $param_category_name = $category_name;
      $param_image = $image;

      // Ejecutar la sentencia
      if (!$stmt->execute()) {
        // Ha habido algún error. Devolver json con error de insercion en BD
        $error = array('result' => "Error adding product. ");
        echo json_encode($error);
        exit(1);
      }
    } else {
      $error = array('result' => "Error preparing SQL statement. ");
      echo json_encode($error);
      exit(1);
    }
    // Cerramos la sentencia y la conexion
    mysqli_stmt_close($stmt);
  } else {
    $error = array('result' => $error);
    echo json_encode($error);
    exit(1);
  }


  // Se han ejecutado todas las inserciones correctamente

  // Se ha creado corretamente, devolver json con el resultado
  $sql = "SELECT `id`, `title`, `description`, `price`, `category_name`, `image` FROM `products`";

  $resultado = $conexion->query($sql);

  $salida = array();

  if ($resultado && $resultado->num_rows > 0) {
    $salida =  $$error = array('result' => "Product inserted properly. ");
  }

  echo json_encode($salida);
  exit(1);
} else {
  $error = array('result' => "It's not a POST request. ");
  echo json_encode($error);
}
