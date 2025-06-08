-- phpMyAdmin SQL Dump
-- version 5.2.1deb3
-- https://www.phpmyadmin.net/
--
-- Hôte : localhost:3306
-- Généré le : ven. 06 juin 2025 à 13:19
-- Version du serveur : 10.11.13-MariaDB-0ubuntu0.24.04.1
-- Version de PHP : 8.3.17

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `Wuwa`
--
CREATE DATABASE IF NOT EXISTS `Wuwa` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `Wuwa`;

-- --------------------------------------------------------

--
-- Structure de la table `Character`
--

CREATE TABLE `Character` (
  `id` int(11) NOT NULL,
  `Nom` varchar(255) NOT NULL,
  `LienVersBuild` varchar(255) NOT NULL,
  `Nombre` int(11) NOT NULL,
  `LienImage` varchar(255) NOT NULL,
  `Type` varchar(255) NOT NULL,
  `rarity` int(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `Character`
--

INSERT INTO `Character` (`id`, `Nom`, `LienVersBuild`, `Nombre`, `LienImage`, `Type`, `rarity`) VALUES
(1, 'Aalto', 'https://wutheringlab.com/character/aalto-build/', 0, 'https://wutheringlab.com/wp-content/uploads/2023/06/Wuthering-Wave-Aalto.png', 'Aero', 4),
(2, 'Yangyang', 'https://wutheringlab.com/character/yangyang-build/', 0, 'https://wutheringlab.com/wp-content/uploads/2023/06/Wuthering-Wave-YangYang.png', 'Aero', 4),
(3, 'Encore', 'https://wutheringlab.com/character/encore-build/', 0, 'https://wutheringlab.com/wp-content/uploads/2023/06/Wuthering-Waves-Anke.png', 'Fusion', 5),
(4, 'Verina', 'https://wutheringlab.com/character/verina-build/', 0, 'https://wutheringlab.com/wp-content/uploads/Wuthering-Waves-Verina.webp', 'Spectro', 5),
(5, 'Rover', 'https://wutheringlab.com/character/rover-build/', 0, 'https://wutheringlab.com/wp-content/uploads/2023/06/Wuthering-Waves-Rover.png', 'Spectro', 5),
(6, 'Yinlin', 'https://wutheringlab.com/character/yinlin-build/', 0, 'https://wutheringlab.com/wp-content/uploads//yinlin-1.png', 'Electro', 5),
(7, 'Baizhi', 'https://wutheringlab.com/character/baizhi-build/', 0, 'https://wutheringlab.com/wp-content/uploads/2023/06/Wuthering-Waves-Bailian.png', 'Glacio', 4),
(8, 'Chixia', 'https://wutheringlab.com/character/chixia-build/', 0, 'https://wutheringlab.com/wp-content/uploads/2023/06/Wuthering-Waves-Chixia.png', 'Fusion', 4),
(9, 'Danjin', 'https://wutheringlab.com/character/danjin-build/', 0, 'https://wutheringlab.com/wp-content/uploads/2023/06/Wuthering-Waves-Danjin.png', 'Havoc', 4),
(10, 'Mortefi', 'https://wutheringlab.com/character/mortefi-build/', 0, 'https://wutheringlab.com/wp-content/uploads/2023/06/Wuthering-Waves-Mortefi.png', 'Fusion', 4),
(11, 'Sanhua', 'https://wutheringlab.com/character/sanhua-build/', 0, 'https://wutheringlab.com/wp-content/uploads/2023/06/Wuthering-Waves-Sanhua.png', 'Glacio', 4),
(12, 'Taoqi', 'https://wutheringlab.com/character/taoqi-build/', 0, 'https://wutheringlab.com/wp-content/uploads/2023/06/Wuthering-Waves-Taoqi.png', 'Havoc', 4),
(13, 'Yuanwu', 'https://wutheringlab.com/character/yuanwu-build/', 0, 'https://wutheringlab.com/wp-content/uploads/2023/06/Wuthering-Waves-Yuanwu.png', 'Electro', 4),
(14, 'Calcharo', 'https://wutheringlab.com/character/calcharo-build/', 0, 'https://wutheringlab.com/wp-content/uploads//Wuthering-Waves-Calcharo.png', 'Electro', 5),
(15, 'Lingyang', 'https://wutheringlab.com/character/lingyang-build/', 0, 'https://wutheringlab.com/wp-content/uploads//Wuthering-Waves-Lingyang.png', 'Glacio', 5),
(16, 'Jianxin', 'https://wutheringlab.com/character/jianxin-build/', 0, 'https://wutheringlab.com/wp-content/uploads//Wuthering-Waves-Jianxin.png', 'Aero', 5),
(17, 'Rover (Havoc)', 'https://wutheringlab.com/character/rover-havoc-build/', 0, 'https://wutheringlab.com/wp-content/uploads//MC_Female.png', 'Havoc', 5),
(18, 'Jiyan', 'https://wutheringlab.com/character/jiyan-build/', 0, 'https://wutheringlab.com/wp-content/uploads/2023/06/Wuthering-Waves-Jiyan.png', 'Aero', 5),
(19, 'Jinhsi', 'https://wutheringlab.com/character/jinhsi-build/', 0, 'https://wutheringlab.com/wp-content/uploads//Jinshi_icon.png', 'Spectro', 5),
(20, 'Changli', 'https://wutheringlab.com/character/changli-build/', 0, 'https://wutheringlab.com/wp-content/uploads//Changli_icon.png', 'Fusion', 5),
(21, 'Zhezhi', 'https://wutheringlab.com/character/zhezhi-build/', 0, 'https://wutheringlab.com/wp-content/uploads//Zhezhi_icon.png', 'Glacio', 5),
(22, 'Xiangli Yao', 'https://wutheringlab.com/character/xiangli-yao-build/', 0, 'https://wutheringlab.com/wp-content/uploads//Xiangli-Yao-icon.png', 'Electro', 5),
(23, 'Shorekeeper', 'https://wutheringlab.com/character/shorekeeper-build/', 0, 'https://wutheringlab.com/wp-content/uploads/Shorekeeper-icon.webp', 'Spectro', 5),
(24, 'Youhu', 'https://wutheringlab.com/character/youhu-build/', 0, 'https://wutheringlab.com/wp-content/uploads/Youhu-icon.webp', 'Glacio', 4),
(25, 'Camellya', 'https://wutheringlab.com/character/camellya-build/', 0, 'https://wutheringlab.com/wp-content/uploads/Camellya_icon.webp', 'Havoc', 5),
(26, 'Carlotta', 'https://wutheringlab.com/character/carlotta-build/', 0, 'https://wutheringlab.com/wp-content/uploads/Carlotta_icon.webp', 'Glacio', 5),
(27, 'Roccia', 'https://wutheringlab.com/character/roccia-build/', 0, 'https://wutheringlab.com/wp-content/uploads/Roccia_icon.webp\r\n', 'Havoc', 5),
(28, 'Lumi', 'https://wutheringlab.com/character/lumi-build/', 0, 'https://wutheringlab.com/wp-content/uploads/Lumi_icon.webp', 'Electro', 4),
(29, 'Brant', 'https://wutheringlab.com/character/brant-build/', 0, 'https://wutheringlab.com/wp-content/uploads/Brant.webp', 'Fusion', 5),
(30, 'Phoebe', 'https://wutheringlab.com/character/phoebe-build/', 0, 'https://wutheringlab.com/wp-content/uploads/Phoebe.webp', 'Spectro', 5),
(31, 'Cantarella', 'https://wutheringlab.com/character/cantarella-build/', 0, 'https://wutheringlab.com/wp-content/uploads/Cantarella.webp', 'Havoc', 5),
(32, 'Rover (Aero)', 'https://wutheringlab.com/character/rover-aero-build/', 0, 'https://wutheringlab.com/wp-content/uploads//MC_Female.png', 'Aero', 5),
(33, 'Zani', 'https://wutheringlab.com/character/zani-build/', 0, 'https://wutheringlab.com/wp-content/uploads/Zani_Icon.webp', 'Spectro', 5),
(34, 'Ciaccona', 'https://wutheringlab.com/character/ciaccona-build/', 0, 'https://wutheringlab.com/wp-content/uploads/Ciaccona_Icon.webp', 'Aero', 5);

-- --------------------------------------------------------

--
-- Structure de la table `portals`
--

CREATE TABLE `portals` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `image_url` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `portals`
--

INSERT INTO `portals` (`id`, `name`, `image_url`) VALUES
(1, 'Verdant Summit', 'VerdantSummit.png'),
(2, 'Prevail the Lasting Night', 'jiyan.png\r\n'),
(3, 'Stringmaster', 'StringMaster.png'),
(4, 'When Thunder Pour', 'yinlin.png'),
(5, 'Ages of Harvest', 'AgesOfHarvest.png'),
(6, 'Thawborn Renewal', 'jinhsi.png'),
(7, 'Blazing Brilliance', 'BlazingBrillance.png'),
(8, 'Vermillion\'s Ploy\r\n', 'changli.png'),
(9, 'Rime-Draped Sprouts', 'RimeDrapedSprouts.png'),
(10, 'Chromatic Prose', 'zhezhi.png'),
(11, 'Verity\'s Handle', 'VeritySHandle.png'),
(12, 'Celestial Revelation', 'xiangliyao.png'),
(13, 'Stellar Symphony', 'StellarSymphony.png'),
(14, 'Till the Sea Turns Clear', 'shorekeeper.png'),
(15, 'Red Spring', 'RedSpring.png'),
(16, 'End of Lost Trail', 'camellya.png'),
(17, 'The Last Dance', 'TheLastDance.png'),
(18, 'When Silence Tolls', 'Charlotta.png'),
(19, 'Tragicomedy', 'Tragicomedy.png'),
(20, 'Stage in the Box', 'roccia.png'),
(21, 'Luminous Hymn', 'LuminousHymn.png'),
(22, 'With Hushed Whispers', 'phoebe.png'),
(23, 'Unflickering Valor', 'UnflickeringVator.png'),
(24, 'Blaze Across the Deep', 'brant.png'),
(25, 'Whispers of Sirens', 'whispersOfSirens.png'),
(26, 'Neptune\'s Lullaby', 'cantarella.png'),
(27, 'Blazing Justice', 'BlazingJustice.png'),
(28, 'Between Light and Shadow\r\n', 'zani.png'),
(29, 'Woodland Aria', 'WoodlandAria.png'),
(30, 'Through Verses and Rhythms', 'ciaccona.png');

-- --------------------------------------------------------

--
-- Structure de la table `pulls`
--

CREATE TABLE `pulls` (
  `id` int(11) NOT NULL,
  `portal_id` int(11) NOT NULL,
  `pull_count` int(11) NOT NULL,
  `banner5` int(11) DEFAULT 0,
  `nonbanner5` int(11) DEFAULT 0,
  `stars4` int(11) DEFAULT 0,
  `created_at` timestamp NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `money` int(11) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `users`
--

INSERT INTO `users` (`id`, `username`, `money`) VALUES
(1, 'Noodra', 1600);

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `Character`
--
ALTER TABLE `Character`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `portals`
--
ALTER TABLE `portals`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `pulls`
--
ALTER TABLE `pulls`
  ADD PRIMARY KEY (`id`),
  ADD KEY `portal_id` (`portal_id`);

--
-- Index pour la table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `Character`
--
ALTER TABLE `Character`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=35;

--
-- AUTO_INCREMENT pour la table `portals`
--
ALTER TABLE `portals`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

--
-- AUTO_INCREMENT pour la table `pulls`
--
ALTER TABLE `pulls`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT pour la table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `pulls`
--
ALTER TABLE `pulls`
  ADD CONSTRAINT `pulls_ibfk_1` FOREIGN KEY (`portal_id`) REFERENCES `portals` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
