-- 创建店铺表
SET NAMES utf8mb4;
CREATE TABLE IF NOT EXISTS stores (
  id VARCHAR(50) PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  brand VARCHAR(255),
  type VARCHAR(100),
  address TEXT,
  status VARCHAR(50)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 插入店铺数据
INSERT INTO stores (id, name, brand, type, address, status) VALUES ('678874059dd1723eb9f3ed27', '神仙树', '食圈儿', 'direct', '成都市神仙树地铁站内', 'open');
INSERT INTO stores (id, name, brand, type, address, status) VALUES ('678874053a1f1c1b26a2ac9e', '华府大道', '食圈儿', 'direct', '成都市华府大道地铁站', 'open');
INSERT INTO stores (id, name, brand, type, address, status) VALUES ('678874059dd1723eb9f3ed29', '昭觉寺南', '食圈儿', 'franchise', '成都市昭觉寺南地铁站', 'open');