-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server version:               10.6.8-MariaDB - mariadb.org binary distribution
-- Server OS:                    Win64
-- HeidiSQL Version:             11.3.0.6295
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Dumping database structure for sweets_shop_db
DROP DATABASE IF EXISTS `sweets_shop_db`;
CREATE DATABASE IF NOT EXISTS `sweets_shop_db` /*!40100 DEFAULT CHARACTER SET utf8mb3 */;
USE `sweets_shop_db`;

-- Dumping structure for table sweets_shop_db.administrator
DROP TABLE IF EXISTS `administrator`;
CREATE TABLE IF NOT EXISTS `administrator` (
  `administrator_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `username` varchar(64) NOT NULL,
  `password_hash` varchar(255) NOT NULL,
  `is_active` tinyint(1) unsigned NOT NULL DEFAULT 1,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`administrator_id`),
  UNIQUE KEY `uq_administrator_username` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb3;

-- Dumping data for table sweets_shop_db.administrator: ~2 rows (approximately)
DELETE FROM `administrator`;
/*!40000 ALTER TABLE `administrator` DISABLE KEYS */;
INSERT INTO `administrator` (`administrator_id`, `username`, `password_hash`, `is_active`, `created_at`) VALUES
	(1, 'nikola', '$2b$10$JGWFgi.pBuaHfLMwvpLb6.8VGhQNFW.1IujYlB24p8hfuqfLCXh1a', 1, '2022-06-04 12:53:07'),
	(18, 'admin', '$2b$10$fuWJAuwmqqMsxPfXi.qxruomiA6vD3AHRrHoRJ35HKCyY88Pb3hVG', 1, '2022-07-13 23:34:06');
/*!40000 ALTER TABLE `administrator` ENABLE KEYS */;

-- Dumping structure for table sweets_shop_db.cart
DROP TABLE IF EXISTS `cart`;
CREATE TABLE IF NOT EXISTS `cart` (
  `cart_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int(10) unsigned NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`cart_id`),
  KEY `fk_cart_user_id` (`user_id`),
  CONSTRAINT `fk_cart_user_id` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb3;

-- Dumping data for table sweets_shop_db.cart: ~7 rows (approximately)
DELETE FROM `cart`;
/*!40000 ALTER TABLE `cart` DISABLE KEYS */;
INSERT INTO `cart` (`cart_id`, `user_id`, `created_at`) VALUES
	(3, 13, '2022-06-25 16:51:37'),
	(4, 13, '2022-06-25 16:56:53'),
	(5, 13, '2022-06-30 21:35:26'),
	(6, 13, '2022-06-30 21:45:55'),
	(7, 13, '2022-06-30 21:45:58'),
	(8, 13, '2022-06-30 21:46:09'),
	(9, 13, '2022-06-30 21:48:22'),
	(10, 13, '2022-06-30 21:50:29');
/*!40000 ALTER TABLE `cart` ENABLE KEYS */;

