require("dotenv").config();

const express = require("express");
const cors = require("cors");

const conectarDB = require("./config/db");

const authRoutes = require("./routes/auth");
const producaoRoutes = require("./routes/producao");
const usersRoutes = require("./routes/users");

const app = express();

app.use(
  cors({
    origin: [
      "https://saboraki.netlify.app",
      "https://saboraki-front-end-mbo3.vercel.app",
      "http://localhost:3000",
      "http://127.0.0.1:5500",
      "http://localhost:5500",
    ],
    credentials: true,
  }),
);

app.use(express.json());

app.use((req, res, next) => {
  const allowedOrigins = [
    "https://saboraki.netlify.app",
    "https://saboraki-front-end-mbo3.vercel.app",
    "http://localhost:3000",
    "http://127.0.0.1:5500",
    "http://localhost:5500",
  ];
  const origin = req.headers.origin;

  if (allowedOrigins.includes(origin)) {
    res.header("Access-Control-Allow-Origin", origin);
  }

  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.header("Access-Control-Allow-Credentials", "true");

  if (req.method === "OPTIONS") {
    return res.sendStatus(204);
  }

  next();
});

conectarDB();

app.use("/auth", authRoutes);
app.use("/producao", producaoRoutes);
app.use("/users", usersRoutes);

app.get("/health", (req, res) => {
  res.json({ status: "OK...🚀🚀🚀🚀" });
});

app.listen(process.env.PORT || 3000, () => {
  console.log("Servidor rodando 🚀");
});
