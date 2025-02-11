const bcrypt = require("bcryptjs");
const db = require("./db-adapter");
const crypto = require("crypto");

async function createAdminUser() {
  try {
    // 管理员账户信息
    const adminUser = {
      id: crypto.randomUUID(), // Add unique ID
      username: "admin001", // 你可以修改为想要的用户名
      password: "zxc,./123", // 你可以修改为想要的密码
      name: "系统管理员",
      role: "admin",
    };

    // 检查用户名是否已存在
    const existingUser = await db.getUserByUsername(adminUser.username);
    if (existingUser) {
      console.log("管理员账户已存在");
      process.exit(0);
    }

    // 生成密码哈希
    const salt = await bcrypt.genSalt(10);
    const password_hash = await bcrypt.hash(adminUser.password, salt);

    // 创建用户
    await db.createUser({
      id: adminUser.id,
      username: adminUser.username,
      password_hash,
      name: adminUser.name,
      role: adminUser.role,
      store_id: null,
      store_name: null,
    });

    console.log("管理员账户创建成功！");
    console.log("用户名:", adminUser.username);
    console.log("密码:", adminUser.password);
  } catch (error) {
    console.error("创建管理员账户失败:", error);
  } finally {
    // 关闭数据库连接
    await db.close();
  }
}

// 运行创建脚本
createAdminUser();
