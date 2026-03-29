# Configuração MongoDB Local

## 1. Instalar MongoDB
### Windows:
1. Baixe MongoDB Community Server: https://www.mongodb.com/try/download/community
2. Execute o instalador
3. Marque "Install MongoDB as a Service"
4. Marque "Install MongoDB Compass"

### Ou via Docker:
```bash
docker run -d -p 27017:27017 --name mongodb mongo:latest
```

## 2. Configurar .env
Crie/edite o arquivo .env:
```
PORT=3000
MONGO_URI=mongodb://127.0.0.1:27017/saboraki
EMAIL_USER=seuemail@gmail.com
EMAIL_PASS=suasenha
JWT_SECRET=seusecretaqui
```

## 3. Iniciar MongoDB (se instalado localmente)
```bash
# Iniciar serviço MongoDB
net start MongoDB

# Ou manualmente
mongod --dbpath "C:\data\db"
```

## 4. Testar Conexão
```bash
node server.js
```

## 5. Verificar Banco de Dados
Acesse MongoDB Compass ou:
```bash
mongosh
use saboraki
db.users.find()
```
