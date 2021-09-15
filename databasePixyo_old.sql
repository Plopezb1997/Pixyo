-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server version:               10.4.13-MariaDB - mariadb.org binary distribution
-- Server OS:                    Win64
-- HeidiSQL Version:             11.0.0.5919
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;


-- Dumping database structure for pixyo
CREATE DATABASE IF NOT EXISTS `pixyo` /*!40100 DEFAULT CHARACTER SET utf8mb4 */;
USE `pixyo`;

-- Dumping structure for table pixyo.assistants
CREATE TABLE IF NOT EXISTS `assistants` (
  `EventId` int(11) DEFAULT NULL,
  `UserId` int(11) DEFAULT NULL,
  KEY `event` (`EventId`),
  KEY `User` (`UserId`),
  CONSTRAINT `User` FOREIGN KEY (`UserId`) REFERENCES `user` (`UserId`),
  CONSTRAINT `event` FOREIGN KEY (`EventId`) REFERENCES `event` (`EventId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Dumping data for table pixyo.assistants: ~0 rows (approximately)
/*!40000 ALTER TABLE `assistants` DISABLE KEYS */;
/*!40000 ALTER TABLE `assistants` ENABLE KEYS */;

-- Dumping structure for table pixyo.event
CREATE TABLE IF NOT EXISTS `event` (
  `EventId` int(11) NOT NULL AUTO_INCREMENT,
  `Name` varchar(50) DEFAULT NULL,
  `Status` varchar(50) DEFAULT NULL,
  `Location` varchar(50) DEFAULT NULL,
  `Event_Code` varchar(50) DEFAULT NULL,
  `Start_date` datetime DEFAULT NULL,
  `End_date` datetime DEFAULT NULL,
  `CreatorId` int(11) DEFAULT NULL,
  PRIMARY KEY (`EventId`),
  KEY `CreatorId` (`CreatorId`),
  CONSTRAINT `CreatorUser` FOREIGN KEY (`CreatorId`) REFERENCES `user` (`UserId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Dumping data for table pixyo.event: ~0 rows (approximately)
/*!40000 ALTER TABLE `event` DISABLE KEYS */;
/*!40000 ALTER TABLE `event` ENABLE KEYS */;

-- Dumping structure for table pixyo.payment_method
CREATE TABLE IF NOT EXISTS `payment_method` (
  `MethodId` int(11) NOT NULL AUTO_INCREMENT,
  `Description` varchar(50) NOT NULL DEFAULT '0',
  PRIMARY KEY (`MethodId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Dumping data for table pixyo.payment_method: ~0 rows (approximately)
/*!40000 ALTER TABLE `payment_method` DISABLE KEYS */;
/*!40000 ALTER TABLE `payment_method` ENABLE KEYS */;

-- Dumping structure for table pixyo.payment_plan
CREATE TABLE IF NOT EXISTS `payment_plan` (
  `PlantId` int(11) NOT NULL AUTO_INCREMENT,
  `Description` varchar(50) NOT NULL DEFAULT '0',
  `Price` double NOT NULL DEFAULT 0,
  `Periodicity` varchar(50) NOT NULL DEFAULT '0',
  PRIMARY KEY (`PlantId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Dumping data for table pixyo.payment_plan: ~0 rows (approximately)
/*!40000 ALTER TABLE `payment_plan` DISABLE KEYS */;
/*!40000 ALTER TABLE `payment_plan` ENABLE KEYS */;

-- Dumping structure for table pixyo.pics
CREATE TABLE IF NOT EXISTS `pics` (
  `PicId` int(11) NOT NULL AUTO_INCREMENT,
  `EventId` int(11) NOT NULL DEFAULT 0,
  `Pic` blob NOT NULL DEFAULT '0',
  PRIMARY KEY (`PicId`),
  KEY `EventId` (`EventId`),
  CONSTRAINT `EventId` FOREIGN KEY (`EventId`) REFERENCES `event` (`EventId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Dumping data for table pixyo.pics: ~0 rows (approximately)
/*!40000 ALTER TABLE `pics` DISABLE KEYS */;
/*!40000 ALTER TABLE `pics` ENABLE KEYS */;

-- Dumping structure for table pixyo.user
CREATE TABLE IF NOT EXISTS `user` (
  `UserId` int(11) NOT NULL AUTO_INCREMENT,
  `Name` varchar(50) NOT NULL,
  `Password` varchar(50) NOT NULL,
  `Face` blob DEFAULT NULL,
  `Phone_Number` varchar(50) DEFAULT NULL,
  `email` text DEFAULT NULL,
  `SharedPics` int(11) DEFAULT NULL,
  `PaymentMethod` int(11) DEFAULT NULL,
  `PaymentPlan` int(11) DEFAULT NULL,
  PRIMARY KEY (`UserId`),
  KEY `PaymentMethod` (`PaymentMethod`),
  KEY `PaymentPlan` (`PaymentPlan`),
  CONSTRAINT `PaymentMethod` FOREIGN KEY (`PaymentMethod`) REFERENCES `payment_method` (`MethodId`),
  CONSTRAINT `PaymentPlan` FOREIGN KEY (`PaymentPlan`) REFERENCES `payment_plan` (`PlantId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Dumping data for table pixyo.user: ~0 rows (approximately)
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
/*!40000 ALTER TABLE `user` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
