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
) ENGINE=InnoDB AUTO_INCREMENT=77 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `season_2024_10`
--

LOCK TABLES `season_2024_10` WRITE;
/*!40000 ALTER TABLE `season_2024_10` DISABLE KEYS */;
INSERT INTO `season_2024_10` VALUES (1,'1234','2024.10.1','周一10:10','bilibili','奇幻',1,12),(8,'124','2024-10-01','周一10:10','bilibili','奇幻',1,24),(9,'124','2024-10-01','周一10:10','bilibili','奇幻',1,24),(10,'124','2024-10-01','周一10:10','bilibili','奇幻',1,24),(11,'124','2024-10-01','周一10:10','bilibili','奇幻',1,24),(12,'124','2024-10-01','周一10:10','bilibili','奇幻',1,24),(13,'124','2024-10-01','周一10:10','bilibili','奇幻',1,24),(14,'124','2024-10-01','周一10:10','bilibili','奇幻',1,24),(15,'极速车魂 第二季（MF GHOST / 燃油车斗魂）','2024.10.7','周一00:00','bilibili','运动 / 赛车 / 竞技 / 近未来 / 头文字D',1,12),(16,'极速车魂 第二季（MF GHOST / 燃油车斗魂）','2024.10.7','周一00:00','bilibili','运动 / 赛车 / 竞技 / 近未来 / 头文字D',1,12),(17,'极速车魂 第二季（MF GHOST / 燃油车斗魂）','2024.10.7','周一00:00','bilibili','运动 / 赛车 / 竞技 / 近未来 / 头文字D',0,24),(18,'极速车魂 第二季（MF GHOST / 燃油车斗魂）','2024.10.7','周一00:00','bilibili','运动 / 赛车 / 竞技 / 近未来 / 头文字D',1,46),(19,'极速车魂 第二季（MF GHOST / 燃油车斗魂）','2024.10.7','周一00:00','bilibili','运动 / 赛车 / 竞技 / 近未来 / 头文字D',0,53),(20,'爱有点沉重的暗黑精灵从异世界紧追不放','4.7','周一00:05','暂无',NULL,0,12),(21,'拉撒路（LAZARUS）','4.7','周一00:15','暂无',NULL,0,13),(22,'快藏好！玛琪娜同学！！','4.7','周一00:20','暂无',NULL,0,12),(23,'转生成猫咪的大叔','连载中','周一13:50','暂无',NULL,0,12),(24,'测不准的阿波连同学 第二季','4.7','周一21:00','bilibili',NULL,0,12),(25,'随兴旅-That\'s Journey-（杂旅）','4.7','周一22:00','暂无',NULL,0,12),(26,'鬼人幻灯抄','3.31','周一23:00','暂无',NULL,0,24),(27,'#COMPASS2.0 战斗天赋解析系统','4.7','周一23:00','暂无',NULL,0,12),(28,'夏日口袋（Summer Pockets）','4.7','周一23:00','bilibili',NULL,0,26),(29,'正义使者 - 我的英雄学院之非法英雄','4.7','周一23:00','暂无',NULL,0,13),(30,'中禅寺老师妖怪讲义录 解谜就交给老师','4.8','周二01:30','暂无',NULL,0,12),(31,'最强王者的第二人生（终末起点）','4.22','周二19:00','bilibili',NULL,0,12),(32,'紫云寺家的兄弟姐妹','4.8','周二21:30','暂无',NULL,0,12),(33,'直至魔女消逝','4.22','周二22:30','bilibili',NULL,0,12),(34,'阳光马达棒球场！','4.1','周二23:00','暂无',NULL,0,12),(35,'机动战士高达 GQuuuuuuX','4.8','周二23:29','暂无',NULL,0,12),(36,'末日后酒店（启示录酒店）','4.9','周三01:40','bilibili',NULL,0,12),(37,'莉可丽丝：友谊是时间的窃贼','4.16','周三20:00','bilibili',NULL,0,6),(38,'拜托请穿上，鹰峰同学','4.2','周三21:30','暂无',NULL,0,12);
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

-- Dump completed on 2025-05-14 19:55:49
