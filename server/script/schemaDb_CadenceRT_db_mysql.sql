--
-- Database: `cadencert_db`
--

CREATE DATABASE IF NOT EXISTS `cadencert_db`;
USE `cadencert_db`;


-- ENTITIES

--
-- Struttura della tabella `collective`
--

CREATE TABLE IF NOT EXISTS `collective` (
	`_created` date  NOT NULL,
	`_expiration` date ,
	`_modified` date  NOT NULL,
	`class` varchar(130)  NOT NULL,
	`description` varchar(130) ,
	`handle` varchar(130)  NOT NULL,
	`locked` bool  NOT NULL,
	`metadata` varchar(130) ,
	`status` varchar(130)  NOT NULL,
	`subclass` varchar(130) ,
	`token` varchar(130) ,
	
	`_id` int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT 

);


--
-- Struttura della tabella `filesystem`
--

CREATE TABLE IF NOT EXISTS `filesystem` (
	`_created` date  NOT NULL,
	`_modified` date ,
	`_status` varchar(130)  NOT NULL,
	`basepath` varchar(130)  NOT NULL,
	`blob` numeric ,
	`filename` varchar(130)  NOT NULL,
	`filesize` numeric ,
	`locked` varchar(130)  NOT NULL,
	`mime` numeric ,
	`permission` int  NOT NULL,
	`r_user` numeric ,
	
	`_id` int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT 

);


--
-- Struttura della tabella `geocode`
--

CREATE TABLE IF NOT EXISTS `geocode` (
	`_created` date  NOT NULL,
	`class` varchar(130)  NOT NULL,
	`o` decimal(6,2) ,
	`series` bool  NOT NULL,
	`x` decimal(6,2)  NOT NULL,
	`xy` decimal(6,2) ,
	`y` decimal(6,2)  NOT NULL,
	
	`_id` int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT 

);


--
-- Struttura della tabella `stakeholder`
--

CREATE TABLE IF NOT EXISTS `stakeholder` (
	`_created` date  NOT NULL,
	`_expiration` date ,
	`_modified` date ,
	`description` varchar(130) ,
	`handle` varchar(130)  NOT NULL,
	`status` numeric  NOT NULL,
	
	`_id` int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT 

);


--
-- Struttura della tabella `treedata`
--

CREATE TABLE IF NOT EXISTS `treedata` (
	`_created` date ,
	`_modified` date ,
	`class` varchar(130)  NOT NULL,
	`description` varchar(130) ,
	`handle` varchar(130)  NOT NULL,
	`metadata` varchar(130) ,
	`orphan` bool ,
	`ref_inlaw` varchar(130) ,
	`ref_last` varchar(130) ,
	`ref_parent` varchar(130) ,
	`ref_twin` varchar(130) ,
	`status` bool ,
	
	`_id` int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT 

);


--
-- Struttura della tabella `user`
--

CREATE TABLE IF NOT EXISTS `user` (
	`_created` date ,
	`_expires` date ,
	`_lastactive` date ,
	`address_1` varchar(130) ,
	`address_2` varchar(130) ,
	`address_3` varchar(130) ,
	`address_city` varchar(130) ,
	`address_country` varchar(130) ,
	`address_postalcode` varchar(130) ,
	`avatar` int ,
	`id_number` varchar(130) ,
	`locale` varchar(130) ,
	`mail_primary` varchar(130)  NOT NULL,
	`msisdn` varchar(130)  NOT NULL,
	`name_first` varchar(130) ,
	`name_last` varchar(130) ,
	`name_title` varchar(130) ,
	`nationality` varchar(130) ,
	`opt_ins` varchar(130) ,
	`opt_outs` varchar(130) ,
	`password` varchar(130)  NOT NULL,
	`r_group` int ,
	`r_parent` int ,
	`r_policy` int ,
	`r_role` varchar(130)  NOT NULL,
	`status` varchar(130)  NOT NULL,
	`super_class` varchar(30)  NOT NULL,
	`tax_number` varchar(130) ,
	`username` varchar(130)  NOT NULL,
	
	`_id` int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT 

);


-- Security

ALTER TABLE `user` MODIFY COLUMN `password` varchar(128)  NOT NULL;

INSERT INTO `cadencert_db`.`user` (`username`, `password`, `_id`) VALUES ('admin', '62f264d7ad826f02a8af714c0a54b197935b717656b80461686d450f7b3abde4c553541515de2052b9af70f710f0cd8a1a2d3f4d60aa72608d71a63a9a93c0f5', 1);

CREATE TABLE IF NOT EXISTS `roles` (
	`role` varchar(30) ,
	
	-- RELAZIONI

	`_user` int(11)  NOT NULL REFERENCES user(_id),
	`_id` int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT 

);
INSERT INTO `cadencert_db`.`roles` (`role`, `_user`, `_id`) VALUES ('ADMIN', '1', 1);





-- relation 1:m r_owner Collective - User
ALTER TABLE `collective` ADD COLUMN `r_owner` int(11)  REFERENCES user(_id);

-- relation m:m r_members Collective - User
CREATE TABLE IF NOT EXISTS `Collective_r_members` (
    `_id` int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
    `id_Collective` int(11)  NOT NULL REFERENCES collective(_id),
    `id_User` int(11)  NOT NULL REFERENCES user(_id)
);

-- relation 1:m r_owner Filesystem - User
ALTER TABLE `filesystem` ADD COLUMN `r_owner` int(11)  REFERENCES user(_id);

-- relation 1:m r_owner Geocode - User
ALTER TABLE `geocode` ADD COLUMN `r_owner` int(11)  NOT NULL REFERENCES user(_id);

-- relation 1:m r_avatar Stakeholder - Filesystem
ALTER TABLE `stakeholder` ADD COLUMN `r_avatar` int(11)  REFERENCES filesystem(_id);

-- relation 1:m r_owner Stakeholder - User
ALTER TABLE `stakeholder` ADD COLUMN `r_owner` int(11)  NOT NULL REFERENCES user(_id);

-- relation m:m r_collective Stakeholder - Collective
CREATE TABLE IF NOT EXISTS `Stakeholder_r_collective` (
    `_id` int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
    `id_Stakeholder` int(11)  NOT NULL REFERENCES stakeholder(_id),
    `id_Collective` int(11)  NOT NULL REFERENCES collective(_id)
);

-- relation 1:m s_lastchild Treedata - Filesystem
ALTER TABLE `treedata` ADD COLUMN `s_lastchild` int(11)  REFERENCES filesystem(_id);

-- relation 1:m s_parent Treedata - Filesystem
ALTER TABLE `treedata` ADD COLUMN `s_parent` int(11)  REFERENCES filesystem(_id);


