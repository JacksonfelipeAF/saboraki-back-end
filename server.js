require("dotenv").config();

const express = require("express");
const cors = require("cors");

const conectarDB = require("./config/db");

const authRoutes = require("./routes/auth");
const producaoRoutes = require("./routes/producao");

const app = express();

app.use(
  cors({
    origin: [
      "https://saboraki.netlify.app",
      "http://localhost:3000",
      "http://localhost:5173",
    ],
    credentials: true,
  }),
);

app.options("*", cors());

app.use(express.json());

conectarDB();

app.use("/auth", authRoutes);
app.use("/producao", producaoRoutes);

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
