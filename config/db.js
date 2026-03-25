const mongoose = require("mongoose");

async function conectarDB() {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      ssl: true,
      sslValidate: false,
      tls: true,
      tlsAllowInvalidCertificates: true,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    });

    console.log("MongoDB conectado 🚀");
  } catch (erro) {
    console.error("Erro ao conectar MongoDB:", erro);
    process.exit(1);
  }
}

module.exports = conectarDB;
