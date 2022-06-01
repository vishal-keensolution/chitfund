-- Adminer 4.8.1 MySQL 5.5.5-10.4.13-MariaDB dump

SET NAMES utf8;
SET time_zone = '+00:00';
SET foreign_key_checks = 0;
SET sql_mode = 'NO_AUTO_VALUE_ON_ZERO';

SET NAMES utf8mb4;

DROP TABLE IF EXISTS `bids`;
CREATE TABLE `bids` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `idplans` int(10) unsigned NOT NULL,
  `user_id` int(10) unsigned NOT NULL,
  `fee` double(8,2) NOT NULL,
  `paid` double(8,2) NOT NULL,
  `won` tinyint(1) NOT NULL DEFAULT 0,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


DROP TABLE IF EXISTS `companies`;
CREATE TABLE `companies` (
  `idCompanies` int(11) NOT NULL,
  `companyName` varchar(45) DEFAULT NULL,
  `contactPerson` varchar(45) DEFAULT NULL,
  `contactNumber` varchar(10) DEFAULT NULL,
  `alternateContactNumber` varchar(10) DEFAULT NULL,
  `email` varchar(45) DEFAULT NULL,
  `address` varchar(45) DEFAULT NULL,
  `country` varchar(45) DEFAULT NULL,
  `state` varchar(45) DEFAULT NULL,
  `city` varchar(45) DEFAULT NULL,
  `zipcode` varchar(45) DEFAULT NULL,
  `doc1URL` varchar(100) DEFAULT NULL,
  `doc2URL` varchar(100) DEFAULT NULL,
  `subscriptionPlan` varchar(45) DEFAULT NULL,
  `status` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`idCompanies`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;


DROP TABLE IF EXISTS `companyusers`;
CREATE TABLE `companyusers` (
  `userid` int(11) NOT NULL AUTO_INCREMENT,
  `users_id` int(11) DEFAULT NULL,
  `salutation` varchar(4) NOT NULL,
  `firstname` varchar(45) NOT NULL,
  `lastname` varchar(45) NOT NULL,
  `cellphone` varchar(14) NOT NULL,
  `alternateContact` varchar(14) DEFAULT NULL,
  `email` varchar(60) DEFAULT NULL,
  `gender` varchar(8) NOT NULL,
  `address` varchar(60) NOT NULL,
  `country` varchar(30) NOT NULL,
  `state` varchar(30) NOT NULL,
  `city` varchar(30) NOT NULL,
  `zipcode` varchar(10) NOT NULL,
  `status` varchar(10) NOT NULL,
  `createdAt` date NOT NULL,
  `type` varchar(15) DEFAULT NULL,
  `group` varchar(25) DEFAULT NULL,
  `deleted` tinyint(4) DEFAULT 0,
  PRIMARY KEY (`userid`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

INSERT INTO `companyusers` (`userid`, `users_id`, `salutation`, `firstname`, `lastname`, `cellphone`, `alternateContact`, `email`, `gender`, `address`, `country`, `state`, `city`, `zipcode`, `status`, `createdAt`, `type`, `group`, `deleted`) VALUES
(5,	NULL,	'MR',	'Abhishek',	'Nimje',	'+918349227487',	'44213',	'abhisheknimje2610@gmail.com',	'Male',	'217, DK-1,',	'India',	'M.P.',	'Indore',	'452010',	'Inactive',	'2021-08-13',	NULL,	NULL,	1),
(6,	NULL,	'MR',	'Abhishek',	'Nimje',	'+918349227487',	'',	'abhisheknimje2610@gmail.com',	'Female',	'217, DK-1,',	'India',	'M.P.',	'Indore',	'452010',	'Active',	'2021-08-13',	NULL,	NULL,	1),
(7,	NULL,	'MS',	'test_firstname',	'test_lastname',	'832190830',	'',	'test@gmail.com',	'Male',	'test_address',	'India',	'M.P.',	'Indore',	'452010',	'Active',	'2021-08-14',	NULL,	'1',	1),
(8,	NULL,	'MR',	'Vishal',	'Dubey',	'9827530980',	'9827530980',	'vishal.du123@gmail.com',	'Male',	'13, Ram Krishna Colony, Moti Bunglow',	'India',	'M.P.',	'Indore',	'452010',	'Active',	'2021-12-10',	NULL,	NULL,	1),
(17,	NULL,	'MR',	'Vishal',	'Dubey',	'9827530980',	'9827530980',	'vishal.du123@gmail.com',	'Male',	'13 vvvvv',	'India',	'M.P.',	'Indore',	'452010',	'Active',	'2021-12-10',	NULL,	NULL,	0),
(18,	NULL,	'MR',	'Vishal',	'Dubey',	'9827530980',	'9827530980',	'vishal.du123@gmail.com',	'Male',	'13 vvvvv',	'India',	'M.P.',	'Indore',	'452010',	'Active',	'2021-12-10',	NULL,	NULL,	0),
(19,	NULL,	'MR',	'Vishal',	'Dubey',	'9827530980',	'9827530980',	'vishal.du123@gmail.com',	'Male',	'13 vvvvv',	'India',	'M.P.',	'Indore',	'452010',	'Active',	'2021-12-10',	NULL,	NULL,	0);

DROP TABLE IF EXISTS `groups`;
CREATE TABLE `groups` (
  `idGroups` int(11) NOT NULL AUTO_INCREMENT,
  `groupName` varchar(45) DEFAULT NULL,
  `contactPerson` varchar(45) DEFAULT NULL,
  `contactNumber` varchar(10) DEFAULT NULL,
  `email` varchar(50) DEFAULT NULL,
  `maxUserAllowed` int(11) DEFAULT NULL,
  `amountPerUser` int(11) DEFAULT NULL,
  `terms` varchar(8) DEFAULT NULL,
  `address` varchar(45) DEFAULT NULL,
  `country` varchar(20) DEFAULT NULL,
  `state` varchar(20) DEFAULT NULL,
  `city` varchar(20) DEFAULT NULL,
  `zipcode` varchar(10) DEFAULT NULL,
  `status` varchar(10) DEFAULT NULL,
  `deleted` tinyint(4) DEFAULT 0,
  PRIMARY KEY (`idGroups`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

INSERT INTO `groups` (`idGroups`, `groupName`, `contactPerson`, `contactNumber`, `email`, `maxUserAllowed`, `amountPerUser`, `terms`, `address`, `country`, `state`, `city`, `zipcode`, `status`, `deleted`) VALUES
(1,	'test_grp',	'test_preson_name',	'1234567890',	'test@email.com',	12,	600,	'Weekly',	'test_address',	'India',	'M.P.',	'Indore',	'452010',	'Verified',	0),
(2,	'dasd',	'dsad',	'312321312',	'dasd',	321,	321,	'Weekly',	'dasdasdas',	'India',	'U.P.',	'Indore',	'4124421',	'Active',	1),
(3,	'test_group',	'test',	'dasda',	'test@gmail.com',	21,	21,	'Weekly',	'dasda',	'India',	'M.P.',	'Indore',	'321321',	'Active',	0);

DROP TABLE IF EXISTS `notifications`;
CREATE TABLE `notifications` (
  `idNotifications` int(11) NOT NULL AUTO_INCREMENT,
  `notificationType` varchar(45) DEFAULT NULL,
  `notificationName` varchar(45) DEFAULT NULL,
  `detailMessage` varchar(255) DEFAULT NULL,
  `medium` varchar(45) DEFAULT NULL,
  `status` varchar(45) DEFAULT NULL,
  `deleted` tinyint(4) DEFAULT 0,
  PRIMARY KEY (`idNotifications`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

INSERT INTO `notifications` (`idNotifications`, `notificationType`, `notificationName`, `detailMessage`, `medium`, `status`, `deleted`) VALUES
(2,	'Regular',	'test_notification',	'test_message',	'SMS',	'Active',	0),
(3,	'Special',	'test_name_2',	'test_description_2',	'SMS',	'Active',	1),
(4,	'Special',	'test',	'dasdasd',	'Email',	'Inactive',	1),
(5,	'Special',	'tesst',	'hjggg',	'SMS',	'Active',	1);

DROP TABLE IF EXISTS `plans`;
CREATE TABLE `plans` (
  `idplans` int(11) NOT NULL AUTO_INCREMENT,
  `planName` varchar(45) DEFAULT NULL,
  `numberOfUsers` int(11) DEFAULT NULL,
  `amount` varchar(45) DEFAULT NULL,
  `desciption` varchar(255) DEFAULT NULL,
  `terms` varchar(45) DEFAULT NULL,
  `status` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`idplans`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

INSERT INTO `plans` (`idplans`, `planName`, `numberOfUsers`, `amount`, `desciption`, `terms`, `status`) VALUES
(1,	'Plan1',	12,	'10000',	'Plan1',	'NA',	'1');

DROP TABLE IF EXISTS `schemes`;
CREATE TABLE `schemes` (
  `idSchemes` int(11) NOT NULL AUTO_INCREMENT,
  `schemeName` varchar(45) DEFAULT NULL,
  `contactPerson` varchar(45) DEFAULT NULL,
  `contactNumber` varchar(10) DEFAULT NULL,
  `email` varchar(45) DEFAULT NULL,
  `maxAllowedUser` int(11) DEFAULT NULL,
  `amountPerUser` int(11) DEFAULT NULL,
  `terms` varchar(45) DEFAULT NULL,
  `address` varchar(50) DEFAULT NULL,
  `country` varchar(20) DEFAULT NULL,
  `state` varchar(20) DEFAULT NULL,
  `city` varchar(20) DEFAULT NULL,
  `zipcode` varchar(10) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `startDate` date DEFAULT NULL,
  `endDate` date DEFAULT NULL,
  `docURL` varchar(100) DEFAULT NULL,
  `status` varchar(25) NOT NULL,
  `deleted` tinyint(4) DEFAULT 0,
  `idplans` int(11) DEFAULT NULL,
  PRIMARY KEY (`idSchemes`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

INSERT INTO `schemes` (`idSchemes`, `schemeName`, `contactPerson`, `contactNumber`, `email`, `maxAllowedUser`, `amountPerUser`, `terms`, `address`, `country`, `state`, `city`, `zipcode`, `description`, `startDate`, `endDate`, `docURL`, `status`, `deleted`, `idplans`) VALUES
(1,	'sadd',	'dasd',	'dasd',	'dasd',	3,	6,	'dasd',	'dasd',	'dasd',	'dasda',	'dsad',	'ddasda',	'dasda',	'2010-09-20',	'2010-10-20',	NULL,	'dasd',	0,	1),
(2,	'sadd',	'sadd',	'dasd',	'dasd',	3,	6,	'dasd',	'dasd',	'dasda',	'dasda',	'dasda',	'ddasda',	'xdasda',	'2001-01-01',	'2001-01-01',	NULL,	'dasd',	0,	NULL),
(3,	'sadd',	'sadd',	'dasd',	'dasd',	12,	6,	'dasd',	'dasd',	'ddasda',	'ddasda',	'ddasda',	'ddasda',	'xxx',	'2001-01-01',	'2001-01-01',	NULL,	'dasd',	0,	NULL);

DROP TABLE IF EXISTS `taxes`;
CREATE TABLE `taxes` (
  `idTaxes` int(11) NOT NULL AUTO_INCREMENT,
  `taxType` varchar(45) DEFAULT NULL,
  `taxName` varchar(45) DEFAULT NULL,
  `startDate` date DEFAULT NULL,
  `endDate` date DEFAULT NULL,
  `taxRate` varchar(45) DEFAULT NULL,
  `exclusive_inclusive` varchar(45) DEFAULT NULL,
  `status` varchar(45) DEFAULT NULL,
  `deleted` tinyint(4) DEFAULT 0,
  PRIMARY KEY (`idTaxes`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

INSERT INTO `taxes` (`idTaxes`, `taxType`, `taxName`, `startDate`, `endDate`, `taxRate`, `exclusive_inclusive`, `status`, `deleted`) VALUES
(1,	'Fixed',	'test_tax',	'2020-01-01',	'2020-01-01',	'2',	'Including',	'Including',	1),
(2,	'Fixed',	'ww',	'2021-02-01',	'2021-02-01',	'4',	'Inclusive',	'Including',	1),
(3,	'Percentage',	'',	'2021-01-01',	'2021-02-01',	'8',	'Including',	'Including',	1),
(4,	'Fixed',	'ffyf',	'2021-01-20',	'2021-02-20',	'3',	'Including',	'Including',	1),
(5,	'Fixed',	'test',	'2021-08-11',	'2021-08-12',	'8',	'Including',	'Excluding',	1),
(6,	'Fixed',	'test',	'2021-08-18',	'2021-08-18',	'8',	'Including',	'Including',	1),
(7,	'Percentage',	'test',	'2021-08-17',	'2021-08-20',	'5',	'Inclusive',	'Active',	1),
(8,	'Fixed',	'test2',	'2021-08-02',	'2021-08-03',	'7',	'Exclusive',	'Inactive',	1);

DROP TABLE IF EXISTS `transactions`;
CREATE TABLE `transactions` (
  `idTransactions` int(11) NOT NULL,
  `date` date DEFAULT NULL,
  `schemeName` varchar(45) DEFAULT NULL,
  `groupName` varchar(45) DEFAULT NULL,
  `totalInstallment` int(11) DEFAULT NULL,
  `installmentNumber` int(11) DEFAULT NULL,
  `amount` int(11) DEFAULT NULL,
  `totalDeposits` varchar(45) DEFAULT NULL,
  `totalRemaining` varchar(45) DEFAULT NULL,
  `totalWithdraw` varchar(45) DEFAULT NULL,
  `status` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`idTransactions`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COMMENT='		';


DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `users_id` int(11) NOT NULL AUTO_INCREMENT,
  `fullname` varchar(255) DEFAULT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `contact` varchar(255) DEFAULT NULL,
  `role_id` int(11) DEFAULT 1 COMMENT '1->User, 2->Company, 3->Site Admin',
  PRIMARY KEY (`users_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

INSERT INTO `users` (`users_id`, `fullname`, `email`, `password`, `address`, `contact`, `role_id`) VALUES
(1,	'Abhishek Nimje',	'admin@gmail.com',	'admin@1',	'217, DK-1, scheme no.74-c , vijay nagar',	'7392173933',	3),
(3,	'User',	'user@gmail.com',	'user@1',	NULL,	NULL,	1),
(5,	'Company',	'company@gmail.com',	'company@1',	'daldlkajl',	'321389717',	2);

DROP TABLE IF EXISTS `users_groups`;
CREATE TABLE `users_groups` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `users_id` int(11) NOT NULL,
  `idGroups` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

INSERT INTO `users_groups` (`id`, `users_id`, `idGroups`) VALUES
(1,	3,	1),
(2,	3,	2),
(3,	3,	3);

DROP TABLE IF EXISTS `users_schemes`;
CREATE TABLE `users_schemes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `users_id` int(11) NOT NULL,
  `idSchemes` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

INSERT INTO `users_schemes` (`id`, `users_id`, `idSchemes`) VALUES
(1,	3,	1),
(2,	3,	2),
(3,	3,	3);

-- 2022-01-28 09:36:11
