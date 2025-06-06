<?php
header('Content-Type: application/json');

$host = 'localhost';       
$dbname = 'Wuwa';
$user = 'root';
$pass = 'Super';

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8mb4", $user, $pass, [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION
    ]);

    $input = json_decode(file_get_contents('php://input'), true);

    if (
        !isset($input['portal_id']) ||
        !isset($input['pull_count']) ||
        !isset($input['banner5']) ||
        !isset($input['nonbanner5']) ||
        !isset($input['stars4'])
    ) {
        echo json_encode(['success' => false, 'error' => 'Paramètres manquants']);
        exit;
    }

    $portal_id = $input['portal_id'];
    $pull_count = (int)$input['pull_count'];
    $banner5 = (int)$input['banner5'];
    $nonbanner5 = (int)$input['nonbanner5'];
    $stars4 = (int)$input['stars4'];

    // Insert nouvelle ligne de tirage
    $stmt = $pdo->prepare("
        INSERT INTO pulls (portal_id, pull_count, banner5, nonbanner5, stars4, created_at)
        VALUES (?, ?, ?, ?, ?, NOW())
    ");
    $stmt->execute([$portal_id, $pull_count, $banner5, $nonbanner5, $stars4]);

    echo json_encode(['success' => true]);

} catch (PDOException $e) {
    echo json_encode(['success' => false, 'error' => 'Erreur base de données : ' . $e->getMessage()]);
}
