/*
Navicat MySQL Data Transfer

Source Server         : db
Source Server Version : 80012
Source Host           : localhost:3306
Source Database       : text

Target Server Type    : MYSQL
Target Server Version : 80012
File Encoding         : 65001

Date: 2020-01-15 16:53:12
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for `per`
-- ----------------------------
DROP TABLE IF EXISTS `per`;
CREATE TABLE `per` (
  `perid` int(5) NOT NULL,
  `name` text NOT NULL,
  `per` int(5) NOT NULL COMMENT 'perid权限id  name锛氭潈闄愬悕绉? per锛氭潈闄愮被鍨?',
  PRIMARY KEY (`perid`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COMMENT='perid：权限id\r\nname：权限名称\r\nper：权限类型';

-- ----------------------------
-- Records of per
-- ----------------------------

-- ----------------------------
-- Table structure for `prolst`
-- ----------------------------
DROP TABLE IF EXISTS `prolst`;
CREATE TABLE `prolst` (
  `proid` int(10) NOT NULL AUTO_INCREMENT,
  `title` text,
  `img` text,
  `classid` int(10) DEFAULT NULL,
  `createdtime` text,
  `descs` text,
  PRIMARY KEY (`proid`)
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of prolst
-- ----------------------------
INSERT INTO `prolst` VALUES ('2', '新品上市', '/proimages/1579076807387.png', '1', '1579076807387', '震撼上市新品');

-- ----------------------------
-- Table structure for `user`
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `perid` int(5) NOT NULL,
  `username` text CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '鐢ㄦ埛琛?\n',
  `pass` text NOT NULL,
  `id` int(5) NOT NULL AUTO_INCREMENT,
  `topimg` text,
  `time` text NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES ('0', '杨华成', '57cb5a26334a6c1d5e27c49def4a0f0d', '4', null, '1577267415827');
INSERT INTO `user` VALUES ('0', '小明', '202cb962ac59075b964b07152d234b70', '5', null, '1577267611813');
INSERT INTO `user` VALUES ('0', '小李', '202cb962ac59075b964b07152d234b70', '6', null, '1577610499391');

-- ----------------------------
-- Table structure for `wenzhang`
-- ----------------------------
DROP TABLE IF EXISTS `wenzhang`;
CREATE TABLE `wenzhang` (
  `artid` int(10) NOT NULL AUTO_INCREMENT,
  `title` text,
  `content` text,
  `columns` text CHARACTER SET utf8 COLLATE utf8_general_ci,
  `createdtime` text CHARACTER SET utf8 COLLATE utf8_general_ci,
  `uploadtime` text CHARACTER SET utf8 COLLATE utf8_general_ci,
  `descs` text CHARACTER SET utf8 COLLATE utf8_general_ci,
  `author` text,
  `img` text,
  PRIMARY KEY (`artid`)
) ENGINE=MyISAM AUTO_INCREMENT=48 DEFAULT CHARSET=utf8 COMMENT='文章表\r\nartid：文章id\r\ntitle：文章标题\r\ncontent：文章标签内容\r\ncolumn：栏目id\r\ncreatedtime：创建时间\r\nuploadtime：更新时间\r\ndesc：文章描述\r\nauthor：文章作者\r\nimg：文章缩略图';

-- ----------------------------
-- Records of wenzhang
-- ----------------------------
INSERT INTO `wenzhang` VALUES ('47', '黑科技！隔空雷达手势控制的耳机也来了', '<p style=\"overflow: hidden;margin-top: 0px;margin-bottom: 10px;padding: 0px;text-indent: 3%;font-size: 14px;line-height: 20px;color: rgb(102, 102, 102);font-family: &#39;Microsoft Yahei&#39;, Tahoma, Helvetica, Arial, sans-serif;letter-spacing: 1px;white-space: normal;background-color: rgb(255, 255, 255)\"><span style=\"overflow: hidden;font-size: 16px\">Acconeer和Imagimob将在2020年CES国际消费电子展上展示手势雷达控制耳机。隔空手势控制耳机经过AI训练，可以识别五种手势，手势准确度高且接近零延迟。这是两家公司自今年5月份合作以来的首个成果。通过将Imagimob的Edge AI软件与Acconeer的PCR雷达传感器技术相结合，两家公司打造了一个创新的手势控制平台，非常适合消费类电子产品。</span></p><p style=\"overflow: hidden;margin-top: 0px;margin-bottom: 10px;padding: 0px;text-indent: 3%;font-size: 14px;line-height: 20px;color: rgb(102, 102, 102);font-family: &#39;Microsoft Yahei&#39;, Tahoma, Helvetica, Arial, sans-serif;letter-spacing: 1px;white-space: normal;background-color: rgb(255, 255, 255);text-align: center\"><img src=\"https://www.yl-x.cn/Uploads/editor/image/20191114/120191114015823_91206.png\" alt=\"\"/></p><p style=\"overflow: hidden;margin-top: 0px;margin-bottom: 10px;padding: 0px;text-indent: 3%;font-size: 14px;line-height: 20px;color: rgb(102, 102, 102);font-family: &#39;Microsoft Yahei&#39;, Tahoma, Helvetica, Arial, sans-serif;letter-spacing: 1px;white-space: normal;background-color: rgb(255, 255, 255)\"><br/></p><p style=\"overflow: hidden;margin-top: 0px;margin-bottom: 10px;padding: 0px;text-indent: 3%;font-size: 14px;line-height: 20px;color: rgb(102, 102, 102);font-family: &#39;Microsoft Yahei&#39;, Tahoma, Helvetica, Arial, sans-serif;letter-spacing: 1px;white-space: normal;background-color: rgb(255, 255, 255)\"><br/></p><p style=\"overflow: hidden;margin-top: 0px;margin-bottom: 10px;padding: 0px;font-size: 14px;line-height: 20px;color: rgb(102, 102, 102);font-family: &#39;Microsoft Yahei&#39;, Tahoma, Helvetica, Arial, sans-serif;letter-spacing: 1px;white-space: normal;background-color: rgb(255, 255, 255)\"><span style=\"overflow: hidden;font-size: 16px\">&nbsp; &nbsp; &nbsp; Imagimob</span><span style=\"overflow: hidden;font-size: 16px\">和</span><span style=\"overflow: hidden;font-size: 16px\">Acconeer</span><span style=\"overflow: hidden;font-size: 16px\">已达成长期合作协议，提供基于</span><span style=\"overflow: hidden;font-size: 16px\">PCR</span><span style=\"overflow: hidden;font-size: 16px\">雷达传感器和</span><span style=\"overflow: hidden;font-size: 16px\">Edge AI</span><span style=\"overflow: hidden;font-size: 16px\">技术相结合的解决方案。</span><span style=\"overflow: hidden;font-size: 16px\">CES</span><span style=\"overflow: hidden;font-size: 16px\">展会中的手势雷达耳机演示只是这种深度合作的第一个令人振奋的成果，两家公司正在机器人和汽车行业合作开发其他数个项目。</span></p><p style=\"overflow: hidden;margin-top: 0px;margin-bottom: 10px;padding: 0px;font-size: 14px;line-height: 20px;color: rgb(102, 102, 102);font-family: &#39;Microsoft Yahei&#39;, Tahoma, Helvetica, Arial, sans-serif;letter-spacing: 1px;white-space: normal;background-color: rgb(255, 255, 255)\"><span style=\"overflow: hidden;font-size: 16px\">&nbsp; &nbsp; &nbsp; 结合</span><span style=\"overflow: hidden;font-size: 16px\">AI</span><span style=\"overflow: hidden;font-size: 16px\">，小型精确的</span><span style=\"overflow: hidden;font-size: 16px\">PCR</span><span style=\"overflow: hidden;font-size: 16px\">雷达传感器市场正在迅速发展，这一点在最近的一些商业产品发布中得到了体现。消费电子产品及其他嵌入式系统有许多不同需求，但是，尺寸、成本和功耗是主要的制约条件；</span><span style=\"overflow: hidden;font-size: 16px\">AI + Radar</span><span style=\"overflow: hidden;font-size: 16px\">是完美的匹配，可以很好的解决此类制约问题。耳机是此类产品的一个很好的应用案例，其中使用雷达结合</span><span style=\"overflow: hidden;font-size: 16px\">AI</span><span style=\"overflow: hidden;font-size: 16px\">进行手势控制可以为用户提供更流畅、更安全、更直观的用户体验。</span></p><p style=\"overflow: hidden;margin-top: 0px;margin-bottom: 10px;padding: 0px;text-indent: 3%;font-size: 14px;line-height: 20px;color: rgb(102, 102, 102);font-family: &#39;Microsoft Yahei&#39;, Tahoma, Helvetica, Arial, sans-serif;letter-spacing: 1px;white-space: normal;background-color: rgb(255, 255, 255);text-align: center\"><img src=\"https://www.yl-x.cn/Uploads/editor/image/20191114/120191114015915_76887.png\" alt=\"\"/></p><p style=\"overflow: hidden;margin-top: 0px;margin-bottom: 10px;padding: 0px;text-indent: 3%;font-size: 14px;line-height: 20px;color: rgb(102, 102, 102);font-family: &#39;Microsoft Yahei&#39;, Tahoma, Helvetica, Arial, sans-serif;letter-spacing: 1px;white-space: normal;background-color: rgb(255, 255, 255)\"><br/></p><p style=\"overflow: hidden;margin-top: 0px;margin-bottom: 10px;padding: 0px;text-indent: 3%;font-size: 14px;line-height: 20px;color: rgb(102, 102, 102);font-family: &#39;Microsoft Yahei&#39;, Tahoma, Helvetica, Arial, sans-serif;letter-spacing: 1px;white-space: normal;background-color: rgb(255, 255, 255)\"><br/></p><p style=\"overflow: hidden;margin-top: 0px;margin-bottom: 10px;padding: 0px;font-size: 14px;line-height: 20px;color: rgb(102, 102, 102);font-family: &#39;Microsoft Yahei&#39;, Tahoma, Helvetica, Arial, sans-serif;letter-spacing: 1px;white-space: normal;background-color: rgb(255, 255, 255)\"><span style=\"overflow: hidden;font-size: 16px\">&nbsp; &nbsp; &nbsp; 与市面上大多数</span><span style=\"overflow: hidden;font-size: 16px\">FMCW</span><span style=\"overflow: hidden;font-size: 16px\">雷达传感器不同，</span><span style=\"overflow: hidden;font-size: 16px\">A111</span><span style=\"overflow: hidden;font-size: 16px\">雷达传感器是一款低功率、高精度、脉冲式短程雷达传感器，尺寸面积仅为29mm²。小尺寸和低功耗的优点使其非常适合集成到紧凑型电池驱动的设备中。最新发布的</span><span style=\"overflow: hidden;font-size: 16px\">IoT</span><span style=\"overflow: hidden;font-size: 16px\">模块</span><span style=\"overflow: hidden;font-size: 16px\">XM122</span><span style=\"overflow: hidden;font-size: 16px\">，基于</span><span style=\"overflow: hidden;font-size: 16px\">Arm®Cortex®-M4 MCU</span><span style=\"overflow: hidden;font-size: 16px\">，针对低功耗进行了优化，并添加了无线传输功能（例如蓝牙），可以在没有触摸屏空间的小型设备中进行原型设计和集成。</span></p><p style=\"overflow: hidden;margin-top: 0px;margin-bottom: 10px;padding: 0px;font-size: 14px;line-height: 20px;color: rgb(102, 102, 102);font-family: &#39;Microsoft Yahei&#39;, Tahoma, Helvetica, Arial, sans-serif;letter-spacing: 1px;white-space: normal;background-color: rgb(255, 255, 255)\"><span style=\"overflow: hidden;font-size: 16px\"><br/></span></p><p style=\"overflow: hidden;margin-top: 0px;margin-bottom: 10px;padding: 0px;text-indent: 28px;font-size: 14px;line-height: 20px;color: rgb(102, 102, 102);font-family: &#39;Microsoft Yahei&#39;, Tahoma, Helvetica, Arial, sans-serif;letter-spacing: 1px;white-space: normal;background-color: rgb(255, 255, 255)\"><span style=\"overflow: hidden;font-size: 16px\">&nbsp;Imagimob</span><span style=\"overflow: hidden;font-size: 16px\">和</span><span style=\"overflow: hidden;font-size: 16px\">Acconeer</span><span style=\"overflow: hidden;font-size: 16px\">正在进行的第一个联合项目证明了</span><span style=\"overflow: hidden;font-size: 16px\">A111</span><span style=\"overflow: hidden;font-size: 16px\">雷达传感器可以安装在耳机等小型可穿戴设备中。该技术适合所有类型的耳机，包括入耳式。据了解，耳机行业发展迅速，到</span><span style=\"overflow: hidden;font-size: 16px\">2024</span><span style=\"overflow: hidden;font-size: 16px\">年估计将超过</span><span style=\"overflow: hidden;font-size: 16px\">360</span><span style=\"overflow: hidden;font-size: 16px\">亿美元市场规模。</span></p><p style=\"overflow: hidden;margin-top: 0px;margin-bottom: 10px;padding: 0px;text-indent: 42px;font-size: 14px;line-height: 20px;color: rgb(102, 102, 102);font-family: &#39;Microsoft Yahei&#39;, Tahoma, Helvetica, Arial, sans-serif;letter-spacing: 1px;white-space: normal;background-color: rgb(255, 255, 255)\"><span style=\"overflow: hidden;font-size: 16px\">&nbsp;</span></p><p><span style=\"overflow: hidden;font-family: &#39;Microsoft Yahei&#39;, Tahoma, Helvetica, Arial, sans-serif;letter-spacing: 1px;background-color: rgb(255, 255, 255)\">&nbsp; &nbsp; &nbsp; Imagimob的手势应用程序可实现准确的手势检测，并具有低延迟实时性，手势应用程序是由Imagimob使用Imagimob AI开发的，并且是与Acconeer密切合作开发的。 Imagimob AI是用于开发Edge AI应用程序的一组软件工具。 Edge AI应用程序使具有智能和数据处理功能的小型低功耗设备实时获得可操作性， Acconeer雷达的输出信息非常适合此类算法。</span></p><p style=\"overflow: hidden;margin-top: 0px;margin-bottom: 10px;padding: 0px;text-indent: 3%;font-size: 14px;line-height: 20px;color: rgb(102, 102, 102);font-family: &#39;Microsoft Yahei&#39;, Tahoma, Helvetica, Arial, sans-serif;letter-spacing: 1px;white-space: normal;background-color: rgb(255, 255, 255)\"><br/></p><p style=\"overflow: hidden;margin-top: 0px;margin-bottom: 10px;padding: 0px;text-indent: 3%;font-size: 14px;line-height: 20px;color: rgb(102, 102, 102);font-family: &#39;Microsoft Yahei&#39;, Tahoma, Helvetica, Arial, sans-serif;letter-spacing: 1px;white-space: normal;background-color: rgb(255, 255, 255);text-align: center\"><img src=\"https://www.yl-x.cn/Uploads/editor/image/20191114/120191114020010_33959.png\" alt=\"\"/></p><p style=\"overflow: hidden;margin-top: 0px;margin-bottom: 10px;padding: 0px;text-indent: 3%;font-size: 14px;line-height: 20px;color: rgb(102, 102, 102);font-family: &#39;Microsoft Yahei&#39;, Tahoma, Helvetica, Arial, sans-serif;letter-spacing: 1px;white-space: normal;background-color: rgb(255, 255, 255);text-align: center\"><br/></p><p style=\"overflow: hidden;margin-top: 0px;margin-bottom: 10px;padding: 0px;text-indent: 42px;font-size: 14px;line-height: 20px;color: rgb(102, 102, 102);font-family: &#39;Microsoft Yahei&#39;, Tahoma, Helvetica, Arial, sans-serif;letter-spacing: 1px;white-space: normal;background-color: rgb(255, 255, 255)\"><span style=\"overflow: hidden;font-size: 16px\">关于</span><span style=\"overflow: hidden;font-size: 16px\">Acconeer AB</span></p><p style=\"overflow: hidden;margin-top: 0px;margin-bottom: 10px;padding: 0px;text-indent: 42px;font-size: 14px;line-height: 20px;color: rgb(102, 102, 102);font-family: &#39;Microsoft Yahei&#39;, Tahoma, Helvetica, Arial, sans-serif;letter-spacing: 1px;white-space: normal;background-color: rgb(255, 255, 255)\"><span style=\"overflow: hidden;font-size: 16px\">Acconeer</span><span style=\"overflow: hidden;font-size: 16px\">是一家世界领先的雷达传感器公司，总部位于瑞典南部无线技术最热门的地区隆德。</span><span style=\"overflow: hidden;font-size: 16px\">&nbsp;Acconeer</span><span style=\"overflow: hidden;font-size: 16px\">开发的一种真正领先的超低功耗，高精度</span><span style=\"overflow: hidden;font-size: 16px\">3D</span><span style=\"overflow: hidden;font-size: 16px\">传感器，采用</span><span style=\"overflow: hidden;font-size: 16px\">Aip</span><span style=\"overflow: hidden;font-size: 16px\">技术，集成天线、射频电路、信号预处理于一体。</span><span style=\"overflow: hidden;font-size: 16px\">&nbsp;Acconeer</span><span style=\"overflow: hidden;font-size: 16px\">超低功耗和毫米级精度传感器将是一种强大且具有成本效益的解决方案，适用于虚拟现实、智能家居、智能穿戴和机器人控制的各种应用。传感器的输出信息也可以用于识别不同的材料，这些都只是</span><span style=\"overflow: hidden;font-size: 16px\">PCR</span><span style=\"overflow: hidden;font-size: 16px\">雷达传感器应用领域的部分应用。更多其他行业运用，可以咨询</span><span style=\"overflow: hidden;font-size: 16px\">Acconeer</span><span style=\"overflow: hidden;font-size: 16px\">中国区代理商深圳市佰誉达科技有限公司。</span></p><p style=\"overflow: hidden;margin-top: 0px;margin-bottom: 10px;padding: 0px;text-indent: 42px;font-size: 14px;line-height: 20px;color: rgb(102, 102, 102);font-family: &#39;Microsoft Yahei&#39;, Tahoma, Helvetica, Arial, sans-serif;letter-spacing: 1px;white-space: normal;background-color: rgb(255, 255, 255)\"><br/></p><p style=\"overflow: hidden;margin-top: 0px;margin-bottom: 10px;padding: 0px;text-indent: 42px;font-size: 14px;line-height: 20px;color: rgb(102, 102, 102);font-family: &#39;Microsoft Yahei&#39;, Tahoma, Helvetica, Arial, sans-serif;letter-spacing: 1px;white-space: normal;background-color: rgb(255, 255, 255)\"><span style=\"overflow: hidden;font-size: 16px\">关于</span><span style=\"overflow: hidden;font-size: 16px\">Imagimob</span></p><p style=\"overflow: hidden;margin-top: 0px;margin-bottom: 10px;padding: 0px;text-indent: 42px;font-size: 14px;line-height: 20px;color: rgb(102, 102, 102);font-family: &#39;Microsoft Yahei&#39;, Tahoma, Helvetica, Arial, sans-serif;letter-spacing: 1px;white-space: normal;background-color: rgb(255, 255, 255)\"><span style=\"overflow: hidden;font-size: 16px\">Imagimob</span><span style=\"overflow: hidden;font-size: 16px\">是用于边缘设备的人工智能产品的全球领导者。 该公司总部位于瑞典斯德哥尔摩，自</span><span style=\"overflow: hidden;font-size: 16px\">2013</span><span style=\"overflow: hidden;font-size: 16px\">年以来一直为汽车，制造业、</span><a style=\"overflow: hidden\"></a><span style=\"overflow: hidden;font-size: 16px\">医疗保健和生活方式行业的客户提供服务。</span><span style=\"overflow: hidden;font-size: 16px\">Imagimob</span><span style=\"overflow: hidden;font-size: 16px\">经验丰富且富有远见的团队不懈地致力于保持最新研究。</span></p><p><br/></p>', '2', '1579069900759', '1579071076023', 'Acconeer和Imagimob将在2020年CES国际消费电子展上展示手势雷达控制耳机。', '杨帅哥', '/images/1579069900759.png');
