const express = require("express");
const mysql = require("mysql2/promise");
const bcrypt = require("bcryptjs");
const db = require("./db-adapter");
const path = require("path");
const app = express();

app.use(express.json());
app.use(express.static(__dirname));

// 登录路由
app.post("/api/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    // 获取用户信息
    const user = await db.getUserByUsername(username);
    if (!user) {
      return res.status(401).json({ error: "用户名或密码错误" });
    }

    // 验证密码
    const isValid = await bcrypt.compare(password, user.password_hash);
    if (!isValid) {
      return res.status(401).json({ error: "用户名或密码错误" });
    }

    // 返回用户信息（不包含密码）
    const { password_hash, ...userInfo } = user;
    res.json({
      success: true,
      user: userInfo,
    });
  } catch (error) {
    console.error("登录失败:", error);
    res.status(500).json({ error: "登录失败，请重试" });
  }
});

// 创建数据表
app.post("/api/mysql/create-tables", async (req, res) => {
  const connection = await mysql.createConnection(req.body);
  try {
    // 设置字符集
    await connection.execute(`SET NAMES utf8mb4;`);

    // 创建用户表
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS users (
        id VARCHAR(50) PRIMARY KEY,
        username VARCHAR(255) NOT NULL UNIQUE,
        password_hash VARCHAR(255) NOT NULL,
        name VARCHAR(255),
        role VARCHAR(50),
        store_id VARCHAR(50),
        store_name VARCHAR(255),
        created_at DATETIME,
        updated_at DATETIME,
        INDEX idx_username (username),
        INDEX idx_role (role)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `);

    // 创建商品表
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS products (
        id VARCHAR(50) PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        old_name VARCHAR(255),
        category VARCHAR(100),
        source VARCHAR(100),
        price DECIMAL(10,2)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `);

    // 创建销售数据表
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS sales (
        id INT AUTO_INCREMENT PRIMARY KEY,
        date DATE NOT NULL,
        store_name VARCHAR(255) NOT NULL,
        product_name VARCHAR(255) NOT NULL,
        quantity INT NOT NULL,
        price DECIMAL(10,2),
        INDEX idx_date (date),
        INDEX idx_store (store_name),
        INDEX idx_product (product_name)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `);

    // 创建店铺表
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS stores (
        id VARCHAR(50) PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        brand VARCHAR(255),
        type VARCHAR(100),
        address TEXT,
        status VARCHAR(50)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `);

    // 创建盘点记录表
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS inventory (
        id INT AUTO_INCREMENT PRIMARY KEY,
        date DATE NOT NULL,
        store_name VARCHAR(255),
        store_id VARCHAR(50),
        operator VARCHAR(255),
        status VARCHAR(50),
        products JSON,
        INDEX idx_date (date),
        INDEX idx_store (store_name)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `);

    res.json({ message: "数据表创建成功" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  } finally {
    await connection.end();
  }
});

// 导入商品数据
app.post("/api/mysql/import-products", async (req, res) => {
  const { config, data } = req.body;
  const connection = await mysql.createConnection(config);

  try {
    for (const product of data) {
      await connection.execute(
        "INSERT INTO products (id, name, old_name, category, source, price) VALUES (?, ?, ?, ?, ?, ?)",
        [
          product.id,
          product.name,
          product.old_name,
          product.category,
          product.source,
          product.price,
        ]
      );
    }

    res.json({ count: data.length });
  } catch (error) {
    res.status(500).json({ error: error.message });
  } finally {
    await connection.end();
  }
});

// 导入销售数据
app.post("/api/mysql/import-sales", async (req, res) => {
  const { config, data } = req.body;
  const connection = await mysql.createConnection(config);

  try {
    for (const sale of data) {
      await connection.execute(
        "INSERT INTO sales (date, store_name, product_name, quantity, price) VALUES (?, ?, ?, ?, ?)",
        [
          sale.date,
          sale.store_name,
          sale.product_name,
          sale.quantity,
          sale.price,
        ]
      );
    }

    res.json({ count: data.length });
  } catch (error) {
    res.status(500).json({ error: error.message });
  } finally {
    await connection.end();
  }
});

// 导入店铺数据
app.post("/api/mysql/import-stores", async (req, res) => {
  const { config, data } = req.body;
  const connection = await mysql.createConnection(config);

  try {
    for (const store of data) {
      await connection.execute(
        "INSERT INTO stores (id, name, brand, type, address, status) VALUES (?, ?, ?, ?, ?, ?)",
        [
          store.id,
          store.name,
          store.brand,
          store.type,
          store.address,
          store.status,
        ]
      );
    }

    res.json({ count: data.length });
  } catch (error) {
    res.status(500).json({ error: error.message });
  } finally {
    await connection.end();
  }
});

// 导入盘点数据
app.post("/api/mysql/import-inventory", async (req, res) => {
  const { config, data } = req.body;
  const connection = await mysql.createConnection(config);

  try {
    for (const record of data) {
      await connection.execute(
        "INSERT INTO inventory (date, store_name, store_id, operator, status, products) VALUES (?, ?, ?, ?, ?, ?)",
        [
          record.date,
          record.store_name,
          record.store_id,
          record.operator,
          record.status,
          record.products,
        ]
      );
    }

    res.json({ count: data.length });
  } catch (error) {
    res.status(500).json({ error: error.message });
  } finally {
    await connection.end();
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
