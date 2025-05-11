-- MySQL dump 10.13  Distrib 8.0.42, for Win64 (x86_64)
--
-- Host: localhost    Database: bangumi
-- ------------------------------------------------------
-- Server version	8.0.42

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `season_2024_10`
--

DROP TABLE IF EXISTS `season_2024_10`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `season_2024_10` (
  `id` int NOT NULL AUTO_INCREMENT,
  `banguminame` varchar(30) NOT NULL,
  `start_time` varchar(10) DEFAULT NULL,
  `screening` varchar(10) DEFAULT NULL,
  `platform` varchar(20) DEFAULT NULL,
  `tag` varchar(40) DEFAULT NULL,
  `isfinish` tinyint(1) NOT NULL,
  `episodes` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `season_2024_10`
--

LOCK TABLES `season_2024_10` WRITE;
/*!40000 ALTER TABLE `season_2024_10` DISABLE KEYS */;
INSERT INTO `season_2024_10` VALUES (1,'1234','2024.10.1','周一10:10','bilibili','奇幻',1,12),(8,'124','2024-10-01','周一10:10','bilibili','奇幻',1,24),(9,'124','2024-10-01','周一10:10','bilibili','奇幻',1,24),(10,'124','2024-10-01','周一10:10','bilibili','奇幻',1,24),(11,'124','2024-10-01','周一10:10','bilibili','奇幻',1,24),(12,'124','2024-10-01','周一10:10','bilibili','奇幻',1,24),(13,'124','2024-10-01','周一10:10','bilibili','奇幻',1,24),(14,'124','2024-10-01','周一10:10','bilibili','奇幻',1,24),(15,'极速车魂 第二季（MF GHOST / 燃油车斗魂）','2024.10.7','周一00:00','bilibili','运动 / 赛车 / 竞技 / 近未来 / 头文字D',1,12),(16,'极速车魂 第二季（MF GHOST / 燃油车斗魂）','2024.10.7','周一00:00','bilibili','运动 / 赛车 / 竞技 / 近未来 / 头文字D',1,12),(17,'极速车魂 第二季（MF GHOST / 燃油车斗魂）','2024.10.7','周一00:00','bilibili','运动 / 赛车 / 竞技 / 近未来 / 头文字D',0,24),(18,'极速车魂 第二季（MF GHOST / 燃油车斗魂）','2024.10.7','周一00:00','bilibili','运动 / 赛车 / 竞技 / 近未来 / 头文字D',1,46),(19,'极速车魂 第二季（MF GHOST / 燃油车斗魂）','2024.10.7','周一00:00','bilibili','运动 / 赛车 / 竞技 / 近未来 / 头文字D',0,53);
/*!40000 ALTER TABLE `season_2024_10` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-05-11 15:48:33
