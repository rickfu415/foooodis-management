const mysql = require("mysql2/promise");
const config = require("./db-config");

class DatabaseAdapter {
  constructor() {
    this.pool = mysql.createPool(config);
  }

  // 用户相关操作
  async getUserByUsername(username) {
    const [rows] = await this.pool.execute(
      "SELECT * FROM users WHERE username = ?",
      [username]
    );
    return rows[0];
  }

  async createUser(userData) {
    const { username, password_hash, name, role, store_id, store_name } =
      userData;
    const [result] = await this.pool.execute(
      "INSERT INTO users (username, password_hash, name, role, store_id, store_name, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, NOW(), NOW())",
      [username, password_hash, name, role, store_id, store_name]
    );
    return result.insertId;
  }

  async updateUser(userId, userData) {
    const { name, role, store_id, store_name } = userData;
    await this.pool.execute(
      "UPDATE users SET name = ?, role = ?, store_id = ?, store_name = ?, updated_at = NOW() WHERE id = ?",
      [name, role, store_id, store_name, userId]
    );
  }

  // 商品相关操作
  async getProducts(filters = {}) {
    let query = "SELECT * FROM products WHERE 1=1";
    const params = [];

    if (filters.category) {
      query += " AND category = ?";
      params.push(filters.category);
    }
    if (filters.source) {
      query += " AND source = ?";
      params.push(filters.source);
    }

    const [rows] = await this.pool.execute(query, params);
    return rows;
  }

  async createProduct(productData) {
    const { name, old_name, category, source, price } = productData;
    const [result] = await this.pool.execute(
      "INSERT INTO products (name, old_name, category, source, price) VALUES (?, ?, ?, ?, ?)",
      [name, old_name, category, source, price]
    );
    return result.insertId;
  }

  async updateProduct(productId, productData) {
    const { name, old_name, category, source, price } = productData;
    await this.pool.execute(
      "UPDATE products SET name = ?, old_name = ?, category = ?, source = ?, price = ? WHERE id = ?",
      [name, old_name, category, source, price, productId]
    );
  }

  // 销售数据相关操作
  async getSales(filters = {}) {
    let query = "SELECT * FROM sales WHERE 1=1";
    const params = [];

    if (filters.start_date) {
      query += " AND date >= ?";
      params.push(filters.start_date);
    }
    if (filters.end_date) {
      query += " AND date <= ?";
      params.push(filters.end_date);
    }
    if (filters.store_name) {
      query += " AND store_name = ?";
      params.push(filters.store_name);
    }

    const [rows] = await this.pool.execute(query, params);
    return rows;
  }

  async createSale(saleData) {
    const { date, store_name, product_name, quantity, price } = saleData;
    const [result] = await this.pool.execute(
      "INSERT INTO sales (date, store_name, product_name, quantity, price) VALUES (?, ?, ?, ?, ?)",
      [date, store_name, product_name, quantity, price]
    );
    return result.insertId;
  }

  // 店铺相关操作
  async getStores(filters = {}) {
    let query = "SELECT * FROM stores WHERE 1=1";
    const params = [];

    if (filters.status) {
      query += " AND status = ?";
      params.push(filters.status);
    }

    const [rows] = await this.pool.execute(query, params);
    return rows;
  }

  async createStore(storeData) {
    const { name, brand, type, address, status } = storeData;
    const [result] = await this.pool.execute(
      "INSERT INTO stores (name, brand, type, address, status) VALUES (?, ?, ?, ?, ?)",
      [name, brand, type, address, status]
    );
    return result.insertId;
  }

  async updateStore(storeId, storeData) {
    const { name, brand, type, address, status } = storeData;
    await this.pool.execute(
      "UPDATE stores SET name = ?, brand = ?, type = ?, address = ?, status = ? WHERE id = ?",
      [name, brand, type, address, status, storeId]
    );
  }

  // 盘点记录相关操作
  async getInventory(filters = {}) {
    let query = "SELECT * FROM inventory WHERE 1=1";
    const params = [];

    if (filters.start_date) {
      query += " AND date >= ?";
      params.push(filters.start_date);
    }
    if (filters.end_date) {
      query += " AND date <= ?";
      params.push(filters.end_date);
    }
    if (filters.store_name) {
      query += " AND store_name = ?";
      params.push(filters.store_name);
    }

    const [rows] = await this.pool.execute(query, params);
    return rows;
  }

  async createInventory(inventoryData) {
    const { date, store_name, store_id, operator, status, products } =
      inventoryData;
    const [result] = await this.pool.execute(
      "INSERT INTO inventory (date, store_name, store_id, operator, status, products) VALUES (?, ?, ?, ?, ?, ?)",
      [date, store_name, store_id, operator, status, JSON.stringify(products)]
    );
    return result.insertId;
  }

  // 统计相关操作
  async getSalesStatistics(filters = {}) {
    let query = `
      SELECT 
        DATE_FORMAT(date, '%Y-%m') as month,
        store_name,
        SUM(quantity) as total_quantity,
        SUM(quantity * price) as total_amount
      FROM sales
      WHERE 1=1
    `;
    const params = [];

    if (filters.start_date) {
      query += " AND date >= ?";
      params.push(filters.start_date);
    }
    if (filters.end_date) {
      query += " AND date <= ?";
      params.push(filters.end_date);
    }
    if (filters.store_name) {
      query += " AND store_name = ?";
      params.push(filters.store_name);
    }

    query += " GROUP BY month, store_name ORDER BY month DESC, store_name";

    const [rows] = await this.pool.execute(query, params);
    return rows;
  }

  // 关闭数据库连接
  async close() {
    await this.pool.end();
  }
}

module.exports = new DatabaseAdapter();
