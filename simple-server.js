const express = require("express");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const app = express();
const PORT = 3001;
const JWT_SECRET = "bygagoos-simple-secret";

app.use(cors());
app.use(express.json());

// Donn√©es en m√©moire
const users = [
  {
    id: "1",
    email: "tovoniaina.rahendrison@gmail.com",
    password: bcrypt.hashSync("ByGagoos2025!", 10),
    name: "Tovoniaina RAHENDRISON",
    role: "SUPER_ADMIN"
  }
];

// Routes
app.get("/api/health", (req, res) => {
  res.json({ status: "OK", service: "ByGagoos Simple API", timestamp: new Date().toISOString() });
});

app.post("/api/auth/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = users.find(u => u.email === email);
    
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: "Identifiants incorrects" });
    }
    
    const token = jwt.sign({ userId: user.id, email: user.email }, JWT_SECRET);
    
    res.json({
      success: true,
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Erreur serveur" });
  }
});

app.listen(PORT, () => {
  console.log(`‚úÖ Backend simple d√©marr√© sur le port ${PORT}`);
  console.log(`Ì≥° Health: http://localhost:${PORT}/api/health`);
});
