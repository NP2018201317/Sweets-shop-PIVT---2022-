-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server version:               10.7.3-MariaDB - mariadb.org binary distribution
-- Server OS:                    Win64
-- HeidiSQL Version:             12.0.0.6468
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
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
  `password_has` varchar(255) NOT NULL,
  `is_active` tinyint(1) unsigned NOT NULL DEFAULT 1,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`administrator_id`),
  UNIQUE KEY `uq_administrator_username` (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- Dumping data for table sweets_shop_db.administrator: ~0 rows (approximately)

-- Dumping structure for table sweets_shop_db.cart
DROP TABLE IF EXISTS `cart`;
CREATE TABLE IF NOT EXISTS `cart` (
  `cart_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int(10) unsigned NOT NULL,
  PRIMARY KEY (`cart_id`),
  KEY `fk_cart_user_id` (`user_id`),
  CONSTRAINT `fk_cart_user_id` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- Dumping data for table sweets_shop_db.cart: ~0 rows (approximately)

-- Dumping structure for table sweets_shop_db.cart_item
DROP TABLE IF EXISTS `cart_item`;
CREATE TABLE IF NOT EXISTS `cart_item` (
  `cart_item_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `amount` int(64) unsigned NOT NULL,
  `item_id` int(64) unsigned NOT NULL,
  `cart_id` int(64) unsigned NOT NULL,
  PRIMARY KEY (`cart_item_id`),
  KEY `fk_cart_item_item_id` (`item_id`),
  KEY `fk_cart_item_cart_id` (`cart_id`),
  CONSTRAINT `fk_cart_item_cart_id` FOREIGN KEY (`cart_id`) REFERENCES `cart` (`cart_id`) ON UPDATE CASCADE,
  CONSTRAINT `fk_cart_item_item_id` FOREIGN KEY (`item_id`) REFERENCES `item` (`item_id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- Dumping data for table sweets_shop_db.cart_item: ~0 rows (approximately)

-- Dumping structure for table sweets_shop_db.category
DROP TABLE IF EXISTS `category`;
CREATE TABLE IF NOT EXISTS `category` (
  `category_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(128) NOT NULL,
  `image_path` varchar(50) NOT NULL,
  `is_active` tinyint(1) unsigned NOT NULL DEFAULT 1,
  `measurement` enum('100g','kugla','komad') NOT NULL,
  PRIMARY KEY (`category_id`),
  UNIQUE KEY `uq_category_name` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb3;

-- Dumping data for table sweets_shop_db.category: ~3 rows (approximately)
INSERT INTO `category` (`category_id`, `name`, `image_path`, `is_active`, `measurement`) VALUES
	(1, 'Kolaci', 'img/kolac.jpg', 1, 'komad'),
	(2, 'Sladoled', 'img/sladoled.jpg', 1, 'kugla'),
	(3, 'Bombone', 'img/bombone.jpg', 1, '100g');

-- Dumping structure for table sweets_shop_db.ingredient
DROP TABLE IF EXISTS `ingredient`;
CREATE TABLE IF NOT EXISTS `ingredient` (
  `ingredient_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(64) NOT NULL,
  PRIMARY KEY (`ingredient_id`),
  UNIQUE KEY `uq_ingredient_name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- Dumping data for table sweets_shop_db.ingredient: ~0 rows (approximately)

-- Dumping structure for table sweets_shop_db.ingridient_item
DROP TABLE IF EXISTS `ingridient_item`;
CREATE TABLE IF NOT EXISTS `ingridient_item` (
  `ingredient_item_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `ingredient_id` int(10) unsigned NOT NULL,
  `item_id` int(10) unsigned NOT NULL,
  PRIMARY KEY (`ingredient_item_id`),
  KEY `fk_ingredient_item_ingredient_id` (`ingredient_id`),
  KEY `fk_ingredient_item_item_id` (`item_id`),
  CONSTRAINT `fk_ingredient_item_ingredient_id` FOREIGN KEY (`ingredient_id`) REFERENCES `ingredient` (`ingredient_id`) ON UPDATE CASCADE,
  CONSTRAINT `fk_ingredient_item_item_id` FOREIGN KEY (`item_id`) REFERENCES `item` (`item_id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- Dumping data for table sweets_shop_db.ingridient_item: ~0 rows (approximately)

-- Dumping structure for table sweets_shop_db.item
DROP TABLE IF EXISTS `item`;
CREATE TABLE IF NOT EXISTS `item` (
  `item_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(128) NOT NULL,
  `image_path` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT 1,
  `category_id` int(10) unsigned NOT NULL,
  PRIMARY KEY (`item_id`),
  UNIQUE KEY `uq_item_name` (`name`),
  KEY `fk_item_category_id` (`category_id`),
  CONSTRAINT `fk_item_category_id` FOREIGN KEY (`category_id`) REFERENCES `category` (`category_id`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb3;

-- Dumping data for table sweets_shop_db.item: ~3 rows (approximately)
INSERT INTO `item` (`item_id`, `name`, `image_path`, `description`, `is_active`, `category_id`) VALUES
	(1, 'Cokolada', 'img/cokolada', '100% kako', 1, 2),
	(2, 'Tiraisu', 'img/tiramisu', 'test', 1, 1),
	(3, 'Negro', 'img/negro', 'test', 1, 3);

-- Dumping structure for table sweets_shop_db.order
DROP TABLE IF EXISTS `order`;
CREATE TABLE IF NOT EXISTS `order` (
  `order_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `status` enum('pending','declined','accepted') NOT NULL,
  `note` text NOT NULL,
  `cart_id` int(10) unsigned NOT NULL,
  PRIMARY KEY (`order_id`),
  UNIQUE KEY `uq_order_cart_id` (`cart_id`),
  CONSTRAINT `order_cart_id` FOREIGN KEY (`cart_id`) REFERENCES `cart` (`cart_id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- Dumping data for table sweets_shop_db.order: ~0 rows (approximately)

-- Dumping structure for table sweets_shop_db.price
DROP TABLE IF EXISTS `price`;
CREATE TABLE IF NOT EXISTS `price` (
  `price_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `price` int(64) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `item_id` int(10) unsigned NOT NULL,
  PRIMARY KEY (`price_id`),
  KEY `fk_price_item_id` (`item_id`),
  CONSTRAINT `fk_price_item_id` FOREIGN KEY (`item_id`) REFERENCES `item` (`item_id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- Dumping data for table sweets_shop_db.price: ~0 rows (approximately)

-- Dumping structure for table sweets_shop_db.user
DROP TABLE IF EXISTS `user`;
CREATE TABLE IF NOT EXISTS `user` (
  `user_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `email` varchar(255) NOT NULL,
  `password_has` varchar(255) NOT NULL,
  `forename` varchar(64) NOT NULL,
  `surname` varchar(64) NOT NULL,
  `phone_number` varchar(24) NOT NULL,
  `adress` text NOT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT 1,
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `uq_user_email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- Dumping data for table sweets_shop_db.user: ~0 rows (approximately)

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
