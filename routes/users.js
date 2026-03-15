const express = require("express");
const router = express.Router();

// Importar middleware de autenticação
const autenticarToken = require("../middlewares/autenticarToken");

// GET - Obter perfil do usuário
router.get("/perfil", autenticarToken, async (req, res) => {
  // Implementar lógica para obter dados do perfil
  res.json(req.user);
});

module.exports = router;
