/*
SQLyog Community v13.2.0 (64 bit)
MySQL - 10.4.24-MariaDB : Database - fashion
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`fashion` /*!40100 DEFAULT CHARACTER SET utf8mb4 */;

USE `fashion`;

/*Table structure for table `cartdetail` */

DROP TABLE IF EXISTS `cartdetail`;

CREATE TABLE `cartdetail` (
  `id` int(250) NOT NULL AUTO_INCREMENT,
  `cartId` int(11) NOT NULL,
  `productId` int(11) NOT NULL,
  `quantity` int(11) NOT NULL,
  `price` decimal(10,4) NOT NULL DEFAULT 0.0000,
  `unitId` int(11) NOT NULL,
  `total` decimal(10,4) NOT NULL DEFAULT 0.0000,
  PRIMARY KEY (`id`),
  KEY `cartId` (`cartId`),
  KEY `productId` (`productId`),
  KEY `unitId` (`unitId`),
  CONSTRAINT `cartdetail_ibfk_1` FOREIGN KEY (`cartId`) REFERENCES `usercart` (`cartId`),
  CONSTRAINT `cartdetail_ibfk_2` FOREIGN KEY (`productId`) REFERENCES `product` (`id`),
  CONSTRAINT `cartdetail_ibfk_3` FOREIGN KEY (`unitId`) REFERENCES `unit` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=90 DEFAULT CHARSET=utf8mb4;

/*Data for the table `cartdetail` */

insert  into `cartdetail`(`id`,`cartId`,`productId`,`quantity`,`price`,`unitId`,`total`) values 
(75,39,77,1,1050.0000,2,1050.0000),
(76,39,75,1,850.0000,2,850.0000),
(77,39,71,1,800.0000,2,800.0000),
(78,39,68,1,900.0000,2,900.0000),
(79,40,74,3,1000.0000,2,3000.0000),
(80,41,72,1,1000.0000,2,1000.0000),
(81,41,68,1,900.0000,2,900.0000),
(82,42,77,1,1050.0000,2,1050.0000),
(83,42,76,1,950.0000,2,950.0000),
(84,42,73,1,1200.0000,2,1200.0000),
(85,43,78,1,1300.0000,2,1300.0000),
(86,43,73,2,1200.0000,2,2400.0000),
(87,44,75,3,850.0000,2,2550.0000),
(88,45,68,2,900.0000,2,1800.0000),
(89,45,69,1,1200.0000,2,1200.0000);

/*Table structure for table `category` */

DROP TABLE IF EXISTS `category`;

CREATE TABLE `category` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4;

/*Data for the table `category` */

insert  into `category`(`id`,`title`) values 
(1,'dress'),
(2,'hoodie'),
(3,'woman_blazer'),
(4,'men_blazer');

/*Table structure for table `inventory` */

DROP TABLE IF EXISTS `inventory`;

CREATE TABLE `inventory` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `productId` int(11) NOT NULL,
  `quantity` decimal(10,4) NOT NULL,
  `unitId` int(11) NOT NULL,
  `status` tinyint(1) NOT NULL DEFAULT 1,
  PRIMARY KEY (`id`),
  KEY `fk_inventory_product` (`productId`),
  KEY `fk_inventory_unit` (`unitId`),
  CONSTRAINT `fk_inventory_product` FOREIGN KEY (`productId`) REFERENCES `product` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_inventory_unit` FOREIGN KEY (`unitId`) REFERENCES `unit` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `inventory_ibfk_1` FOREIGN KEY (`productId`) REFERENCES `product` (`id`),
  CONSTRAINT `inventory_ibfk_2` FOREIGN KEY (`unitId`) REFERENCES `unit` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=67 DEFAULT CHARSET=utf8mb4;

/*Data for the table `inventory` */

insert  into `inventory`(`id`,`productId`,`quantity`,`unitId`,`status`) values 
(54,68,24.0000,2,1),
(55,69,12.0000,2,1),
(56,70,20.0000,2,1),
(57,71,20.0000,2,1),
(58,72,20.0000,2,1),
(59,73,19.0000,2,1),
(60,74,20.0000,2,1),
(61,75,14.0000,2,1),
(62,76,11.0000,2,1),
(63,77,17.0000,2,1),
(64,78,20.0000,2,1),
(65,79,25.0000,2,1),
(66,80,5.0000,2,1);

/*Table structure for table `product` */

DROP TABLE IF EXISTS `product`;

CREATE TABLE `product` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `product_name` varchar(250) DEFAULT NULL,
  `product_price` float DEFAULT NULL,
  `description` varchar(300) DEFAULT NULL,
  `categoryId` int(11) DEFAULT NULL,
  `unit` int(11) DEFAULT NULL,
  `image` text DEFAULT NULL,
  `discount` float DEFAULT NULL,
  `status` tinyint(1) NOT NULL DEFAULT 1,
  PRIMARY KEY (`id`),
  KEY `unit` (`unit`),
  KEY `categoryId` (`categoryId`),
  CONSTRAINT `product_ibfk_1` FOREIGN KEY (`unit`) REFERENCES `unit` (`id`),
  CONSTRAINT `product_ibfk_2` FOREIGN KEY (`categoryId`) REFERENCES `category` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=81 DEFAULT CHARSET=utf8mb4;

/*Data for the table `product` */

insert  into `product`(`id`,`product_name`,`product_price`,`description`,`categoryId`,`unit`,`image`,`discount`,`status`) values 
(68,'Pink Blazer',900,'Women\'s Regular Fit Formal Stylish Blazer',3,2,'Double-breasted blazer.jpeg',50,1),
(69,'Grey Blazer',1200,'Regular Fit Stylish Blazer',3,2,'grey blazer.jpeg',50,1),
(70,'Black Casual Blazer',850,'Formal and Smart Blazer for Women, Regular Fit, Stylish Blazer',3,2,'Textured-weave blazer.jpeg',0,1),
(71,'Poloneck Dress',800,'Women Knee Length Dress',1,2,'poloneck dress.jpeg',0,1),
(72,'Fitted Dress',1000,'Women Full Sleeve  Casual Knee Length Dress',1,2,'Fitted dress.jpeg',0,1),
(73,'Satin Dress',1200,'Women\'s Georgette Flared Western Dress',1,2,'Knot-detail satin dress.jpeg',0,1),
(74,'Maroon color hoodie',1000,'Cotton Fleece Regular Fit Hooded Sweatshirt Full Sleeves',2,2,'fit hoodie.jpeg',0,1),
(75,'Fleece Neck Hoodie',850,'100% Pure Cotton; Premium Export Quality Branded Full Sleeve Sweatshirt For Men',2,2,'oversized hoodie.jpeg',0,1),
(76,'Printed Sweatshirt',950,'Men\'s Printed Fleece Hooded Sweatshirt',2,2,'Relaxed Fit Printed hoodie.jpeg',0,1),
(77,'Blue Solid Blazer',1050,'Designer Men\'s Slim Fit Notched Lapel Single Breasted Solid Blazer',4,2,'blue blazer for gentleman.jpeg',0,1),
(78,'Green Color Blazer',1300,'Men\'s Slim Fit Formal/Party Men\'s Blazer',4,2,'Regular Fit Linen jacket.jpeg',0,1),
(79,' Slim Fit Blzaer',950,'Solid Single Breasted for Men Single Breasted Office, Party, Festival & Wedding Blazer',4,2,'slim fit blazer.jpeg',0,1),
(80,'Black Blazer Jacket',800,'New Modern Design',3,2,'3.jpeg',0,1);

/*Table structure for table `unit` */

DROP TABLE IF EXISTS `unit`;

CREATE TABLE `unit` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `unit` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4;

/*Data for the table `unit` */

insert  into `unit`(`id`,`unit`) values 
(1,'K.G'),
(2,'Pices');

/*Table structure for table `usercart` */

DROP TABLE IF EXISTS `usercart`;

CREATE TABLE `usercart` (
  `cartId` int(11) NOT NULL AUTO_INCREMENT,
  `userId` int(11) NOT NULL,
  `customer_name` varchar(250) NOT NULL,
  `address` varchar(250) NOT NULL,
  `totalQnty` int(11) NOT NULL,
  `total_price` decimal(10,4) NOT NULL DEFAULT 0.0000,
  `date` datetime DEFAULT current_timestamp(),
  `orderStatus` enum('placed','accepted','cancelled') NOT NULL DEFAULT 'placed',
  PRIMARY KEY (`cartId`),
  KEY `userId` (`userId`),
  CONSTRAINT `usercart_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=46 DEFAULT CHARSET=utf8mb4;

/*Data for the table `usercart` */

insert  into `usercart`(`cartId`,`userId`,`customer_name`,`address`,`totalQnty`,`total_price`,`date`,`orderStatus`) values 
(39,2,'Sita','Birgunj',4,3600.0000,'2024-01-21 00:10:57','accepted'),
(40,2,'Sita','Birgunj',3,3000.0000,'2024-01-21 00:11:59','placed'),
(41,2,'Sita','birgunj',2,1900.0000,'2024-01-21 01:05:31','placed'),
(42,2,'Sita','birgunj',3,3200.0000,'2024-01-21 01:06:10','placed'),
(43,25,'Silpa Shetty','Simra',3,3700.0000,'2024-01-21 01:06:57','placed'),
(44,26,'Ram  Shah','Birgunj',3,2550.0000,'2024-01-21 01:09:02','placed'),
(45,27,'Hare Krishna','Birgunj',3,3000.0000,'2024-01-21 01:10:57','placed');

/*Table structure for table `users` */

DROP TABLE IF EXISTS `users`;

CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(150) NOT NULL,
  `address` varchar(500) NOT NULL,
  `email` varchar(200) NOT NULL,
  `password` varchar(200) NOT NULL,
  `phone` varchar(200) NOT NULL,
  `second_address` varchar(20) DEFAULT NULL,
  `role` enum('admin','user') NOT NULL DEFAULT 'user',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=utf8mb4;

/*Data for the table `users` */

insert  into `users`(`id`,`name`,`address`,`email`,`password`,`phone`,`second_address`,`role`) values 
(1,'Aarti Shah','Birgunj','aartishah9855@gmail.com','123456','9845257893','Birgunj','admin'),
(2,'Sita','kathmandu','sita@gmail.com','12345678','984555555555','birgunj','user'),
(25,'Silpa Shetty','Simra','silpa@gmail.com','iutwe','9856321485','Simra','user'),
(26,'Ram  Shah','Adarshnagar','ram@gmail.com','78945','9874563214','Birgunj','user'),
(27,'Hare Krishna','Gokuldham','hare@gmail.com','98745','9732587412','Birgunj','user'),
(28,'Neha Cjaudhary','Jeetpur','neha@gmail.com','123456','9845038896','dffffffffffffff','user');

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
