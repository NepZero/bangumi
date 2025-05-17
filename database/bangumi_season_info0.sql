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
-- Table structure for table `season_info`
--

DROP TABLE IF EXISTS `season_info`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `season_info` (
  `id` int NOT NULL,
  `banguminame` varchar(40) NOT NULL,
  `season` varchar(10) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `season_info`
--

LOCK TABLES `season_info` WRITE;
/*!40000 ALTER TABLE `season_info` DISABLE KEYS */;
INSERT INTO `season_info` VALUES (1,'爱有点沉重的暗黑精灵从异世界紧追不放','2025.4'),(2,'拉撒路（LAZARUS）','2025.4'),(3,'快藏好！玛琪娜同学！！','2025.4'),(4,'转生成猫咪的大叔','2025.4'),(5,'测不准的阿波连同学 第二季','2025.4'),(6,'随兴旅-That\'s Journey-（杂旅）','2025.4'),(7,'鬼人幻灯抄','2025.4'),(8,'#COMPASS2.0 战斗天赋解析系统','2025.4'),(9,'夏日口袋（Summer Pockets）','2025.4'),(10,'正义使者 - 我的英雄学院之非法英雄','2025.4'),(11,'中禅寺老师妖怪讲义录 解谜就交给老师','2025.4'),(12,'最强王者的第二人生（终末起点）','2025.4'),(13,'紫云寺家的兄弟姐妹','2025.4'),(14,'直至魔女消逝','2025.4'),(15,'阳光马达棒球场！','2025.4'),(16,'机动战士高达 GQuuuuuuX','2025.4'),(17,'末日后酒店（启示录酒店）','2025.4'),(18,'莉可丽丝：友谊是时间的窃贼','2025.4'),(19,'拜托请穿上，鹰峰同学','2025.4'),(20,'华Doll*-Reinterpretation of Flowering-','2025.4'),(21,'记忆缝线（YOUR FORMA）','2025.4'),(22,'完美到难以接近的圣女遭到解除婚约后被卖到邻国','2025.4'),(23,'外星人姆姆','2025.4'),(24,'最强王者的第二人生（终末起点）（港澳台）','2025.4'),(25,'MIRU 我们的未来','2025.4'),(26,'你与我最后的战场 亦或是世界起始的圣战 第二季','2025.4'),(27,'忍者与杀手的两人生活','2025.4'),(28,'天才治疗师退队作为无照治疗师快乐生活','2025.4'),(29,'摇滚乃是淑女的爱好','2025.4'),(30,'防风少年 第二季（防风铃）','2025.4'),(31,'宝可梦 地平线','2025.4'),(32,'战队大失格 第二季','2025.4'),(33,'赛马娘 芦毛灰姑娘','2025.4'),(34,'男女之间存在纯友情吗？（不，不存在!）','2025.4'),(35,'药屋少女的呢喃 第二季','2025.4'),(36,'推理要在晚餐后','2025.4'),(37,'再见，地球 第二季','2025.4'),(38,'神统记','2025.4'),(39,'每日男公关（Everyday Host）','2025.4'),(40,'炎炎消防队 第三季（叁之章）','2025.4'),(41,'真･武士传 剑勇传说（城市风云儿 / 九龙珠）','2025.4'),(42,'名侦探柯南','2025.4'),(43,'安妮·雪莉','2025.4'),(44,'打了300年的史莱姆不知不觉就练到了满级 第二季','2025.4'),(45,'罪恶装备 奋战: 两位裁决者','2025.4'),(46,'搞笑漫画日和 第五季（GO）','2025.4'),(47,'九龙大众浪漫','2025.4'),(48,'乡下大叔成为剑圣','2025.4'),(49,'黑执事 绿之魔女篇','2025.4'),(50,'离开A级队伍的我，和从前的弟子往迷宫深处迈进','2025.4'),(51,'我与尼特女忍者的莫名同居生活','2025.4'),(52,'Classic★Stars – 古典乐★之星','2025.4'),(53,'mono女孩','2025.4'),(54,'岁月流逝饭菜依旧美味','2025.4'),(55,'我是星际国家的恶德领主！','2025.4'),(56,'小市民系列 第二季','2025.4'),(57,'你与偶像 光之美少女♪','2025.4'),(58,'公主的管弦乐团','2025.4'),(59,'秘密的偶像公主 RING篇','2025.4'),(60,'魔女与使魔（魔女守护者）','2025.4'),(61,'转生为白猪贵族的我，运用前世记忆养育雏鸟般的弟弟','2025.4'),(62,'使人误解的工房主（干杂活我乃最强）','2025.4'),(63,'前桥魔女','2025.4'),(64,'受到猩猩之神庇护的大小姐在皇家骑士团受到宠爱','2025.4'),(65,'航海王（海贼王）','2025.4'),(66,'月出之战','2025.4');
/*!40000 ALTER TABLE `season_info` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-05-17 10:46:07
