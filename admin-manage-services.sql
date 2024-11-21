-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Nov 21, 2024 at 07:47 PM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `admin-manage-services`
--
CREATE DATABASE IF NOT EXISTS `admin-manage-services` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `admin-manage-services`;

-- --------------------------------------------------------

--
-- Table structure for table `services`
--

DROP TABLE IF EXISTS `services`;
CREATE TABLE IF NOT EXISTS `services` (
  `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT,
  `service_name` varchar(250) NOT NULL,
  `description` text NOT NULL,
  `default_price` int(10) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=39 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `services`
--

INSERT INTO `services` (`id`, `service_name`, `description`, `default_price`) VALUES
(1, 'First Service - Tutoring', 'Our first service is tailored for kids from 6 to 18 years old. It supports students who need extra help with their studies. We offer private tutoring services. Prices vary by age:', 30),
(2, 'Second service - Cleaning', 'Our cleaning service is ideal for clients seeking professional, thorough, and reliable cleaning solutions. We offer tailored packages to meet your specific needs, ensuring a spotless environment. This premium service costs', 200),
(3, 'Third Service - Pet Grooming', 'Our pet grooming service ensures your furry friends look and feel their best. We offer comprehensive grooming services including bathing, haircuts, and nail trimming. Prices vary based on the size of your dog:', 30),
(4, 'Other Service - Private Trainer', 'Our private training service offers personalized fitness coaching tailored to your individual goals. Whether you’re looking to improve your strength, endurance, or overall health, our trainers are here to guide you.\r\nMeet Our Trainers:\r\nCoach Sarah Thompson - Zumba & Cardio Specialist\r\nCoach Michael Scoot - Strength & Conditioning Expert\r\nCoach Melissa Rivera - Yoga & Flexibility Coach\r\nCoach David King - HIIT & Weight Loss Specialist', 35),
(5, 'Last Service - Stylist', 'Our stylist service offers expert advice and assistance in makeup, hair and clothing selection for special events. Whether you’re preparing for a wedding, party, or business event, our professional stylists will help you look your best. This service is budget-friendly.', 175),
(6, 'New Name', 'Updated Description', 150),
(7, 'Sample Service', 'This is a sample service description.', 50),
(8, 'Sample Service', 'This is a sample service description.', 50),
(9, 'Sample Service', 'This is a sample service description.', 50),
(10, 'Sample Service', 'This is a sample service description.', 50),
(11, 'Sample Service', 'This is a sample service description.', 50),
(12, 'Sample Service', 'This is a sample service description.', 50),
(13, 'Sample Service', 'This is a sample service description.', 50),
(14, 'Sample Service', 'This is a sample service description.', 50),
(15, 'Sample Service', 'This is a sample service description.', 50),
(16, 'Sample Service', 'This is a sample service description.', 50),
(17, 'Sample Service', 'This is a sample service description.', 50),
(18, 'Sample Service', 'This is a sample service description.', 50),
(19, 'Sample Service', 'This is a sample service description.', 50),
(21, 'Sample Service', 'This is a sample service description.', 50),
(22, 'Sample Service', 'This is a sample service description.', 50),
(23, 'Sample Service', 'This is a sample service description.', 50),
(24, 'Sample Service NUMBER 2', 'This is a sample service description.', 50),
(25, 'Sample Service NUMBER 2', 'This is a sample service description.', 50),
(26, 'Sample Service NUMBER 2', 'This is a sample service description.', 50),
(27, 'Sample Service NUMBER 2', 'This is a sample service description.', 50),
(28, 'Sample Service NUMBER 2', 'This is a sample service description.', 50),
(29, 'Sample Service NUMBER 2', 'This is a sample service description.', 50),
(30, 'Tutoring', 'Private lessons for kids', 100),
(31, 'Tutoring', 'Private lessons for kids', 120),
(32, 'THi', 'Private lessons for kids', 120),
(33, 'New Service', 'Private lessons for kids', 120),
(34, 'New Service', 'Private lessons for kids', 120),
(36, 'New Service', 'Private lessons for kids', 120),
(37, 'New344 Service', 'Private lessons for kids', 500),
(38, 'New344 Service', 'Private lessons for kids', 500);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
