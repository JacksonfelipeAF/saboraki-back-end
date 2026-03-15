require("dotenv").config();

const express = require("express");
const cors = require("cors");

const conectarDB = require("./config/db");

const authRoutes = require("./routes/auth");
const producaoRoutes = require("./routes/producao");

const app = express();

// Middleware JSON deve vir antes do CORS para Express 5
app.use(express.json());

app.use(
  cors({
    origin: [
      "https://saboraki.netlify.app",
      "http://localhost:3000",
      "http://localhost:5173",
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
    preflightContinue: false,
    optionsSuccessStatus: 204,
  }),
);

// Manipulador explícito para preflight requests
app.options("*", cors());

conectarDB();

app.use("/auth", authRoutes);
app.use("/producao", producaoRoutes);

// Health check route...
app.get("/health", (req, res) => {
  res.status(200).json({
    status: "OK",
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  });
});

app.listen(process.env.PORT || 3000, () => {
  console.log("Servidor rodando 🚀");
});
