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

    $input = json_decode(file_get_contents('php://input'), true);

    if (!isset($input['user_id']) || !isset($input['money_to_add'])) {
        echo json_encode(['success' => false, 'error' => 'Paramètres manquants']);
        exit;
    }

    $user_id = (int)$input['user_id'];
    $money_to_add = (int)$input['money_to_add'];

    // Récupérer l'argent actuel
    $stmt = $pdo->prepare("SELECT money FROM users WHERE id = ?");
    $stmt->execute([$user_id]);
    $row = $stmt->fetch(PDO::FETCH_ASSOC);

    if (!$row) {
        echo json_encode(['success' => false, 'error' => 'Utilisateur non trouvé']);
        exit;
    }

    $new_money = (int)$row['money'] + $money_to_add;

    // Mettre à jour l'argent
    $update = $pdo->prepare("UPDATE users SET money = ? WHERE id = ?");
    $update->execute([$new_money, $user_id]);

    echo json_encode(['success' => true, 'new_money' => $new_money]);

} catch (PDOException $e) {
    echo json_encode(['success' => false, 'error' => 'Erreur base de données : '.$e->getMessage()]);
}
