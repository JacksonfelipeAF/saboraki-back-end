require("dotenv").config();

const express = require("express");
const cors = require("cors");

const conectarDB = require("./config/db");

const authRoutes = require("./routes/auth");
const producaoRoutes = require("./routes/producao");

const app = express();

app.use(cors());
app.use(express.json());

conectarDB();

app.use("/auth", authRoutes);
app.use("/producao", producaoRoutes);

app.listen(process.env.PORT || 3000, () => {
  console.log("Servidor rodando 🚀");
});
