-- MySQL dump 10.13  Distrib 8.4.5, for macos15.2 (arm64)
--
-- Host: gk90usy5ik2otcvi.cbetxkdyhwsb.us-east-1.rds.amazonaws.com    Database: kn1av5tf8p91tiix
-- ------------------------------------------------------
-- Server version	8.0.40

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
SET @MYSQLDUMP_TEMP_LOG_BIN = @@SESSION.SQL_LOG_BIN;
SET @@SESSION.SQL_LOG_BIN= 0;

--
-- GTID state at the beginning of the backup 
--

SET @@GLOBAL.GTID_PURGED=/*!80000 '+'*/ '';

--
-- Table structure for table `categories`
--

DROP TABLE IF EXISTS `categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categories` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `label` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categories`
--

LOCK TABLES `categories` WRITE;
/*!40000 ALTER TABLE `categories` DISABLE KEYS */;
INSERT INTO `categories` VALUES (1,'Квартира'),(2,'Дом'),(3,'Участок'),(4,'Комерческое помещение');
/*!40000 ALTER TABLE `categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `deal_types`
--

DROP TABLE IF EXISTS `deal_types`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `deal_types` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `label` varchar(50) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `label` (`label`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `deal_types`
--

LOCK TABLES `deal_types` WRITE;
/*!40000 ALTER TABLE `deal_types` DISABLE KEYS */;
INSERT INTO `deal_types` VALUES (1,'Бартер'),(2,'Ипотека'),(3,'Наличный расчет'),(4,'Рассрочка'),(5,'Срочная продажа');
/*!40000 ALTER TABLE `deal_types` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `districts`
--

DROP TABLE IF EXISTS `districts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `districts` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `label` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `label` (`label`)
) ENGINE=InnoDB AUTO_INCREMENT=184 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `districts`
--

LOCK TABLES `districts` WRITE;
/*!40000 ALTER TABLE `districts` DISABLE KEYS */;
INSERT INTO `districts` VALUES (12,'10 мкр'),(16,'1000 мелочей (Карпинка)'),(13,'11 мкр'),(15,'110 квартал'),(14,'12 мкр'),(5,'3 мкр'),(6,'4 мкр'),(7,'5 мкр'),(8,'6 мкр'),(9,'7 мкр'),(10,'8 мкр'),(11,'9 мкр'),(17,'Bravo коттеджный городок'),(19,'Азамат авторынок'),(1,'Азия Молл'),(20,'Ак-Бата ж/м'),(21,'Ак-Босого ж/м'),(22,'Ак-Жар ж/м'),(23,'Ак-Кеме (старый аэропорт)'),(24,'Ак-Орго ж/м'),(25,'Ак-Ордо 1 ж/м'),(26,'Ак-Ордо 2 ж/м'),(27,'Ак-Ордо 3 ж/м'),(28,'Ак-Ордо ж/м'),(29,'Ак-Тилек ж/м'),(31,'Ала-Арча ж/м'),(30,'Ала-Арча ТРЦ'),(32,'Ала-Тоо ж/м'),(33,'Аламедин-1 мкр'),(34,'Аламединский рынок / базар'),(35,'Алтын-Казык ж/м'),(36,'Алтын-ордо ж/м'),(37,'Анар ж/м'),(38,'Арча-Бешик ж/м'),(39,'Асанбай мкр'),(40,'Аска-Таш ж/м'),(41,'Ата-Журт ж/м'),(42,'Ата-Тюрк парк'),(18,'АУЦА'),(43,'Аэропорт Манас'),(45,'Бакай-Ата ж/м'),(46,'Баткенский рынок / базар'),(44,'БГУ'),(47,'Бета Сторес'),(48,'Бета Сторес 2'),(49,'Биримдик-Кут ж/м'),(50,'Бишкек Парк ТРЦ'),(51,'Боконбаева/Уметалиева'),(52,'Ботанический сад'),(53,'Бугу-Эне-Багыш ж/м'),(54,'Бугу-Эне-Сай ж/м'),(156,'бульвар Эркиндик'),(55,'Вефа ТЦ'),(56,'Вечерка'),(57,'Военный городок'),(58,'Военторг'),(2,'Восток 5'),(59,'Восточный (старый) автовокзал'),(60,'Газ Городок'),(61,'Гоин'),(62,'Городок Айкол'),(64,'Городок строителей'),(63,'Городок Энергетиков'),(65,'Городская больница №4 (ул. Айни)'),(66,'Городское ГАИ'),(67,'Дворец спорта'),(68,'Джал мкр (в т.ч. Верхний, Нижний, Средний)'),(69,'Джунхай рынок'),(72,'Дордой Моторс рынок'),(73,'Дордой Плаза ТРЦ'),(74,'Дордой рынок / базар'),(70,'Дордой-1 ж/м'),(71,'Дордой-2 ж/м'),(75,'Достук мкр'),(157,'ж/м Красный Строитель 2'),(158,'ж/м Энесай'),(76,'ЖД вокзал'),(77,'ЗАГС/Цирк'),(78,'Западный (новый) автовокзал'),(79,'Золотой квадрат'),(80,'Интрегельпо'),(82,'Кайынды ж/м'),(83,'Калыс-ордо ж/м'),(84,'Кара-Жыгач ж/м'),(85,'Караван ТРЦ'),(86,'Карагачевая роща'),(87,'Келечек ж/м'),(88,'Керемет ж/м'),(89,'Киргизия 1'),(90,'Киркомстром'),(91,'Кирпичный Завод'),(81,'КНУ'),(92,'Кожомкул стадион'),(93,'Кок-Жар ж/м'),(3,'Кок-Жар мкр'),(94,'Колмо ж/м'),(95,'Красный Строитель ж/м'),(96,'Кудайберген авторынок'),(97,'Кызыл Аскер'),(98,'Кырман ж/м'),(159,'магазин Космос'),(99,'Мадина'),(100,'Маевка'),(101,'Манаса/Боконбаева'),(102,'Мега Комфорт ТЦ'),(103,'Мед Академия'),(104,'Молодая Гвардия'),(105,'Моссовет'),(106,'Мурас-Ордо ж/м'),(107,'Новая мечеть'),(108,'Орок ж/м'),(109,'Ортосайский рынок / базар'),(110,'Оскон-ордо ж/м'),(111,'Ошский рынок / базар'),(112,'Панорама'),(160,'парк Фучика'),(113,'Пишпек'),(114,'Площадь Ала-Тоо'),(115,'Политех'),(116,'Полицейский городок ж/м'),(117,'Рабочий Городок'),(118,'Рухий Мурас ж/м'),(119,'Рынок Баят/Азиз'),(161,'рынок Кызыл Ордо'),(120,'Салам-Алик ж/м'),(121,'Сары-Озон Дыйкан рынок'),(122,'Сары-Челек ж/м'),(123,'Советская/Скрябина'),(124,'Совмина мкр'),(125,'Совхоз \"Ала-Тоо\"'),(126,'Солнечный мкр'),(127,'Старый толчок рынок / базар'),(132,'Таатан ТЦ'),(133,'Таш-Добо ж/м'),(134,'Таш-Рабат ТРЦ'),(135,'Тендик ж/м'),(136,'Токольдош'),(137,'Токольдош мкр'),(128,'ТРЦ I-Mall'),(129,'ТРЦ Технопарк'),(138,'Тунгуч мкр'),(139,'Турбаза'),(130,'ТЦ Весна'),(140,'Тынчтык ж/м'),(131,'ТЭЦ'),(162,'ул. Ажыбек Баатыр'),(163,'ул. Алматинка / Салиева'),(164,'ул. Алматинка / Чуй'),(165,'ул. Ахунбаева / Бакаева'),(166,'ул. Ахунбаева / Малдыбаева'),(167,'ул. Ахунбаева / Чапаева'),(168,'ул. Баха / Гагарина'),(169,'ул. Баялинова / Орозбекова'),(170,'ул. Боконбаева / Гоголя'),(171,'ул. Гоголя / Чуй'),(172,'ул. Калык Акиева'),(173,'ул. Киевская / Уметалиева'),(174,'ул. Лев Толстой'),(175,'ул. Логвиненко / Боконбаева'),(176,'ул. Московская / Гоголя'),(177,'ул. Московская / Ибраимова'),(178,'ул. Московская / Турусбекова'),(179,'ул. Огонбаева / Гоголя'),(180,'ул. Фрунзе / Логвиненко'),(181,'ул. Чынгыз Айтматова'),(182,'ул. Щербакова / Фере'),(183,'ул. Щербакова / Элебесова'),(141,'Улан мкр'),(142,'Уметалиева/Фрунзе'),(143,'Умут ж/м'),(144,'Учкун мкр'),(145,'Физприборы'),(4,'Филармония'),(146,'Центральная мечеть'),(147,'Церковь'),(148,'Цум'),(149,'Чекиш-Ата рынок'),(150,'Шлагбаум'),(151,'Шоро завод'),(152,'Ынтымак ж/м'),(153,'Юг-2 мкр'),(154,'Южный Магистраль'),(155,'Юнусалиева/Суванбердиева');
/*!40000 ALTER TABLE `districts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `documents`
--

DROP TABLE IF EXISTS `documents`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `documents` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `label` varchar(50) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `label` (`label`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `documents`
--

LOCK TABLES `documents` WRITE;
/*!40000 ALTER TABLE `documents` DISABLE KEYS */;
INSERT INTO `documents` VALUES (1,'Акт ввода в эксплуатацию'),(2,'Генеральная доверенность'),(3,'Договор дарения'),(4,'Договор долевого участия'),(5,'Договор купли-продажи'),(6,'Договор мены'),(7,'Зеленая книга'),(8,'Красная книга'),(9,'Свидетельство о праве на наследство'),(10,'Тех паспорт');
/*!40000 ALTER TABLE `documents` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `floors`
--

DROP TABLE IF EXISTS `floors`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `floors` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `label` varchar(50) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `label` (`label`)
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `floors`
--

LOCK TABLES `floors` WRITE;
/*!40000 ALTER TABLE `floors` DISABLE KEYS */;
INSERT INTO `floors` VALUES (1,'1 - этаж'),(10,'10 - этаж'),(11,'11 - этаж'),(12,'12 - этаж'),(13,'13 - этаж'),(14,'14 - этаж'),(15,'15 - этаж'),(16,'16 - этаж'),(17,'17 - этаж'),(18,'18 - этаж'),(19,'19 - этаж'),(2,'2 - этаж'),(20,'20 - этаж'),(21,'21 - этаж'),(22,'22 - этаж'),(23,'23 - этаж'),(24,'24 - этаж'),(3,'3 - этаж'),(4,'4 - этаж'),(5,'5 - этаж'),(6,'6 - этаж'),(7,'7 - этаж'),(8,'8 - этаж'),(9,'9 - этаж');
/*!40000 ALTER TABLE `floors` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `re_documents`
--

DROP TABLE IF EXISTS `re_documents`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `re_documents` (
  `id_real_estate` int unsigned NOT NULL,
  `id_document` int unsigned NOT NULL,
  KEY `id_real_estate` (`id_real_estate`),
  KEY `id_document` (`id_document`),
  CONSTRAINT `re_documents_ibfk_1` FOREIGN KEY (`id_real_estate`) REFERENCES `real_estate_objects` (`id`) ON DELETE CASCADE,
  CONSTRAINT `re_documents_ibfk_2` FOREIGN KEY (`id_document`) REFERENCES `documents` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `re_documents`
--

LOCK TABLES `re_documents` WRITE;
/*!40000 ALTER TABLE `re_documents` DISABLE KEYS */;
INSERT INTO `re_documents` VALUES (9,7),(10,8),(10,5),(11,6),(11,8),(12,10),(12,5),(13,5),(14,5),(14,10),(15,5),(15,10),(16,5),(16,10),(17,5),(17,10),(18,5),(18,10),(19,5),(19,10),(20,5),(20,10),(21,5),(21,10),(22,5),(22,10),(23,5),(23,10),(24,5),(24,10),(25,5),(25,10),(26,5),(26,10),(27,9),(27,10),(28,10),(28,5),(29,10),(29,5),(30,4),(31,4),(32,4),(33,4);
/*!40000 ALTER TABLE `re_documents` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `re_favorites`
--

DROP TABLE IF EXISTS `re_favorites`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `re_favorites` (
  `id` int NOT NULL AUTO_INCREMENT,
  `id_real_estate` int unsigned NOT NULL,
  `id_user` int unsigned NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_real_estate` (`id_real_estate`,`id_user`),
  KEY `id_user` (`id_user`),
  CONSTRAINT `re_favorites_ibfk_1` FOREIGN KEY (`id_real_estate`) REFERENCES `real_estate_objects` (`id`) ON DELETE CASCADE,
  CONSTRAINT `re_favorites_ibfk_2` FOREIGN KEY (`id_user`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `re_favorites`
--

LOCK TABLES `re_favorites` WRITE;
/*!40000 ALTER TABLE `re_favorites` DISABLE KEYS */;
INSERT INTO `re_favorites` VALUES (6,12,10),(7,13,2);
/*!40000 ALTER TABLE `re_favorites` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `re_heatings`
--

DROP TABLE IF EXISTS `re_heatings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `re_heatings` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `label` varchar(50) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `label` (`label`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `re_heatings`
--

LOCK TABLES `re_heatings` WRITE;
/*!40000 ALTER TABLE `re_heatings` DISABLE KEYS */;
INSERT INTO `re_heatings` VALUES (1,'Автономное'),(2,'Газовое'),(5,'Комбинированное'),(3,'Центральное'),(4,'Электрическое');
/*!40000 ALTER TABLE `re_heatings` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `re_photos`
--

DROP TABLE IF EXISTS `re_photos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `re_photos` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `id_real_estate` int unsigned NOT NULL,
  `name` varchar(250) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id_real_estate` (`id_real_estate`),
  CONSTRAINT `re_photos_ibfk_1` FOREIGN KEY (`id_real_estate`) REFERENCES `real_estate_objects` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=131 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `re_photos`
--

LOCK TABLES `re_photos` WRITE;
/*!40000 ALTER TABLE `re_photos` DISABLE KEYS */;
INSERT INTO `re_photos` VALUES (13,9,'https://turan-nedvijimost.s3.us-west-1.amazonaws.com/images/1737812112881-blob.webp'),(14,9,'https://turan-nedvijimost.s3.us-west-1.amazonaws.com/images/1737812113410-blob.jpeg'),(15,9,'https://turan-nedvijimost.s3.us-west-1.amazonaws.com/images/1737812113819-blob.jpeg'),(16,9,'https://turan-nedvijimost.s3.us-west-1.amazonaws.com/images/1737812114270-blob.jpeg'),(17,9,'https://turan-nedvijimost.s3.us-west-1.amazonaws.com/images/1737812114654-blob.webp'),(18,10,'https://turan-nedvijimost.s3.us-west-1.amazonaws.com/images/1737827313156-blob.jpeg'),(19,10,'https://turan-nedvijimost.s3.us-west-1.amazonaws.com/images/1737827313610-blob.jpeg'),(20,10,'https://turan-nedvijimost.s3.us-west-1.amazonaws.com/images/1737827314068-blob.jpeg'),(21,10,'https://turan-nedvijimost.s3.us-west-1.amazonaws.com/images/1737827314458-blob.jpeg'),(22,11,'https://turan-nedvijimost.s3.us-west-1.amazonaws.com/images/1737827797988-blob.webp'),(23,11,'https://turan-nedvijimost.s3.us-west-1.amazonaws.com/images/1737827798425-blob.webp'),(24,12,'https://turan-nedvijimost.s3.us-west-1.amazonaws.com/images/1738235200112-blob.jpeg'),(25,13,'https://turan-nedvijimost.s3.us-west-1.amazonaws.com/images/1738741382134-blob.png'),(26,14,'https://turan-nedvijimost.s3.us-west-1.amazonaws.com/images/1738751454142-blob.jpeg'),(27,14,'https://turan-nedvijimost.s3.us-west-1.amazonaws.com/images/1738751454637-blob.jpeg'),(28,14,'https://turan-nedvijimost.s3.us-west-1.amazonaws.com/images/1738751455065-blob.jpeg'),(29,15,'https://turan-nedvijimost.s3.us-west-1.amazonaws.com/images/1738751741753-blob.jpeg'),(30,15,'https://turan-nedvijimost.s3.us-west-1.amazonaws.com/images/1738751742210-blob.jpeg'),(31,15,'https://turan-nedvijimost.s3.us-west-1.amazonaws.com/images/1738751742612-blob.jpeg'),(32,15,'https://turan-nedvijimost.s3.us-west-1.amazonaws.com/images/1738751743118-blob.jpeg'),(33,15,'https://turan-nedvijimost.s3.us-west-1.amazonaws.com/images/1738751743506-blob.jpeg'),(34,16,'https://turan-nedvijimost.s3.us-west-1.amazonaws.com/images/1738751743691-blob.jpeg'),(35,16,'https://turan-nedvijimost.s3.us-west-1.amazonaws.com/images/1738751744126-blob.jpeg'),(36,16,'https://turan-nedvijimost.s3.us-west-1.amazonaws.com/images/1738751744544-blob.jpeg'),(37,16,'https://turan-nedvijimost.s3.us-west-1.amazonaws.com/images/1738751744990-blob.jpeg'),(38,16,'https://turan-nedvijimost.s3.us-west-1.amazonaws.com/images/1738751745390-blob.jpeg'),(39,17,'https://turan-nedvijimost.s3.us-west-1.amazonaws.com/images/1738820572202-blob.jpeg'),(40,17,'https://turan-nedvijimost.s3.us-west-1.amazonaws.com/images/1738820572673-blob.jpeg'),(41,17,'https://turan-nedvijimost.s3.us-west-1.amazonaws.com/images/1738820573216-blob.jpeg'),(42,17,'https://turan-nedvijimost.s3.us-west-1.amazonaws.com/images/1738820573692-blob.jpeg'),(43,17,'https://turan-nedvijimost.s3.us-west-1.amazonaws.com/images/1738820574238-blob.jpeg'),(44,17,'https://turan-nedvijimost.s3.us-west-1.amazonaws.com/images/1738820574709-blob.jpeg'),(45,18,'https://turan-nedvijimost.s3.us-west-1.amazonaws.com/images/1738820577743-blob.jpeg'),(46,18,'https://turan-nedvijimost.s3.us-west-1.amazonaws.com/images/1738820578222-blob.jpeg'),(47,18,'https://turan-nedvijimost.s3.us-west-1.amazonaws.com/images/1738820578699-blob.jpeg'),(48,18,'https://turan-nedvijimost.s3.us-west-1.amazonaws.com/images/1738820579187-blob.jpeg'),(49,18,'https://turan-nedvijimost.s3.us-west-1.amazonaws.com/images/1738820579713-blob.jpeg'),(50,18,'https://turan-nedvijimost.s3.us-west-1.amazonaws.com/images/1738820580196-blob.jpeg'),(51,19,'https://turan-nedvijimost.s3.us-west-1.amazonaws.com/images/1738820580553-blob.jpeg'),(52,19,'https://turan-nedvijimost.s3.us-west-1.amazonaws.com/images/1738820581008-blob.jpeg'),(53,19,'https://turan-nedvijimost.s3.us-west-1.amazonaws.com/images/1738820581576-blob.jpeg'),(54,19,'https://turan-nedvijimost.s3.us-west-1.amazonaws.com/images/1738820582058-blob.jpeg'),(55,19,'https://turan-nedvijimost.s3.us-west-1.amazonaws.com/images/1738820582554-blob.jpeg'),(56,19,'https://turan-nedvijimost.s3.us-west-1.amazonaws.com/images/1738820583020-blob.jpeg'),(57,20,'https://turan-nedvijimost.s3.us-west-1.amazonaws.com/images/1738820580988-blob.jpeg'),(58,20,'https://turan-nedvijimost.s3.us-west-1.amazonaws.com/images/1738820581481-blob.jpeg'),(59,20,'https://turan-nedvijimost.s3.us-west-1.amazonaws.com/images/1738820581982-blob.jpeg'),(60,20,'https://turan-nedvijimost.s3.us-west-1.amazonaws.com/images/1738820582474-blob.jpeg'),(61,20,'https://turan-nedvijimost.s3.us-west-1.amazonaws.com/images/1738820582954-blob.jpeg'),(62,20,'https://turan-nedvijimost.s3.us-west-1.amazonaws.com/images/1738820583421-blob.jpeg'),(63,21,'https://turan-nedvijimost.s3.us-west-1.amazonaws.com/images/1738820581202-blob.jpeg'),(64,21,'https://turan-nedvijimost.s3.us-west-1.amazonaws.com/images/1738820581636-blob.jpeg'),(65,21,'https://turan-nedvijimost.s3.us-west-1.amazonaws.com/images/1738820582200-blob.jpeg'),(66,21,'https://turan-nedvijimost.s3.us-west-1.amazonaws.com/images/1738820582680-blob.jpeg'),(67,21,'https://turan-nedvijimost.s3.us-west-1.amazonaws.com/images/1738820583154-blob.jpeg'),(68,21,'https://turan-nedvijimost.s3.us-west-1.amazonaws.com/images/1738820583645-blob.jpeg'),(69,22,'https://turan-nedvijimost.s3.us-west-1.amazonaws.com/images/1738820581394-blob.jpeg'),(70,22,'https://turan-nedvijimost.s3.us-west-1.amazonaws.com/images/1738820581791-blob.jpeg'),(71,22,'https://turan-nedvijimost.s3.us-west-1.amazonaws.com/images/1738820582352-blob.jpeg'),(72,22,'https://turan-nedvijimost.s3.us-west-1.amazonaws.com/images/1738820582895-blob.jpeg'),(73,22,'https://turan-nedvijimost.s3.us-west-1.amazonaws.com/images/1738820583442-blob.jpeg'),(74,22,'https://turan-nedvijimost.s3.us-west-1.amazonaws.com/images/1738820583904-blob.jpeg'),(75,23,'https://turan-nedvijimost.s3.us-west-1.amazonaws.com/images/1738820581840-blob.jpeg'),(76,23,'https://turan-nedvijimost.s3.us-west-1.amazonaws.com/images/1738820582258-blob.jpeg'),(77,23,'https://turan-nedvijimost.s3.us-west-1.amazonaws.com/images/1738820582790-blob.jpeg'),(78,23,'https://turan-nedvijimost.s3.us-west-1.amazonaws.com/images/1738820583326-blob.jpeg'),(79,23,'https://turan-nedvijimost.s3.us-west-1.amazonaws.com/images/1738820583788-blob.jpeg'),(80,23,'https://turan-nedvijimost.s3.us-west-1.amazonaws.com/images/1738820584293-blob.jpeg'),(81,24,'https://turan-nedvijimost.s3.us-west-1.amazonaws.com/images/1738820581897-blob.jpeg'),(82,24,'https://turan-nedvijimost.s3.us-west-1.amazonaws.com/images/1738820582349-blob.jpeg'),(83,24,'https://turan-nedvijimost.s3.us-west-1.amazonaws.com/images/1738820582834-blob.jpeg'),(84,24,'https://turan-nedvijimost.s3.us-west-1.amazonaws.com/images/1738820583304-blob.jpeg'),(85,24,'https://turan-nedvijimost.s3.us-west-1.amazonaws.com/images/1738820583876-blob.jpeg'),(86,24,'https://turan-nedvijimost.s3.us-west-1.amazonaws.com/images/1738820584391-blob.jpeg'),(87,25,'https://turan-nedvijimost.s3.us-west-1.amazonaws.com/images/1738820583790-blob.jpeg'),(88,25,'https://turan-nedvijimost.s3.us-west-1.amazonaws.com/images/1738820584287-blob.jpeg'),(89,25,'https://turan-nedvijimost.s3.us-west-1.amazonaws.com/images/1738820584802-blob.jpeg'),(90,25,'https://turan-nedvijimost.s3.us-west-1.amazonaws.com/images/1738820585253-blob.jpeg'),(91,25,'https://turan-nedvijimost.s3.us-west-1.amazonaws.com/images/1738820585721-blob.jpeg'),(92,25,'https://turan-nedvijimost.s3.us-west-1.amazonaws.com/images/1738820586239-blob.jpeg'),(93,26,'https://turan-nedvijimost.s3.us-west-1.amazonaws.com/images/1738820584281-blob.jpeg'),(94,26,'https://turan-nedvijimost.s3.us-west-1.amazonaws.com/images/1738820584739-blob.jpeg'),(95,26,'https://turan-nedvijimost.s3.us-west-1.amazonaws.com/images/1738820585252-blob.jpeg'),(96,26,'https://turan-nedvijimost.s3.us-west-1.amazonaws.com/images/1738820585784-blob.jpeg'),(97,26,'https://turan-nedvijimost.s3.us-west-1.amazonaws.com/images/1738820586343-blob.jpeg'),(98,26,'https://turan-nedvijimost.s3.us-west-1.amazonaws.com/images/1738820586867-blob.jpeg'),(99,27,'https://turan-nedvijimost.s3.us-west-1.amazonaws.com/images/1738992655801-blob.jpeg'),(100,27,'https://turan-nedvijimost.s3.us-west-1.amazonaws.com/images/1738992656342-blob.jpeg'),(101,27,'https://turan-nedvijimost.s3.us-west-1.amazonaws.com/images/1738992656734-blob.jpeg'),(102,27,'https://turan-nedvijimost.s3.us-west-1.amazonaws.com/images/1738992657140-blob.jpeg'),(103,27,'https://turan-nedvijimost.s3.us-west-1.amazonaws.com/images/1738992657569-blob.jpeg'),(104,27,'https://turan-nedvijimost.s3.us-west-1.amazonaws.com/images/1738992658029-blob.jpeg'),(105,27,'https://turan-nedvijimost.s3.us-west-1.amazonaws.com/images/1738992658435-blob.jpeg'),(106,27,'https://turan-nedvijimost.s3.us-west-1.amazonaws.com/images/1738992658759-blob.jpeg'),(107,28,'https://turan-nedvijimost.s3.us-west-1.amazonaws.com/images/1739191441035-blob.jpeg'),(108,28,'https://turan-nedvijimost.s3.us-west-1.amazonaws.com/images/1739191441568-blob.jpeg'),(109,28,'https://turan-nedvijimost.s3.us-west-1.amazonaws.com/images/1739191441957-blob.jpeg'),(110,28,'https://turan-nedvijimost.s3.us-west-1.amazonaws.com/images/1739191442349-blob.jpeg'),(111,28,'https://turan-nedvijimost.s3.us-west-1.amazonaws.com/images/1739191442745-blob.jpeg'),(112,28,'https://turan-nedvijimost.s3.us-west-1.amazonaws.com/images/1739191443172-blob.jpeg'),(113,28,'https://turan-nedvijimost.s3.us-west-1.amazonaws.com/images/1739191443543-blob.jpeg'),(114,28,'https://turan-nedvijimost.s3.us-west-1.amazonaws.com/images/1739191443941-blob.jpeg'),(115,28,'https://turan-nedvijimost.s3.us-west-1.amazonaws.com/images/1739191444363-blob.jpeg'),(116,29,'https://turan-nedvijimost.s3.us-west-1.amazonaws.com/images/1739191445503-blob.jpeg'),(117,29,'https://turan-nedvijimost.s3.us-west-1.amazonaws.com/images/1739191445917-blob.jpeg'),(118,29,'https://turan-nedvijimost.s3.us-west-1.amazonaws.com/images/1739191446342-blob.jpeg'),(119,29,'https://turan-nedvijimost.s3.us-west-1.amazonaws.com/images/1739191446746-blob.jpeg'),(120,29,'https://turan-nedvijimost.s3.us-west-1.amazonaws.com/images/1739191447157-blob.jpeg'),(121,29,'https://turan-nedvijimost.s3.us-west-1.amazonaws.com/images/1739191447563-blob.jpeg'),(122,29,'https://turan-nedvijimost.s3.us-west-1.amazonaws.com/images/1739191447931-blob.jpeg'),(123,29,'https://turan-nedvijimost.s3.us-west-1.amazonaws.com/images/1739191448325-blob.jpeg'),(124,29,'https://turan-nedvijimost.s3.us-west-1.amazonaws.com/images/1739191448720-blob.jpeg'),(125,30,'https://turan-nedvijimost.s3.us-west-1.amazonaws.com/images/1747903307397-blob.jpeg'),(126,31,'https://turan-nedvijimost.s3.us-west-1.amazonaws.com/images/1747903308302-blob.jpeg'),(127,32,'https://turan-nedvijimost.s3.us-west-1.amazonaws.com/images/1747903309143-blob.jpeg'),(128,33,'https://turan-nedvijimost.s3.us-west-1.amazonaws.com/images/1747903310114-blob.jpeg'),(129,34,'https://turan-nedvijimost.s3.us-west-1.amazonaws.com/images/1747903507544-blob.jpeg'),(130,35,'https://turan-nedvijimost.s3.us-west-1.amazonaws.com/images/1747903508529-blob.jpeg');
/*!40000 ALTER TABLE `re_photos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `re_price_history`
--

DROP TABLE IF EXISTS `re_price_history`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `re_price_history` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `id_real_estate` int unsigned NOT NULL,
  `owner_price` decimal(15,2) DEFAULT NULL,
  `object_price` decimal(15,2) DEFAULT NULL,
  `currency` enum('USD','KGS') NOT NULL DEFAULT 'KGS',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `id_real_estate` (`id_real_estate`),
  CONSTRAINT `re_price_history_ibfk_1` FOREIGN KEY (`id_real_estate`) REFERENCES `real_estate_objects` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=36 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `re_price_history`
--

LOCK TABLES `re_price_history` WRITE;
/*!40000 ALTER TABLE `re_price_history` DISABLE KEYS */;
INSERT INTO `re_price_history` VALUES (9,9,123.00,1234.00,'USD','2025-01-25 13:35:12','2025-01-25 13:35:12'),(10,10,10000.00,20000.00,'USD','2025-01-25 17:48:33','2025-01-25 17:48:33'),(11,11,80000.00,10000.00,'KGS','2025-01-25 17:56:37','2025-01-25 17:56:37'),(12,12,45000.00,50000.00,'USD','2025-01-30 11:06:40','2025-01-30 11:06:40'),(13,13,6766767.00,45678.00,'USD','2025-02-05 07:43:02','2025-02-05 07:43:02'),(14,14,52.50,55.00,'USD','2025-02-05 10:30:54','2025-02-05 10:30:54'),(15,15,62000.00,64500.00,'USD','2025-02-05 10:35:41','2025-02-05 10:35:41'),(16,16,62000.00,64500.00,'USD','2025-02-05 10:35:43','2025-02-05 10:35:43'),(17,17,63000.00,65000.00,'USD','2025-02-06 05:42:52','2025-02-06 05:42:52'),(18,18,63000.00,65000.00,'USD','2025-02-06 05:42:57','2025-02-06 05:42:57'),(19,19,63000.00,65000.00,'USD','2025-02-06 05:43:00','2025-02-06 05:43:00'),(20,20,63000.00,65000.00,'USD','2025-02-06 05:43:00','2025-02-06 05:43:00'),(21,21,63000.00,65000.00,'USD','2025-02-06 05:43:01','2025-02-06 05:43:01'),(22,22,63000.00,65000.00,'USD','2025-02-06 05:43:01','2025-02-06 05:43:01'),(23,23,63000.00,65000.00,'USD','2025-02-06 05:43:01','2025-02-06 05:43:01'),(24,24,63000.00,65000.00,'USD','2025-02-06 05:43:01','2025-02-06 05:43:01'),(25,25,63000.00,65000.00,'USD','2025-02-06 05:43:03','2025-02-06 05:43:03'),(26,26,63000.00,65000.00,'USD','2025-02-06 05:43:04','2025-02-06 05:43:04'),(27,27,53000.00,55000.00,'USD','2025-02-08 05:30:55','2025-02-08 05:30:55'),(28,28,69500.00,72500.00,'USD','2025-02-10 12:44:01','2025-02-10 12:44:01'),(29,29,69500.00,72500.00,'USD','2025-02-10 12:44:05','2025-02-10 12:44:05'),(30,30,66666.00,66668.00,'USD','2025-05-22 08:41:47','2025-05-22 08:41:47'),(31,31,66666.00,66668.00,'USD','2025-05-22 08:41:48','2025-05-22 08:41:48'),(32,32,66666.00,66668.00,'USD','2025-05-22 08:41:49','2025-05-22 08:41:49'),(33,33,66666.00,66668.00,'USD','2025-05-22 08:41:50','2025-05-22 08:41:50'),(34,34,444.00,44444.00,'USD','2025-05-22 08:45:07','2025-05-22 08:45:07'),(35,35,444.00,44444.00,'USD','2025-05-22 08:45:08','2025-05-22 08:45:08');
/*!40000 ALTER TABLE `re_price_history` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `re_series`
--

DROP TABLE IF EXISTS `re_series`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `re_series` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `label` varchar(50) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `label` (`label`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `re_series`
--

LOCK TABLES `re_series` WRITE;
/*!40000 ALTER TABLE `re_series` DISABLE KEYS */;
INSERT INTO `re_series` VALUES (5,'103 серия'),(6,'104 серия'),(7,'105 серия'),(8,'106 серия'),(9,'107 серия'),(10,'108 серия'),(2,'Индивидуалка'),(3,'Малосемейка'),(4,'Хрущевка'),(1,'Элитка');
/*!40000 ALTER TABLE `re_series` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `re_statuses`
--

DROP TABLE IF EXISTS `re_statuses`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `re_statuses` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `label` varchar(50) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `label` (`label`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `re_statuses`
--

LOCK TABLES `re_statuses` WRITE;
/*!40000 ALTER TABLE `re_statuses` DISABLE KEYS */;
INSERT INTO `re_statuses` VALUES (2,'Актуально'),(3,'Неактуально'),(1,'Продано');
/*!40000 ALTER TABLE `re_statuses` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `real_estate_objects`
--

DROP TABLE IF EXISTS `real_estate_objects`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `real_estate_objects` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `category_id` int unsigned NOT NULL,
  `employee_id` int unsigned NOT NULL,
  `id_room` int unsigned DEFAULT NULL,
  `area` int unsigned DEFAULT NULL,
  `id_floor` int unsigned DEFAULT NULL,
  `id_series` int unsigned DEFAULT NULL,
  `district` varchar(255) DEFAULT NULL,
  `id_deal_type` int unsigned DEFAULT NULL,
  `id_district` int unsigned DEFAULT NULL,
  `id_wall_material` int unsigned DEFAULT NULL,
  `id_heating` int unsigned DEFAULT NULL,
  `owner_phone` varchar(255) DEFAULT NULL,
  `owner_name` varchar(255) DEFAULT NULL,
  `id_status` int unsigned NOT NULL DEFAULT '2',
  `status_updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `description` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `category_id` (`category_id`),
  KEY `employee_id` (`employee_id`),
  KEY `id_district` (`id_district`),
  KEY `id_room` (`id_room`),
  KEY `id_floor` (`id_floor`),
  KEY `id_series` (`id_series`),
  KEY `id_deal_type` (`id_deal_type`),
  KEY `id_wall_material` (`id_wall_material`),
  KEY `id_heating` (`id_heating`),
  KEY `id_status` (`id_status`),
  CONSTRAINT `real_estate_objects_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`),
  CONSTRAINT `real_estate_objects_ibfk_10` FOREIGN KEY (`id_status`) REFERENCES `re_statuses` (`id`),
  CONSTRAINT `real_estate_objects_ibfk_2` FOREIGN KEY (`employee_id`) REFERENCES `users` (`id`),
  CONSTRAINT `real_estate_objects_ibfk_3` FOREIGN KEY (`id_district`) REFERENCES `districts` (`id`),
  CONSTRAINT `real_estate_objects_ibfk_4` FOREIGN KEY (`id_room`) REFERENCES `rooms` (`id`),
  CONSTRAINT `real_estate_objects_ibfk_5` FOREIGN KEY (`id_floor`) REFERENCES `floors` (`id`),
  CONSTRAINT `real_estate_objects_ibfk_6` FOREIGN KEY (`id_series`) REFERENCES `re_series` (`id`),
  CONSTRAINT `real_estate_objects_ibfk_7` FOREIGN KEY (`id_deal_type`) REFERENCES `deal_types` (`id`),
  CONSTRAINT `real_estate_objects_ibfk_8` FOREIGN KEY (`id_wall_material`) REFERENCES `wall_materials` (`id`),
  CONSTRAINT `real_estate_objects_ibfk_9` FOREIGN KEY (`id_heating`) REFERENCES `re_heatings` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=36 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `real_estate_objects`
--

LOCK TABLES `real_estate_objects` WRITE;
/*!40000 ALTER TABLE `real_estate_objects` DISABLE KEYS */;
INSERT INTO `real_estate_objects` VALUES (9,1,1,1,123,1,8,NULL,1,1,13,1,'12345213','Asanov Esen',2,'2025-01-25 13:35:12','2025-01-25 13:35:12','2025-01-25 13:35:12','123'),(10,1,1,1,200,1,8,NULL,3,1,1,1,'12345213','Asanov Esen',1,'2025-02-04 05:59:07','2025-01-25 17:48:33','2025-02-04 05:59:07','TEST'),(11,1,1,3,120,9,1,NULL,3,4,1,3,'0558301198','Brooklin',2,'2025-01-25 17:56:37','2025-01-25 17:56:37','2025-01-25 17:56:37','Срочно продается трехкомнатная квартира в центре города\r\n'),(12,1,7,2,11,4,3,NULL,3,1,1,3,'0755904080','nurgauu',1,'2025-02-05 10:48:49','2025-01-30 11:06:40','2025-02-05 10:48:49','null'),(13,1,2,5,89,17,8,NULL,3,159,11,2,'0500005535','Kiro',1,'2025-02-05 07:43:14','2025-02-05 07:43:02','2025-02-05 07:43:14','dsfghjljkhgcvghjvghvbghvghv'),(14,1,7,1,36,6,2,NULL,3,93,1,1,'0755751073','Нуржамал',2,'2025-02-05 10:34:12','2025-02-05 10:30:54','2025-02-05 10:34:12','Продается квартира 108 серии ж м К?к-Жар!\r\nУлица Молдокулова 100/2\r\nСК Аалам строй\r\nПлощадь 36 м2\r\nЭтаж 6/9\r\nОтопление электро, и газовое\r\nОнлайн домофон!\r\nЗакрытый двор есть своя детская площадка, футбольное поле, парковка!\r\n52500$'),(15,1,8,2,46,5,2,NULL,3,55,1,3,'+996 990157357','Нурсултан',2,'2025-02-05 10:35:41','2025-02-05 10:35:41','2025-02-05 10:35:41','null'),(16,1,8,2,46,5,2,NULL,3,55,1,3,'+996 990157357','Нурсултан',2,'2025-02-05 10:35:43','2025-02-05 10:35:43','2025-02-05 10:35:43','null'),(17,1,7,2,55,3,7,NULL,3,132,8,3,'0705240718','Рустам',1,'2025-03-12 04:53:16','2025-02-06 05:42:52','2025-03-12 04:53:16','Продаю 2х ком квартиру в хорошей локации на пересечении Лермонтова ворошилова со свежим ремонтом,на 3 этаже из 5 все в шаговой доступности '),(18,1,7,2,55,3,7,NULL,3,132,8,3,'0705240718','Рустам',1,'2025-03-12 04:54:28','2025-02-06 05:42:57','2025-03-12 04:54:28','Продаю 2х ком квартиру в хорошей локации на пересечении Лермонтова ворошилова со свежим ремонтом,на 3 этаже из 5 все в шаговой доступности '),(19,1,7,2,55,3,7,NULL,3,132,8,3,'0705240718','Рустам',1,'2025-03-12 04:54:04','2025-02-06 05:43:00','2025-03-12 04:54:04','Продаю 2х ком квартиру в хорошей локации на пересечении Лермонтова ворошилова со свежим ремонтом,на 3 этаже из 5 все в шаговой доступности '),(20,1,7,2,55,3,7,NULL,3,132,8,3,'0705240718','Рустам',1,'2025-03-12 04:54:18','2025-02-06 05:43:00','2025-03-12 04:54:18','Продаю 2х ком квартиру в хорошей локации на пересечении Лермонтова ворошилова со свежим ремонтом,на 3 этаже из 5 все в шаговой доступности '),(21,1,7,2,55,3,7,NULL,3,132,8,3,'0705240718','Рустам',1,'2025-03-12 04:53:25','2025-02-06 05:43:01','2025-03-12 04:53:25','Продаю 2х ком квартиру в хорошей локации на пересечении Лермонтова ворошилова со свежим ремонтом,на 3 этаже из 5 все в шаговой доступности '),(22,1,7,2,55,3,7,NULL,3,132,8,3,'0705240718','Рустам',1,'2025-03-12 04:53:36','2025-02-06 05:43:01','2025-03-12 04:53:36','Продаю 2х ком квартиру в хорошей локации на пересечении Лермонтова ворошилова со свежим ремонтом,на 3 этаже из 5 все в шаговой доступности '),(23,1,7,2,55,3,7,NULL,3,132,8,3,'0705240718','Рустам',1,'2025-03-12 04:53:46','2025-02-06 05:43:01','2025-03-12 04:53:46','Продаю 2х ком квартиру в хорошей локации на пересечении Лермонтова ворошилова со свежим ремонтом,на 3 этаже из 5 все в шаговой доступности '),(24,1,7,2,55,3,7,NULL,3,132,8,3,'0705240718','Рустам',1,'2025-03-12 04:53:53','2025-02-06 05:43:01','2025-03-12 04:53:53','Продаю 2х ком квартиру в хорошей локации на пересечении Лермонтова ворошилова со свежим ремонтом,на 3 этаже из 5 все в шаговой доступности '),(25,1,7,2,55,3,7,NULL,3,132,8,3,'0705240718','Рустам',1,'2025-03-12 04:53:04','2025-02-06 05:43:03','2025-03-12 04:53:04','Продаю 2х ком квартиру в хорошей локации на пересечении Лермонтова ворошилова со свежим ремонтом,на 3 этаже из 5 все в шаговой доступности '),(26,1,7,2,55,3,7,NULL,3,132,8,3,'0705240718','Рустам',1,'2025-03-12 04:52:53','2025-02-06 05:43:04','2025-03-12 04:52:53','Продаю 2х ком квартиру в хорошей локации на пересечении Лермонтова ворошилова со свежим ремонтом,на 3 этаже из 5 все в шаговой доступности '),(27,1,7,1,36,9,7,NULL,3,2,8,3,'0554372377','Александр',2,'2025-02-08 05:30:55','2025-02-08 05:30:55','2025-02-08 05:30:55','Продаю 1-комнатную квартиру в Бишкеке, Восток-5, 9-эт/9. Косметический ремонт. Мебель, посуда. За Китайсой стеной, выше рынка Мадина, рядом школа 66 и садик. Цена $53000'),(28,1,8,2,47,4,7,NULL,5,3,8,3,'+996 (772) 665-626','Карим',2,'2025-02-10 12:44:00','2025-02-10 12:44:00','2025-02-10 12:44:00','null'),(29,1,8,2,47,4,7,NULL,5,3,8,3,'+996 (772) 665-626','Карим',2,'2025-02-10 12:44:05','2025-02-10 12:44:05','2025-02-10 12:44:05','null'),(30,1,6,3,NULL,2,7,NULL,1,9,NULL,2,'908080888','6hg',2,'2025-05-22 08:41:47','2025-05-22 08:41:47','2025-05-22 08:41:47','null'),(31,1,6,3,NULL,2,7,NULL,1,9,NULL,2,'908080888','6hg',2,'2025-05-22 08:41:48','2025-05-22 08:41:48','2025-05-22 08:41:48','null'),(32,1,6,3,NULL,2,7,NULL,1,9,NULL,2,'908080888','6hg',2,'2025-05-22 08:41:49','2025-05-22 08:41:49','2025-05-22 08:41:49','null'),(33,1,6,3,NULL,2,7,NULL,1,9,NULL,2,'908080888','6hg',2,'2025-05-22 08:41:50','2025-05-22 08:41:50','2025-05-22 08:41:50','null'),(34,1,6,2,NULL,4,7,NULL,1,8,NULL,2,'908080888','ddddddd',2,'2025-05-22 08:45:07','2025-05-22 08:45:07','2025-05-22 08:45:07','null'),(35,1,6,2,NULL,4,7,NULL,1,8,NULL,2,'908080888','ddddddd',2,'2025-05-22 08:45:08','2025-05-22 08:45:08','2025-05-22 08:45:08','null');
/*!40000 ALTER TABLE `real_estate_objects` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `roles`
--

DROP TABLE IF EXISTS `roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `roles` (
  `id` int unsigned NOT NULL,
  `name` varchar(50) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `roles`
--

LOCK TABLES `roles` WRITE;
/*!40000 ALTER TABLE `roles` DISABLE KEYS */;
INSERT INTO `roles` VALUES (2,'Менеджер'),(3,'Сотрудник'),(1,'Управляющий');
/*!40000 ALTER TABLE `roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `rooms`
--

DROP TABLE IF EXISTS `rooms`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `rooms` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `label` varchar(50) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `label` (`label`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rooms`
--

LOCK TABLES `rooms` WRITE;
/*!40000 ALTER TABLE `rooms` DISABLE KEYS */;
INSERT INTO `rooms` VALUES (1,'1 - комнатная'),(10,'10 - комнатная'),(2,'2 - комнатная'),(3,'3 - комнатная'),(4,'4 - комнатная'),(5,'5 - комнатная'),(6,'6 - комнатная'),(7,'7 - комнатная'),(8,'8 - комнатная'),(9,'9 - комнатная');
/*!40000 ALTER TABLE `rooms` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `login` varchar(50) NOT NULL,
  `password_hash` varchar(255) NOT NULL,
  `role_id` int unsigned NOT NULL,
  `first_name` varchar(100) NOT NULL,
  `last_name` varchar(100) NOT NULL,
  `phone_number` varchar(20) DEFAULT NULL,
  `avatar_url` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `login` (`login`),
  KEY `role_id` (`role_id`),
  CONSTRAINT `users_ibfk_1` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'ars','$2b$10$edpFpQLVxGvT8QB6tJ5KxOrg.Rkc17kdsFghCgUx0pnf0DPaMGUde',1,'Арслан','Сталмамбетов','0504505560',NULL),(2,'as_di05','$2b$10$65aX2XvdRA7AKZb8tUabwet7542r7ww3kx/uXnKT7SjrNQjPrj0re',2,'Адилет','Улукбеков','500005535','/uploads/avatars/1737487281046-as_di05.jpeg'),(6,'rop','$2b$10$aZ6kjYEicgNDbzIszEDBx.p6xuKS4TcNVFK.FmCfVMYwbvamWQaH6',2,'нурдаулет','эрматов','0509560560',NULL),(7,'doni','$2b$10$0TX0YwGSVoBrGyG6UEuRbO.nrfASz16Pd5aQcyz7pUDrE941yWcUG',3,'даниэл','ракманов','0500960560',NULL),(8,'azimov','$2b$10$tJpJq7duvH.JzY6dDx/Muev6aB0z0pOisSyz0/5YsU/zv.PzfrLTO',3,'азамат','Азимов','0505260560',NULL),(9,'arzimat','$2b$10$yA22wLkPC4TbH9XFb/9Kk.JMnXSScWwkYS3J0uaxcpQSIBC3JHmcG',3,'арзымат','талантбеков','0508860560',NULL),(10,'avtandil','$2b$10$CkGRorzyd88PoGMmidJw4.CtV4YGgBhTmChpCIu..Q0lg6UGA78ki',3,'автандил','эркебеков','0509760560',NULL),(11,'dastin','$2b$10$Ss41XtrPVDkM1LuxWAh6DeONBQW6oWmwa8WQ5BKYPBJ/qE6gAeuHK',3,'дастан','замиров','0509860560',NULL),(12,'edik','$2b$10$C4eoVuvlxJxYYdTwEtaFQeoWT4Z/IbOx8bEt6j4YjPht9ddKN2aXK',3,'элдияр','ташматов','0509960560',NULL);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `wall_materials`
--

DROP TABLE IF EXISTS `wall_materials`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `wall_materials` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `label` varchar(50) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `label` (`label`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `wall_materials`
--

LOCK TABLES `wall_materials` WRITE;
/*!40000 ALTER TABLE `wall_materials` DISABLE KEYS */;
INSERT INTO `wall_materials` VALUES (2,'Бетон'),(4,'Газоблок'),(9,'Гипсокартон'),(3,'Дерево'),(5,'Камень'),(1,'Кирпич'),(7,'Металл'),(8,'Панели'),(10,'Пескоблок'),(13,'Сэндвич-панели'),(11,'Цемент'),(12,'Шлакоблок'),(6,'Штукатурка');
/*!40000 ALTER TABLE `wall_materials` ENABLE KEYS */;
UNLOCK TABLES;
SET @@SESSION.SQL_LOG_BIN = @MYSQLDUMP_TEMP_LOG_BIN;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-05-25 17:32:35
