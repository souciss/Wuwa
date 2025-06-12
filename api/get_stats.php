<?php
header("Content-Type: application/json");

// ⚙️ Connexion MySQL (adapte à ton environnement)
$host = 'localhost';       
$dbname = 'Wuwa';
$user = 'root';
$pass = 'Super';

try {
    $db = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8mb4", $user, $pass);
    $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(["error" => "Connexion échouée: " . $e->getMessage()]);
    exit;
}

// ✅ Lire l’ID du portail depuis l’URL
$portal_id = isset($_GET['portal_id']) ? (int)$_GET['portal_id'] : null;

if (!$portal_id) {
    http_response_code(400);
    echo json_encode(["error" => "portal_id manquant"]);
    exit;
}

// 📊 Récupérer les stats
try {
    $stmt = $db->prepare("
        SELECT
            SUM(pull_count) AS total_pulls,
            SUM(banner5) AS total_banner5,
            SUM(non_banner5) AS total_non_banner5,
            SUM(star4) AS total_star4
        FROM pulls
        WHERE portal_id = ?
    ");
    $stmt->execute([$portal_id]);
    $stats = $stmt->fetch(PDO::FETCH_ASSOC);

    // Si aucun résultat, renvoyer des 0
    $stats = array_map(function ($v) {
        return $v !== null ? (int)$v : 0;
    }, $stats);

    echo json_encode([
        "portal_id" => $portal_id,
        "stats" => $stats
    ]);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(["error" => "Erreur SQL: " . $e->getMessage()]);
}
