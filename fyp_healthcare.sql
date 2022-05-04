-- phpMyAdmin SQL Dump
-- version 5.1.3
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: May 02, 2022 at 10:59 AM
-- Server version: 10.4.24-MariaDB
-- PHP Version: 7.4.29

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `fyp_healthcare`
--

-- --------------------------------------------------------

--
-- Table structure for table `authorize_hospital`
--

CREATE TABLE `authorize_hospital` (
  `id` int(11) NOT NULL,
  `hospital_id` int(11) NOT NULL,
  `patient_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `authorize_hospital`
--

INSERT INTO `authorize_hospital` (`id`, `hospital_id`, `patient_id`) VALUES
(1, 1, 4),
(2, 2, 4),
(3, 3, 4);

-- --------------------------------------------------------

--
-- Table structure for table `heartRate`
--

CREATE TABLE `heartRate` (
  `id` int(100) NOT NULL,
  `heartRate` int(100) NOT NULL,
  `patient_id` int(100) NOT NULL,
  `datetime` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `heartRate`
--

INSERT INTO `heartRate` (`id`, `heartRate`, `patient_id`, `datetime`) VALUES
(1, 3424, 4, '23:23'),
(2, 23424, 4, '11:23'),
(3, 1233, 4, '11:23'),
(4, 1134, 4, '12:23');

-- --------------------------------------------------------

--
-- Table structure for table `hospital`
--

CREATE TABLE `hospital` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `region_id` int(11) NOT NULL,
  `address` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `hospital`
--

INSERT INTO `hospital` (`id`, `name`, `region_id`, `address`) VALUES
(1, 'Tung Wah Hospital', 1, '12 Po Yan Street, Sheung Wan, Hong Kong Island, Hong Kong'),
(2, 'Tung Wah Group of Hospitals Fung Yiu King Hospital', 1, '9 Sandy Bay Road, Pok Fu Lam, Hong Kong Island, Hong Kong'),
(3, 'Tsan Yuk Hospital', 1, '30 Hospital Road, Sai Ying Pun, Hong Kong'),
(4, 'The Duchess of Kent Children\'s Hospital at Sandy Bay', 1, '12 Sandy Bay Road, Pok Fu Lam, Hong Kong Island, Hong Kong'),
(5, 'Queen Mary Hospital (Hong Kong)', 1, '102 Pok Fu Lam Road, Pok Fu Lam, Hong Kong Island, Hong Kong'),
(6, 'MacLehose Medical Rehabilitation Centre', 1, '7 Sha Wan Drive, Pok Fu Lam, Hong Kong Island, Hong Kong'),
(7, 'Grantham Hospital', 1, '125 Wong Chuk Hang Road, Aberdeen, Hong Kong Island, Hong Kong'),
(8, 'Tung Wah Eastern Hospital', 1, '19 Eastern Hospital Road, Causeway Bay, Hong Kong Island, Hong Kong'),
(9, 'Tang Shiu Kin Hospital', 2, '282 Queen\'s Road East, Wan Chai, Hong Kong Island, Hong Kong'),
(10, 'St. John Hospital', 2, 'Cheung Chau Hospital Road, Tung Wan, Cheung Chau, Hong Kong'),
(11, 'Ruttonjee Hospital', 2, '266 Queen\'s Road East, Wan Chai, Hong Kong Island, Hong Kong'),
(12, 'Pamela Youde Nethersole Eastern Hospital', 2, '3 Lok Man Road, Chai Wan, Hong Kong Island, Hong Kong'),
(13, 'Cheshire Home, Chung Hom Kok', 2, '128 Chung Hom Kok Road, Chung Hom Kok, Hong Kong'),
(14, 'Queen Elizabeth Hospital, Hong Kong', 3, '30 Gascoigne Road, King\'s Park, Kowloon, Hong Kong'),
(15, 'Tung Wah Group of Hospitals Wong Tai Sin Hospital', 3, '124 Shatin Pass Road, Wong Tai Sin, Hong Kong'),
(16, 'Our Lady of Maryknoll Hospital', 3, '118 Shatin Pass Road, Wong Tai Sin, Hong Kong'),
(17, 'Kwong Wah Hospital', 3, '25 Waterloo Road, Yau Ma Tei, Hong Kong'),
(18, 'Kowloon Hospital', 3, '147A Argyle Street, Kowloon City District, Kowloon, Hong Kong'),
(19, 'Hong Kong Eye Hospital', 3, '147K Argyle Street, Kowloon City District, Kowloon, Hong Kong'),
(20, 'Hong Kong Children\'s Hospital', 3, 'Kai Tak Development Area, Kowloon, Hong Kong'),
(21, 'Hong Kong Buddhist Hospital', 3, '10 Heng Lam Street, Lok Fu, Hong Kong'),
(22, 'Yan Chai Hospital', 4, '7-11 Yan Chai Street, Tsuen Wan, Hong Kong'),
(23, 'Princess Margaret Hospital (Hong Kong)', 4, '2-10 Princess Margaret Hospital Road, Kwai Chung, Hong Kong'),
(24, 'North Lantau Hospital', 4, '8 Chung Yan Road, Tung Chung, Lantau, Hong Kong'),
(25, 'Kwai Chung Hospital', 4, '3-15 Kwai Chung Hospital Road, Kwai Chung, Hong Kong'),
(26, 'Caritas Medical Centre', 4, '111 Wing Hong Street, Cheung Sha Wan, Kowloon, Hong Kong'),
(27, 'Haven of Hope Hospital', 5, '8 Haven of Hope Road, Tseung Kwan O, Hong Kong'),
(28, 'Tseung Kwan O Hospital', 5, '2 Po Ning Lane, Hang Hau, Tseung Kwan O, Hong Kong'),
(29, 'United Christian Hospital', 5, '130 Hip Wo Street, Kwun Tong, Kowloon, Hong Kong'),
(30, 'Tai Po Hospital', 6, '9 Chuen On Road, Tai Po, Hong Kong'),
(31, 'Shatin Hospital', 6, '33 A Kung Kok Street, Sha Tin, New Territories, Hong Kong'),
(32, 'Prince of Wales Hospital', 6, '30-32 Ngan Shing Street, Sha Tin, New Territories, Hong Kong'),
(33, 'North District Hospital', 6, '9 Po Kin Road, Sheung Shui, Hong Kong'),
(34, 'Bradbury Hospice', 6, '17 A Kung Kok Shan Road, Sha Tin, Hong Kong'),
(35, 'Alice Ho Miu Ling Nethersole Hospital', 6, '11 Chuen On Road, Tai Po, New Territories, Hong Kong'),
(36, 'Tuen Mun Hospital', 7, '23 Tsing Chung Koon Road, Tuen Mun, New Territories, Hong Kong, Tuen Mun, Hong Kong'),
(37, 'Tin Shui Wai Hospital', 7, '11 Tin Tan Street, Tin Shui Wai, New Territories, Hong Kong'),
(38, 'Siu Lam Hospital', 7, '15 Tsing Chung Koon Road, Tuen Mun, Hong Kong'),
(39, 'Pok Oi Hospital', 7, 'Au Tau, Yuen Long, New Territories, Hong Kong'),
(40, 'Castle Peak Hospital', 7, '15 Tsing Chung Koon Road, Tuen Mun, New Territories, Hong Kong');

-- --------------------------------------------------------

--
-- Table structure for table `hospital_doctor`
--

CREATE TABLE `hospital_doctor` (
  `id` int(11) NOT NULL,
  `hospital_id` int(11) NOT NULL,
  `doctor_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `hospital_doctor`
--

INSERT INTO `hospital_doctor` (`id`, `hospital_id`, `doctor_id`) VALUES
(1, 1, 2);

-- --------------------------------------------------------

--
-- Table structure for table `region`
--

CREATE TABLE `region` (
  `id` int(11) NOT NULL,
  `region` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `region`
--

INSERT INTO `region` (`id`, `region`) VALUES
(1, 'Hong Kong West Cluster'),
(2, 'Hong Kong East Cluster'),
(3, 'Kowloon Central Cluster'),
(4, 'Kowloon West Cluster'),
(5, 'Kowloon East Cluster'),
(6, 'New Territories East Cluster'),
(7, 'New Territories West Cluster');

-- --------------------------------------------------------

--
-- Table structure for table `stepscount`
--

CREATE TABLE `stepscount` (
  `id` int(11) NOT NULL,
  `patient_id` int(100) NOT NULL,
  `date` varchar(100) NOT NULL,
  `stepscount` int(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `stepscount`
--

INSERT INTO `stepscount` (`id`, `patient_id`, `date`, `stepscount`) VALUES
(1, 3, '2022-05-01', 3432),
(2, 3, '2022-05-02', 3244),
(3, 4, '2022-05-01', 34242),
(4, 4, '2022-05-02', 34242),
(5, 4, '2022-05-03', 34556),
(6, 4, '2022-05-04', 231313);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `gender` varchar(10) NOT NULL,
  `phone` int(100) NOT NULL,
  `type` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `gender`, `phone`, `type`, `email`, `password`) VALUES
(1, 'admin', 'f', 23457654, 'admin', 'admin@gmail.com', 'admin'),
(2, 'doctor', 'f', 23541798, 'doctor', 'doctor@yahoo.com', 'doctor'),
(3, 'user', 'f', 43658909, 'patient', 'user@gmail.com', 'user'),
(4, 'patient', 'm', 43256787, 'patient', 'patient@outlook.com', 'patient');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `authorize_hospital`
--
ALTER TABLE `authorize_hospital`
  ADD PRIMARY KEY (`id`),
  ADD KEY `authorize_hospital_connect_id` (`hospital_id`),
  ADD KEY `authorize_patient_connect_id` (`patient_id`);

--
-- Indexes for table `heartRate`
--
ALTER TABLE `heartRate`
  ADD PRIMARY KEY (`id`),
  ADD KEY `heart_user` (`patient_id`);

--
-- Indexes for table `hospital`
--
ALTER TABLE `hospital`
  ADD PRIMARY KEY (`id`),
  ADD KEY `hospital_region_connect_id` (`region_id`);

--
-- Indexes for table `hospital_doctor`
--
ALTER TABLE `hospital_doctor`
  ADD PRIMARY KEY (`id`),
  ADD KEY `doctor_hospital_connect_id` (`hospital_id`),
  ADD KEY `hospital_doctor_connect_id` (`doctor_id`);

--
-- Indexes for table `region`
--
ALTER TABLE `region`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `stepscount`
--
ALTER TABLE `stepscount`
  ADD PRIMARY KEY (`id`),
  ADD KEY `patient_id_stepcount` (`patient_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `authorize_hospital`
--
ALTER TABLE `authorize_hospital`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `heartRate`
--
ALTER TABLE `heartRate`
  MODIFY `id` int(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `hospital`
--
ALTER TABLE `hospital`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=41;

--
-- AUTO_INCREMENT for table `hospital_doctor`
--
ALTER TABLE `hospital_doctor`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `region`
--
ALTER TABLE `region`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `stepscount`
--
ALTER TABLE `stepscount`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `authorize_hospital`
--
ALTER TABLE `authorize_hospital`
  ADD CONSTRAINT `authorize_hospital_connect_id` FOREIGN KEY (`hospital_id`) REFERENCES `hospital` (`id`),
  ADD CONSTRAINT `authorize_patient_connect_id` FOREIGN KEY (`patient_id`) REFERENCES `users` (`id`);

--
-- Constraints for table `heartRate`
--
ALTER TABLE `heartRate`
  ADD CONSTRAINT `heart_user` FOREIGN KEY (`patient_id`) REFERENCES `users` (`id`);

--
-- Constraints for table `hospital`
--
ALTER TABLE `hospital`
  ADD CONSTRAINT `hospital_region_connect_id` FOREIGN KEY (`region_id`) REFERENCES `region` (`id`);

--
-- Constraints for table `hospital_doctor`
--
ALTER TABLE `hospital_doctor`
  ADD CONSTRAINT `doctor_hospital_connect_id` FOREIGN KEY (`hospital_id`) REFERENCES `hospital` (`id`),
  ADD CONSTRAINT `hospital_doctor_connect_id` FOREIGN KEY (`doctor_id`) REFERENCES `users` (`id`);

--
-- Constraints for table `stepscount`
--
ALTER TABLE `stepscount`
  ADD CONSTRAINT `patient_id_stepcount` FOREIGN KEY (`patient_id`) REFERENCES `users` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
