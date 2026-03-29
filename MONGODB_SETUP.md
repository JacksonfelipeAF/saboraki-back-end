# Configuração MongoDB Atlas

## 1. Criar Cluster MongoDB Atlas
1. Acesse https://www.mongodb.com/atlas
2. Crie uma conta gratuita
3. Crie um novo cluster (escolha a opção gratuita M0)
4. Selecione o provedor (AWS/Azure/GCP) e região mais próxima

## 2. Configurar Acesso
1. Vá para "Database Access" → "Add New Database User"
2. Crie um usuário com senha forte
3. Dê permissões de "Read and write to any database"

## 3. Configurar IP Whitelist
1. Vá para "Network Access" → "Add IP Address"
2. Adicione "0.0.0.0/0" (permite acesso de qualquer IP)
3. Ou adicione seu IP específico

## 4. Obter Connection String
1. Vá para "Database" → "Connect"
2. Escolha "Connect your application"
3. Copie a connection string
4. Substitua <password> pela senha do usuário

## 5. Configurar Variável de Ambiente
No Railway ou no seu .env:
MONGO_URI=mongodb+srv://usuario:senha@cluster0.xxxxx.mongodb.net/nomedobanco?retryWrites=true&w=majority

## 6. Testar Conexão
Execute: node server.js
