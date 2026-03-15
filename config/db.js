const mongoose = require("mongoose");

async function conectarDB() {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB conectado 🚀");
  } catch (erro) {
    console.error("Erro ao conectar MongoDB:", erro);
    process.exit(1);
  }
}

module.exports = conectarDB;
