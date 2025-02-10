-- 创建用户表
SET NAMES utf8mb4;
CREATE TABLE IF NOT EXISTS users (
  id VARCHAR(50) PRIMARY KEY,
  username VARCHAR(255) NOT NULL,
  password_hash VARCHAR(255),
  name VARCHAR(255),
  role VARCHAR(50),
  store_id VARCHAR(50),
  store_name VARCHAR(255),
  created_at DATETIME,
  updated_at DATETIME,
  INDEX idx_store (store_id),
  INDEX idx_role (role)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 插入用户数据
INSERT INTO users (id, username, password_hash, name, role, store_id, store_name, created_at, updated_at) VALUES ('678094103a1f1c1b269e17cb', 'admin', NULL, '管理员', 'admin', NULL, NULL, '2025-01-10 03:29:20', '2025-01-10 03:29:20');
INSERT INTO users (id, username, password_hash, name, role, store_id, store_name, created_at, updated_at) VALUES ('6785dff89dd1723eb9f27ec8', 'liujin', NULL, '刘瑾', 'executive', NULL, NULL, '2025-01-14 03:54:32', '2025-01-14 03:54:32');
INSERT INTO users (id, username, password_hash, name, role, store_id, store_name, created_at, updated_at) VALUES ('678bcaff9dd1723eb9f67a28', 'panyang', NULL, '潘洋', 'executive', NULL, NULL, '2025-01-18 15:38:39', '2025-01-18 15:38:39');