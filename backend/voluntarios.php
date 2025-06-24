
<?php
ini_set('display_errors', 1);
error_reporting(E_ALL);
header('Content-Type: application/json');
require 'db.php';

$action = $_GET['action'] ?? '';

switch ($action) {
  case 'create':
    $data = json_decode(file_get_contents("php://input"), true);
    $stmt = $conn->prepare("INSERT INTO voluntarios (nombre, apellidos, edad, correo, telefono, ocupacion) VALUES (?, ?, ?, ?, ?, ?)");
    $stmt->bind_param("ssisss", $data['nombre'], $data['apellidos'], $data['edad'], $data['correo'], $data['telefono'], $data['ocupacion']);
    $stmt->execute();
    echo json_encode(['status' => 'ok']);
    break;

  case 'read':
    $res = $conn->query("SELECT * FROM voluntarios");
    $datos = [];
    while ($row = $res->fetch_assoc()) {
      $datos[] = $row;
    }
    echo json_encode($datos);
    break;

  case 'update':
    $data = json_decode(file_get_contents("php://input"), true);
    $stmt = $conn->prepare("UPDATE voluntarios SET nombre=?, apellidos=?, edad=?, correo=?, telefono=?, ocupacion=? WHERE id=?");
    $stmt->bind_param("ssisssi", $data['nombre'], $data['apellidos'], $data['edad'], $data['correo'], $data['telefono'], $data['ocupacion'], $data['id']);
    $stmt->execute();
    echo json_encode(['status' => 'actualizado']);
    break;

  case 'delete':
    $id = $_GET['id'] ?? 0;
    $conn->query("DELETE FROM voluntarios WHERE id=$id");
    echo json_encode(['status' => 'eliminado']);
    break;
}
