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

    $stmt = $pdo->query("
        SELECT portal_id, 
               SUM(pull_count) as total_pulls, 
               SUM(banner5) as total_banner5,
               SUM(nonbanner5) as total_nonbanner5,
               SUM(stars4) as total_stars4
        FROM pulls
        GROUP BY portal_id
    ");

    $totals = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode(['success' => true, 'totals' => $totals]);

} catch (PDOException $e) {
    echo json_encode(['success' => false, 'error' => 'Erreur base de données : ' . $e->getMessage()]);
}
