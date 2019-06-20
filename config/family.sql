/*
 Navicat Premium Data Transfer

 Source Server         : localhost_3306
 Source Server Type    : MySQL
 Source Server Version : 100315
 Source Host           : localhost:3306
 Source Schema         : family

 Target Server Type    : MySQL
 Target Server Version : 100315
 File Encoding         : 65001

 Date: 21/06/2019 03:43:23
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for tb_group
-- ----------------------------
DROP TABLE IF EXISTS `tb_group`;
CREATE TABLE `tb_group`  (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'Id of group',
  `group_name` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `create_date` date NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 5 CHARACTER SET = utf8 COLLATE = utf8_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of tb_group
-- ----------------------------
INSERT INTO `tb_group` VALUES (1, 'admin', '2019-06-16');
INSERT INTO `tb_group` VALUES (2, 'user', '2019-06-16');
INSERT INTO `tb_group` VALUES (3, 'new', '2019-06-16');
INSERT INTO `tb_group` VALUES (4, 'guest', '2019-06-16');

-- ----------------------------
-- Table structure for tb_query
-- ----------------------------
DROP TABLE IF EXISTS `tb_query`;
CREATE TABLE `tb_query`  (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'ID of SQL',
  `content` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL COMMENT 'What doing',
  `SQL` varchar(500) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL,
  `create_date` date NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 3 CHARACTER SET = utf8 COLLATE = utf8_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of tb_query
-- ----------------------------
INSERT INTO `tb_query` VALUES (1, 'Get all cost on date', 'SELECT * FROM tb_time_line WHERE u_id = 1 AND date = \"2019-06-16\"', '2019-06-16');
INSERT INTO `tb_query` VALUES (2, 'Get SUM of all cost of date', 'SELECT SUM(tb_time_line.cast) as COSTTODAY FROM tb_time_line WHERE u_id = 1 AND date = \"2019-06-16\"', '2019-06-16');

-- ----------------------------
-- Table structure for tb_time_line
-- ----------------------------
DROP TABLE IF EXISTS `tb_time_line`;
CREATE TABLE `tb_time_line`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `date` date NULL DEFAULT NULL,
  `name_of_cost` varchar(150) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `cast` float(255, 0) NOT NULL,
  `u_id` int(11) NOT NULL,
  PRIMARY KEY (`id`, `u_id`) USING BTREE,
  INDEX `__fk_tl_user`(`u_id`) USING BTREE,
  CONSTRAINT `__fk_tl_user` FOREIGN KEY (`u_id`) REFERENCES `tb_user` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 3 CHARACTER SET = utf8 COLLATE = utf8_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of tb_time_line
-- ----------------------------
INSERT INTO `tb_time_line` VALUES (1, '2019-06-16', 'Rau Cải', 4000, 1);
INSERT INTO `tb_time_line` VALUES (2, '2019-06-16', 'Đậu', 4000, 1);

-- ----------------------------
-- Table structure for tb_user
-- ----------------------------
DROP TABLE IF EXISTS `tb_user`;
CREATE TABLE `tb_user`  (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'ID of user',
  `user_name` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL COMMENT 'User name',
  `passwd` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL COMMENT 'Pass word',
  `full name` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL COMMENT 'Name of user',
  `birthday` date NULL DEFAULT NULL COMMENT 'Date of birth user',
  `group` int(11) NOT NULL COMMENT 'Group user',
  `key` varchar(300) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL COMMENT 'Key ecrype pass',
  `fb_id` varchar(300) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL COMMENT 'Facebook ID',
  `access_token` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL COMMENT 'Access Token Facebook',
  PRIMARY KEY (`id`, `group`) USING BTREE,
  INDEX `__fk_user_group`(`group`) USING BTREE,
  INDEX `id`(`id`) USING BTREE,
  CONSTRAINT `__fk_user_group` FOREIGN KEY (`group`) REFERENCES `tb_group` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 2 CHARACTER SET = utf8 COLLATE = utf8_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of tb_user
-- ----------------------------
INSERT INTO `tb_user` VALUES (1, 'tiendungkid', '07ea3b711ca998469622be1a060b82b8', 'Phan Tiến Dũng', '1999-11-29', 1, '', '2293063364338717', 'EAAL35ufZCPAIBAMtqHHPzuZAc5yLrzyk2yy9jj5MCsQAZBI9kgfw0hrbOsUZBkApCo0oaZB71cclY4scpGiOtDHCr4qhqpomzD8krmu1q5jRyVthvnZB8IWul1ZA8EDQubs0yTDnrDt8hTtkkcQstC0NlKheiO2oMdvtpZCzZBUPjMH5ZCsHR2ilSmRGJwRk7LpaZAfCkBqxw3C2ZBgbcG8mDedF');

SET FOREIGN_KEY_CHECKS = 1;
