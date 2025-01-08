const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 3000;
const JWT_SECRET = "your-secret-key"; // In production, use environment variables

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());

// Read users from JSON file
function getUsers() {
  const rawData = fs.readFileSync(path.join(__dirname, "db/users.json"));
  return JSON.parse(rawData);
}

// Save users to JSON file
function saveUsers(data) {
  fs.writeFileSync(
    path.join(__dirname, "db/users.json"),
    JSON.stringify(data, null, 2)
  );
}

// Login endpoint
app.post("/api/login", async (req, res) => {
  const { username, password } = req.body;
  const data = getUsers();
  const user = data.users.find((u) => u.username === username);

  if (!user || user.status !== "active") {
    return res.status(401).json({ error: "用户名或密码错误" });
  }

  // In real application, compare hashed passwords
  // const validPassword = await bcrypt.compare(password, user.password);
  const validPassword = password === user.password; // Simplified for demo

  if (!validPassword) {
    return res.status(401).json({ error: "用户名或密码错误" });
  }

  // Create JWT token
  const token = jwt.sign(
    {
      id: user.id,
      username: user.username,
      role: user.role,
    },
    JWT_SECRET,
    { expiresIn: "24h" }
  );

  // Update last login
  user.last_login = new Date().toISOString();
  saveUsers(data);

  res.json({
    token,
    user: {
      id: user.id,
      username: user.username,
      name: user.name,
      role: user.role,
    },
  });
});

// Protected route example
app.get("/api/users", authenticateToken, (req, res) => {
  const data = getUsers();
  // Only send necessary user data, not passwords
  const safeUsers = data.users.map((user) => ({
    id: user.id,
    username: user.username,
    name: user.name,
    role: user.role,
    status: user.status,
  }));
  res.json(safeUsers);
});

// Middleware to verify JWT token
function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "未授权访问" });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ error: "令牌无效或已过期" });
    }
    req.user = user;
    next();
  });
}

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
