<?php
header('Content-Type: application/json');

$host = 'localhost';       
$dbname = 'Wuwa';
$user = 'root';
$pass = 'Super';
$charset = 'utf8mb4';

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8mb4", $user, $pass, [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION
    ]);

    if (!isset($_GET['user_id'])) {
        echo json_encode(['success' => false, 'error' => 'Paramètre user_id manquant']);
        exit;
    }

    $user_id = (int)$_GET['user_id'];

    $stmt = $pdo->prepare("SELECT money FROM users WHERE id = ?");
    $stmt->execute([$user_id]);
    $row = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($row) {
        echo json_encode(['success' => true, 'money' => (int)$row['money']]);
    } else {
        echo json_encode(['success' => false, 'error' => 'Utilisateur non trouvé']);
    }

} catch (PDOException $e) {
    echo json_encode(['success' => false, 'error' => 'Erreur base de données : '.$e->getMessage()]);
}
