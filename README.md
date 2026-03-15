# Saboraki Backend

API RESTful para o sistema de gerenciamento de produção da Saboraki. Este backend oferece autenticação de usuários e funcionalidades para envio de relatórios de produção por e-mail.

## 🚀 Tecnologias Utilizadas

- **Node.js** - Runtime JavaScript
- **Express.js** - Framework web
- **MongoDB** - Banco de dados NoSQL
- **Mongoose** - ODM para MongoDB
- **JWT** - Autenticação via tokens
- **bcrypt** - Criptografia de senhas
- **nodemailer** - Envio de e-mails
- **cors** - Controle de acesso entre origens
- **dotenv** - Gerenciamento de variáveis de ambiente

## 📋 Pré-requisitos

- Node.js instalado
- MongoDB instalado e rodando
- Conta Gmail para envio de e-mails (com app password configurado)

## 🔧 Configuração

1. Clone este repositório
2. Instale as dependências:

```bash
npm install
```

3. Crie um arquivo `.env` baseado no `.env.exemple`:

```bash
cp .env.exemple .env
```

4. Configure as variáveis de ambiente no arquivo `.env`:

```
PORT=3000
EMAIL_USER=seu_email@gmail.com
EMAIL_PASS=sua_app_password
JWT_SECRET=sua_chave_secreta
MONGO_URI=mongodb://127.0.0.1:27017/saboraki
```

5. Inicie o servidor:

```bash
npm start
```

O servidor rodará na porta 3000 (ou na porta definida na variável `PORT`).

## 📡 Rotas da API

### Autenticação (`/auth`)

#### **POST** `/auth/login`

Realiza login de usuário e retorna um token JWT.

**Corpo da requisição:**

```json
{
  "email": "usuario@exemplo.com",
  "senha": "senha123"
}
```

**Resposta de sucesso:**

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Resposta de erro (401):**

```json
{
  "mensagem": "Email ou senha inválidos"
}
```

#### **POST** `/auth/register`

Cadastra um novo usuário no sistema.

**Corpo da requisição:**

```json
{
  "nome": "Nome do Usuário",
  "email": "usuario@exemplo.com",
  "senha": "senha123"
}
```

**Resposta de sucesso:**

```json
{
  "mensagem": "Usuário criado com sucesso"
}
```

**Resposta de erro (400):**

```json
{
  "mensagem": "Usuário já existe"
}
```

### Produção (`/producao`)

#### **POST** `/producao/enviar-email`

Envia um relatório de produção por e-mail com todos os dados formatados em HTML.

**Corpo da requisição:**

```json
{
  "operador": "Nome do Operador",
  "data": "15/03/2026",
  "turno": "Manhã",
  "maquina": "Máquina 01",
  "horaInicial": "08:00",
  "horaFinal": "16:00",
  "horasTrabalhadas": "8",
  "producaoHora": "100",
  "totalProduzido": "800",
  "somaPreforma": "15",
  "somaGarrafa": "10",
  "tabela": [
    {
      "grama": "500",
      "lote": "L001",
      "nCaixa": "123",
      "total": "100",
      "perdap": "2",
      "perdag": "1",
      "cor": "Azul",
      "volume": "500ml"
    }
  ]
}
```

**Resposta de sucesso:**

```json
{
  "mensagem": "Email enviado com sucesso!"
}
```

**Resposta de erro (500):**

```json
{
  "erro": "Erro ao enviar email"
}
```

## 🗄️ Modelo de Dados

### User

```javascript
{
  nome: String (obrigatório),
  email: String (obrigatório, único),
  senha: String (obrigatório, criptografada),
  criadoEm: Date (automático)
}
```

## 🔐 Segurança

- Senhas criptografadas com bcrypt (salt rounds: 10)
- Tokens JWT com expiração de 8 horas
- Validação de dados de entrada
- CORS configurado para permitir requisições de diferentes origens

## 📧 Funcionalidades de E-mail

O sistema utiliza o nodemailer com Gmail para envio de relatórios. O e-mail enviado contém:

- Cabeçalho com informações gerais (operador, data, turno, máquina)
- Tabela com métricas de produção
- Tabela detalhada com dados de produção por lote
- Formatação HTML profissional

## 🛠️ Estrutura do Projeto

```
back-end/
├── config/
│   └── db.js            # Configuração do MongoDB
├── middlewares/         # Middlewares personalizados
├── models/
│   └── User.js          # Modelo de usuário
├── routes/
│   ├── auth.js          # Rotas de autenticação
│   └── producao.js      # Rotas de produção
├── .env                 # Variáveis de ambiente
├── .env.exemple         # Exemplo de variáveis
├── .gitignore           # Arquivos ignorados pelo Git
├── package.json         # Dependências e scripts
└── server.js            # Arquivo principal do servidor
```

## 📝 Observações

- O servidor escuta na porta definida na variável `PORT` (padrão: 3000)
- O banco de dados MongoDB deve estar rodando antes de iniciar o servidor
- Para usar o envio de e-mails, configure um App Password no Gmail
- O token JWT expira em 8 horas por padrão

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/nova-funcionalidade`)
3. Commit suas mudanças (`git commit -am 'Adiciona nova funcionalidade'`)
4. Push para a branch (`git push origin feature/nova-funcionalidade`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está licenciado sob a licença ISC.

..
