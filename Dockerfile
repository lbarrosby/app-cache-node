# Etapa 1: Definir a imagem base (Node.js)
FROM node:16-alpine

# Etapa 2: Definir o diretório de trabalho dentro do container
WORKDIR /app

# Etapa 3: Copiar o package.json e o package-lock.json para o diretório de trabalho no container
COPY package*.json ./

# Etapa 4: Instalar as dependências da aplicação
RUN npm install

# Etapa 5: Copiar o restante do código da aplicação para o container
COPY . .

# Etapa 6: Expor a porta 8081, que é onde a aplicação Node.js estará rodando
EXPOSE 8081

# Etapa 7: Definir o comando para iniciar a aplicação
CMD ["node", "index.js"]

