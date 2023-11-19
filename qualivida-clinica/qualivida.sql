CREATE DATABASE  IF NOT EXISTS `qualivida` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `qualivida`;
-- MySQL dump 10.13  Distrib 8.0.33, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: qualivida
-- ------------------------------------------------------
-- Server version	8.0.33

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
-- Table structure for table `specialties`
--

DROP TABLE IF EXISTS `specialties`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `specialties` (
  `id` int NOT NULL AUTO_INCREMENT,
  `default_name` varchar(255) NOT NULL,
  `default_price` decimal(10,2) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `specialties`
--

LOCK TABLES `specialties` WRITE;
/*!40000 ALTER TABLE `specialties` DISABLE KEYS */;
INSERT INTO `specialties` VALUES (1,'Cardiologia',99.99),(2,'Dermatologia',79.99),(3,'Alergologia',79.99),(4,'Cirurgia Geral',79.99),(5,'Neurologia',89.99),(6,'Ortopedia',89.99),(7,'Oftalmologia',89.99),(8,'Urologia',89.99),(9,'Ginecologia',79.99),(10,'Endocrinologia',79.99),(11,'Pediatria',69.99),(12,'Oncologia',109.99),(13,'Otorrinolaringologia',89.99),(14,'Dentista',59.99),(15,'Gastroenterologia',99.99),(16,'Cardiologia Pediátrica',79.99),(17,'Psiquiatria',89.99),(18,'Radiologia',99.99),(19,'Cirurgia Plástica',119.99),(20,'Nefrologia',89.99),(21,'Dermatologia Estética',119.99),(22,'Fisioterapia',69.99);
/*!40000 ALTER TABLE `specialties` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `translations`
--

DROP TABLE IF EXISTS `translations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `translations` (
  `specialty_id` int NOT NULL,
  `language_code` varchar(10) NOT NULL,
  `translated_name` varchar(255) NOT NULL,
  `translated_price` decimal(10,2) NOT NULL,
  `local_currency` varchar(3) NOT NULL,
  PRIMARY KEY (`specialty_id`,`language_code`),
  CONSTRAINT `translations_ibfk_1` FOREIGN KEY (`specialty_id`) REFERENCES `specialties` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `translations`
--

LOCK TABLES `translations` WRITE;
/*!40000 ALTER TABLE `translations` DISABLE KEYS */;
INSERT INTO `translations` VALUES (1,'ar','طب القلب',99.99,'SAR'),(1,'de','Kardiologie',99.99,'EUR'),(1,'en','Cardiology',59.99,'USD'),(1,'es','Cardiología',59.99,'EUR'),(1,'fr','Cardiologie',99.99,'EUR'),(1,'hi','कार्डियोलॉजी',99.99,'INR'),(1,'ja','心臓病学',109.99,'JPY'),(1,'pt-BR','Cardiologia',99.99,'BRL'),(1,'ru','Кардиология',109.99,'RUB'),(1,'zh','心脏病学',129.99,'CNY'),(2,'ar','طب الجلدية',79.99,'SAR'),(2,'de','Dermatologie',79.99,'EUR'),(2,'en','Dermatology',55.99,'USD'),(2,'es','Dermatología',55.99,'EUR'),(2,'fr','Dermatologie',79.99,'EUR'),(2,'hi','डर्मटोलॉजी',79.99,'INR'),(2,'ja','皮膚科',89.99,'JPY'),(2,'pt-BR','Dermatologia',79.99,'BRL'),(2,'ru','Дерматология',89.99,'RUB'),(2,'zh','皮肤病学',109.99,'CNY'),(3,'ar','طب الحساسية',79.99,'SAR'),(3,'de','Allergologie',79.99,'EUR'),(3,'en','Allergology',55.99,'USD'),(3,'es','Alergología',55.99,'EUR'),(3,'fr','Allergologie',79.99,'EUR'),(3,'hi','एलर्जोलॉजी',79.99,'INR'),(3,'ja','アレルギー学',89.99,'JPY'),(3,'pt-BR','Alergologia',79.99,'BRL'),(3,'ru','Аллергология',89.99,'RUB'),(3,'zh','过敏学',109.99,'CNY'),(4,'ar','جراحة عامة',79.99,'SAR'),(4,'de','Allgemeine Chirurgie',79.99,'EUR'),(4,'en','General Surgery',55.99,'USD'),(4,'es','Cirugía General',55.99,'EUR'),(4,'fr','Chirurgie Générale',79.99,'EUR'),(4,'hi','सर्जरी जनरल',79.99,'INR'),(4,'ja','一般外科',89.99,'JPY'),(4,'pt-BR','Cirurgia Geral',79.99,'BRL'),(4,'ru','Общая хирургия',89.99,'RUB'),(4,'zh','普通外科',109.99,'CNY'),(5,'ar','طب الأعصاب',89.99,'SAR'),(5,'de','Neurologie',89.99,'EUR'),(5,'en','Neurology',57.99,'USD'),(5,'es','Neurología',57.99,'EUR'),(5,'fr','Neurologie',89.99,'EUR'),(5,'hi','न्यूरोलॉजी',89.99,'INR'),(5,'ja','神経学',99.99,'JPY'),(5,'pt-BR','Neurologia',89.99,'BRL'),(5,'ru','Неврология',99.99,'RUB'),(5,'zh','神经学',119.99,'CNY'),(6,'ar','طب العظام',89.99,'SAR'),(6,'de','Orthopädie',89.99,'EUR'),(6,'en','Orthopedics',57.99,'USD'),(6,'es','Ortopedia',57.99,'EUR'),(6,'fr','Orthopédie',89.99,'EUR'),(6,'hi','ऑर्थोपेडिक्स',89.99,'INR'),(6,'ja','整形外科',99.99,'JPY'),(6,'pt-BR','Ortopedia',89.99,'BRL'),(6,'ru','Травматология и ортопедия',99.99,'RUB'),(6,'zh','骨科',119.99,'CNY'),(7,'ar','طب العيون',89.99,'SAR'),(7,'de','Augenheilkunde',89.99,'EUR'),(7,'en','Ophthalmology',57.99,'USD'),(7,'es','Oftalmología',57.99,'EUR'),(7,'fr','Ophtalmologie',89.99,'EUR'),(7,'hi','ऑफथाल्मोलॉजी',89.99,'INR'),(7,'ja','眼科',99.99,'JPY'),(7,'pt-BR','Oftalmologia',89.99,'BRL'),(7,'ru','Офтальмология',99.99,'RUB'),(7,'zh','眼科',119.99,'CNY'),(8,'ar','طب المسالك البولية',89.99,'SAR'),(8,'de','Urologie',89.99,'EUR'),(8,'en','Urology',57.99,'USD'),(8,'es','Urología',57.99,'EUR'),(8,'fr','Urologie',89.99,'EUR'),(8,'hi','यूरोलॉजी',89.99,'INR'),(8,'ja','泌尿器科',99.99,'JPY'),(8,'pt-BR','Urologia',89.99,'BRL'),(8,'ru','Урология',99.99,'RUB'),(8,'zh','泌尿外科',119.99,'CNY'),(9,'ar','طب نسائي',79.99,'SAR'),(9,'de','Gynäkologie',79.99,'EUR'),(9,'en','Gynecology',55.99,'USD'),(9,'es','Ginecología',55.99,'EUR'),(9,'fr','Gynécologie',79.99,'EUR'),(9,'hi','जाइनेकोलॉजी',79.99,'INR'),(9,'ja','婦人科',89.99,'JPY'),(9,'pt-BR','Ginecologia',79.99,'BRL'),(9,'ru','Гинекология',89.99,'RUB'),(9,'zh','妇科',109.99,'CNY'),(10,'ar','طب الغدد الصماء',79.99,'SAR'),(10,'de','Endokrinologie',79.99,'EUR'),(10,'en','Endocrinology',55.99,'USD'),(10,'es','Endocrinología',55.99,'EUR'),(10,'fr','Endocrinologie',79.99,'EUR'),(10,'hi','एंडोक्रिनोलॉजी',79.99,'INR'),(10,'ja','内分泌学',89.99,'JPY'),(10,'pt-BR','Endocrinologia',79.99,'BRL'),(10,'ru','Эндокринология',89.99,'RUB'),(10,'zh','内分泌学',109.99,'CNY'),(11,'ar','طب الأطفال',69.99,'SAR'),(11,'de','Pädiatrie',69.99,'EUR'),(11,'en','Pediatrics',53.99,'USD'),(11,'es','Pediatría',53.99,'EUR'),(11,'fr','Pédiatrie',69.99,'EUR'),(11,'hi','पेडियाट्रिक्स',69.99,'INR'),(11,'ja','小児科',79.99,'JPY'),(11,'pt-BR','Pediatria',69.99,'BRL'),(11,'ru','Педиатрия',79.99,'RUB'),(11,'zh','儿科',99.99,'CNY'),(12,'ar','طب الأورام',109.99,'SAR'),(12,'de','Onkologie',109.99,'EUR'),(12,'en','Oncology',61.99,'USD'),(12,'es','Oncología',61.99,'EUR'),(12,'fr','Oncologie',109.99,'EUR'),(12,'hi','ऑन्कोलॉजी',109.99,'INR'),(12,'ja','腫瘍学',119.99,'JPY'),(12,'pt-BR','Oncologia',109.99,'BRL'),(12,'ru','Онкология',119.99,'RUB'),(12,'zh','肿瘤学',139.99,'CNY'),(13,'ar','طب الأنف والأذن والحنجرة',89.99,'SAR'),(13,'de','Hals-Nasen-Ohren-Heilkunde',89.99,'EUR'),(13,'en','Otorhinolaryngology',57.99,'USD'),(13,'es','Otorrinolaringología',57.99,'EUR'),(13,'fr','Otorhinolaryngologie',89.99,'EUR'),(13,'hi','ओटोराइनोलॉजींगोलॉजी',89.99,'INR'),(13,'ja','耳鼻咽喉科',99.99,'JPY'),(13,'pt-BR','Otorrinolaringologia',89.99,'BRL'),(13,'ru','Отоларингология',99.99,'RUB'),(13,'zh','耳鼻喉科',119.99,'CNY'),(14,'ar','طب الأسنان',59.99,'SAR'),(14,'de','Zahnmedizin',59.99,'EUR'),(14,'en','Dentistry',51.99,'USD'),(14,'es','Odontología',51.99,'EUR'),(14,'fr','Dentisterie',59.99,'EUR'),(14,'hi','डेंटिस्ट्री',59.99,'INR'),(14,'ja','歯科',69.99,'JPY'),(14,'pt-BR','Dentista',59.99,'BRL'),(14,'ru','Стоматология',69.99,'RUB'),(14,'zh','牙科',89.99,'CNY'),(15,'ar','طب الجهاز الهضمي',99.99,'SAR'),(15,'de','Gastroenterologie',99.99,'EUR'),(15,'en','Gastroenterology',59.99,'USD'),(15,'es','Gastroenterología',59.99,'EUR'),(15,'fr','Gastro-entérologie',99.99,'EUR'),(15,'hi','गैस्ट्रोएंटेरोलॉजी',99.99,'INR'),(15,'ja','消化器科',109.99,'JPY'),(15,'pt-BR','Gastroenterologia',99.99,'BRL'),(15,'ru','Гастроэнтерология',109.99,'RUB'),(15,'zh','消化内科',129.99,'CNY'),(16,'ar','طب القلب للأطفال',79.99,'SAR'),(16,'de','Pädiatrische Kardiologie',79.99,'EUR'),(16,'en','Pediatric Cardiology',55.99,'USD'),(16,'es','Cardiología Pediátrica',55.99,'EUR'),(16,'fr','Cardiologie Pédiatrique',79.99,'EUR'),(16,'hi','पेडियाट्रिक कार्डियोलॉजी',79.99,'INR'),(16,'ja','小児心臓病学',89.99,'JPY'),(16,'pt-BR','Cardiologia Pediátrica',79.99,'BRL'),(16,'ru','Педиатрическая кардиология',89.99,'RUB'),(16,'zh','小儿心脏病学',109.99,'CNY'),(17,'ar','طب النفسيات',89.99,'SAR'),(17,'de','Psychiatrie',89.99,'EUR'),(17,'en','Psychiatry',57.99,'USD'),(17,'es','Psiquiatría',57.99,'EUR'),(17,'fr','Psychiatrie',89.99,'EUR'),(17,'hi','प्साइकिएट्री',89.99,'INR'),(17,'ja','精神医学',99.99,'JPY'),(17,'pt-BR','Psiquiatria',89.99,'BRL'),(17,'ru','Психиатрия',99.99,'RUB'),(17,'zh','精神病学',119.99,'CNY'),(18,'ar','التصوير الطبي',99.99,'SAR'),(18,'de','Radiologie',99.99,'EUR'),(18,'en','Radiology',59.99,'USD'),(18,'es','Radiología',59.99,'EUR'),(18,'fr','Radiologie',99.99,'EUR'),(18,'hi','रेडिओलॉजी',99.99,'INR'),(18,'ja','放射線学',109.99,'JPY'),(18,'pt-BR','Radiologia',99.99,'BRL'),(18,'ru','Радиология',109.99,'RUB'),(18,'zh','放射学',129.99,'CNY'),(19,'ar','جراحة التجميل',119.99,'SAR'),(19,'de','Plastische Chirurgie',119.99,'EUR'),(19,'en','Plastic Surgery',63.99,'USD'),(19,'es','Cirugía Plástica',63.99,'EUR'),(19,'fr','Chirurgie Plastique',119.99,'EUR'),(19,'hi','सर्जरी प्लास्टिक',119.99,'INR'),(19,'ja','形成外科',129.99,'JPY'),(19,'pt-BR','Cirurgia Plástica',119.99,'BRL'),(19,'ru','Пластическая хирургия',129.99,'RUB'),(19,'zh','整形外科',149.99,'CNY'),(20,'ar','طب الكلى',89.99,'SAR'),(20,'de','Nephrologie',89.99,'EUR'),(20,'en','Nephrology',57.99,'USD'),(20,'es','Nefrología',57.99,'EUR'),(20,'fr','Néphrologie',89.99,'EUR'),(20,'hi','नेफ्रोलॉजी',89.99,'INR'),(20,'ja','腎臓学',99.99,'JPY'),(20,'pt-BR','Nefrologia',89.99,'BRL'),(20,'ru','Нефрология',99.99,'RUB'),(20,'zh','肾病学',119.99,'CNY'),(21,'ar','طب الجلدية التجميلية',119.99,'SAR'),(21,'de','Ästhetische Dermatologie',119.99,'EUR'),(21,'en','Aesthetic Dermatology',63.99,'USD'),(21,'es','Dermatología Estética',63.99,'EUR'),(21,'fr','Dermatologie Esthétique',119.99,'EUR'),(21,'hi','डर्मेटोलॉजी एस्थेटिक',119.99,'INR'),(21,'ja','美容皮膚科',129.99,'JPY'),(21,'pt-BR','Dermatologia Estética',119.99,'BRL'),(21,'ru','Эстетическая дерматология',129.99,'RUB'),(21,'zh','美容皮肤科',149.99,'CNY'),(22,'ar','علاج طبيعي',69.99,'SAR'),(22,'de','Physiotherapie',69.99,'EUR'),(22,'en','Physiotherapy',53.99,'USD'),(22,'es','Fisioterapia',53.99,'EUR'),(22,'fr','Physiothérapie',69.99,'EUR'),(22,'hi','फिजिओथेरेपी',69.99,'INR'),(22,'ja','理学療法',79.99,'JPY'),(22,'pt-BR','Fisioterapia',69.99,'BRL'),(22,'ru','Физиотерапия',79.99,'RUB'),(22,'zh','理疗',99.99,'CNY');
/*!40000 ALTER TABLE `translations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuario`
--

DROP TABLE IF EXISTS `usuario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuario` (
  `usuario_id` int NOT NULL AUTO_INCREMENT,
  `nome` varchar(255) NOT NULL,
  `cpf` char(11) NOT NULL,
  `rg` char(9) NOT NULL,
  `email` varchar(45) NOT NULL,
  `senha` char(60) DEFAULT NULL,
  PRIMARY KEY (`usuario_id`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuario`
--

LOCK TABLES `usuario` WRITE;
/*!40000 ALTER TABLE `usuario` DISABLE KEYS */;
/*!40000 ALTER TABLE `usuario` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database 'qualivida'
--

--
-- Dumping routines for database 'qualivida'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-11-18 21:59:10
