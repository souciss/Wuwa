<?php
header('Content-Type: application/json');

try {
    $pdo = new PDO("mysql:host=localhost;dbname=Wuwa;charset=utf8mb4", "root", "Super", [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION
    ]);

    $pulls = isset($_GET['pull']) ? (int) $_GET['pull'] : 1;
    $chara = $_GET['chara'];
    if ($pulls < 1) $pulls = 1;

    $results = [];

    for ($i = 0; $i < $pulls; $i++) {
        $roll = mt_rand(1, 10000) / 100; // 0.00 à 100.00

        if ($roll <= 1) {
            $rarity = 5;
        } elseif ($roll <= 10) {
            $rarity = 4;
        } else {
            $rarity = 3;
        }
        if ($rarity == 5){
            $random = rand(1, 2);
            if ($random == 1){
            $stmt = $pdo->prepare("SELECT * FROM `Character` WHERE Nom = ?");
            $stmt->execute([$chara]);
            $character = $stmt->fetch(PDO::FETCH_ASSOC);
            }else if ($random == 2){
                $stmt = $pdo->prepare("SELECT * FROM `Character` WHERE rarity = ? AND perma = true ORDER BY RAND() LIMIT 1");
                $stmt->execute([$rarity]);
                $character = $stmt->fetch(PDO::FETCH_ASSOC);
            }
        }
        if($rarity == 4){
            $random = rand(1, 2);
            if ($random == 1){
            $stmt = $pdo->prepare("SELECT * FROM `Character` WHERE rarity = ? ORDER BY RAND() LIMIT 1");
            $stmt->execute([$rarity]);
            $character = $stmt->fetch(PDO::FETCH_ASSOC);
            }
            else if ($random == 2){
                $stmt = $pdo->prepare("SELECT * FROM `weapon` WHERE rarity = ? ORDER BY RAND() LIMIT 1");
                $stmt->execute([$rarity]);
                $character = $stmt->fetch(PDO::FETCH_ASSOC);
            }
        }
        if($rarity == 3) {
            $stmt = $pdo->prepare("SELECT * FROM `weapon` WHERE rarity = ? ORDER BY RAND() LIMIT 1");
            $stmt->execute([$rarity]);
            $character = $stmt->fetch(PDO::FETCH_ASSOC);
        }
       /* if ($character) {
            // Incrémenter le compteur
            $update = $pdo->prepare("UPDATE `Character` SET Nombre = Nombre + 1 WHERE id = ?");
            $update->execute([$character['id']]);

            $results[] = $character;
        }*/
        $results[] = $character;
    }

    echo json_encode(['success' => true, 'results' => $results]);

} catch (PDOException $e) {
    echo json_encode(['success' => false, 'error' => $e->getMessage()]);
}
