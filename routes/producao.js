const express = require("express");
const router = express.Router();
const { Resend } = require("resend");
const autenticarToken = require("../middlewares/autenticarToken");

const resend = new Resend(process.env.RESEND_API_KEY);

router.post("/enviar-email", autenticarToken, async (req, res) => {
  try {
    console.log("=== INÍCIO DO ENVIO DE EMAIL ===");
    console.log("Dados recebidos:", req.body);

    const {
      operador,
      data,
      turno,
      maquina,
      horaInicial,
      horaFinal,
      horasTrabalhadas,
      producaoHora,
      totalProduzido,
      somaPreforma,
      somaGarrafa,
      tabela,
      emailDestino,
    } = req.body;

    // Verificar se o emailDestino foi fornecido
    if (!emailDestino) {
      console.error("Email de destino não fornecido");
      return res.status(400).json({ erro: "Email de destino não fornecido" });
    }

    console.log("Email de destino:", emailDestino);
    console.log("RESEND_API_KEY existe?", !!process.env.RESEND_API_KEY);

    // GERAR LINHAS DA TABELA
    let linhasTabela = "";
    if (tabela && tabela.length > 0) {
      console.log("Processando tabela com", tabela.length, "linhas");
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

      // LINHA FINAL COM TOTAIS
      linhasTabela += `
        <tr style="font-weight:bold; background:#e0e0e0;">
          <td colspan="3" style="text-align:right;">TOTAL:</td>
          <td>${totalProduzido}</td>
          <td>${somaPreforma}</td>
          <td>${somaGarrafa}</td>
          <td colspan="2"></td>
        </tr>
      `;
    } else {
      console.log("Nenhuma tabela encontrada ou vazia");
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

    console.log("Enviando email via Resend...");

    const result = await resend.emails.send({
      from: "Sistema de Produção <onboarding@resend.dev>",
      to: emailDestino,
      subject: "Relatório de Produção",
      html: html,
    });

    console.log("Resposta do Resend:", result);
    console.log("=== EMAIL ENVIADO COM SUCESSO ===");

    res.json({ mensagem: "Email enviado com sucesso!" });
  } catch (erro) {
    console.error("=== ERRO NO ENVIO DE EMAIL ===");
    console.error("Erro completo:", erro);
    console.error("Mensagem do erro:", erro.message);
    console.error("Stack do erro:", erro.stack);

    res.status(500).json({
      erro: "Erro ao enviar email",
      detalhe: erro.message,
    });
  }
});

module.exports = router;
