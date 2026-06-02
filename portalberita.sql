-- MySQL dump 10.13  Distrib 8.0.30, for Win64 (x86_64)
--
-- Host: localhost    Database: portal_berita
-- ------------------------------------------------------
-- Server version	8.0.30

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

--
-- Table structure for table `anggota_division`
--

DROP TABLE IF EXISTS `anggota_division`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `anggota_division` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `anggota_jurnal_id` bigint unsigned NOT NULL,
  `division_id` bigint unsigned NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `anggota_division_anggota_jurnal_id_division_id_unique` (`anggota_jurnal_id`,`division_id`),
  KEY `anggota_division_division_id_foreign` (`division_id`),
  CONSTRAINT `anggota_division_anggota_jurnal_id_foreign` FOREIGN KEY (`anggota_jurnal_id`) REFERENCES `anggota_jurnals` (`id`) ON DELETE CASCADE,
  CONSTRAINT `anggota_division_division_id_foreign` FOREIGN KEY (`division_id`) REFERENCES `divisions` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `anggota_division`
--

LOCK TABLES `anggota_division` WRITE;
/*!40000 ALTER TABLE `anggota_division` DISABLE KEYS */;
INSERT INTO `anggota_division` VALUES (1,3,1,'2026-06-01 09:49:01','2026-06-01 09:49:01'),(2,3,3,'2026-06-01 09:49:01','2026-06-01 09:49:01'),(3,3,4,'2026-06-01 09:49:01','2026-06-01 09:49:01'),(4,3,2,'2026-06-01 09:49:01','2026-06-01 09:49:01'),(5,4,1,'2026-06-01 10:07:49','2026-06-01 10:07:49'),(8,5,1,'2026-06-01 10:14:28','2026-06-01 10:14:28'),(9,5,2,'2026-06-01 10:14:28','2026-06-01 10:14:28'),(11,6,1,'2026-06-01 10:14:58','2026-06-01 10:14:58'),(12,6,2,'2026-06-01 10:14:58','2026-06-01 10:14:58'),(13,6,4,'2026-06-01 10:14:58','2026-06-01 10:14:58'),(14,5,3,'2026-06-01 10:15:41','2026-06-01 10:15:41'),(15,7,1,'2026-06-01 10:16:05','2026-06-01 10:16:05'),(16,7,2,'2026-06-01 10:16:05','2026-06-01 10:16:05'),(17,7,4,'2026-06-01 10:16:05','2026-06-01 10:16:05'),(18,8,1,'2026-06-01 10:16:54','2026-06-01 10:16:54'),(19,8,3,'2026-06-01 10:16:54','2026-06-01 10:16:54'),(20,9,1,'2026-06-01 10:29:29','2026-06-01 10:29:29');
/*!40000 ALTER TABLE `anggota_division` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `anggota_jurnals`
--

DROP TABLE IF EXISTS `anggota_jurnals`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `anggota_jurnals` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `user_id` bigint unsigned DEFAULT NULL,
  `nis` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `photo` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `full_name` varchar(150) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `division` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `position` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'aktif',
  `joined_at` date NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `anggota_jurnals_user_id_foreign` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `anggota_jurnals`
--

LOCK TABLES `anggota_jurnals` WRITE;
/*!40000 ALTER TABLE `anggota_jurnals` DISABLE KEYS */;
INSERT INTO `anggota_jurnals` VALUES (3,NULL,'123123123','anggota/407cf2f1-817b-4e67-a05a-52202d7849a7.jpeg','Abiyyu Hibban Antoro',NULL,'Ketua','aktif','2026-06-01','2026-06-01 09:49:01','2026-06-01 10:10:06'),(4,NULL,'9874','anggota/747f644f-d692-4094-955e-1951ee5a34e3.jpg','Pian',NULL,'Wakil','aktif','2026-06-01','2026-06-01 10:07:49','2026-06-01 10:15:20'),(5,NULL,NULL,'anggota/caf987ce-25ac-4c92-b397-0ee429e53ad3.jpeg','Iqbal',NULL,'Sekretaris 1','aktif','2026-06-01','2026-06-01 10:14:28','2026-06-01 10:15:41'),(6,NULL,'123','anggota/ebe3597f-e955-4daf-a1c3-e6fbaffc397c.png','Zahra',NULL,'Sekretaris 1','aktif','2026-06-01','2026-06-01 10:14:58','2026-06-01 10:14:58'),(7,NULL,NULL,'anggota/d6ec5221-79dc-4d10-a354-0840724ad7b4.jpg','Shofia',NULL,'Bendahara 1','aktif','2026-06-01','2026-06-01 10:16:05','2026-06-01 10:16:05'),(8,NULL,NULL,'anggota/560b0868-ce77-4689-b7cb-c5cb876b677b.jpg','Dilla',NULL,'Bendahara 2','aktif','2026-06-01','2026-06-01 10:16:54','2026-06-01 10:16:54'),(9,NULL,NULL,'anggota/7074180a-21a9-4d66-be32-32cf062f4210.png','Julian',NULL,'Ketua divisi kameramen','aktif','2026-06-01','2026-06-01 10:29:29','2026-06-01 10:29:29');
/*!40000 ALTER TABLE `anggota_jurnals` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cache`
--

DROP TABLE IF EXISTS `cache`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cache` (
  `key` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `value` mediumtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `expiration` bigint NOT NULL,
  PRIMARY KEY (`key`),
  KEY `cache_expiration_index` (`expiration`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cache`
--

LOCK TABLES `cache` WRITE;
/*!40000 ALTER TABLE `cache` DISABLE KEYS */;
INSERT INTO `cache` VALUES ('jurnalistik-cache-config.all','a:11:{s:13:\"website_title\";s:30:\"Jurnalistik SMKN 2 Karanganyar\";s:19:\"website_description\";s:66:\"Portal Berita Resmi Ekstrakurikuler Jurnalistik SMKN 2 Karanganyar\";s:5:\"about\";s:116:\"Kami adalah ekstrakurikuler jurnalistik yang berdedikasi untuk menyajikan berita terkini seputar SMKN 2 Karanganyar.\";s:9:\"instagram\";s:21:\"@jurnalistik_smkn2kra\";s:8:\"facebook\";s:19:\"jurnalistiksmkn2kra\";s:5:\"email\";s:22:\"jurnal@smkn2kra.sch.id\";s:7:\"address\";s:41:\"Jl. Raya Karanganyar No. 123, Karanganyar\";s:5:\"phone\";s:11:\"08123456789\";s:4:\"logo\";s:45:\"site/459aa77b-e096-4d73-9c13-90aa05af655a.png\";s:10:\"hero_image\";s:46:\"site/4b323540-4f54-4edc-92e6-5ac11669fd73.jpeg\";s:10:\"hero_title\";s:62:\"Selamat Datang di Portal Berita Jurnalistik SMKN 2 Karanganyar\";}',1780313344);
/*!40000 ALTER TABLE `cache` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cache_locks`
--

DROP TABLE IF EXISTS `cache_locks`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cache_locks` (
  `key` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `owner` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `expiration` bigint NOT NULL,
  PRIMARY KEY (`key`),
  KEY `cache_locks_expiration_index` (`expiration`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cache_locks`
--

LOCK TABLES `cache_locks` WRITE;
/*!40000 ALTER TABLE `cache_locks` DISABLE KEYS */;
/*!40000 ALTER TABLE `cache_locks` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `carousels`
--

DROP TABLE IF EXISTS `carousels`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `carousels` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(200) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `subtitle` varchar(200) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `image_path` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `link_url` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT '1',
  `display_order` smallint unsigned NOT NULL DEFAULT '0',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `carousels`
--

LOCK TABLES `carousels` WRITE;
/*!40000 ALTER TABLE `carousels` DISABLE KEYS */;
INSERT INTO `carousels` VALUES (1,'Selamat Datang di Portal Berita','SMKN 2 Karanganyar','carousels/76697243-7c7b-46a1-933c-679ee439a71d.png','#',1,1,'2026-06-01 00:00:19','2026-06-01 08:17:45'),(2,'Prestasi Terbaru Siswa','Juara Lomba Tingkat Nasional','carousels/c977610c-a517-4650-90e7-b9399f05e99c.png','#',1,2,'2026-06-01 00:00:19','2026-06-01 08:17:57'),(3,'Penerimaan Anggota Baru','Ekstrakurikuler Jurnalistik 2024','carousels/adc5af2d-cc99-4e8d-bb90-73eb505d071a.jpg','#',1,3,'2026-06-01 00:00:19','2026-06-01 08:18:10');
/*!40000 ALTER TABLE `carousels` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `categories`
--

DROP TABLE IF EXISTS `categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categories` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `slug` varchar(120) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci,
  `show_in_sidebar` tinyint(1) NOT NULL DEFAULT '0',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `categories_name_unique` (`name`),
  UNIQUE KEY `categories_slug_unique` (`slug`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categories`
--

LOCK TABLES `categories` WRITE;
/*!40000 ALTER TABLE `categories` DISABLE KEYS */;
INSERT INTO `categories` VALUES (1,'Berita Sekolah','berita-sekolah','Kategori Berita Sekolah SMKN 2 Karanganyar',1,'2026-06-01 00:00:18','2026-06-01 00:00:18'),(2,'Prestasi','prestasi','Kategori Prestasi SMKN 2 Karanganyar',1,'2026-06-01 00:00:18','2026-06-01 00:00:18'),(3,'Ekstrakurikuler','ekstrakurikuler','Kategori Ekstrakurikuler SMKN 2 Karanganyar',0,'2026-06-01 00:00:18','2026-06-01 00:00:18'),(4,'Olahraga','olahraga','Kategori Olahraga SMKN 2 Karanganyar',1,'2026-06-01 00:00:18','2026-06-01 00:00:18'),(5,'Seni & Budaya','seni-budaya','Kategori Seni & Budaya SMKN 2 Karanganyar',0,'2026-06-01 00:00:18','2026-06-01 00:00:18'),(6,'Teknologi','teknologi','Kategori Teknologi SMKN 2 Karanganyar',0,'2026-06-01 00:00:18','2026-06-01 00:00:18');
/*!40000 ALTER TABLE `categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `comments`
--

DROP TABLE IF EXISTS `comments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `comments` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `content_id` bigint unsigned NOT NULL,
  `user_id` bigint unsigned NOT NULL,
  `comment` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `is_approved` tinyint(1) NOT NULL DEFAULT '1',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `comments_content_id_foreign` (`content_id`),
  KEY `comments_user_id_foreign` (`user_id`),
  CONSTRAINT `comments_content_id_foreign` FOREIGN KEY (`content_id`) REFERENCES `contents` (`id`) ON DELETE CASCADE,
  CONSTRAINT `comments_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comments`
--

LOCK TABLES `comments` WRITE;
/*!40000 ALTER TABLE `comments` DISABLE KEYS */;
INSERT INTO `comments` VALUES (1,1,1,'keren mang',1,'2026-06-01 00:58:09','2026-06-01 00:58:09',NULL),(2,8,7,'ooo gitu pak, oke baik makasih',1,'2026-06-01 08:37:40','2026-06-01 08:37:40',NULL),(3,1,8,'ooo gitu',1,'2026-06-01 08:56:04','2026-06-01 08:56:04',NULL);
/*!40000 ALTER TABLE `comments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `configurations`
--

DROP TABLE IF EXISTS `configurations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `configurations` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `key` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `value` text COLLATE utf8mb4_unicode_ci,
  `type` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'text',
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `configurations_key_unique` (`key`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `configurations`
--

LOCK TABLES `configurations` WRITE;
/*!40000 ALTER TABLE `configurations` DISABLE KEYS */;
INSERT INTO `configurations` VALUES (1,'website_title','Jurnalistik SMKN 2 Karanganyar','text','2026-06-01 00:00:18'),(2,'website_description','Portal Berita Resmi Ekstrakurikuler Jurnalistik SMKN 2 Karanganyar','text','2026-06-01 00:00:18'),(3,'about','Kami adalah ekstrakurikuler jurnalistik yang berdedikasi untuk menyajikan berita terkini seputar SMKN 2 Karanganyar.','text','2026-06-01 00:00:18'),(4,'instagram','@jurnalistik_smkn2kra','text','2026-06-01 00:00:18'),(5,'facebook','jurnalistiksmkn2kra','text','2026-06-01 00:00:18'),(6,'email','jurnal@smkn2kra.sch.id','text','2026-06-01 00:00:18'),(7,'address','Jl. Raya Karanganyar No. 123, Karanganyar','text','2026-06-01 00:00:18'),(8,'phone','08123456789','text','2026-06-01 00:00:18'),(9,'logo','site/459aa77b-e096-4d73-9c13-90aa05af655a.png','text','2026-06-01 00:39:56'),(10,'hero_image','site/4b323540-4f54-4edc-92e6-5ac11669fd73.jpeg','text','2026-06-01 09:19:19'),(11,'hero_title','Selamat Datang di Portal Berita Jurnalistik SMKN 2 Karanganyar','text','2026-06-01 09:17:45');
/*!40000 ALTER TABLE `configurations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `content_topic`
--

DROP TABLE IF EXISTS `content_topic`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `content_topic` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `content_id` bigint unsigned NOT NULL,
  `topic_id` bigint unsigned NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `content_topic_content_id_topic_id_unique` (`content_id`,`topic_id`),
  KEY `content_topic_topic_id_foreign` (`topic_id`),
  CONSTRAINT `content_topic_content_id_foreign` FOREIGN KEY (`content_id`) REFERENCES `contents` (`id`) ON DELETE CASCADE,
  CONSTRAINT `content_topic_topic_id_foreign` FOREIGN KEY (`topic_id`) REFERENCES `topics` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `content_topic`
--

LOCK TABLES `content_topic` WRITE;
/*!40000 ALTER TABLE `content_topic` DISABLE KEYS */;
INSERT INTO `content_topic` VALUES (1,1,4,'2026-06-01 00:00:18','2026-06-01 00:00:18'),(2,1,5,'2026-06-01 00:00:18','2026-06-01 00:00:18'),(3,2,8,'2026-06-01 00:00:18','2026-06-01 00:00:18'),(4,3,7,'2026-06-01 00:00:18','2026-06-01 00:00:18'),(5,4,12,'2026-06-01 00:00:18','2026-06-01 00:00:18'),(6,5,13,'2026-06-01 00:00:18','2026-06-01 00:00:18'),(7,6,2,'2026-06-01 00:00:18','2026-06-01 00:00:18'),(8,7,17,'2026-06-01 00:00:19','2026-06-01 00:00:19');
/*!40000 ALTER TABLE `content_topic` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `contents`
--

DROP TABLE IF EXISTS `contents`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `contents` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `author_id` bigint unsigned NOT NULL,
  `category_id` bigint unsigned DEFAULT NULL,
  `title` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `slug` varchar(280) COLLATE utf8mb4_unicode_ci NOT NULL,
  `excerpt` text COLLATE utf8mb4_unicode_ci,
  `content` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `thumbnail` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `status` enum('draft','published','archived') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'draft',
  `is_featured` tinyint(1) NOT NULL DEFAULT '0',
  `published_at` timestamp NULL DEFAULT NULL,
  `view_count` bigint unsigned NOT NULL DEFAULT '0',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `contents_slug_unique` (`slug`),
  KEY `contents_author_id_foreign` (`author_id`),
  KEY `contents_category_id_foreign` (`category_id`),
  CONSTRAINT `contents_author_id_foreign` FOREIGN KEY (`author_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  CONSTRAINT `contents_category_id_foreign` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `contents`
--

LOCK TABLES `contents` WRITE;
/*!40000 ALTER TABLE `contents` DISABLE KEYS */;
INSERT INTO `contents` VALUES (1,3,2,'Siswa SMKN 2 Karanganyar Raih Juara 1 Lomba Debat Nasional','siswa-smkn-2-karanganyar-raih-juara-1-lomba-debat-nasional','Tim debat SMKN 2 Karanganyar berhasil meraih juara pertama dalam ajang Lomba Debat Nasional tingkat SMK se-Indonesia.','<p>Tim debat SMKN 2 Karanganyar berhasil meraih juara pertama dalam ajang Lomba Debat Nasional tingkat SMK se-Indonesia yang diselenggarakan di Jakarta pada 15-17 Januari 2024.</p><p>Tim yang terdiri dari Ahmad Rizki, Siti Nurhaliza, dan Budi Santoso ini berhasil mengalahkan 24 tim dari berbagai provinsi.</p><p>\"Kami sangat bangga dengan pencapaian ini. Ini hasil dari latihan intensif selama 3 bulan,\" ujar Ahmad Rizki, ketua tim.</p>','thumbnails/24c5cf2d-43ce-4fc5-8d9e-564c16ca1d2e.jpg','published',0,'2026-06-01 08:26:21',131,'2026-06-01 00:00:18','2026-06-01 09:24:09','2026-06-01 09:24:09'),(2,3,3,'Ekstrakurikuler Jurnalistik Buka Pendaftaran Anggota Baru','ekstrakurikuler-jurnalistik-buka-pendaftaran-anggota-baru','Ekstrakurikuler Jurnalistik SMKN 2 Karanganyar membuka pendaftaran anggota baru untuk tahun ajaran 2024/2025.','<p>Ekstrakurikuler Jurnalistik SMKN 2 Karanganyar resmi membuka pendaftaran anggota baru untuk tahun ajaran 2024/2025.</p><p>Pendaftaran dibuka mulai 1 Februari hingga 29 Februari 2024. Siswa yang berminat dapat mendaftar melalui form online atau langsung ke sekretariat ekskul di Gedung Utama Lantai 2.</p><p>Ekskul Jurnalistik menawarkan pelatihan menulis berita, fotografi, videografi, dan desain grafis.</p>',NULL,'archived',1,'2026-05-06 00:00:18',447,'2026-06-01 00:00:18','2026-06-01 09:24:11','2026-06-01 09:24:11'),(3,2,3,'Workshop Fotografi Jurnalistik Bersama Fotografer Profesional','workshop-fotografi-jurnalistik-bersama-fotografer-profesional','Anggota ekskul jurnalistik mengikuti workshop fotografi bersama fotografer profesional dari Solo Pos.','<p>Sebanyak 30 anggota Ekstrakurikuler Jurnalistik SMKN 2 Karanganyar mengikuti workshop fotografi jurnalistik yang menghadirkan fotografer profesional dari Solo Pos.</p><p>Workshop yang berlangsung selama dua hari ini membahas teknik fotografi dasar, komposisi, dan editing foto untuk keperluan jurnalistik.</p><p>\"Kami ingin anggota memiliki skill fotografi yang mumpuni untuk mendukung kegiatan jurnalistik,\" kata Dina Amalia, ketua divisi fotografi.</p>',NULL,'archived',0,'2026-05-11 00:00:18',216,'2026-06-01 00:00:18','2026-06-01 09:24:13','2026-06-01 09:24:13'),(4,2,4,'Tim Basket SMKN 2 Karanganyar Lolos ke Semi Final','tim-basket-smkn-2-karanganyar-lolos-ke-semi-final','Tim basket SMKN 2 Karanganyar berhasil lolos ke babak semi final setelah mengalahkan SMKN 1 Surakarta.','<p>Tim basket SMKN 2 Karanganyar berhasil lolos ke babak semi final Liga Basket Pelajar Karanganyar setelah mengalahkan SMKN 1 Surakarta dengan skor 78-65.</p><p>Pertandingan yang berlangsung di GOR Karanganyar ini disaksikan ratusan pendukung dari kedua sekolah.</p>',NULL,'archived',0,'2026-05-23 00:00:18',56,'2026-06-01 00:00:18','2026-06-01 09:24:15','2026-06-01 09:24:15'),(5,2,5,'Pentas Seni Akhir Tahun: Kolaborasi Musik dan Tari Tradisional','pentas-seni-akhir-tahun-kolaborasi-musik-dan-tari-tradisional','Siswa SMKN 2 Karanganyar menggelar pentas seni akhir tahun yang menampilkan kolaborasi musik modern dan tari tradisional.','<p>Pentas seni akhir tahun SMKN 2 Karanganyar sukses digelar di aula utama sekolah pada Sabtu malam. Acara ini menampilkan kolaborasi antara band sekolah dengan tim tari tradisional.</p><p>\"Ini adalah bentuk apresiasi terhadap seni dan budaya lokal yang dikemas secara modern,\" ujar koordinator acara.</p>',NULL,'archived',0,'2026-05-06 00:00:18',102,'2026-06-01 00:00:18','2026-06-01 09:24:17','2026-06-01 09:24:17'),(6,2,1,'Pengumuman Kelulusan Kelas XII Tahun Ajaran 2023/2024','pengumuman-kelulusan-kelas-xii-tahun-ajaran-20232024','SMKN 2 Karanganyar mengumumkan kelulusan 350 siswa kelas XII dengan tingkat kelulusan 100%.','<p>SMKN 2 Karanganyar mengumumkan hasil kelulusan siswa kelas XII tahun ajaran 2023/2024. Dari 350 siswa yang mengikuti ujian, seluruhnya dinyatakan lulus dengan tingkat kelulusan 100%.</p><p>Kepala Sekolah menyampaikan rasa bangganya atas pencapaian ini dan berpesan agar para lulusan terus melanjutkan pendidikan atau memasuki dunia kerja dengan semangat.</p>',NULL,'archived',0,'2026-05-19 00:00:18',432,'2026-06-01 00:00:18','2026-06-01 09:24:19','2026-06-01 09:24:19'),(7,2,6,'Pelatihan Coding untuk Siswa: Kerjasama dengan Dicoding','pelatihan-coding-untuk-siswa-kerjasama-dengan-dicoding','SMKN 2 Karanganyar bekerjasama dengan Dicoding untuk memberikan pelatihan coding gratis bagi siswa.','<p>SMKN 2 Karanganyar menjalin kerjasama dengan platform edukasi teknologi Dicoding untuk memberikan pelatihan coding gratis bagi seluruh siswa.</p><p>Program ini mencakup pelatihan pemrograman web, mobile, dan dasar-dasar AI yang akan berlangsung selama 3 bulan.</p>',NULL,'archived',1,'2026-05-06 00:00:18',493,'2026-06-01 00:00:18','2026-06-01 09:24:21','2026-06-01 09:24:21'),(8,1,1,'SATUDUWA','satuduwa','JADI GINI LUR','HALIOODOASDJAOWDJAOSDJAWDJASDA SDA WDASDA WD A','thumbnails/ede4edc9-4012-4daf-9d6e-695f6bf2a60b.png','published',0,'2026-06-01 08:03:51',38,'2026-06-01 08:03:49','2026-06-01 08:57:25',NULL);
/*!40000 ALTER TABLE `contents` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `divisions`
--

DROP TABLE IF EXISTS `divisions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `divisions` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `slug` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci,
  `order` int NOT NULL DEFAULT '0',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `divisions_slug_unique` (`slug`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `divisions`
--

LOCK TABLES `divisions` WRITE;
/*!40000 ALTER TABLE `divisions` DISABLE KEYS */;
INSERT INTO `divisions` VALUES (1,'Kameramen','kameramen','Divisi kamera dan pengambilan gambar',1,'2026-06-01 09:37:24','2026-06-01 09:37:24'),(2,'Penulis','penulis','Divisi penulisan berita dan artikel',2,'2026-06-01 09:37:24','2026-06-01 09:37:24'),(3,'Editor','editor','Divisi editing dan penyuntingan',3,'2026-06-01 09:37:24','2026-06-01 09:37:24'),(4,'Reporter','reporter','Divisi peliputan berita',4,'2026-06-01 09:37:24','2026-06-01 09:37:24');
/*!40000 ALTER TABLE `divisions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `failed_jobs`
--

DROP TABLE IF EXISTS `failed_jobs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `failed_jobs` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `uuid` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `connection` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `queue` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `exception` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`),
  KEY `failed_jobs_connection_queue_failed_at_index` (`connection`,`queue`,`failed_at`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `failed_jobs`
--

LOCK TABLES `failed_jobs` WRITE;
/*!40000 ALTER TABLE `failed_jobs` DISABLE KEYS */;
/*!40000 ALTER TABLE `failed_jobs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `galleries`
--

DROP TABLE IF EXISTS `galleries`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `galleries` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(200) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci,
  `image_path` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `uploaded_by` bigint unsigned NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `galleries_uploaded_by_foreign` (`uploaded_by`),
  CONSTRAINT `galleries_uploaded_by_foreign` FOREIGN KEY (`uploaded_by`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `galleries`
--

LOCK TABLES `galleries` WRITE;
/*!40000 ALTER TABLE `galleries` DISABLE KEYS */;
/*!40000 ALTER TABLE `galleries` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `job_batches`
--

DROP TABLE IF EXISTS `job_batches`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `job_batches` (
  `id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `total_jobs` int NOT NULL,
  `pending_jobs` int NOT NULL,
  `failed_jobs` int NOT NULL,
  `failed_job_ids` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `options` mediumtext COLLATE utf8mb4_unicode_ci,
  `cancelled_at` int DEFAULT NULL,
  `created_at` int NOT NULL,
  `finished_at` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `job_batches`
--

LOCK TABLES `job_batches` WRITE;
/*!40000 ALTER TABLE `job_batches` DISABLE KEYS */;
/*!40000 ALTER TABLE `job_batches` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `jobs`
--

DROP TABLE IF EXISTS `jobs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `jobs` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `queue` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `attempts` smallint unsigned NOT NULL,
  `reserved_at` int unsigned DEFAULT NULL,
  `available_at` int unsigned NOT NULL,
  `created_at` int unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `jobs_queue_index` (`queue`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `jobs`
--

LOCK TABLES `jobs` WRITE;
/*!40000 ALTER TABLE `jobs` DISABLE KEYS */;
/*!40000 ALTER TABLE `jobs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `likes`
--

DROP TABLE IF EXISTS `likes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `likes` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `content_id` bigint unsigned NOT NULL,
  `user_id` bigint unsigned NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `likes_content_id_user_id_unique` (`content_id`,`user_id`),
  KEY `likes_user_id_foreign` (`user_id`),
  CONSTRAINT `likes_content_id_foreign` FOREIGN KEY (`content_id`) REFERENCES `contents` (`id`) ON DELETE CASCADE,
  CONSTRAINT `likes_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `likes`
--

LOCK TABLES `likes` WRITE;
/*!40000 ALTER TABLE `likes` DISABLE KEYS */;
/*!40000 ALTER TABLE `likes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `migrations`
--

DROP TABLE IF EXISTS `migrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `migrations` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `migration` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `migrations`
--

LOCK TABLES `migrations` WRITE;
/*!40000 ALTER TABLE `migrations` DISABLE KEYS */;
INSERT INTO `migrations` VALUES (1,'0001_01_01_000000_create_users_table',1),(2,'0001_01_01_000001_create_cache_table',1),(3,'0001_01_01_000002_create_jobs_table',1),(4,'2026_05_25_045444_create_personal_access_tokens_table',1),(5,'2026_05_25_050238_create_anggota_jurnals_table',1),(6,'2026_05_25_050309_create_categories_table',1),(7,'2026_05_25_050319_create_contents_table',1),(8,'2026_05_25_050333_create_topics_table',1),(9,'2026_05_25_050350_create_content_topic_table',1),(10,'2026_05_25_050405_create_comments_table',1),(11,'2026_05_25_050411_create_likes_table',1),(12,'2026_05_25_050423_create_views_table',1),(13,'2026_05_25_050431_create_galleries_table',1),(14,'2026_05_25_050442_create_carousels_table',1),(15,'2026_05_25_050457_create_configurations_table',1),(16,'2026_06_01_161727_add_hero_configurations',2),(17,'2026_06_01_163352_modify_anggota_jurnals_add_nis_photo_divisions',3),(18,'2026_06_01_163358_create_divisions_table',3),(19,'2026_06_01_165000_make_division_nullable_in_anggota_jurnals',4);
/*!40000 ALTER TABLE `migrations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `personal_access_tokens`
--

DROP TABLE IF EXISTS `personal_access_tokens`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `personal_access_tokens` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `tokenable_type` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `tokenable_id` bigint unsigned NOT NULL,
  `name` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `abilities` text COLLATE utf8mb4_unicode_ci,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `expires_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`),
  KEY `personal_access_tokens_expires_at_index` (`expires_at`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `personal_access_tokens`
--

LOCK TABLES `personal_access_tokens` WRITE;
/*!40000 ALTER TABLE `personal_access_tokens` DISABLE KEYS */;
INSERT INTO `personal_access_tokens` VALUES (3,'App\\Models\\User',8,'auth-token','b8e94e0071f29d83d4e288b729e16f8ff21484a6a03a03b7422cfef7e69cf47c','[\"*\"]','2026-06-01 08:56:04',NULL,'2026-06-01 08:54:43','2026-06-01 08:56:04');
/*!40000 ALTER TABLE `personal_access_tokens` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `topics`
--

DROP TABLE IF EXISTS `topics`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `topics` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `category_id` bigint unsigned NOT NULL,
  `name` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `slug` varchar(120) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `topics_category_id_name_unique` (`category_id`,`name`),
  UNIQUE KEY `topics_category_id_slug_unique` (`category_id`,`slug`),
  CONSTRAINT `topics_category_id_foreign` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `topics`
--

LOCK TABLES `topics` WRITE;
/*!40000 ALTER TABLE `topics` DISABLE KEYS */;
INSERT INTO `topics` VALUES (1,1,'Kegiatan','kegiatan','2026-06-01 00:00:18','2026-06-01 00:00:18'),(2,1,'Pengumuman','pengumuman','2026-06-01 00:00:18','2026-06-01 00:00:18'),(3,1,'Kebijakan','kebijakan','2026-06-01 00:00:18','2026-06-01 00:00:18'),(4,2,'Akademik','akademik','2026-06-01 00:00:18','2026-06-01 00:00:18'),(5,2,'Non-Akademik','non-akademik','2026-06-01 00:00:18','2026-06-01 00:00:18'),(6,2,'Lomba','lomba','2026-06-01 00:00:18','2026-06-01 00:00:18'),(7,3,'Pramuka','pramuka','2026-06-01 00:00:18','2026-06-01 00:00:18'),(8,3,'Paskibra','paskibra','2026-06-01 00:00:18','2026-06-01 00:00:18'),(9,3,'PMR','pmr','2026-06-01 00:00:18','2026-06-01 00:00:18'),(10,4,'Sepak Bola','sepak-bola','2026-06-01 00:00:18','2026-06-01 00:00:18'),(11,4,'Basket','basket','2026-06-01 00:00:18','2026-06-01 00:00:18'),(12,4,'Voli','voli','2026-06-01 00:00:18','2026-06-01 00:00:18'),(13,5,'Tari','tari','2026-06-01 00:00:18','2026-06-01 00:00:18'),(14,5,'Musik','musik','2026-06-01 00:00:18','2026-06-01 00:00:18'),(15,5,'Teater','teater','2026-06-01 00:00:18','2026-06-01 00:00:18'),(16,6,'Coding','coding','2026-06-01 00:00:18','2026-06-01 00:00:18'),(17,6,'Robotik','robotik','2026-06-01 00:00:18','2026-06-01 00:00:18'),(18,6,'Desain','desain','2026-06-01 00:00:18','2026-06-01 00:00:18');
/*!40000 ALTER TABLE `topics` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `username` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `full_name` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `avatar` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `role` enum('user','anggota_jurnals','kontributor','admin') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'user',
  `is_active` tinyint(1) NOT NULL DEFAULT '1',
  `last_login_at` timestamp NULL DEFAULT NULL,
  `remember_token` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `users_username_unique` (`username`),
  UNIQUE KEY `users_email_unique` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'admin','admin@jurnalistik.sch.id','$2y$12$s5zq3HCZP3GHQl0tj9I42eLmsABeH/VAE..8atpJzTow0t.Pj70i.','Administrator','avatars/46172975-5632-480b-adf0-9eb4e967730a.png','admin',1,'2026-06-01 00:04:26',NULL,'2026-06-01 00:00:15','2026-06-01 08:16:39',NULL),(2,'budi_santoso','budi@jurnalistik.sch.id','$2y$12$9OQGWU2jJCrMVHhTaVwWeu8BXgSjxsvKzx3aWuZlvBABXfDAZlE6i','Budi Santoso',NULL,'kontributor',1,NULL,NULL,'2026-06-01 00:00:16','2026-06-01 08:51:50','2026-06-01 08:51:50'),(3,'siti_nur','siti@jurnalistik.sch.id','$2y$12$X72qMKsqlWs/n8eVK.cJPOCGDW7j261Dd1XFIoB3Rsm0y/FCKANb6','Siti Nurhaliza',NULL,'kontributor',1,NULL,NULL,'2026-06-01 00:00:16','2026-06-01 08:51:48','2026-06-01 08:51:48'),(4,'andi_pratama','andi@jurnalistik.sch.id','$2y$12$rayocw9UhFwpI7OfMUkB5OZ5rAxXxqS3O3Rs71DZzgyGC7xFDBDOi','Andi Pratama',NULL,'anggota_jurnals',1,NULL,NULL,'2026-06-01 00:00:17','2026-06-01 08:51:55','2026-06-01 08:51:55'),(5,'dina_amalia','dina@jurnalistik.sch.id','$2y$12$7/86yC86gLfNjMh2ezwjB.UQQF97GCmUnjV50SSuV.3Ov9o8wHpo6','Dina Amalia',NULL,'anggota_jurnals',1,NULL,NULL,'2026-06-01 00:00:17','2026-06-01 08:51:52','2026-06-01 08:51:52'),(6,'rizki_maulana','rizki@student.sch.id','$2y$12$H/53GV2CkgMOzOruYP7eMuofkqTa3RvG3GFbZUm9W26sDYr80U/Ca','Rizki Maulana',NULL,'user',1,NULL,NULL,'2026-06-01 00:00:18','2026-06-01 08:51:57','2026-06-01 08:51:57'),(7,'putri_ayu','putri@student.sch.id','$2y$12$BBbYT3jkQEGy3CsgISNsfu.aiqoflpZjSA5zarTV.44FF2BP1dhym','Putri Ayu','avatars/d4fa10cd-2c40-4a8d-be37-579fd1dd3cda.jpg','user',1,'2026-06-01 08:36:18',NULL,'2026-06-01 00:00:18','2026-06-01 08:52:00','2026-06-01 08:52:00'),(8,'baliq1945','thebalx16@gmail.com','$2y$12$eYVenX8oS.ToNBhG62ZFpO6QVdktRX9FI1llEQtVE0uOcRbiQYdD6','IQBAL ISNANDA NURHUDA','avatars/de34a50b-19fe-4582-88d4-12af2fd6510d.jpg','anggota_jurnals',1,'2026-06-01 08:54:43',NULL,'2026-06-01 08:52:47','2026-06-01 08:55:27',NULL);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `views`
--

DROP TABLE IF EXISTS `views`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `views` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `content_id` bigint unsigned NOT NULL,
  `user_id` bigint unsigned DEFAULT NULL,
  `viewer_ip` varchar(45) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `user_agent` varchar(500) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `viewed_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `views_user_id_foreign` (`user_id`),
  KEY `views_content_id_viewed_at_index` (`content_id`,`viewed_at`),
  KEY `views_viewed_at_index` (`viewed_at`),
  CONSTRAINT `views_content_id_foreign` FOREIGN KEY (`content_id`) REFERENCES `contents` (`id`) ON DELETE CASCADE,
  CONSTRAINT `views_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=80 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `views`
--

LOCK TABLES `views` WRITE;
/*!40000 ALTER TABLE `views` DISABLE KEYS */;
INSERT INTO `views` VALUES (1,4,NULL,'127.0.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:151.0) Gecko/20100101 Firefox/151.0','2026-06-01 00:04:56'),(2,4,NULL,'127.0.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:151.0) Gecko/20100101 Firefox/151.0','2026-06-01 00:04:56'),(3,4,NULL,'127.0.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:151.0) Gecko/20100101 Firefox/151.0','2026-06-01 00:15:12'),(4,4,NULL,'127.0.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:151.0) Gecko/20100101 Firefox/151.0','2026-06-01 00:15:13'),(5,5,NULL,'127.0.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:151.0) Gecko/20100101 Firefox/151.0','2026-06-01 00:38:56'),(6,5,NULL,'127.0.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:151.0) Gecko/20100101 Firefox/151.0','2026-06-01 00:38:56'),(7,1,NULL,'127.0.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:151.0) Gecko/20100101 Firefox/151.0','2026-06-01 00:54:27'),(8,1,NULL,'127.0.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:151.0) Gecko/20100101 Firefox/151.0','2026-06-01 00:54:28'),(9,1,NULL,'127.0.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:151.0) Gecko/20100101 Firefox/151.0','2026-06-01 00:55:51'),(10,1,NULL,'127.0.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:151.0) Gecko/20100101 Firefox/151.0','2026-06-01 00:55:53'),(11,1,NULL,'127.0.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:151.0) Gecko/20100101 Firefox/151.0','2026-06-01 00:57:58'),(12,1,NULL,'127.0.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:151.0) Gecko/20100101 Firefox/151.0','2026-06-01 00:57:58'),(13,1,NULL,'127.0.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:151.0) Gecko/20100101 Firefox/151.0','2026-06-01 00:58:11'),(14,1,NULL,'127.0.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:151.0) Gecko/20100101 Firefox/151.0','2026-06-01 08:00:19'),(15,1,NULL,'127.0.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:151.0) Gecko/20100101 Firefox/151.0','2026-06-01 08:00:19'),(16,1,NULL,'127.0.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:151.0) Gecko/20100101 Firefox/151.0','2026-06-01 08:00:29'),(17,1,NULL,'127.0.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:151.0) Gecko/20100101 Firefox/151.0','2026-06-01 08:00:29'),(18,2,NULL,'127.0.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:151.0) Gecko/20100101 Firefox/151.0','2026-06-01 08:00:58'),(19,2,NULL,'127.0.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:151.0) Gecko/20100101 Firefox/151.0','2026-06-01 08:00:58'),(20,1,NULL,'127.0.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:151.0) Gecko/20100101 Firefox/151.0','2026-06-01 08:03:19'),(21,1,NULL,'127.0.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:151.0) Gecko/20100101 Firefox/151.0','2026-06-01 08:03:19'),(22,8,NULL,'127.0.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:151.0) Gecko/20100101 Firefox/151.0','2026-06-01 08:03:59'),(23,8,NULL,'127.0.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:151.0) Gecko/20100101 Firefox/151.0','2026-06-01 08:03:59'),(24,8,NULL,'127.0.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:151.0) Gecko/20100101 Firefox/151.0','2026-06-01 08:05:20'),(25,8,NULL,'127.0.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:151.0) Gecko/20100101 Firefox/151.0','2026-06-01 08:15:38'),(26,8,NULL,'127.0.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:151.0) Gecko/20100101 Firefox/151.0','2026-06-01 08:15:38'),(27,8,NULL,'127.0.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:151.0) Gecko/20100101 Firefox/151.0','2026-06-01 08:15:40'),(28,8,NULL,'127.0.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:151.0) Gecko/20100101 Firefox/151.0','2026-06-01 08:15:40'),(29,1,NULL,'127.0.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:151.0) Gecko/20100101 Firefox/151.0','2026-06-01 08:15:46'),(30,1,NULL,'127.0.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:151.0) Gecko/20100101 Firefox/151.0','2026-06-01 08:15:46'),(31,1,NULL,'127.0.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:151.0) Gecko/20100101 Firefox/151.0','2026-06-01 08:15:53'),(32,1,NULL,'127.0.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:151.0) Gecko/20100101 Firefox/151.0','2026-06-01 08:15:53'),(33,1,NULL,'127.0.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:151.0) Gecko/20100101 Firefox/151.0','2026-06-01 08:19:50'),(34,1,NULL,'127.0.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:151.0) Gecko/20100101 Firefox/151.0','2026-06-01 08:19:50'),(35,8,NULL,'127.0.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:151.0) Gecko/20100101 Firefox/151.0','2026-06-01 08:20:01'),(36,8,NULL,'127.0.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:151.0) Gecko/20100101 Firefox/151.0','2026-06-01 08:20:01'),(37,8,NULL,'127.0.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:151.0) Gecko/20100101 Firefox/151.0','2026-06-01 08:23:23'),(38,8,NULL,'127.0.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:151.0) Gecko/20100101 Firefox/151.0','2026-06-01 08:23:27'),(39,8,NULL,'127.0.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:151.0) Gecko/20100101 Firefox/151.0','2026-06-01 08:23:27'),(40,8,NULL,'127.0.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:151.0) Gecko/20100101 Firefox/151.0','2026-06-01 08:23:31'),(41,8,NULL,'127.0.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:151.0) Gecko/20100101 Firefox/151.0','2026-06-01 08:23:36'),(42,8,NULL,'127.0.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:151.0) Gecko/20100101 Firefox/151.0','2026-06-01 08:25:42'),(43,8,NULL,'127.0.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:151.0) Gecko/20100101 Firefox/151.0','2026-06-01 08:25:42'),(44,1,NULL,'127.0.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:151.0) Gecko/20100101 Firefox/151.0','2026-06-01 08:25:55'),(45,1,NULL,'127.0.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:151.0) Gecko/20100101 Firefox/151.0','2026-06-01 08:25:55'),(46,1,NULL,'127.0.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:151.0) Gecko/20100101 Firefox/151.0','2026-06-01 08:26:11'),(47,1,NULL,'127.0.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:151.0) Gecko/20100101 Firefox/151.0','2026-06-01 08:26:11'),(48,1,NULL,'127.0.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:151.0) Gecko/20100101 Firefox/151.0','2026-06-01 08:26:15'),(49,1,NULL,'127.0.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:151.0) Gecko/20100101 Firefox/151.0','2026-06-01 08:26:15'),(50,8,NULL,'127.0.0.1','Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/148.0.0.0 Mobile Safari/537.36','2026-06-01 08:37:30'),(51,8,NULL,'127.0.0.1','Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/148.0.0.0 Mobile Safari/537.36','2026-06-01 08:37:31'),(52,8,NULL,'127.0.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:151.0) Gecko/20100101 Firefox/151.0','2026-06-01 08:37:49'),(53,8,NULL,'127.0.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:151.0) Gecko/20100101 Firefox/151.0','2026-06-01 08:37:49'),(54,8,NULL,'127.0.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:151.0) Gecko/20100101 Firefox/151.0','2026-06-01 08:38:13'),(55,8,NULL,'127.0.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:151.0) Gecko/20100101 Firefox/151.0','2026-06-01 08:38:13'),(56,8,NULL,'127.0.0.1','Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/148.0.0.0 Mobile Safari/537.36','2026-06-01 08:50:26'),(57,8,NULL,'127.0.0.1','Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/148.0.0.0 Mobile Safari/537.36','2026-06-01 08:50:26'),(58,8,NULL,'127.0.0.1','Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/148.0.0.0 Mobile Safari/537.36','2026-06-01 08:50:50'),(59,8,NULL,'127.0.0.1','Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/148.0.0.0 Mobile Safari/537.36','2026-06-01 08:50:50'),(60,1,NULL,'127.0.0.1','Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/148.0.0.0 Mobile Safari/537.36','2026-06-01 08:55:52'),(61,1,NULL,'127.0.0.1','Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/148.0.0.0 Mobile Safari/537.36','2026-06-01 08:55:53'),(62,1,NULL,'127.0.0.1','Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/148.0.0.0 Mobile Safari/537.36','2026-06-01 08:56:11'),(63,1,NULL,'127.0.0.1','Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/148.0.0.0 Mobile Safari/537.36','2026-06-01 08:56:11'),(64,8,NULL,'127.0.0.1','Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/148.0.0.0 Mobile Safari/537.36','2026-06-01 08:56:13'),(65,8,NULL,'127.0.0.1','Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/148.0.0.0 Mobile Safari/537.36','2026-06-01 08:56:14'),(66,8,NULL,'127.0.0.1','Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/148.0.0.0 Mobile Safari/537.36','2026-06-01 08:56:27'),(67,8,NULL,'127.0.0.1','Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/148.0.0.0 Mobile Safari/537.36','2026-06-01 08:56:27'),(68,8,NULL,'127.0.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:151.0) Gecko/20100101 Firefox/151.0','2026-06-01 08:56:36'),(69,8,NULL,'127.0.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:151.0) Gecko/20100101 Firefox/151.0','2026-06-01 08:56:36'),(70,8,NULL,'127.0.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:151.0) Gecko/20100101 Firefox/151.0','2026-06-01 08:56:54'),(71,8,NULL,'127.0.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:151.0) Gecko/20100101 Firefox/151.0','2026-06-01 08:56:54'),(72,8,NULL,'127.0.0.1','Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/148.0.0.0 Mobile Safari/537.36','2026-06-01 08:57:07'),(73,8,NULL,'127.0.0.1','Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/148.0.0.0 Mobile Safari/537.36','2026-06-01 08:57:08'),(74,8,NULL,'127.0.0.1','Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/148.0.0.0 Mobile Safari/537.36','2026-06-01 08:57:25'),(75,8,NULL,'127.0.0.1','Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/148.0.0.0 Mobile Safari/537.36','2026-06-01 08:57:25'),(76,1,NULL,'127.0.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:151.0) Gecko/20100101 Firefox/151.0','2026-06-01 09:21:49'),(77,1,NULL,'127.0.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:151.0) Gecko/20100101 Firefox/151.0','2026-06-01 09:21:49'),(78,1,NULL,'127.0.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:151.0) Gecko/20100101 Firefox/151.0','2026-06-01 09:22:58'),(79,1,NULL,'127.0.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:151.0) Gecko/20100101 Firefox/151.0','2026-06-01 09:22:58');
/*!40000 ALTER TABLE `views` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-06-01 19:15:50
