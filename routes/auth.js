const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const router = express.Router();

const User = require("../models/user");

// LOGIN
router.post("/login", async (req, res) => {
  const { email, senha } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ mensagem: "Email ou senha inválidos" });
    }

    const senhaValida = await bcrypt.compare(senha, user.senha);
    console.log("senhaValida ?", senhaValida);

    if (!senhaValida) {
      return res.status(401).json({ mensagem: "Email ou senha inválidos" });
    }

    const token = jwt.sign(
      { id: user._id, email: user.email, nome: user.nome },
      process.env.JWT_SECRET,
      { expiresIn: "8h" },
    );

    res.json({ token });
  } catch (erro) {
    console.error(erro);
    res.status(500).json({ erro: "Erro no servidor" });
  }
});

// CADASTRO
router.post("/register", async (req, res) => {
  const { nome, email, senha } = req.body;

  try {
    const usuarioExiste = await User.findOne({ email });

    if (usuarioExiste) {
      return res.status(400).json({ mensagem: "Usuário já existe" });
    }

    const senhaHash = await bcrypt.hash(senha, 10);

    const novoUsuario = new User({
      nome,
      email,
      senha: senhaHash,
    });

    await novoUsuario.save();

    res.json({ mensagem: "Usuário criado com sucesso" });
  } catch (erro) {
    res.status(500).json({ erro: "Erro ao criar usuário" });
  }
});

module.exports = router;
