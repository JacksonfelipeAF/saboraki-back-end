require("dotenv").config();

const express = require("express");
const cors = require("cors");

const conectarDB = require("../config/db");
const authRoutes = require("../routes/auth");

const app = express();

app.use(cors({
  origin: [
    "https://saboraki.netlify.app",
    "https://saboraki-front-end-mbo3.vercel.app",
    "https://saboraki-front-end-v82i.vercel.app",
    "https://saboraki-back-787hyjwq2-jacksonfelipeafs-projects.vercel.app",
    "http://localhost:3000",
    "http://127.0.0.1:3000",
    "http://localhost:5500",
    "http://127.0.0.1:5500",
    "http://localhost:8080",
    "http://127.0.0.1:8080",
  ],
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));

app.use(express.json());

let isConnected = false;

async function connectToDatabase() {
  if (isConnected) return;
  try {
    if (!process.env.MONGO_URI) {
      console.error("MONGO_URI não está definida");
      return;
    }
    await conectarDB();
    isConnected = true;
  } catch (erro) {
    console.error("Erro ao conectar MongoDB:", erro.message);
  }
}

app.use(async (req, res, next) => {
  await connectToDatabase();
  next();
});

app.use(authRoutes);

module.exports = app;
