-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Nov 27, 2024 at 06:35 PM
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
-- Database: `service_hub_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `Admins`
--

CREATE TABLE `Admins` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `Admins`
--

INSERT INTO `Admins` (`id`, `name`, `email`, `password`) VALUES
(1, 'admin', 'admin@email.com', 'password'),
(2, 'admin2', 'admin2@email.com', 'password2');

-- --------------------------------------------------------

--
-- Table structure for table `Bills`
--

CREATE TABLE `Bills` (
  `id` int(11) NOT NULL,
  `service_request_id` int(11) NOT NULL,
  `client_id` int(11) NOT NULL,
  `amount` decimal(10,2) NOT NULL,
  `STATUS` enum('unpaid','paid') DEFAULT 'unpaid',
  `DATE` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `Bills`
--

INSERT INTO `Bills` (`id`, `service_request_id`, `client_id`, `amount`, `STATUS`, `DATE`) VALUES
(1234567, 345810351, 1, 40.00, 'unpaid', '2025-01-04'),
(1234568, 345810352, 1, 200.00, 'paid', '2024-11-30'),
(1234569, 345810353, 1, 50.00, 'paid', '2025-01-18'),
(1234570, 345810354, 1, 35.00, 'unpaid', '2025-02-08'),
(1234571, 345810355, 2, 175.00, 'unpaid', '2025-01-01');

-- --------------------------------------------------------

--
-- Table structure for table `BusinessSettings`
--

CREATE TABLE `BusinessSettings` (
  `id` int(11) NOT NULL,
  `company_name` varchar(255) NOT NULL,
  `logo` varchar(255) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `phone` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `BusinessSettings`
--

INSERT INTO `BusinessSettings` (`id`, `company_name`, `logo`, `address`, `email`, `phone`) VALUES
(1, 'Company Name', '/uploads/1732418636949-49163177.png', '222 Maplewood Street, H5H 1A8, Montreal, Q', 'email@servicehub.ca', '+1(456)123-1117');

-- --------------------------------------------------------

--
-- Table structure for table `Clients`
--

CREATE TABLE `Clients` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `phone` bigint(20) NOT NULL,
  `password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `Clients`
--

INSERT INTO `Clients` (`id`, `name`, `email`, `phone`, `password`) VALUES
(1, 'John', 'johndoe@gmail.com', 5141234567, 'password123!'),
(2, 'Violet', 'violetsteveland@hotmail.com', 4389876543, 'bookcase451<');

-- --------------------------------------------------------

--
-- Table structure for table `ServiceRequests`
--

CREATE TABLE `ServiceRequests` (
  `id` int(11) NOT NULL,
  `client_id` int(11) NOT NULL,
  `service_id` int(11) NOT NULL,
  `status` enum('Pending','Completed','Booked') DEFAULT 'Pending',
  `date` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `ServiceRequests`
--

INSERT INTO `ServiceRequests` (`id`, `client_id`, `service_id`, `status`, `date`) VALUES
(345810351, 1, 1, 'Pending', '2025-01-04'),
(345810352, 1, 2, 'Pending', '2024-11-30'),
(345810353, 1, 3, 'Completed', '2025-01-18'),
(345810354, 1, 4, 'Completed', '2025-02-08'),
(345810355, 2, 5, 'Pending', '2025-01-01');

-- --------------------------------------------------------

--
-- Table structure for table `Services`
--

CREATE TABLE `Services` (
  `id` int(11) NOT NULL,
  `service_name` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `default_price` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `Services`
--

INSERT INTO `Services` (`id`, `service_name`, `description`, `default_price`) VALUES
(1, 'First Service - Tutoring', 'Our first service is tailored for kids from 6 to 18 years old. It supports students who need extra help with their studies. We offer private tutoring services with flexible pricing based on age.', 40),
(2, 'Second Service - Cleaning', 'Our cleaning service is ideal for clients seeking professional, thorough, and reliable cleaning solutions. This premium service ensures a spotless environment.', 200),
(3, 'Third Service - Pet Grooming', 'Our pet grooming service ensures your furry friends look and feel their best. We offer comprehensive grooming services including bathing, haircuts, and nail trimming.', 50),
(4, 'Other Service - Private Trainer', 'Our private training service offers personalized fitness coaching tailored to your individual goals. Whether you’re looking to improve your strength, endurance, or overall health, our trainers are here to guide you.', 35),
(5, 'Last Service - Stylist', 'Our stylist service offers expert advice and assistance in makeup, hair, and clothing selection for special events. Whether you’re preparing for a wedding, party, or business event, our professional stylists will help you look your best.', 175);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `Admins`
--
ALTER TABLE `Admins`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `Bills`
--
ALTER TABLE `Bills`
  ADD PRIMARY KEY (`id`),
  ADD KEY `service_request_id` (`service_request_id`),
  ADD KEY `client_id` (`client_id`);

--
-- Indexes for table `Clients`
--
ALTER TABLE `Clients`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD UNIQUE KEY `phone` (`phone`);

--
-- Indexes for table `ServiceRequests`
--
ALTER TABLE `ServiceRequests`
  ADD PRIMARY KEY (`id`),
  ADD KEY `client_id` (`client_id`),
  ADD KEY `service_id` (`service_id`);

--
-- Indexes for table `Services`
--
ALTER TABLE `Services`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `Admins`
--
ALTER TABLE `Admins`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `Bills`
--
ALTER TABLE `Bills`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1234572;

--
-- AUTO_INCREMENT for table `Clients`
--
ALTER TABLE `Clients`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `ServiceRequests`
--
ALTER TABLE `ServiceRequests`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=345810356;

--
-- AUTO_INCREMENT for table `Services`
--
ALTER TABLE `Services`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `Bills`
--
ALTER TABLE `Bills`
  ADD CONSTRAINT `bills_ibfk_1` FOREIGN KEY (`service_request_id`) REFERENCES `ServiceRequests` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `bills_ibfk_2` FOREIGN KEY (`client_id`) REFERENCES `Clients` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `ServiceRequests`
--
ALTER TABLE `ServiceRequests`
  ADD CONSTRAINT `servicerequests_ibfk_1` FOREIGN KEY (`client_id`) REFERENCES `Clients` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `servicerequests_ibfk_2` FOREIGN KEY (`service_id`) REFERENCES `Services` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