-- Dumping structure for table sweets_shop_db.cart_item
DROP TABLE IF EXISTS `cart_item`;
CREATE TABLE IF NOT EXISTS `cart_item` (
  `cart_item_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `amount` int(64) unsigned NOT NULL,
  `item_id` int(64) unsigned NOT NULL,
  `cart_id` int(64) unsigned NOT NULL,
  PRIMARY KEY (`cart_item_id`),
  UNIQUE KEY `uq_cart_item_cart_id_item_id` (`cart_id`,`item_id`),
  KEY `fk_cart_item_item_id` (`item_id`),
  KEY `fk_cart_item_cart_id` (`cart_id`),
  CONSTRAINT `fk_cart_item_cart_id` FOREIGN KEY (`cart_id`) REFERENCES `cart` (`cart_id`) ON UPDATE CASCADE,
  CONSTRAINT `fk_cart_item_item_id` FOREIGN KEY (`item_id`) REFERENCES `item` (`item_id`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb3;

-- Dumping data for table sweets_shop_db.cart_item: ~2 rows (approximately)
DELETE FROM `cart_item`;
/*!40000 ALTER TABLE `cart_item` DISABLE KEYS */;
INSERT INTO `cart_item` (`cart_item_id`, `amount`, `item_id`, `cart_id`) VALUES
	(1, 2, 1, 3),
	(7, 15, 3, 4);
/*!40000 ALTER TABLE `cart_item` ENABLE KEYS */;

-- Dumping structure for table sweets_shop_db.category
DROP TABLE IF EXISTS `category`;
CREATE TABLE IF NOT EXISTS `category` (
  `category_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(128) NOT NULL,
  `image_path` varchar(50) NOT NULL,
  `is_active` tinyint(1) unsigned NOT NULL DEFAULT 1,
  `measurement` enum('kugla','komad','100g','200','sto grama','300g') NOT NULL,
  PRIMARY KEY (`category_id`),
  UNIQUE KEY `uq_category_name` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=34 DEFAULT CHARSET=utf8mb3;

-- Dumping data for table sweets_shop_db.category: ~4 rows (approximately)
DELETE FROM `category`;
/*!40000 ALTER TABLE `category` DISABLE KEYS */;
INSERT INTO `category` (`category_id`, `name`, `image_path`, `is_active`, `measurement`) VALUES
	(1, 'Kolaci', 'images/kolaci.jpg', 1, 'komad'),
	(2, 'Sladoled', 'images/sladoled.jpg', 1, 'kugla'),
	(3, 'Bombone', 'images/bombone.jpg', 1, '100g'),
	(10, 'images/torte.jpg', 'images/torte.jpg', 1, 'komad');
/*!40000 ALTER TABLE `category` ENABLE KEYS */;

-- Dumping structure for table sweets_shop_db.ingredient
DROP TABLE IF EXISTS `ingredient`;
CREATE TABLE IF NOT EXISTS `ingredient` (
  `ingredient_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(64) NOT NULL,
  PRIMARY KEY (`ingredient_id`),
  UNIQUE KEY `uq_ingredient_name` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb3;

-- Dumping data for table sweets_shop_db.ingredient: ~14 rows (approximately)
DELETE FROM `ingredient`;
/*!40000 ALTER TABLE `ingredient` DISABLE KEYS */;
INSERT INTO `ingredient` (`ingredient_id`, `name`) VALUES
	(18, 'ananas'),
	(6, 'cokolada'),
	(16, 'jagoda'),
	(1, 'kakao'),
	(14, 'lesnici'),
	(15, 'mango'),
	(8, 'maskarpone sir'),
	(2, 'mleko'),
	(7, 'orasi'),
	(19, 'oreo'),
	(9, 'plazma'),
	(13, 'secer'),
	(10, 'sumsko voce'),
	(11, 'vanila'),
	(17, 'visnja'),
	(12, 'voce');
/*!40000 ALTER TABLE `ingredient` ENABLE KEYS */;

-- Dumping structure for table sweets_shop_db.ingredient_item
DROP TABLE IF EXISTS `ingredient_item`;
CREATE TABLE IF NOT EXISTS `ingredient_item` (
  `ingredient_item_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `ingredient_id` int(10) unsigned NOT NULL,
  `item_id` int(10) unsigned NOT NULL,
  PRIMARY KEY (`ingredient_item_id`),
  KEY `fk_ingredient_item_ingredient_id` (`ingredient_id`),
  KEY `fk_ingredient_item_item_id` (`item_id`),
  CONSTRAINT `fk_ingredient_item_ingredient_id` FOREIGN KEY (`ingredient_id`) REFERENCES `ingredient` (`ingredient_id`) ON UPDATE CASCADE,
  CONSTRAINT `fk_ingredient_item_item_id` FOREIGN KEY (`item_id`) REFERENCES `item` (`item_id`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=41 DEFAULT CHARSET=utf8mb3;

-- Dumping data for table sweets_shop_db.ingredient_item: ~35 rows (approximately)
DELETE FROM `ingredient_item`;
/*!40000 ALTER TABLE `ingredient_item` DISABLE KEYS */;
INSERT INTO `ingredient_item` (`ingredient_item_id`, `ingredient_id`, `item_id`) VALUES
	(1, 1, 1),
	(2, 2, 1),
	(3, 18, 5),
	(4, 14, 5),
	(5, 6, 11),
	(6, 7, 11),
	(7, 8, 2),
	(8, 9, 2),
	(9, 10, 2),
	(10, 12, 14),
	(11, 9, 14),
	(12, 11, 14),
	(13, 11, 15),
	(14, 13, 15),
	(15, 6, 16),
	(16, 14, 16),
	(17, 13, 1),
	(18, 13, 4),
	(19, 2, 4),
	(20, 15, 4),
	(21, 16, 6),
	(22, 2, 6),
	(23, 13, 6),
	(24, 6, 7),
	(25, 2, 7),
	(26, 11, 7),
	(27, 13, 7),
	(28, 12, 3),
	(29, 13, 3),
	(30, 6, 8),
	(31, 14, 8),
	(32, 13, 8),
	(33, 13, 9),
	(34, 13, 10),
	(35, 17, 5),
	(36, 6, 12),
	(37, 11, 12),
	(38, 19, 12),
	(39, 6, 13),
	(40, 14, 13);
/*!40000 ALTER TABLE `ingredient_item` ENABLE KEYS */;

-- Dumping structure for table sweets_shop_db.item
DROP TABLE IF EXISTS `item`;
CREATE TABLE IF NOT EXISTS `item` (
  `item_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(128) NOT NULL,
  `image_path` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT 1,
  `category_id` int(10) unsigned NOT NULL,
  `price` decimal(10,2) unsigned NOT NULL,
  PRIMARY KEY (`item_id`),
  UNIQUE KEY `uq_item_name` (`name`),
  KEY `fk_item_category_id` (`category_id`),
  CONSTRAINT `fk_item_category_id` FOREIGN KEY (`category_id`) REFERENCES `category` (`category_id`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb3;

-- Dumping data for table sweets_shop_db.item: ~16 rows (approximately)
DELETE FROM `item`;
/*!40000 ALTER TABLE `item` DISABLE KEYS */;
INSERT INTO `item` (`item_id`, `name`, `image_path`, `description`, `is_active`, `category_id`, `price`) VALUES
	(1, 'Cokolada', '../images/cokolada.jpg', 'Premijum italijnaski sladoled od belgijske cokolade ', 1, 2, 180.00),
	(2, 'Ciz kejk', '../images/cizKejk.jpg', 'Pravo osvezenje za vrele letnje dane', 1, 1, 250.00),
	(3, 'Vocni mix', '../images/vocniMix.jpg', 'Mix rucno pravljenih bombona sa aromom voca', 1, 3, 250.00),
	(4, 'Mango', '../images/mango.jpg', 'Premijum italijanski sladoled sa aromom tropskog manga', 1, 2, 180.00),
	(5, 'Moskva', '../images/moskva.jpg', 'Dobar miks voca i domacih kora', 1, 10, 240.00),
	(6, 'Jagoda', '../images/jagoda.jpg', 'Premijum italijanski sladoled od domacih jagoda', 1, 2, 180.00),
	(7, 'Stracatela', '../images/stracatela.jpg', 'Premijun autenticni italijanski sladoled sa komadicima cokolade i vanilom', 1, 2, 210.00),
	(8, 'Cokoladne', '../images/cokoladne.jpg', 'Mix bombona prelivenih belgijskom cokoladom', 1, 3, 300.00),
	(9, 'Kisele', '../images/kisele.jpg', 'Mix kiselih bombona raznih oblika', 1, 3, 200.00),
	(10, 'Gumene', '../images/gumene.jpg', 'Mix gumenih bombona raznih oblika', 1, 3, 200.00),
	(11, 'Reforma', '../images/reforma.jpg', 'Ne zovu je za dzabe kraljica medju tortama', 1, 10, 240.00),
	(12, 'Amore', '../images/amore.jpg', 'Cokoladna torta sa prepoznatljivim Oreo keksom', 1, 10, 240.00),
	(13, 'Kinder bueno', '../images/kinderBueno.jpg', 'San svakog deteta', 1, 10, 230.00),
	(14, 'Vocni tart', '../images/vocniTart.jpg', 'Lagana varijanta sa mixom raznog voca', 1, 1, 190.00),
	(15, 'Krempita', '../images/krempita.jpg', 'Prepoznatljivi pemasti fil', 1, 1, 190.00),
	(16, 'Coko mus', '../images/cokoMus.jpg', 'Napravljen od najbolje crne belgijske cokolade', 1, 1, 260.00);
/*!40000 ALTER TABLE `item` ENABLE KEYS */;

-- Dumping structure for table sweets_shop_db.order
DROP TABLE IF EXISTS `order`;
CREATE TABLE IF NOT EXISTS `order` (
  `order_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `status` enum('pending','declined','accepted') NOT NULL,
  `note` text DEFAULT NULL,
  `cart_id` int(10) unsigned NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`order_id`),
  UNIQUE KEY `uq_order_cart_id` (`cart_id`),
  CONSTRAINT `order_cart_id` FOREIGN KEY (`cart_id`) REFERENCES `cart` (`cart_id`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb3;

-- Dumping data for table sweets_shop_db.order: ~7 rows (approximately)
DELETE FROM `order`;
/*!40000 ALTER TABLE `order` DISABLE KEYS */;
INSERT INTO `order` (`order_id`, `status`, `note`, `cart_id`, `created_at`) VALUES
	(4, 'pending', 'fgds', 3, '2022-06-25 16:52:28'),
	(5, 'pending', NULL, 4, '2022-06-30 21:35:07'),
	(6, 'pending', NULL, 5, '2022-06-30 21:35:26'),
	(7, 'pending', NULL, 6, '2022-06-30 21:45:55'),
	(8, 'pending', NULL, 7, '2022-06-30 21:45:58'),
	(9, 'pending', NULL, 8, '2022-06-30 21:46:09'),
	(10, 'pending', NULL, 9, '2022-06-30 21:48:22');
/*!40000 ALTER TABLE `order` ENABLE KEYS */;

-- Dumping structure for table sweets_shop_db.user
DROP TABLE IF EXISTS `user`;
CREATE TABLE IF NOT EXISTS `user` (
  `user_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `email` varchar(255) NOT NULL,
  `password_hash` varchar(255) NOT NULL,
  `forename` varchar(64) NOT NULL,
  `surname` varchar(64) NOT NULL,
  `phone_number` varchar(24) DEFAULT NULL,
  `address` varchar(128) DEFAULT NULL,
  `is_active` tinyint(1) unsigned NOT NULL DEFAULT 0,
  `activation_code` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `uq_user_email` (`email`),
  UNIQUE KEY `uq_user_activation_code` (`activation_code`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb3;

-- Dumping data for table sweets_shop_db.user: ~3 rows (approximately)
DELETE FROM `user`;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` (`user_id`, `created_at`, `email`, `password_hash`, `forename`, `surname`, `phone_number`, `address`, `is_active`, `activation_code`) VALUES
	(1, '2022-06-15 19:16:46', 'nikola@singimail.rs', '$2b$10$zeyzI6.T92DaZKZDHh5Is.tzky/1t49rAS88JH5yPRBNH6teUPSlK', 'Nikola', 'Popovic', '063123456789', 'Dunavski kej 11', 1, 'nfdgfFHhv'),
	(13, '2022-06-24 22:47:44', 'singidunum@singimail.rs', '$2b$10$jok3M4etGwnQcSLlNZ6msee/mTGtCaTg7KZDVKhO2DfCNuCdOXKKK', 'Singidunum', 'Singidunum', NULL, NULL, 1, 'fcb5b55a-ad7d-4fd6-9b24-ba749bacd836'),
	(16, '2022-07-14 00:01:52', 'nikola@gmail.com', '$2b$10$ypscYysoEoEKe84bas7VU.cnORhQRAv26ZCFcGtexCEsxR4fnXdBq', 'Nikola', 'Popovic', NULL, NULL, 0, '64fbd3ba-2be3-476f-9e2b-e89719249509');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
