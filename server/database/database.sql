-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Dec 27, 2021 at 02:03 PM
-- Server version: 10.4.21-MariaDB
-- PHP Version: 8.0.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `module`
--

-- --------------------------------------------------------

--
-- Table structure for table `add_template`
--

CREATE TABLE `add_template` (
  `id` int(11) NOT NULL,
  `form_name` varchar(255) NOT NULL,
  `input_type` varchar(255) NOT NULL,
  `input_name` varchar(255) NOT NULL,
  `input_value` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `add_template`
--

INSERT INTO `add_template` (`id`, `form_name`, `input_type`, `input_name`, `input_value`) VALUES
(1, 'Test form', 'checkbox', 'edu', '');

-- --------------------------------------------------------

--
-- Table structure for table `tai_city_masters`
--

CREATE TABLE `tai_city_masters` (
  `id` int(10) NOT NULL,
  `state_id` int(10) NOT NULL,
  `city` varchar(255) NOT NULL,
  `city_m` varchar(255) NOT NULL,
  `remark` varchar(200) NOT NULL,
  `is_active` int(11) NOT NULL,
  `inserted_by` int(11) NOT NULL,
  `lastupdated_by` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `tai_city_masters`
--

INSERT INTO `tai_city_masters` (`id`, `state_id`, `city`, `city_m`, `remark`, `is_active`, `inserted_by`, `lastupdated_by`, `created_at`, `updated_at`) VALUES
(1, 1, 'Pune', 'test', 'test', 1, 1, 1, '2021-12-22 09:04:22', '0000-00-00 00:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `tai_communication_detail`
--

CREATE TABLE `tai_communication_detail` (
  `id` int(11) NOT NULL,
  `tenant_id` int(11) DEFAULT NULL,
  `scheduled_dt` varchar(255) DEFAULT NULL,
  `sender` varchar(255) DEFAULT NULL,
  `receiver` varchar(255) DEFAULT NULL,
  `communication_type` char(255) DEFAULT NULL,
  `subject` varchar(255) DEFAULT NULL,
  `body` varchar(255) DEFAULT NULL,
  `attachment` varchar(255) DEFAULT NULL,
  `delivery_status` char(255) DEFAULT NULL,
  `no_of_attempts` int(11) DEFAULT NULL,
  `response` varchar(255) DEFAULT NULL,
  `source` varchar(255) DEFAULT NULL,
  `remark` varchar(255) DEFAULT NULL,
  `created_by` int(11) DEFAULT NULL,
  `created_at` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `tai_country_masters`
--

CREATE TABLE `tai_country_masters` (
  `id` int(10) NOT NULL,
  `country` varchar(255) NOT NULL,
  `country_m` varchar(255) DEFAULT NULL,
  `remark` varchar(200) DEFAULT NULL,
  `is_active` varchar(11) DEFAULT NULL,
  `inserted_by` int(11) NOT NULL,
  `lastupdated_by` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `tai_country_masters`
--

INSERT INTO `tai_country_masters` (`id`, `country`, `country_m`, `remark`, `is_active`, `inserted_by`, `lastupdated_by`, `created_at`, `updated_at`) VALUES
(4, 'Japan', NULL, NULL, NULL, 1, 1, '2021-12-22 09:40:34', '0000-00-00 00:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `tai_customer_master`
--

CREATE TABLE `tai_customer_master` (
  `id` bigint(20) NOT NULL,
  `tenant_id` int(11) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `customer_type` varchar(255) DEFAULT NULL,
  `contact_no` varchar(255) DEFAULT NULL,
  `email_id` varchar(255) DEFAULT NULL,
  `whatsapp_contact_no` varchar(255) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `city_id` int(11) DEFAULT NULL,
  `state_id` int(11) DEFAULT NULL,
  `country_id` int(11) DEFAULT NULL,
  `pincode` varchar(255) DEFAULT NULL,
  `remark` varchar(255) DEFAULT NULL,
  `is_active` int(11) DEFAULT NULL,
  `created_by` int(11) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_by` int(11) DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `tai_customer_master`
--

INSERT INTO `tai_customer_master` (`id`, `tenant_id`, `name`, `customer_type`, `contact_no`, `email_id`, `whatsapp_contact_no`, `address`, `city_id`, `state_id`, `country_id`, `pincode`, `remark`, `is_active`, `created_by`, `created_at`, `updated_by`, `updated_at`) VALUES
(1, NULL, 'Review Setting', NULL, '7854965874', 'demo@demo.com', '1234567890', '', NULL, NULL, NULL, '411020', NULL, NULL, NULL, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `tai_department_master`
--

CREATE TABLE `tai_department_master` (
  `id` bigint(20) NOT NULL,
  `tenant_id` int(11) DEFAULT NULL,
  `designation` varchar(255) DEFAULT NULL,
  `department` varchar(255) DEFAULT NULL,
  `is_active` int(11) DEFAULT NULL,
  `created_by` int(11) DEFAULT NULL,
  `created_at` varchar(255) DEFAULT NULL,
  `updated_by` int(11) DEFAULT NULL,
  `updated_at` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `tai_designation_master`
--

CREATE TABLE `tai_designation_master` (
  `id` bigint(20) NOT NULL,
  `tenant_id` int(11) DEFAULT NULL,
  `designation` varchar(255) DEFAULT NULL,
  `remark` varchar(255) DEFAULT NULL,
  `is_active` int(11) DEFAULT NULL,
  `created_by` int(11) DEFAULT NULL,
  `created_at` varchar(255) DEFAULT NULL,
  `updated_by` int(11) DEFAULT NULL,
  `updated_at` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `tai_employee_master`
--

CREATE TABLE `tai_employee_master` (
  `id` int(11) NOT NULL,
  `employee_id` int(11) DEFAULT NULL,
  `tenant_id` int(11) DEFAULT NULL,
  `first_name` varchar(255) DEFAULT NULL,
  `middle_name` varchar(255) DEFAULT NULL,
  `last_name` varchar(255) DEFAULT NULL,
  `email_id` varchar(255) DEFAULT NULL,
  `whatsapp_contact_no` int(11) DEFAULT NULL,
  `contact_no` varchar(255) DEFAULT NULL,
  `department_id` int(11) DEFAULT NULL,
  `designation_id` int(11) DEFAULT NULL,
  `gender` char(255) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `city_id` int(11) DEFAULT NULL,
  `state_id` int(11) DEFAULT NULL,
  `country_id` int(11) DEFAULT NULL,
  `pincode` varchar(255) DEFAULT NULL,
  `profile_picture` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `remark` varchar(255) DEFAULT NULL,
  `is_active` varchar(255) DEFAULT NULL,
  `created_by` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `tai_employee_master`
--

INSERT INTO `tai_employee_master` (`id`, `employee_id`, `tenant_id`, `first_name`, `middle_name`, `last_name`, `email_id`, `whatsapp_contact_no`, `contact_no`, `department_id`, `designation_id`, `gender`, `address`, `city_id`, `state_id`, `country_id`, `pincode`, `profile_picture`, `password`, `remark`, `is_active`, `created_by`) VALUES
(5, 8, 2, 'aarti', 'rahul', 'kagde', 'aarti123@gmail.com', 70587, '7058776649', 1, 1, 'asdf', 'asdfghj', 2, 9, 2, '411041', 'asdfg', '123456', 'asdf', '1', 2);

-- --------------------------------------------------------

--
-- Table structure for table `tai_menu_master`
--

CREATE TABLE `tai_menu_master` (
  `id` bigint(20) DEFAULT NULL,
  `tenant_id` int(255) DEFAULT NULL,
  `menu_name` varchar(255) DEFAULT NULL,
  `menu_type` varchar(255) DEFAULT NULL,
  `icon` varchar(255) DEFAULT NULL,
  `color` varchar(255) DEFAULT NULL,
  `sort_order` int(11) DEFAULT NULL,
  `parent_id` int(11) DEFAULT NULL,
  `remark` varchar(255) DEFAULT NULL,
  `is_active` int(11) DEFAULT NULL,
  `created_by` int(11) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_by` int(11) DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `tai_menu_role_mapping`
--

CREATE TABLE `tai_menu_role_mapping` (
  `id` bigint(20) DEFAULT NULL,
  `tenant_id` int(11) DEFAULT NULL,
  `role_id` int(11) DEFAULT NULL,
  `menu_id` int(11) DEFAULT NULL,
  `can_create` enum('Y','N') DEFAULT NULL,
  `can_read` enum('Y','N') DEFAULT NULL,
  `can_update` enum('Y','N') DEFAULT NULL,
  `can_delete` enum('Y','N') DEFAULT NULL,
  `can_print` enum('Y','N') DEFAULT NULL,
  `can_export` enum('Y','N') DEFAULT NULL,
  `remark` varchar(255) DEFAULT NULL,
  `is_active` int(11) DEFAULT NULL,
  `created_by` int(11) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_by` int(11) DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `tai_modules`
--

CREATE TABLE `tai_modules` (
  `id` int(11) NOT NULL,
  `module_name` varchar(255) NOT NULL,
  `url` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `tai_modules`
--

INSERT INTO `tai_modules` (`id`, `module_name`, `url`) VALUES
(1, 'Department Master', 'DepartmentMaster'),
(2, 'Create Form', 'CreateForm'),
(3, 'Designation Master', 'DesignationMaster'),
(4, 'User Master', 'UserMaster'),
(5, 'Status Master', 'StatusMaster'),
(6, 'Role Master', 'RoleMaster'),
(7, 'Employee Master', 'Employee Master'),
(8, 'Communication Master', 'CommunicationMaster'),
(9, 'Country Master', 'CountryMaster'),
(10, 'Customer Master', 'CustomerMaster'),
(11, 'Menu Master', 'MenuMaster'),
(12, 'City Master', 'CityMaster'),
(13, 'Tenant Master', 'TenantMaster'),
(14, 'Ticket Master', 'TicketMaster'),
(15, 'State Master', 'StateMaster');

-- --------------------------------------------------------

--
-- Table structure for table `tai_role_master`
--

CREATE TABLE `tai_role_master` (
  `id` bigint(20) NOT NULL,
  `tenant_id` int(11) DEFAULT NULL,
  `rolename` varchar(255) NOT NULL,
  `remark` varchar(255) DEFAULT NULL,
  `is_active` int(11) NOT NULL DEFAULT 1,
  `created_by` int(11) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_by` int(11) NOT NULL,
  `updated_at` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `tai_role_masters`
--

CREATE TABLE `tai_role_masters` (
  `id` int(11) NOT NULL,
  `tenant_id` varchar(255) NOT NULL,
  `rolename` varchar(255) NOT NULL,
  `remark` varchar(255) NOT NULL,
  `is_active` varchar(255) NOT NULL,
  `created_by` varchar(255) NOT NULL,
  `updated_by` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `tai_session`
--

CREATE TABLE `tai_session` (
  `id` bigint(20) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `tenant_id` int(11) DEFAULT NULL,
  `session` varchar(255) DEFAULT NULL,
  `is_expired` char(255) DEFAULT NULL,
  `device_detail` varchar(255) DEFAULT NULL,
  `ip_address` varchar(255) DEFAULT NULL,
  `created_by` int(11) DEFAULT NULL,
  `created_at` varchar(255) DEFAULT NULL,
  `updated_by` int(11) DEFAULT NULL,
  `updated_at` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `tai_session`
--

INSERT INTO `tai_session` (`id`, `user_id`, `tenant_id`, `session`, `is_expired`, `device_detail`, `ip_address`, `created_by`, `created_at`, `updated_by`, `updated_at`) VALUES
(1, 1, 1, 'asdfghj', 'asdfg', 'asdfg', '1254566', 45, 'asdfgh', 52, 'asdfgh');

-- --------------------------------------------------------

--
-- Table structure for table `tai_setting_detail`
--

CREATE TABLE `tai_setting_detail` (
  `id` int(11) DEFAULT NULL,
  `setting_id` int(11) DEFAULT NULL,
  `setting_value` varchar(255) DEFAULT NULL,
  `remark` varchar(255) DEFAULT NULL,
  `is_active` char(255) DEFAULT NULL,
  `created_by` int(11) DEFAULT NULL,
  `created_at` varchar(255) DEFAULT NULL,
  `updated_by` int(11) DEFAULT NULL,
  `updated_at` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `tai_setting_master`
--

CREATE TABLE `tai_setting_master` (
  `id` int(11) DEFAULT NULL,
  `tenant_id` int(11) DEFAULT NULL,
  `setting_group_id` int(11) DEFAULT NULL,
  `sort_order` int(11) DEFAULT NULL,
  `default_value` varchar(255) DEFAULT NULL,
  `allow_value` varchar(255) DEFAULT NULL,
  `remark` varchar(255) DEFAULT NULL,
  `is_active` char(255) DEFAULT NULL,
  `created_by` int(11) DEFAULT NULL,
  `created_at` varchar(255) DEFAULT NULL,
  `updated_by` int(11) DEFAULT NULL,
  `updated_at` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `tai_special_auth_master`
--

CREATE TABLE `tai_special_auth_master` (
  `id` int(10) NOT NULL,
  `special_auth` varchar(255) NOT NULL,
  `auth_name` varchar(255) NOT NULL,
  `auth_key` varchar(20) NOT NULL,
  `module_name` varchar(255) NOT NULL,
  `remark` varchar(255) NOT NULL,
  `is_active` varchar(3) NOT NULL,
  `inserted_by` int(11) NOT NULL,
  `lastupdated_by` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `tai_stage_master`
--

CREATE TABLE `tai_stage_master` (
  `id` int(10) NOT NULL,
  `stage_name` varchar(255) NOT NULL,
  `remark` varchar(200) NOT NULL,
  `is_active` varchar(3) NOT NULL,
  `inserted_by` int(11) NOT NULL,
  `lastupdated_by` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `tai_state_masters`
--

CREATE TABLE `tai_state_masters` (
  `id` int(11) NOT NULL,
  `state` varchar(255) NOT NULL,
  `state_m` varchar(255) DEFAULT NULL,
  `country_id` int(11) NOT NULL,
  `remark` varchar(200) DEFAULT NULL,
  `is_active` varchar(11) DEFAULT NULL,
  `inserted_by` int(11) NOT NULL,
  `lastupdated_by` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `tai_state_masters`
--

INSERT INTO `tai_state_masters` (`id`, `state`, `state_m`, `country_id`, `remark`, `is_active`, `inserted_by`, `lastupdated_by`, `created_at`, `updated_at`) VALUES
(3, 'Maha', NULL, 2, NULL, NULL, 1, 1, '2021-12-22 08:52:53', '0000-00-00 00:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `tai_status_master`
--

CREATE TABLE `tai_status_master` (
  `id` bigint(20) NOT NULL,
  `tenant_id` int(11) DEFAULT NULL,
  `status` varchar(765) DEFAULT NULL,
  `remark` varchar(765) DEFAULT NULL,
  `is_active` int(11) DEFAULT NULL,
  `created_by` int(11) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_by` int(11) DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `tai_template_master `
--

CREATE TABLE `tai_template_master ` (
  `id` int(10) NOT NULL,
  `templete_name` varchar(255) NOT NULL,
  `remark` varchar(200) NOT NULL,
  `is_active` varchar(3) NOT NULL,
  `inserted_by` int(11) NOT NULL,
  `lastupdated_by` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `tai_tenant_master`
--

CREATE TABLE `tai_tenant_master` (
  `id` int(11) DEFAULT NULL,
  `tenant_id` int(11) DEFAULT NULL,
  `company_name` varchar(255) DEFAULT NULL,
  `company_type` varchar(255) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `city_id` int(11) DEFAULT NULL,
  `state_id` int(11) DEFAULT NULL,
  `country_id` int(11) DEFAULT NULL,
  `pincode` varchar(255) DEFAULT NULL,
  `company_logo` varchar(255) DEFAULT NULL,
  `valid_till` datetime DEFAULT NULL,
  `remark` varchar(255) DEFAULT NULL,
  `is_active` int(11) DEFAULT NULL,
  `created_by` int(11) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_by` int(11) DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `tai_ticket_master`
--

CREATE TABLE `tai_ticket_master` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `ticket_id` varchar(255) NOT NULL,
  `type` varchar(255) NOT NULL,
  `department_id` int(11) NOT NULL,
  `priority` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `date` datetime NOT NULL,
  `created_by` int(11) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `updated_by` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `tai_ticket_master`
--

INSERT INTO `tai_ticket_master` (`id`, `user_id`, `ticket_id`, `type`, `department_id`, `priority`, `description`, `date`, `created_by`, `created_at`, `updated_at`, `updated_by`) VALUES
(6, 1, 'T781989', 'Change', 5, 'Change', 'this is change request', '2021-12-30 00:00:00', NULL, '2021-12-22 09:22:50', '0000-00-00 00:00:00', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `tai_user_master`
--

CREATE TABLE `tai_user_master` (
  `id` bigint(20) NOT NULL,
  `customer_id` int(11) DEFAULT NULL,
  `tenant_id` int(11) DEFAULT NULL,
  `role_id` int(11) DEFAULT NULL,
  `user_name` varchar(255) DEFAULT NULL,
  `profile_picture` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `hash_key` varchar(255) DEFAULT NULL,
  `dashboard_type` enum('DARK','LIGHT') DEFAULT NULL,
  `dashboard_color` varchar(255) DEFAULT NULL,
  `view_format` char(255) DEFAULT NULL,
  `last_login` datetime DEFAULT NULL,
  `remark` varchar(255) DEFAULT NULL,
  `is_active` int(11) DEFAULT NULL,
  `created_by` int(11) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_by` int(11) DEFAULT NULL,
  `updated_at` varchar(255) DEFAULT NULL,
  `email` varchar(255) NOT NULL,
  `jwt_token` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `tai_user_master`
--

INSERT INTO `tai_user_master` (`id`, `customer_id`, `tenant_id`, `role_id`, `user_name`, `profile_picture`, `password`, `hash_key`, `dashboard_type`, `dashboard_color`, `view_format`, `last_login`, `remark`, `is_active`, `created_by`, `created_at`, `updated_by`, `updated_at`, `email`, `jwt_token`) VALUES
(1, NULL, NULL, NULL, 'demodemo', NULL, '$2a$10$C/NV3k9ftohWvKt.fzrsFeX2ruUs34JQiEp2t8kWCwuF21UWtO4LC', NULL, NULL, NULL, NULL, '2021-12-24 10:05:12', NULL, NULL, NULL, NULL, NULL, NULL, 'demo@demo.com', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImRlbW9AZGVtby5jb20iLCJpZCI6MSwiaWF0IjoxNjQwMzIwNTEyLCJleHAiOjE2NDA5MjUzMTJ9.4V0WV_qDKRrycZRFQIQ7P4sOjF5GECN3NtL0JT8oLWk'),
(2, NULL, NULL, NULL, 'demo', NULL, '$2a$10$8RdS7lY5FbpL/oQEqUximuuELFicsdVgXgAWNwXPqzJd9sfLL/QrW', NULL, NULL, NULL, NULL, '2021-11-30 11:53:07', NULL, NULL, NULL, NULL, NULL, NULL, '', '');

-- --------------------------------------------------------

--
-- Table structure for table `tai_user_setting_master`
--

CREATE TABLE `tai_user_setting_master` (
  `id` int(10) NOT NULL,
  `remark` varchar(200) NOT NULL,
  `is_active` varchar(3) NOT NULL,
  `inserted_by` int(11) NOT NULL,
  `lastupdated_by` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `add_template`
--
ALTER TABLE `add_template`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tai_city_masters`
--
ALTER TABLE `tai_city_masters`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tai_communication_detail`
--
ALTER TABLE `tai_communication_detail`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tai_country_masters`
--
ALTER TABLE `tai_country_masters`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tai_customer_master`
--
ALTER TABLE `tai_customer_master`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tai_department_master`
--
ALTER TABLE `tai_department_master`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tai_designation_master`
--
ALTER TABLE `tai_designation_master`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tai_employee_master`
--
ALTER TABLE `tai_employee_master`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tai_modules`
--
ALTER TABLE `tai_modules`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tai_role_master`
--
ALTER TABLE `tai_role_master`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tai_role_masters`
--
ALTER TABLE `tai_role_masters`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tai_state_masters`
--
ALTER TABLE `tai_state_masters`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tai_status_master`
--
ALTER TABLE `tai_status_master`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tai_ticket_master`
--
ALTER TABLE `tai_ticket_master`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tai_user_master`
--
ALTER TABLE `tai_user_master`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `add_template`
--
ALTER TABLE `add_template`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `tai_city_masters`
--
ALTER TABLE `tai_city_masters`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `tai_communication_detail`
--
ALTER TABLE `tai_communication_detail`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tai_country_masters`
--
ALTER TABLE `tai_country_masters`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `tai_customer_master`
--
ALTER TABLE `tai_customer_master`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `tai_department_master`
--
ALTER TABLE `tai_department_master`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT for table `tai_designation_master`
--
ALTER TABLE `tai_designation_master`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT for table `tai_employee_master`
--
ALTER TABLE `tai_employee_master`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `tai_modules`
--
ALTER TABLE `tai_modules`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `tai_role_master`
--
ALTER TABLE `tai_role_master`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

--
-- AUTO_INCREMENT for table `tai_role_masters`
--
ALTER TABLE `tai_role_masters`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tai_state_masters`
--
ALTER TABLE `tai_state_masters`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `tai_status_master`
--
ALTER TABLE `tai_status_master`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `tai_ticket_master`
--
ALTER TABLE `tai_ticket_master`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `tai_user_master`
--
ALTER TABLE `tai_user_master`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;