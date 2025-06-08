<?php
header('Content-Type: application/json');

$host = 'localhost';       
$dbname = 'Wuwa';
$user = 'root';
$pass = 'Super';
$charset = 'utf8mb4';

$pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8mb4", $user, $pass, [
    PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION
]);

$data = json_decode(file_get_contents('php://input'), true);

if (!isset($data['id']) || !isset($data['Nombre'])) {
    echo json_encode(['success' => false, 'error' => 'Paramètres manquants']);
    exit;
}

$id = (int)$data['id'];
$nombre = (int)$data['Nombre'];

$stmt = $pdo->prepare("UPDATE `Character` SET Nombre = ? WHERE id = ?");
$stmt->execute([$nombre, $id]);

echo json_encode(['success' => true]);
