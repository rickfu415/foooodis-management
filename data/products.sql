-- 创建商品表
SET NAMES utf8mb4;
CREATE TABLE IF NOT EXISTS products (
  id VARCHAR(50) PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  old_name VARCHAR(255),
  category VARCHAR(100),
  source VARCHAR(100),
  price DECIMAL(10,2)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 插入商品数据
INSERT INTO products (id, name, old_name, category, source, price) VALUES ('6789e7fb3a1f1c1b26a3d501', '包装袋', NULL, '材料', '其他', 0);
INSERT INTO products (id, name, old_name, category, source, price) VALUES ('6789e7fb3a1f1c1b26a3d502', '糯米鸡', NULL, '港式点心', '其他', 10);
INSERT INTO products (id, name, old_name, category, source, price) VALUES ('6789e7fb3a1f1c1b26a3d503', '全麦碱水', NULL, '烘焙类', '诚意', 6);
INSERT INTO products (id, name, old_name, category, source, price) VALUES ('6789e7fb3a1f1c1b26a3d504', '全麦碱贝果', '全麦碱水贝果', '烘焙类', '诚意', 6);
INSERT INTO products (id, name, old_name, category, source, price) VALUES ('6789e7fb3a1f1c1b26a3d505', '全麦贝果', NULL, '烘焙类', '诚意', 6);
INSERT INTO products (id, name, old_name, category, source, price) VALUES ('6789e7fb3a1f1c1b26a3d506', '卡仕达熊掌', NULL, '烘焙类', '诚意', 6);
INSERT INTO products (id, name, old_name, category, source, price) VALUES ('6789e7fb3a1f1c1b26a3d507', '原味碱水', NULL, '烘焙类', '诚意', 6);
INSERT INTO products (id, name, old_name, category, source, price) VALUES ('6789e7fb3a1f1c1b26a3d508', '原味贝果', NULL, '烘焙类', '诚意', 6);
INSERT INTO products (id, name, old_name, category, source, price) VALUES ('6789e7fb3a1f1c1b26a3d509', '培根面包', NULL, '烘焙类', '诚意', 6);
INSERT INTO products (id, name, old_name, category, source, price) VALUES ('6789e7fb3a1f1c1b26a3d50a', '墨西哥餐包', NULL, '烘焙类', '诚意', 6);
INSERT INTO products (id, name, old_name, category, source, price) VALUES ('6789e7fb3a1f1c1b26a3d50b', '燕麦碱水', NULL, '烘焙类', '诚意', 6);
INSERT INTO products (id, name, old_name, category, source, price) VALUES ('6789e7fb3a1f1c1b26a3d50c', '牛乳小饼', NULL, '烘焙类', '诚意', 6);
INSERT INTO products (id, name, old_name, category, source, price) VALUES ('6789e7fb3a1f1c1b26a3d50d', '牛奶卷', NULL, '烘焙类', '诚意', 6);
INSERT INTO products (id, name, old_name, category, source, price) VALUES ('6789e7fb3a1f1c1b26a3d50e', '牛奶米面包', NULL, '烘焙类', '诚意', 6);
INSERT INTO products (id, name, old_name, category, source, price) VALUES ('6789e7fb3a1f1c1b26a3d50f', '碱水贝果', NULL, '烘焙类', '诚意', 6);
INSERT INTO products (id, name, old_name, category, source, price) VALUES ('6789e7fb3a1f1c1b26a3d510', '肉松松面包', '肉松面包', '烘焙类', '诚意', 6);
INSERT INTO products (id, name, old_name, category, source, price) VALUES ('6789e7fb3a1f1c1b26a3d511', '茉莉素贝果', NULL, '烘焙类', '诚意', 6);
INSERT INTO products (id, name, old_name, category, source, price) VALUES ('6789e7fb3a1f1c1b26a3d512', '豆豆肉松松', NULL, '烘焙类', '诚意', 6);
INSERT INTO products (id, name, old_name, category, source, price) VALUES ('6789e7fb3a1f1c1b26a3d513', '凤梨酪酪碱水', NULL, '烘焙类', '诚意', 8);
INSERT INTO products (id, name, old_name, category, source, price) VALUES ('6789e7fb3a1f1c1b26a3d514', '南瓜海苔肉松松', NULL, '烘焙类', '诚意', 8);
INSERT INTO products (id, name, old_name, category, source, price) VALUES ('6789e7fb3a1f1c1b26a3d515', '双重芝士碱水', NULL, '烘焙类', '诚意', 8);
INSERT INTO products (id, name, old_name, category, source, price) VALUES ('6789e7fb3a1f1c1b26a3d516', '可可碱水', '巧克力碱水', '烘焙类', '诚意', 8);
INSERT INTO products (id, name, old_name, category, source, price) VALUES ('6789e7fb3a1f1c1b26a3d517', '可可麻薯包', '巧克力麻薯包', '烘焙类', '诚意', 8);
INSERT INTO products (id, name, old_name, category, source, price) VALUES ('6789e7fb3a1f1c1b26a3d518', '咸蛋黄碱水', NULL, '烘焙类', '诚意', 8);
INSERT INTO products (id, name, old_name, category, source, price) VALUES ('6789e7fb3a1f1c1b26a3d519', '奇亚籽碱水', NULL, '烘焙类', '诚意', 8);
INSERT INTO products (id, name, old_name, category, source, price) VALUES ('6789e7fb3a1f1c1b26a3d51a', '奶黄碱水', NULL, '烘焙类', '诚意', 8);
INSERT INTO products (id, name, old_name, category, source, price) VALUES ('6789e7fb3a1f1c1b26a3d51b', '德式肠肠芝碱水', '德式肠芝士碱水球', '烘焙类', '诚意', 8);
INSERT INTO products (id, name, old_name, category, source, price) VALUES ('6789e7fb3a1f1c1b26a3d51c', '抹茶椰椰', '抹茶椰贝', '烘焙类', '诚意', 8);
INSERT INTO products (id, name, old_name, category, source, price) VALUES ('6789e7fb3a1f1c1b26a3d51d', '抹茶豆豆碱水', '抹茶蜜豆碱水', '烘焙类', '诚意', 8);
INSERT INTO products (id, name, old_name, category, source, price) VALUES ('6789e7fb3a1f1c1b26a3d51e', '杏仁可可贝果', NULL, '烘焙类', '诚意', 8);
INSERT INTO products (id, name, old_name, category, source, price) VALUES ('6789e7fb3a1f1c1b26a3d51f', '杏仁椰椰包', '杏仁椰蓉包', '烘焙类', '诚意', 8);
INSERT INTO products (id, name, old_name, category, source, price) VALUES ('6789e7fb3a1f1c1b26a3d520', '椰香泥泥', '椰香芋泥', '烘焙类', '诚意', 8);
INSERT INTO products (id, name, old_name, category, source, price) VALUES ('6789e7fb3a1f1c1b26a3d521', '泥泥肉松松', '芋泥肉松包', '烘焙类', '诚意', 8);
INSERT INTO products (id, name, old_name, category, source, price) VALUES ('6789e7fb3a1f1c1b26a3d522', '海苔肉松松', NULL, '烘焙类', '诚意', 8);
INSERT INTO products (id, name, old_name, category, source, price) VALUES ('6789e7fb3a1f1c1b26a3d523', '焦糖可可贝果', '焦糖巧克力贝果', '烘焙类', '诚意', 8);
INSERT INTO products (id, name, old_name, category, source, price) VALUES ('6789e7fb3a1f1c1b26a3d524', '照烧鸡排', NULL, '烘焙类', '诚意', 8);
INSERT INTO products (id, name, old_name, category, source, price) VALUES ('6789e7fb3a1f1c1b26a3d525', '红豆酪酪碱水', '红豆乳酪碱水', '烘焙类', '诚意', 8);
INSERT INTO products (id, name, old_name, category, source, price) VALUES ('6789e7fb3a1f1c1b26a3d526', '肉桂卷', NULL, '烘焙类', '诚意', 8);
INSERT INTO products (id, name, old_name, category, source, price) VALUES ('6789e7fb3a1f1c1b26a3d527', '肠仔面包', NULL, '烘焙类', '诚意', 8);
INSERT INTO products (id, name, old_name, category, source, price) VALUES ('6789e7fb3a1f1c1b26a3d528', '酪酪抹茶碱水', '奶酪抹茶碱水', '烘焙类', '诚意', 8);
INSERT INTO products (id, name, old_name, category, source, price) VALUES ('6789e7fb3a1f1c1b26a3d529', '香香蜂蜜包', '奶香蜂蜜包', '烘焙类', '诚意', 8);
INSERT INTO products (id, name, old_name, category, source, price) VALUES ('6789e7fb3a1f1c1b26a3d52a', '麻麻可可贝果', '花椒巧克力贝果', '烘焙类', '诚意', 8);
INSERT INTO products (id, name, old_name, category, source, price) VALUES ('6789e7fb3a1f1c1b26a3d52b', '黑芝芝碱水', '黑芝麻碱水', '烘焙类', '诚意', 8);
INSERT INTO products (id, name, old_name, category, source, price) VALUES ('6789e7fb3a1f1c1b26a3d52c', '黑黑麻薯包', '黑芝麻麻薯包', '烘焙类', '诚意', 8);
INSERT INTO products (id, name, old_name, category, source, price) VALUES ('6789e7fb3a1f1c1b26a3d52d', '南瓜巴斯克吐司', NULL, '烘焙类', '诚意', 10);
INSERT INTO products (id, name, old_name, category, source, price) VALUES ('6789e7fb3a1f1c1b26a3d52e', '可可黑芝芝碱水', '巧克力黑芝麻碱水', '烘焙类', '诚意', 10);
INSERT INTO products (id, name, old_name, category, source, price) VALUES ('6789e7fb3a1f1c1b26a3d52f', '抹茶酥酥贝果', '抹茶奶酥贝果', '烘焙类', '诚意', 10);
INSERT INTO products (id, name, old_name, category, source, price) VALUES ('6789e7fb3a1f1c1b26a3d530', '芋泥松松碱水', '芋泥肉松碱水', '烘焙类', '诚意', 10);
INSERT INTO products (id, name, old_name, category, source, price) VALUES ('6789e7fb3a1f1c1b26a3d531', '芒果酪酪碱水', '芒果乳酪碱水', '烘焙类', '诚意', 10);
INSERT INTO products (id, name, old_name, category, source, price) VALUES ('6789e7fb3a1f1c1b26a3d532', '茶茶柿子碱水', '红茶柿子碱水', '烘焙类', '诚意', 10);
INSERT INTO products (id, name, old_name, category, source, price) VALUES ('6789e7fb3a1f1c1b26a3d533', '蓝莓松子可可米', '蓝莓松子巧克力咖啡米', '烘焙类', '诚意', 10);
INSERT INTO products (id, name, old_name, category, source, price) VALUES ('6789e7fb3a1f1c1b26a3d534', '可可巴西莓', '巧克力巴西莓', '烘焙类', '诚意', 12);
INSERT INTO products (id, name, old_name, category, source, price) VALUES ('6789e7fb3a1f1c1b26a3d535', '芒果糯糯碱水', '芒果糯米碱水', '烘焙类', '诚意', 12);
INSERT INTO products (id, name, old_name, category, source, price) VALUES ('6789e7fb3a1f1c1b26a3d536', '莓玫瑰抹茶', '草莓玫瑰抹茶', '烘焙类', '诚意', 12);
INSERT INTO products (id, name, old_name, category, source, price) VALUES ('6789e7fb3a1f1c1b26a3d537', '萄萄酪酪抹茶', '葡萄乳酪抹茶碱水', '烘焙类', '诚意', 12);
INSERT INTO products (id, name, old_name, category, source, price) VALUES ('6789e7fb3a1f1c1b26a3d538', '南瓜西米露', NULL, '饮品类', '老广', 6);
INSERT INTO products (id, name, old_name, category, source, price) VALUES ('6789e7fb3a1f1c1b26a3d539', '小吊梨汤', NULL, '饮品类', '自制', 6);
INSERT INTO products (id, name, old_name, category, source, price) VALUES ('6789e7fb3a1f1c1b26a3d53a', '斑斓椰奶', NULL, '饮品类', '自制', 6);
INSERT INTO products (id, name, old_name, category, source, price) VALUES ('6789e7fb3a1f1c1b26a3d53b', '杏仁奶露', NULL, '饮品类', '老广', 6);
INSERT INTO products (id, name, old_name, category, source, price) VALUES ('6789e7fb3a1f1c1b26a3d53c', '柠檬冰红茶', NULL, '饮品类', '自制', 6);
INSERT INTO products (id, name, old_name, category, source, price) VALUES ('6789e7fb3a1f1c1b26a3d53d', '椰汁西米露', NULL, '饮品类', '老广', 6);
INSERT INTO products (id, name, old_name, category, source, price) VALUES ('6789e7fb3a1f1c1b26a3d53e', '榴莲椰奶', NULL, '饮品类', '自制', 6);
INSERT INTO products (id, name, old_name, category, source, price) VALUES ('6789e7fb3a1f1c1b26a3d53f', '玫瑰桂圆红枣', NULL, '饮品类', '自制', 6);
INSERT INTO products (id, name, old_name, category, source, price) VALUES ('6789e7fb3a1f1c1b26a3d540', '生榨杨梅', NULL, '饮品类', '自制', 6);
INSERT INTO products (id, name, old_name, category, source, price) VALUES ('6789e7fb3a1f1c1b26a3d541', '生榨鲜橙', NULL, '饮品类', '自制', 6);
INSERT INTO products (id, name, old_name, category, source, price) VALUES ('6789e7fb3a1f1c1b26a3d542', '红糖姜枣茶', NULL, '饮品类', '自制', 6);
INSERT INTO products (id, name, old_name, category, source, price) VALUES ('6789e7fb3a1f1c1b26a3d543', '红糖红豆沙', NULL, '饮品类', '老广', 6);
INSERT INTO products (id, name, old_name, category, source, price) VALUES ('6789e7fb3a1f1c1b26a3d544', '茶香红豆', NULL, '饮品类', '老广', 6);
INSERT INTO products (id, name, old_name, category, source, price) VALUES ('6789e7fb3a1f1c1b26a3d545', '酸角荔枝', NULL, '饮品类', '自制', 6);
INSERT INTO products (id, name, old_name, category, source, price) VALUES ('6789e7fb3a1f1c1b26a3d546', '青柠气泡水', NULL, '饮品类', '自制', 6);
INSERT INTO products (id, name, old_name, category, source, price) VALUES ('6789e7fb3a1f1c1b26a3d547', '马蹄爽', NULL, '饮品类', '老广', 6);
INSERT INTO products (id, name, old_name, category, source, price) VALUES ('6789e7fb3a1f1c1b26a3d548', '黑芝麻糊', NULL, '饮品类', '老广', 6);
INSERT INTO products (id, name, old_name, category, source, price) VALUES ('679afb93b2f19a158055866a', '桃李白切', NULL, '烘焙类', '诚意', 0);
INSERT INTO products (id, name, old_name, category, source, price) VALUES ('679afd246e25c660f943bb16', '桃李全麦', NULL, '烘焙类', '诚意', 0);
INSERT INTO products (id, name, old_name, category, source, price) VALUES ('679afd55b2f19a1580558697', '玫瑰桂圆红枣茶', NULL, '饮品类', '自制', 6);