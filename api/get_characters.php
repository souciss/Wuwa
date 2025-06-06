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

$stmt = $pdo->query("SELECT * FROM `Character` ORDER BY `Character`.`id` DESC");
$characters = $stmt->fetchAll(PDO::FETCH_ASSOC);

echo json_encode(['success' => true, 'characters' => $characters]);
