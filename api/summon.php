<?php
header('Content-Type: application/json');
$userId = 1;

try {
    $pdo = new PDO("mysql:host=localhost;dbname=Wuwa;charset=utf8mb4", "root", "Super", [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION
    ]);

    $pulls = isset($_GET['pull']) ? (int) $_GET['pull'] : 1;
    $chara = $_GET['chara'] ?? '';
    $portalId = isset($_GET['portal']) ? (int) $_GET['portal'] : null;
    if ($pulls < 1) $pulls = 1;

    // Initialiser
    $results = [];
    $guaranteed4StarGiven = false;

    // Récupérer données utilisateur
    $userStmt = $pdo->prepare("SELECT * FROM users WHERE id = ?");
    $userStmt->execute([$userId]);
    $userData = $userStmt->fetch(PDO::FETCH_ASSOC);
    $pity = (int)$userData['pity_counter'];
    $totalPulls = 0;

    for ($i = 0; $i < $pulls; $i++) {
        $rarity = 3;
        $force5Star = ($pity >= 79);
        $roll = mt_rand(1, 10000) / 100;

        // Système de pity
        if ($force5Star) {
            $rarity = 5;
        } elseif (!$guaranteed4StarGiven && $i == $pulls - 1) {
            $rarity = 4; // Dernier tirage sans 4★ encore tiré
        } elseif ($roll <= 0.8) {
            $rarity = 5;
        } elseif ($roll <= 6.0) {
            $rarity = 4;
        }

        if ($rarity == 4) $guaranteed4StarGiven = true;

        // Sélection selon rareté
        $character = null;
        $weapon = null;
        $weaponPortal = false;

        if ($rarity == 5) {
            $pity = 0; // reset pity
                $random = rand(1, 2);
                if ($random === 1) {
                    $stmt = $pdo->prepare("SELECT * FROM `Character` WHERE Nom = ?");
                    $stmt->execute([$chara]);
                    $character = $stmt->fetch(PDO::FETCH_ASSOC);


                    if (!$character) {
                        $decodedchara = urldecode($chara);
                        $stmt = $pdo->prepare("SELECT * FROM `weapon` WHERE Nom = ?");
                        $stmt->execute([trim($decodedchara)]);
                        $weapon = $stmt->fetch(PDO::FETCH_ASSOC);
                        $weaponPortal = true;
                    }
                } else {
                    $stmt = $pdo->prepare("SELECT * FROM `Character` WHERE rarity = 5 AND perma = 1 ORDER BY RAND() LIMIT 1");
                    $stmt->execute();
                    $character = $stmt->fetch(PDO::FETCH_ASSOC);
                }
            

        } elseif ($rarity == 4) {
            $pity++; // 4★ ne reset pas le pity
            if (rand(1, 2) === 1) {
                if ($weaponPortal == false)
                if (rand(1, 2) === 1 ||$weaponPortal == true){
                $stmt = $pdo->prepare("SELECT * FROM `Character` WHERE rarity = 4 ORDER BY RAND() LIMIT 1");
                $stmt->execute();
                $character = $stmt->fetch(PDO::FETCH_ASSOC);
                }
                else if ($weaponPortal == false){
                $stmt = $pdo->prepare("
                SELECT c.* FROM boosted_items bi
                JOIN `Character` c ON bi.character_id = c.id
                WHERE bi.portal_id = ?
                ORDER BY RAND()
                LIMIT 1
                ");
                $stmt->execute([$portalId]);
                $character = $stmt->fetch(PDO::FETCH_ASSOC);
                }
            } else {
                if (rand(1, 2) === 1 || $weaponPortal == false){
                $stmt = $pdo->prepare("SELECT * FROM `weapon` WHERE rarity = 4 ORDER BY RAND() LIMIT 1");
                $stmt->execute();
                $weapon = $stmt->fetch(PDO::FETCH_ASSOC);
                }else if ($weaponPortal == true){
                $stmt = $pdo->prepare("
                SELECT w.* FROM boosted_items bi
                JOIN weapon w ON bi.weapon_id = w.id
                WHERE bi.portal_id = ?
                ORDER BY RAND()
                LIMIT 1
                ");
                $stmt->execute([$portalId]);
                $weapon = $stmt->fetch(PDO::FETCH_ASSOC);
                }
            }

        } else { // 3★
            $pity++;
            $stmt = $pdo->prepare("SELECT * FROM `weapon` WHERE rarity = 3 ORDER BY RAND() LIMIT 1");
            $stmt->execute();
            $weapon = $stmt->fetch(PDO::FETCH_ASSOC);
        }

        // Historique du tirage
        $stmt = $pdo->prepare("INSERT INTO pull_history (
            user_id, character_id, weapon_id, rarity, pull_number, total_pulls, portal_id
        ) VALUES (?, ?, ?, ?, ?, ?, ?)");

        $stmt->execute([
            $userId,
            $character['id'] ?? null,
            $weapon['id'] ?? null,
            $rarity,
            $i + 1,
            $userData['total_pulls'] + $i + 1, // Optionnel
            $portalId
        ]);

        // Incrémenter le compteur dans Character
        if ($character) {
            $update = $pdo->prepare("UPDATE `Character` SET Nombre = Nombre + 1 WHERE id = ?");
            $update->execute([$character['id']]);
        }

        $results[] = $character ?? $weapon;
    }

    // Mise à jour du pity final
    $updatePity = $pdo->prepare("UPDATE users SET pity_counter = ?, total_pulls = total_pulls + ? WHERE id = ?");
    $updatePity->execute([$pity, $pulls, $userId]);

    echo json_encode(['success' => true, 'results' => $results]);

} catch (PDOException $e) {
    echo json_encode(['success' => false, 'error' => $e->getMessage()]);
}
