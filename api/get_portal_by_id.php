<?php
header('Content-Type: application/json');
$pdo = new PDO("mysql:host=localhost;dbname=Wuwa;charset=utf8mb4", "root", "Super");

$id = $_GET['id'] ?? null;
if (!$id) {
  echo json_encode(['success' => false, 'error' => 'ID manquant']);
  exit;
}

$stmt = $pdo->prepare("SELECT * FROM portals WHERE id = ?");
$stmt->execute([$id]);
$portal = $stmt->fetch(PDO::FETCH_ASSOC);

if ($portal) {
  echo json_encode(['success' => true, 'portal' => $portal]);
} else {
  echo json_encode(['success' => false, 'error' => 'Introuvable']);
}
