-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Versión del servidor:         10.4.20-MariaDB - mariadb.org binary distribution
-- SO del servidor:              Win64
-- HeidiSQL Versión:             11.0.0.5919
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;


-- Volcando estructura de base de datos para pixyo
CREATE DATABASE IF NOT EXISTS `pixyo` /*!40100 DEFAULT CHARACTER SET utf8mb4 */;
USE `pixyo`;

-- Volcando estructura para tabla pixyo.assistants
CREATE TABLE IF NOT EXISTS `assistants` (
  `EventId` int(11) DEFAULT NULL,
  `UserId` int(11) DEFAULT NULL,
  KEY `event` (`EventId`),
  KEY `User` (`UserId`),
  CONSTRAINT `User` FOREIGN KEY (`UserId`) REFERENCES `user` (`UserId`),
  CONSTRAINT `event` FOREIGN KEY (`EventId`) REFERENCES `event` (`EventId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- La exportación de datos fue deseleccionada.

-- Volcando estructura para tabla pixyo.event
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
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4;

-- La exportación de datos fue deseleccionada.

-- Volcando estructura para tabla pixyo.event_pics
CREATE TABLE IF NOT EXISTS `event_pics` (
  `PicId` int(11) NOT NULL AUTO_INCREMENT,
  `EventId` int(11) NOT NULL DEFAULT 0,
  `Pic` longblob NOT NULL DEFAULT '0',
  `scanned` tinyint(4) DEFAULT NULL,
  PRIMARY KEY (`PicId`),
  KEY `EventId` (`EventId`),
  CONSTRAINT `EventId` FOREIGN KEY (`EventId`) REFERENCES `event` (`EventId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- La exportación de datos fue deseleccionada.

-- Volcando estructura para tabla pixyo.payment_method
CREATE TABLE IF NOT EXISTS `payment_method` (
  `MethodId` int(11) NOT NULL AUTO_INCREMENT,
  `Description` varchar(50) NOT NULL DEFAULT '0',
  PRIMARY KEY (`MethodId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- La exportación de datos fue deseleccionada.

-- Volcando estructura para tabla pixyo.payment_plan
CREATE TABLE IF NOT EXISTS `payment_plan` (
  `PlantId` int(11) NOT NULL AUTO_INCREMENT,
  `Description` varchar(50) NOT NULL DEFAULT '0',
  `Price` double NOT NULL DEFAULT 0,
  `Periodicity` varchar(50) NOT NULL DEFAULT '0',
  PRIMARY KEY (`PlantId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- La exportación de datos fue deseleccionada.

-- Volcando estructura para tabla pixyo.pic_management
CREATE TABLE IF NOT EXISTS `pic_management` (
  `picid` int(11) DEFAULT NULL,
  `userid` int(11) DEFAULT NULL,
  `appears` tinyint(4) DEFAULT NULL,
  `downloaded` tinyint(4) DEFAULT NULL,
  KEY `FK_PIC` (`picid`),
  KEY `FK_USER` (`userid`),
  CONSTRAINT `FK_PIC` FOREIGN KEY (`picid`) REFERENCES `event_pics` (`PicId`),
  CONSTRAINT `FK_USER` FOREIGN KEY (`userid`) REFERENCES `user` (`UserId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- La exportación de datos fue deseleccionada.

-- Volcando estructura para tabla pixyo.user
CREATE TABLE IF NOT EXISTS `user` (
  `UserId` int(11) NOT NULL AUTO_INCREMENT,
  `Name` varchar(50) NOT NULL,
  `Password` varchar(50) NOT NULL,
  `Face` longblob DEFAULT NULL,
  `Phone_Number` varchar(50) DEFAULT NULL,
  `email` text DEFAULT NULL,
  `Shared_pics` int(11) DEFAULT NULL,
  `Payment_method` int(11) DEFAULT NULL,
  `Payment_plan` int(11) DEFAULT NULL,
  PRIMARY KEY (`UserId`),
  KEY `PaymentMethod` (`Payment_method`) USING BTREE,
  KEY `PaymentPlan` (`Payment_plan`) USING BTREE,
  CONSTRAINT `PaymentMethod` FOREIGN KEY (`Payment_method`) REFERENCES `payment_method` (`MethodId`),
  CONSTRAINT `PaymentPlan` FOREIGN KEY (`Payment_plan`) REFERENCES `payment_plan` (`PlantId`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4;

-- La exportación de datos fue deseleccionada.

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
