const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");
const autenticarToken = require("../middlewares/autenticarToken");

router.post("/enviar-email", autenticarToken, async (req, res) => {
  const {
    operador,
    data,
    turno,
    maquina,
    horaInicial,
    horaFinal,
    horasTrabalhadas,
    producaoHora,
    totalProduzido, // já calculado no dashboard
    somaPreforma, // soma da perda pré-forma do dashboard
    somaGarrafa, // soma da perda garrafa do dashboard
    tabela, // array com todas as linhas
    emailDestino, // email de destino vindo do frontend
  } = req.body;

  try {
    // Verificar se as variáveis de ambiente estão configuradas
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      console.error(
        "Variáveis de ambiente EMAIL_USER ou EMAIL_PASS não configuradas",
      );
      return res
        .status(500)
        .json({ erro: "Configuração de email não encontrada no servidor" });
    }

    // Verificar se o emailDestino foi fornecido
    if (!emailDestino) {
      return res.status(400).json({ erro: "Email de destino não fornecido" });
    }

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // GERAR LINHAS DA TABELA (não recalcula nada)
    let linhasTabela = "";
    if (tabela && tabela.length > 0) {
      tabela.forEach((item) => {
        linhasTabela += `
          <tr>
            <td>${item.grama}</td>
            <td>${item.lote}</td>
            <td>${item.nCaixa}</td>
            <td>${item.total}</td>
            <td>${item.perdap}</td>
            <td>${item.perdag}</td>
            <td>${item.cor}</td>
            <td>${item.volume}</td>
          </tr>
        `;
      });

      // LINHA FINAL COM TOTAIS já fornecidos pelo dashboard
      linhasTabela += `
        <tr style="font-weight:bold; background:#e0e0e0;">
          <td colspan="3" style="text-align:right;">TOTAL:</td>
          <td>${totalProduzido}</td>
          <td>${somaPreforma}</td>
          <td>${somaGarrafa}</td>
          <td colspan="2"></td>
        </tr>
      `;
    }

    // HTML do e-mail
    const html = `
      <div style="font-family: Arial; max-width: 800px; margin:auto;">
        <h2 style="text-align:center;">📊 RELATÓRIO DE PRODUÇÃO</h2>

        <p><b>Operador:</b> ${operador}</p>
        <p><b>Data:</b> ${data}</p>
        <p><b>Turno:</b> ${turno}</p>
        <p><b>Máquina:</b> ${maquina}</p>

        <h3>⏱ Informações de Produção</h3>
        <table border="1" cellpadding="6" cellspacing="0" width="100%">
          <tr><td><b>Hora Inicial</b></td><td>${horaInicial}</td></tr>
          <tr><td><b>Hora Final</b></td><td>${horaFinal}</td></tr>
          <tr><td><b>Horas Trabalhadas</b></td><td>${horasTrabalhadas}</td></tr>
          <tr><td><b>Produção por Hora</b></td><td>${producaoHora}</td></tr>
          <tr><td><b>Total Produzido</b></td><td>${totalProduzido}</td></tr>
          <tr><td><b>Perda Pré-forma</b></td><td>${somaPreforma}</td></tr>
          <tr><td><b>Perda Garrafa</b></td><td>${somaGarrafa}</td></tr>
        </table>

        <h3>📦 Tabela de Produção</h3>
        <table border="1" cellpadding="6" cellspacing="0" width="100%">
          <tr style="background:#f2f2f2;">
            <th>Grama</th>
            <th>Lote</th>
            <th>Nº Caixa</th>
            <th>Total</th>
            <th>Perda Préforma</th>
            <th>Perda Garrafa</th>
            <th>Cor</th>
            <th>Volume</th>
          </tr>
          ${linhasTabela}
        </table>

        <br>
        <p><b>Relatório gerado automaticamente pelo sistema de produção</b></p>
      </div>
    `;

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: emailDestino, // usando o email de destino do frontend
      subject: "Relatório de Produção",
      html: html,
    });

    res.json({ mensagem: "Email enviado com sucesso!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ erro: "Erro ao enviar email" });
  }
});

module.exports = router;
