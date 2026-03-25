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
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    preflightContinue: false,
    optionsSuccessStatus: 204,
  }),
);

app.use(express.json());

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
