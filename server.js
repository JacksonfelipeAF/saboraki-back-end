require("dotenv").config();

const express = require("express");
const cors = require("cors");

const conectarDB = require("./config/db");

const authRoutes = require("./routes/auth");
const producaoRoutes = require("./routes/producao");

const app = express();

app.use(
  cors({
    origin: "https://saboraki.netlify.app",
    credentials: true,
  }),
);

app.use(express.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "https://saboraki.netlify.app");
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

app.get("/health", (req, res) => {
  res.json({ status: "OK" });
});

app.listen(process.env.PORT || 3000, () => {
  console.log("Servidor rodando 🚀");
});
