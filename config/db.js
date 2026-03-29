const mongoose = require("mongoose");

async function conectarDB() {
  try {
    if (!process.env.MONGO_URI) {
      console.error("MONGO_URI não está definida nas variáveis de ambiente");
      process.exit(1);
    }

    await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 10000,
      socketTimeoutMS: 45000,
      bufferMaxEntries: 0,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("MongoDB conectado 🚀");
  } catch (erro) {
    console.error("Erro ao conectar MongoDB:", erro.message);
    console.error("Verifique se a MONGO_URI está correta no Railway");
    process.exit(1);
  }
}

module.exports = conectarDB;
