-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Dec 24, 2021 at 11:12 AM
-- Server version: 10.4.22-MariaDB
-- PHP Version: 7.4.26

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `shopify_customsessionstorage_mysql2`
--

-- --------------------------------------------------------

--
-- Table structure for table `shopify_billings`
--

CREATE TABLE `shopify_billings` (
  `id` int(10) UNSIGNED NOT NULL,
  `chargeId` text NOT NULL,
  `shop` text NOT NULL,
  `gid` text NOT NULL,
  `status` text NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT current_timestamp(),
  `updatedAt` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `shopify_session_storage`
--

CREATE TABLE `shopify_session_storage` (
  `id` int(10) UNSIGNED NOT NULL,
  `sessionId` text DEFAULT NULL,
  `shopId` text DEFAULT NULL,
  `shop` text DEFAULT NULL,
  `state` text DEFAULT NULL,
  `scope` text DEFAULT NULL,
  `expires` text DEFAULT NULL,
  `isOnline` text DEFAULT NULL,
  `accessToken` text DEFAULT NULL,
  `onlineAccessInfo` text DEFAULT NULL,
  `createdAt` datetime NOT NULL DEFAULT current_timestamp(),
  `updatedAt` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `shopify_billings`
--
ALTER TABLE `shopify_billings`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `shop` (`shop`) USING HASH;

--
-- Indexes for table `shopify_session_storage`
--
ALTER TABLE `shopify_session_storage`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `shop` (`shop`) USING HASH;

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `shopify_billings`
--
ALTER TABLE `shopify_billings`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `shopify_session_storage`
--
ALTER TABLE `shopify_session_storage`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
