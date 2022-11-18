/*
 Navicat Premium Data Transfer

 Source Server         : localhost_3306
 Source Server Type    : MySQL
 Source Server Version : 80015
 Source Host           : localhost:3306
 Source Schema         : vue3_mall

 Target Server Type    : MySQL
 Target Server Version : 80015
 File Encoding         : 65001

 Date: 18/11/2022 10:11:19
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for cart
-- ----------------------------
DROP TABLE IF EXISTS `cart`;
CREATE TABLE `cart`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `title` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `img` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `guige` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `num` int(11) NOT NULL DEFAULT 1,
  `mostnum` int(11) NOT NULL DEFAULT 10,
  `price` decimal(10, 2) NOT NULL,
  `number` int(32) NOT NULL,
  `flag` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT 'f',
  `submit` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT 'f',
  `orderid` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `state` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '待结算',
  `stime` datetime(0) NULL DEFAULT NULL,
  `ftime` datetime(0) NULL DEFAULT NULL,
  `isshow` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT 't',
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `username`(`username`) USING BTREE,
  INDEX `number`(`number`) USING BTREE,
  CONSTRAINT `cart_ibfk_1` FOREIGN KEY (`username`) REFERENCES `users` (`username`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `cart_ibfk_2` FOREIGN KEY (`number`) REFERENCES `details` (`number`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 6 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of cart
-- ----------------------------
INSERT INTO `cart` VALUES (1, 'tb17807815598', '【双11返场】施华洛世奇TENNIS DLXMC经典璀璨折叠扣女项链', 'files-6986211287125.webp', '红色', 1, 10, 1150.00, 100100, 'f', 't', '477223901998', '未付款', '2022-11-17 23:32:53', NULL, 't');
INSERT INTO `cart` VALUES (2, 'tb17807815598', '【双11返场】施华洛世奇TENNIS DLXMC经典璀璨折叠扣女项链', 'files-6986211287125.webp', '红色', 1, 10, 1150.00, 100100, 'f', 't', '292526523165', '未付款', '2022-11-17 23:38:16', NULL, 't');
INSERT INTO `cart` VALUES (3, 'tb17807815598', '施华洛世奇跳动的心 SPARKLING DANCE耀动晶彩女项链圣诞礼物时尚', 'files-6946277247797.webp', '蓝色', 1, 10, 628.00, 100104, 'f', 't', '165609392403', '进行中', '2022-11-17 23:39:17', NULL, 't');

-- ----------------------------
-- Table structure for details
-- ----------------------------
DROP TABLE IF EXISTS `details`;
CREATE TABLE `details`  (
  `number` int(32) NOT NULL,
  `swiper` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT '',
  `colorimg` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT '',
  `colortext` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT '',
  `prices` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `stock` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `discount` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT '无优惠',
  `activity` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT '最多送230元，全店通用更划算',
  `guarantee` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT '假一赔四，退货运费险，极速退款，七天无理由退换',
  `parameter` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `delivery` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT '浙江嘉兴;快递: 免运费',
  `detailsimg` varchar(2550) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`number`) USING BTREE,
  UNIQUE INDEX `number`(`number`) USING BTREE,
  CONSTRAINT `details_ibfk_1` FOREIGN KEY (`number`) REFERENCES `goods` (`number`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of details
-- ----------------------------
INSERT INTO `details` VALUES (100100, 'files-6986187384685.webp;files-6986187409563.webp;files-6986187425050.webp;files-6986187447787.webp', 'files-6986211287125.webp', '红色;蓝色', '1150;1180', '100;100', '无优惠', '最多送230元，全店通用更划算', '假一赔四，退货运费险，极速退款，七天无理由退换', '品牌：Swarovski/施华洛世奇;链子材质:合金/镀银/镀金;成色全新;价格区间：1001-3000元;适用性别：女;颜色分类：红色 蓝色 镀白金色 镀玫瑰金色;是否多层：否;是否带坠：是;上市时间：2017年春夏;货号：100100;是否商场同款：是;是否现货：现货', '浙江嘉兴;快递: 免运费', NULL);
INSERT INTO `details` VALUES (100101, 'files-6987441149823.webp;files-6987441232329.webp;files-6987441213068.webp;files-6987441188979.webp', 'files-6987465648245.webp', '黑色', '1000', '100', '无优惠', '最多送230元，全店通用更划算', '假一赔四，退货运费险，极速退款，七天无理由退换', '品牌：Swarovski/施华洛世奇;链子材质：合金/镀银/镀金;成色：全新;价格区间：1001-3000元;适用性别：女;是否多层：否;是否带坠：否;上市时间：2020年秋季;货号：100101;是否商场同款：是;是否现货：现货', '浙江嘉兴;快递: 免运费', NULL);
INSERT INTO `details` VALUES (100102, 'files-6937761439070.webp;files-6937761355200.webp;files-693776138898.webp;files-6937761403327.webp', 'files-6937782277264.webp', '银色', '1500', '100', '无优惠', '最多送230元，全店通用更划算', '假一赔四，退货运费险，极速退款，七天无理由退换', '品牌：Swarovski/施华洛世奇;链子材质：合金/镀银/镀金;成色：全新;价格区间：1001-3000元;适用性别：女;是否多层：否;是否带坠：否;上市时间：2020年秋季;货号：100102;是否商场同款：是;是否现货：现货', '浙江嘉兴;快递: 免运费', NULL);
INSERT INTO `details` VALUES (100103, 'files-6942751951797.webp;files-6942752032208.jpg;files-6942751986527.webp;files-6942752003115.webp', 'files-694277747327.webp', '蓝色', '888', '100', '无优惠', '最多送230元，全店通用更划算', '假一赔四，退货运费险，极速退款，七天无理由退换', '品牌：Swarovski/施华洛世奇;链子材质：合金/镀银/镀金;成色：全新;价格区间：1001-3000元;适用性别：女;是否多层：否;是否带坠：否;上市时间：2020年秋季;货号：100103;是否商场同款：是;是否现货：现货', '浙江嘉兴;快递: 免运费', NULL);
INSERT INTO `details` VALUES (100104, 'files-6946253615998.webp;files-6946253644011.webp;files-6946253663734.webp;files-6946253685064.webp', 'files-6946277247797.webp', '蓝色', '628', '300', '无优惠', '最多送230元，全店通用更划算', '假一赔四，退货运费险，极速退款，七天无理由退换', '品牌：Swarovski/施华洛世奇;链子材质：合金/镀银/镀金;成色：全新;价格区间：1001-3000元;适用性别：女;是否多层：否;是否带坠：否;上市时间：2020年秋季;货号：100104;是否商场同款：是;是否现货：现货', '浙江嘉兴;快递: 免运费', NULL);
INSERT INTO `details` VALUES (100105, 'files-6927093272520.webp;files-692709329494.webp;files-6927093323932.webp;files-692709330499.webp', 'files-692711479683.webp', '银色', '368', '600', '无优惠', '最多送230元，全店通用更划算', '假一赔四，退货运费险，极速退款，七天无理由退换', '品牌：Swarovski/施华洛世奇;链子材质：合金/镀银/镀金;成色：全新;价格区间：1001-3000元;适用性别：女;是否多层：否;是否带坠：否;上市时间：2020年秋季;货号：100105;是否商场同款：是;是否现货：现货', '浙江嘉兴;快递: 免运费', NULL);
INSERT INTO `details` VALUES (100106, 'files-6937317622018.webp;files-6937317584391.webp;files-6937317665535.webp;files-6937317699620.webp', 'files-6937430253538.webp', '彩色', '256', '100', '无优惠', '最多送230元，全店通用更划算', '假一赔四，退货运费险，极速退款，七天无理由退换', '品牌：Swarovski/施华洛世奇;链子材质：合金/镀银/镀金;成色：全新;价格区间：1001-3000元;适用性别：女;是否多层：否;是否带坠：否;上市时间：2020年秋季;货号：100106;是否商场同款：是;是否现货：现货', '浙江嘉兴;快递: 免运费', NULL);
INSERT INTO `details` VALUES (100107, 'files-6937547752594.webp;files-6937547785761.webp;files-6937547802370.webp;files-6937547841358.webp', 'files-6937578708398.webp', '黑色', '560', '200', '无优惠', '最多送230元，全店通用更划算', '假一赔四，退货运费险，极速退款，七天无理由退换', '品牌：Swarovski/施华洛世奇;链子材质：合金/镀银/镀金;成色：全新;价格区间：1001-3000元;适用性别：女;是否多层：否;是否带坠：否;上市时间：2020年秋季;货号：100107;是否商场同款：是;是否现货：现货', '浙江嘉兴;快递: 免运费', NULL);
INSERT INTO `details` VALUES (100108, 'files-6930443694522.webp;files-693044375552.webp;files-6930443711405.webp;files-6930443733529.webp', 'files-6930469922837.webp', '白色', '960', '1000', '无优惠', '最多送230元，全店通用更划算', '假一赔四，退货运费险，极速退款，七天无理由退换', '品牌：Swarovski/施华洛世奇;链子材质：合金/镀银/镀金;成色：全新;价格区间：1001-3000元;适用性别：女;是否多层：否;是否带坠：否;上市时间：2020年秋季;货号：100108;是否商场同款：是;是否现货：现货', '浙江嘉兴;快递: 免运费', NULL);
INSERT INTO `details` VALUES (100109, 'files-6938087695493.webp;files-6938087749578.webp;files-6938087744785.webp;files-6938087751634.webp', 'files-6938128842778.webp', '红色', '500', '600', '无优惠', '最多送230元，全店通用更划算', '假一赔四，退货运费险，极速退款，七天无理由退换', '品牌：Swarovski/施华洛世奇;链子材质：合金/镀银/镀金;成色：全新;价格区间：1001-3000元;适用性别：女;是否多层：否;是否带坠：否;上市时间：2020年秋季;货号：100109;是否商场同款：是;是否现货：现货', '浙江嘉兴;快递: 免运费', NULL);
INSERT INTO `details` VALUES (100110, 'files-6930964801681.webp;files-6930964837937.webp;files-6930964856090.webp;files-6930964878568.webp', 'files-693098767534.webp', '黑色', '999', '600', '无优惠', '最多送230元，全店通用更划算', '假一赔四，退货运费险，极速退款，七天无理由退换', '品牌：Swarovski/施华洛世奇;链子材质：合金/镀银/镀金;成色：全新;价格区间：1001-3000元;适用性别：女;是否多层：否;是否带坠：否;上市时间：2020年秋季;货号：100110;是否商场同款：是;是否现货：现货', '浙江嘉兴;快递: 免运费', NULL);
INSERT INTO `details` VALUES (100111, 'files-6946253615998.webp;files-6946253644011.webp;files-6946253663734.webp;files-6946253685064.webp;files-6947455306374.webp', 'files-6946277247797.webp', '白色', '520', '300', '无优惠', '最多送230元，全店通用更划算', '假一赔四，退货运费险，极速退款，七天无理由退换', '品牌：Swarovski/施华洛世奇;链子材质：合金/镀银/镀金;成色：全新;价格区间：1001-3000元;适用性别：女;是否多层：否;是否带坠：否;上市时间：2020年秋季;货号：100111;是否商场同款：是;是否现货：现货', '浙江嘉兴;快递: 免运费', NULL);
INSERT INTO `details` VALUES (100112, 'files-6940688496863.webp;files-694068850749.webp;files-6940688555348.webp;files-6940688527087.webp', 'files-6940712532021.webp', '黑色', '999', '1000', '无优惠', '最多送230元，全店通用更划算', '假一赔四，退货运费险，极速退款，七天无理由退换', '品牌：Swarovski/施华洛世奇;链子材质：合金/镀银/镀金;成色：全新;价格区间：1001-3000元;适用性别：女;是否多层：否;是否带坠：否;上市时间：2020年秋季;货号：100112;是否商场同款：是;是否现货：现货', '浙江嘉兴;快递: 免运费', NULL);
INSERT INTO `details` VALUES (100113, 'files-6921128307546.webp;files-692112832216.webp;files-6921128356975.webp;files-6921128384133.webp', 'files-6921151969046.webp', '红色', '960', '300', '无优惠', '最多送230元，全店通用更划算', '假一赔四，退货运费险，极速退款，七天无理由退换', '品牌：Swarovski/施华洛世奇;链子材质：合金/镀银/镀金;成色：全新;价格区间：1001-3000元;适用性别：女;是否多层：否;是否带坠：否;上市时间：2020年秋季;货号：100113;是否商场同款：是;是否现货：现货', '浙江嘉兴;快递: 免运费', NULL);
INSERT INTO `details` VALUES (100114, 'files-6930964801681.webp;files-6930964837937.webp;files-6930964856090.webp;files-6930964878568.webp', 'files-693098767534.webp', '黑色', '550', '650', '无优惠', '最多送230元，全店通用更划算', '假一赔四，退货运费险，极速退款，七天无理由退换', '品牌：Swarovski/施华洛世奇;链子材质：合金/镀银/镀金;成色：全新;价格区间：1001-3000元;适用性别：女;是否多层：否;是否带坠：否;上市时间：2020年秋季;货号：100114;是否商场同款：是;是否现货：现货', '浙江嘉兴;快递: 免运费', NULL);
INSERT INTO `details` VALUES (100115, 'files-6930964801681.webp;files-6930964837937.webp;files-6930964856090.webp;files-6930964878568.webp', 'files-693098767534.webp', '黑色', '630', '300', '无优惠', '最多送230元，全店通用更划算', '假一赔四，退货运费险，极速退款，七天无理由退换', '品牌：Swarovski/施华洛世奇;链子材质：合金/镀银/镀金;成色：全新;价格区间：1001-3000元;适用性别：女;是否多层：否;是否带坠：否;上市时间：2020年秋季;货号：100115;是否商场同款：是;是否现货：现货', '浙江嘉兴;快递: 免运费', NULL);
INSERT INTO `details` VALUES (100116, 'files-6945570704559.webp;files-6945570686385.webp;files-694557073569.webp;files-6945570769562.webp', 'files-6945623398417.webp', '蓝色', '660', '300', '无优惠', '最多送230元，全店通用更划算', '假一赔四，退货运费险，极速退款，七天无理由退换', '品牌：Swarovski/施华洛世奇;链子材质：合金/镀银/镀金;成色：全新;价格区间：1001-3000元;适用性别：女;是否多层：否;是否带坠：否;上市时间：2020年秋季;货号：100117;是否商场同款：是;是否现货：现货', '浙江嘉兴;快递: 免运费', NULL);
INSERT INTO `details` VALUES (100117, 'files-6944212719311.webp;files-6944212735926.webp;files-6944212747887.webp;files-6944212769080.webp', 'files-6944237622120.webp', '白色', '600', '600', '无优惠', '最多送230元，全店通用更划算', '假一赔四，退货运费险，极速退款，七天无理由退换', '品牌：Swarovski/施华洛世奇;链子材质：合金/镀银/镀金;成色：全新;价格区间：1001-3000元;适用性别：女;是否多层：否;是否带坠：否;上市时间：2020年秋季;货号：100117;是否商场同款：是;是否现货：现货', '浙江嘉兴;快递: 免运费', NULL);
INSERT INTO `details` VALUES (100118, 'files-6938946193747.webp;files-6938946217931.webp;files-6938946232021.webp;files-6938946264293.webp', 'files-6938974092028.webp', '白色', '680', '300', '无优惠', '最多送230元，全店通用更划算', '假一赔四，退货运费险，极速退款，七天无理由退换', '品牌：Swarovski/施华洛世奇;链子材质：合金/镀银/镀金;成色：全新;价格区间：1001-3000元;适用性别：女;是否多层：否;是否带坠：否;上市时间：2020年秋季;货号：100118;是否商场同款：是;是否现货：现货', '浙江嘉兴;快递: 免运费', NULL);
INSERT INTO `details` VALUES (100119, 'files-6944212719311.webp;files-6944212735926.webp;files-6944212747887.webp;files-6944212769080.webp', 'files-6944237622120.webp', '红色', '800', '400', '无优惠', '最多送230元，全店通用更划算', '假一赔四，退货运费险，极速退款，七天无理由退换', '品牌：Swarovski/施华洛世奇;链子材质：合金/镀银/镀金;成色：全新;价格区间：1001-3000元;适用性别：女;是否多层：否;是否带坠：否;上市时间：2020年秋季;货号：100119;是否商场同款：是;是否现货：现货', '浙江嘉兴;快递: 免运费', NULL);
INSERT INTO `details` VALUES (100120, 'files-6939148084344.webp;files-6939148133767.webp;files-6939148107402.webp;files-6939148168097.webp', 'files-6939169696619.webp', '黑色', '600', '600', '无优惠', '最多送230元，全店通用更划算', '假一赔四，退货运费险，极速退款，七天无理由退换', '品牌：Swarovski/施华洛世奇;链子材质：合金/镀银/镀金;成色：全新;价格区间：1001-3000元;适用性别：女;是否多层：否;是否带坠：否;上市时间：2020年秋季;货号：100120;是否商场同款：是;是否现货：现货', '浙江嘉兴;快递: 免运费', NULL);
INSERT INTO `details` VALUES (100121, 'files-6939851824454.webp;files-6939851842646.webp;files-6939851851491.webp;files-6939851883665.webp', 'files-6939873826319.webp', '黑色', '900', '600', '无优惠', '最多送230元，全店通用更划算', '假一赔四，退货运费险，极速退款，七天无理由退换', '品牌：Swarovski/施华洛世奇;链子材质：合金/镀银/镀金;成色：全新;价格区间：1001-3000元;适用性别：女;是否多层：否;是否带坠：否;上市时间：2020年秋季;货号：100121;是否商场同款：是;是否现货：现货', '浙江嘉兴;快递: 免运费', NULL);
INSERT INTO `details` VALUES (100122, 'files-6939668575204.webp;files-6939668601359.webp;files-6939668628655.webp;files-6939668658002.webp', 'files-6939689977134.webp', '黑色', '400', '600', '无优惠', '最多送230元，全店通用更划算', '假一赔四，退货运费险，极速退款，七天无理由退换', '品牌：Swarovski/施华洛世奇;链子材质：合金/镀银/镀金;成色：全新;价格区间：1001-3000元;适用性别：女;是否多层：否;是否带坠：否;上市时间：2020年秋季;货号：100122;是否商场同款：是;是否现货：现货', '浙江嘉兴;快递: 免运费', NULL);
INSERT INTO `details` VALUES (100123, 'files-6931495856517.webp;files-6931495793388.webp;files-6931495939868.webp;files-693149591943.webp', 'files-6931515072080.webp', '白色', '782', '900', '无优惠', '最多送230元，全店通用更划算', '假一赔四，退货运费险，极速退款，七天无理由退换', '品牌：Swarovski/施华洛世奇;链子材质：合金/镀银/镀金;成色：全新;价格区间：1001-3000元;适用性别：女;是否多层：否;是否带坠：否;上市时间：2020年秋季;货号：100123;是否商场同款：是;是否现货：现货', '浙江嘉兴;快递: 免运费', NULL);
INSERT INTO `details` VALUES (100124, 'files-6944212719311.webp;files-6944212735926.webp;files-6944212747887.webp;files-6944212769080.webp', 'files-6944237622120.webp', '白色', '880', '900', '无优惠', '最多送230元，全店通用更划算', '假一赔四，退货运费险，极速退款，七天无理由退换', '品牌：Swarovski/施华洛世奇;链子材质：合金/镀银/镀金;成色：全新;价格区间：1001-3000元;适用性别：女;是否多层：否;是否带坠：否;上市时间：2020年秋季;货号：100124;是否商场同款：是;是否现货：现货', '浙江嘉兴;快递: 免运费', NULL);
INSERT INTO `details` VALUES (100125, 'files-6939851824454.webp;files-6939851842646.webp;files-6939851851491.webp;files-6939851883665.webp', 'files-6939873826319.webp', '白色', '600', '400', '无优惠', '最多送230元，全店通用更划算', '假一赔四，退货运费险，极速退款，七天无理由退换', '品牌：Swarovski/施华洛世奇;链子材质：合金/镀银/镀金;成色：全新;价格区间：1001-3000元;适用性别：女;是否多层：否;是否带坠：否;上市时间：2020年秋季;货号：100125;是否商场同款：是;是否现货：现货', '浙江嘉兴;快递: 免运费', NULL);
INSERT INTO `details` VALUES (100126, 'files-6939851824454.webp;files-6939851842646.webp;files-6939851851491.webp;files-6939851883665.webp', 'files-6939873826319.webp', '白色', '600', '400', '无优惠', '最多送230元，全店通用更划算', '假一赔四，退货运费险，极速退款，七天无理由退换', '品牌：Swarovski/施华洛世奇;链子材质：合金/镀银/镀金;成色：全新;价格区间：1001-3000元;适用性别：女;是否多层：否;是否带坠：否;上市时间：2020年秋季;货号：100126;是否商场同款：是;是否现货：现货', '浙江嘉兴;快递: 免运费', NULL);

-- ----------------------------
-- Table structure for goods
-- ----------------------------
DROP TABLE IF EXISTS `goods`;
CREATE TABLE `goods`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `imgs` varchar(2550) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `title` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `price` decimal(10, 2) NOT NULL,
  `monthsales` int(255) NOT NULL DEFAULT 0,
  `sales` int(255) NOT NULL DEFAULT 0,
  `collection` int(255) NOT NULL DEFAULT 0,
  `number` int(32) NOT NULL,
  `type` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `launchTime` date NULL DEFAULT NULL,
  `offshelfTime` date NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `number`(`number`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 41 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of goods
-- ----------------------------
INSERT INTO `goods` VALUES (1, 'files-6986093326294.webp', '【双11返场】施华洛世奇TENNIS DLXMC经典璀璨折叠扣女项链', 1150.00, 0, 0, 0, 100100, '首饰;项链', '2022-11-17', '2022-11-17');
INSERT INTO `goods` VALUES (2, 'files-6987400898452.webp', '施华洛世奇黑色天鹅（小）ICONIC SWAN 时尚经典项链圣诞节礼物', 1000.00, 0, 0, 0, 100101, '首饰;项链', '2022-11-17', '2022-11-17');
INSERT INTO `goods` VALUES (3, 'files-6937707196733.webp', '【新品】施华洛世奇 MILLENIA 腕表 手表 女 圣诞节礼物', 1500.00, 0, 0, 0, 100102, '首饰;项链', '2022-11-17', NULL);
INSERT INTO `goods` VALUES (4, 'files-6942721255493.webp', '【会员尊享】施华洛世奇官方旗舰店专属购物金 购物享折上折', 888.00, 0, 0, 0, 100103, '首饰;项链', '2022-11-17', NULL);
INSERT INTO `goods` VALUES (5, 'files-6946217802295.webp', '施华洛世奇跳动的心 SPARKLING DANCE耀动晶彩女项链圣诞礼物时尚', 628.00, 0, 0, 0, 100104, '耀动精彩;项链', '2022-11-17', '2022-11-17');
INSERT INTO `goods` VALUES (6, 'files-6927050258375.webp', '施华洛世奇 SWAN PAVE 小天鹅 高贵迷人 女项链 时尚圣诞节礼物', 368.00, 0, 0, 0, 100105, '首饰;项链', '2022-11-17', NULL);
INSERT INTO `goods` VALUES (7, 'files-6937283121282.webp', '施华洛世奇 ELDERFLOWER 女士手链 浪漫玫瑰金花朵 圣诞节礼物', 256.00, 0, 0, 0, 100106, '首饰;手链', '2022-11-17', NULL);
INSERT INTO `goods` VALUES (8, 'files-6937516261002.webp', '施华洛世奇 Annual Edition 2022 挂饰 雪花造型 圣诞礼物装饰品', 560.00, 0, 0, 0, 100107, '首饰;挂饰', '2022-11-17', NULL);
INSERT INTO `goods` VALUES (9, 'files-6930398395881.webp', '施华洛世奇CATTITUDE月夜猫星人女项链锁骨链圣诞节礼物饰品小众', 960.00, 0, 0, 0, 100108, '首饰;项链', '2022-11-17', NULL);
INSERT INTO `goods` VALUES (10, 'files-6938060145729.webp', '施华洛世奇 LIFELONG BOW 双色蝴蝶结造型 女项链圣诞节礼物', 500.00, 0, 0, 0, 100109, '首饰;项链', '2022-11-17', NULL);
INSERT INTO `goods` VALUES (11, 'files-6930897242576.webp', '施华洛世奇 SWAROVSKI INFINITY 女手链 简约 圣诞节礼物 可调节', 999.00, 0, 0, 0, 100110, '首饰;手链', '2022-11-17', NULL);
INSERT INTO `goods` VALUES (12, 'files-6946217802295.webp', ' Play 00:01 00:21   施华洛世奇HINT简约现代叠搭时尚小蛮腰女项链圣诞节礼物轻奢精致', 520.00, 0, 0, 0, 100111, '首饰;项链', '2022-11-17', NULL);
INSERT INTO `goods` VALUES (13, 'files-6940659013075.webp', '施华洛世奇 SWAROVSKI SYMBOL 星星造型 女项链锁骨链圣诞节礼物', 999.00, 0, 0, 0, 100112, '首饰;骨链', '2022-11-17', NULL);
INSERT INTO `goods` VALUES (14, 'files-6921094635639.webp', '施华洛世奇跳动的心Millenia方糖造型项链圣诞节礼物气质简约', 960.00, 0, 0, 0, 100113, '首饰;项链', '2022-11-17', NULL);
INSERT INTO `goods` VALUES (15, 'files-6930897242576.webp', '施华洛世奇 FURTHER 项链 时尚立体编结 女士 锁骨链圣诞节礼物', 550.00, 0, 0, 0, 100114, '首饰;项链', '2022-11-17', NULL);
INSERT INTO `goods` VALUES (16, 'files-6930897242576.webp', '施华洛世奇 Generation 链坠 项链 女 可调节 圣诞节礼物', 630.00, 0, 0, 0, 100115, '首饰;项链', '2022-11-17', NULL);
INSERT INTO `goods` VALUES (17, 'files-6945498581537.webp', '施华洛世奇 LIFELONG HRT 挚爱璀璨 女戒指 时尚精致圣诞节礼物', 660.00, 0, 0, 0, 100116, '首饰;戒指', '2022-11-17', NULL);
INSERT INTO `goods` VALUES (18, 'files-6944180075414.webp', '施华洛世奇Harry Potter金色飞贼挂饰 《哈利·波特》圣诞礼物', 600.00, 0, 0, 0, 100117, '首饰;挂饰', '2022-11-17', NULL);
INSERT INTO `goods` VALUES (19, 'files-6938916206143.webp', '施华洛世奇Orbita 项链 圣诞节礼物 女 甜酷 轻奢 双面佩戴', 680.00, 0, 0, 0, 100118, '首饰;项链', '2022-11-17', NULL);
INSERT INTO `goods` VALUES (20, 'files-6944180075414.webp', '施华洛世奇 ELDERFLOWER 女士手链 浪漫玫瑰金花朵 圣诞节礼物', 800.00, 0, 0, 0, 100119, '首饰;手链', '2022-11-17', NULL);
INSERT INTO `goods` VALUES (21, 'files-6939119198950.webp', '施华洛世奇TOUGH花朵小清新纯洁优雅耳钉女圣诞节礼物欧美', 600.00, 0, 0, 0, 100120, '首饰;耳钉', '2022-11-17', NULL);
INSERT INTO `goods` VALUES (22, 'files-6939798213652.webp', '施华洛世奇恶魔之眼 SWAROVSKI SYMBOL 女项链锁骨链圣诞节礼物', 900.00, 0, 0, 0, 100121, '首饰;项链', '2022-11-17', NULL);
INSERT INTO `goods` VALUES (23, 'files-69396358796.webp', ' Play 00:03 00:15   施华洛世奇 Festive 2021年度限定挂饰 星星造型 圣诞礼物 装饰品', 400.00, 0, 0, 0, 100122, '首饰;挂饰', '2022-11-17', NULL);
INSERT INTO `goods` VALUES (24, 'files-6931465529492.webp', '施华洛世奇 DAZZLING SWAN 浪漫天鹅 多戴女耳环 流苏圣诞节礼物', 782.00, 0, 0, 0, 100123, '首饰;耳环', '2022-11-17', NULL);
INSERT INTO `goods` VALUES (25, 'files-6944180075414.webp', '【新品】施华洛世奇 DEXTERA 手镯 圣诞节礼物 饰品 中性工业凤', 880.00, 0, 0, 0, 100124, '首饰;手镯', '2022-11-17', NULL);
INSERT INTO `goods` VALUES (26, 'files-6940140714712.webp', '施华洛世奇 SUNSHINE 太阳图案 雅致光韵 女耳钉 气质圣诞节礼物', 600.00, 0, 0, 0, 100125, '首饰;耳钉', '2022-11-17', NULL);
INSERT INTO `goods` VALUES (27, 'files-6939798213652.webp', '施华洛世奇 Gratia 珠链如意 手链 女 饰品 圣诞礼物 可调节设计', 600.00, 0, 0, 0, 100126, '首饰;手链', '2022-11-17', NULL);

-- ----------------------------
-- Table structure for homepage
-- ----------------------------
DROP TABLE IF EXISTS `homepage`;
CREATE TABLE `homepage`  (
  `class` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `img` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `number` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT '',
  PRIMARY KEY (`class`, `img`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of homepage
-- ----------------------------
INSERT INTO `homepage` VALUES ('foot', 'files-166868540481.png', '');
INSERT INTO `homepage` VALUES ('foot', 'files-166868540482.png', '');
INSERT INTO `homepage` VALUES ('foot', 'files-166868540483.png', '');
INSERT INTO `homepage` VALUES ('foot', 'files-166868540484.png', '');
INSERT INTO `homepage` VALUES ('foot', 'files-166868540485.png', '');
INSERT INTO `homepage` VALUES ('foot', 'files-166868540486.png', '');
INSERT INTO `homepage` VALUES ('foot', 'files-166868540487.png', '');
INSERT INTO `homepage` VALUES ('head', 'files-16686854048171.jpg', '');
INSERT INTO `homepage` VALUES ('head', 'files-16686854048172.jpg', '');
INSERT INTO `homepage` VALUES ('head', 'files-16686854048173.jpg', '');
INSERT INTO `homepage` VALUES ('jgg', 'files-1668685404276581.png', '100118');
INSERT INTO `homepage` VALUES ('jgg', 'files-1668685404276582.png', '100119');
INSERT INTO `homepage` VALUES ('jgg', 'files-1668685404276583.png', '100120');
INSERT INTO `homepage` VALUES ('jgg', 'files-1668685404276584.png', '100121');
INSERT INTO `homepage` VALUES ('jgg', 'files-1668685404276585.png', '100122');
INSERT INTO `homepage` VALUES ('jgg', 'files-1668685404276586.png', '100123');
INSERT INTO `homepage` VALUES ('jgg', 'files-1668685404276587.png', '100124');
INSERT INTO `homepage` VALUES ('jgg', 'files-1668685404276588.png', '100125');
INSERT INTO `homepage` VALUES ('jgg', 'files-1668685404276589.png', '100126');
INSERT INTO `homepage` VALUES ('main', 'files-166868540487641.png', '100106');
INSERT INTO `homepage` VALUES ('main', 'files-1668685404876410.png', '100115');
INSERT INTO `homepage` VALUES ('main', 'files-1668685404876411.png', '100116');
INSERT INTO `homepage` VALUES ('main', 'files-1668685404876412.png', '100117');
INSERT INTO `homepage` VALUES ('main', 'files-166868540487642.png', '100107');
INSERT INTO `homepage` VALUES ('main', 'files-166868540487643.png', '100108');
INSERT INTO `homepage` VALUES ('main', 'files-166868540487644.png', '100109');
INSERT INTO `homepage` VALUES ('main', 'files-166868540487645.png', '100110');
INSERT INTO `homepage` VALUES ('main', 'files-166868540487646.png', '100111');
INSERT INTO `homepage` VALUES ('main', 'files-166868540487647.png', '100112');
INSERT INTO `homepage` VALUES ('main', 'files-166868540487648.png', '100113');
INSERT INTO `homepage` VALUES ('main', 'files-166868540487649.png', '100114');
INSERT INTO `homepage` VALUES ('swiper', 'files-16686854048sw1.jpg', '100100');
INSERT INTO `homepage` VALUES ('swiper', 'files-16686854048sw2.jpg', '100101');
INSERT INTO `homepage` VALUES ('swiper', 'files-16686854048sw3.jpg', '100102');
INSERT INTO `homepage` VALUES ('swiper', 'files-16686854048sw4.jpg', '100103');
INSERT INTO `homepage` VALUES ('swiper', 'files-16686854048sw5.jpg', '100104');
INSERT INTO `homepage` VALUES ('swiper', 'files-16686854048sw6.jpg', '100105');

-- ----------------------------
-- Table structure for type
-- ----------------------------
DROP TABLE IF EXISTS `type`;
CREATE TABLE `type`  (
  `id` varchar(3) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `flag` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT '是',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of type
-- ----------------------------
INSERT INTO `type` VALUES ('100', '热卖推荐', '是');
INSERT INTO `type` VALUES ('110', '跃动晶彩', '是');
INSERT INTO `type` VALUES ('111', '白银款', '否');
INSERT INTO `type` VALUES ('112', '黄金款', '是');
INSERT INTO `type` VALUES ('113', '白金款', '是');
INSERT INTO `type` VALUES ('120', '幸运守护', '是');
INSERT INTO `type` VALUES ('121', '男款', '是');
INSERT INTO `type` VALUES ('122', '女款', '是');
INSERT INTO `type` VALUES ('130', '经典天鹅', '是');
INSERT INTO `type` VALUES ('131', '白银款', '是');
INSERT INTO `type` VALUES ('132', '黄金款', '是');
INSERT INTO `type` VALUES ('200', '首饰分类', '是');
INSERT INTO `type` VALUES ('210', '项链', '是');
INSERT INTO `type` VALUES ('211', '男款', '否');
INSERT INTO `type` VALUES ('212', '女款', '是');
INSERT INTO `type` VALUES ('220', '手链', '是');
INSERT INTO `type` VALUES ('221', '男款', '是');
INSERT INTO `type` VALUES ('222', '女款', '是');
INSERT INTO `type` VALUES ('230', '耳饰', '是');
INSERT INTO `type` VALUES ('231', '男款', '是');
INSERT INTO `type` VALUES ('232', '女款', '是');
INSERT INTO `type` VALUES ('240', '戒指', '是');
INSERT INTO `type` VALUES ('241', '白银款', '是');
INSERT INTO `type` VALUES ('300', '宝贝分类', '是');
INSERT INTO `type` VALUES ('310', '挂饰', '是');
INSERT INTO `type` VALUES ('320', '耳环', '是');
INSERT INTO `type` VALUES ('330', '耳线', '是');
INSERT INTO `type` VALUES ('340', '手链', '是');
INSERT INTO `type` VALUES ('350', '手镯', '是');
INSERT INTO `type` VALUES ('360', '手饰', '是');
INSERT INTO `type` VALUES ('400', '家具摆件', '是');
INSERT INTO `type` VALUES ('410', '十二生肖摆件', '是');

-- ----------------------------
-- Table structure for type1
-- ----------------------------
DROP TABLE IF EXISTS `type1`;
CREATE TABLE `type1`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `fa` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `flag` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '是',
  `child` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 662 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of type1
-- ----------------------------
INSERT INTO `type1` VALUES (1, '跃动晶彩', '热卖推荐', '是', '白银款;黄金款');
INSERT INTO `type1` VALUES (2, '幸运守护', '热卖推荐', '是', '男款;女款');
INSERT INTO `type1` VALUES (3, '经典天鹅', '热卖推荐', '是', '白银款;黄金款');
INSERT INTO `type1` VALUES (4, '项链', '首饰分类', '是', '男款;女款');
INSERT INTO `type1` VALUES (5, '手链', '首饰分类', '是', '男款;女款');
INSERT INTO `type1` VALUES (6, '耳饰', '首饰分类', '是', '男款;女款');
INSERT INTO `type1` VALUES (7, '戒指', '首饰分类', '是', '白银款;黄金款');
INSERT INTO `type1` VALUES (8, '套装', '首饰分类', '是', '男款;女款');
INSERT INTO `type1` VALUES (9, '手表（腕表）', '首饰分类', '是', '白银款;黄金款');
INSERT INTO `type1` VALUES (10, '挂饰', '宝贝分类', '是', '男款;女款');
INSERT INTO `type1` VALUES (11, '耳环', '宝贝分类', '是', '男款;女款');
INSERT INTO `type1` VALUES (12, '耳线', '宝贝分类', '是', '男款;女款');
INSERT INTO `type1` VALUES (13, '手链', '宝贝分类', '是', '男款;女款');
INSERT INTO `type1` VALUES (14, '手镯', '宝贝分类', '是', '白银款;黄金款');
INSERT INTO `type1` VALUES (15, '手饰', '宝贝分类', '是', '白银款;黄金款');
INSERT INTO `type1` VALUES (16, '十二生肖摆件', '家具摆件', '是', '男款;女款');
INSERT INTO `type1` VALUES (17, 'KRIS BEAR系列摆件', '家具摆件', '是', '男款;女款');
INSERT INTO `type1` VALUES (18, '挂饰', '家具摆件', '是', '白银款;黄金款');
INSERT INTO `type1` VALUES (19, '摆件', '家具摆件', '是', '男款;女款');

-- ----------------------------
-- Table structure for userdata
-- ----------------------------
DROP TABLE IF EXISTS `userdata`;
CREATE TABLE `userdata`  (
  `username` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `collection` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`username`) USING BTREE,
  CONSTRAINT `userdata_ibfk_1` FOREIGN KEY (`username`) REFERENCES `users` (`username`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of userdata
-- ----------------------------
INSERT INTO `userdata` VALUES ('admin', '');
INSERT INTO `userdata` VALUES ('tb17807815598', NULL);
INSERT INTO `userdata` VALUES ('tb18112345678', NULL);
INSERT INTO `userdata` VALUES ('tb18212345678', NULL);
INSERT INTO `userdata` VALUES ('tb18312345678', NULL);
INSERT INTO `userdata` VALUES ('undefined', NULL);

-- ----------------------------
-- Table structure for users
-- ----------------------------
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `headphoto` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT 'files-default.webp',
  `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `phone` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `power` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT 'user',
  `rejTime` datetime(0) NULL DEFAULT NULL,
  `loginTime` datetime(0) NULL DEFAULT NULL,
  `exist` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT 'true',
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `username`(`username`) USING BTREE,
  UNIQUE INDEX `phone`(`phone`) USING BTREE,
  UNIQUE INDEX `email`(`email`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 34 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of users
-- ----------------------------
INSERT INTO `users` VALUES (1, 'admin', 'e18abca0-70c8-4489-9fab-4a68090015e5', '$2a$10$xPmTmZgVXCyiUX4gRjhHVeh6Rbvf.LH4qZ3UwQyVuvANjb3MmakY2', '18888666555', '123.@com', 'admin', '2022-11-07 19:41:13', '2022-11-17 23:03:22', 'true');
INSERT INTO `users` VALUES (2, 'undefined', 'files-default.webp', '$2a$10$X1LNGl.Sw2Q10dj3kOS2FeX9KJPXMVm1wKLH9CWZy0CwJ06FAaY1q', '18012345678', NULL, 'user', '2022-11-17 21:47:55', '2022-11-17 22:07:43', 'true');
INSERT INTO `users` VALUES (3, 'tb18112345678', 'files-default.webp', '$2a$10$A7T4NSlvPuAxtB15bvTQv.lBH5oIw.Kcf0jo0jF4LNJo2uQ61U1AG', '18112345678', NULL, 'user', '2022-11-17 21:56:50', NULL, 'true');
INSERT INTO `users` VALUES (4, 'tb18212345678', 'files-default.webp', '$2a$10$WvH1iu0gAz3h09aTsv.U2eckTRpuFJVs4Mm3TF/b4yYmM0u6ZRdFe', '18212345678', NULL, 'user', '2022-11-17 21:58:59', NULL, 'true');
INSERT INTO `users` VALUES (5, 'tb18312345678', 'files-default.webp', '$2a$10$HIlGl1aTOQ2mpRmyq/3XSeendauipn0LZQ17FloerIceH2k/X6S8W', '18312345678', NULL, 'user', '2022-11-17 22:00:34', NULL, 'true');
INSERT INTO `users` VALUES (6, 'tb17807815598', 'files-default.webp', '$2a$10$JwWvho77jMikZ22gh7NwhuXGHIP9YxJJ3KhlTBj3bNJSEvgqFAGXK', '17807815598', NULL, 'user', '2022-11-17 22:43:09', NULL, 'true');

SET FOREIGN_KEY_CHECKS = 1;
