const USERS_DATA = {
  users: [
    {
      id: "1",
      username: "admin",
      password: "zxc,./123",
      role: "admin",
      name: "管理员",
      status: "active",
      lastLogin: null,
    },
    {
      id: "2",
      username: "staff1",
      password: "zxc,./123",
      role: "staff",
      name: "张三",
      status: "active",
      lastLogin: null,
    },
  ],
};

// Function to check login credentials
function checkLogin(username, password) {
  const user = USERS_DATA.users.find(
    (u) =>
      u.username === username &&
      u.password === password &&
      u.status === "active"
  );

  if (user) {
    // Update last login
    user.lastLogin = new Date().toISOString();

    // Return user data without sensitive information
    return {
      id: user.id,
      username: user.username,
      name: user.name,
      role: user.role,
    };
  }

  return null;
}
