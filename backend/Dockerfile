FROM node:18

WORKDIR /app

COPY package*.json ./
RUN npm install
RUN npm install -g ts-node nodemon

# Installer les dépendances manquantes
RUN npm install express dotenv cors cookie-parser
RUN npm install --save-dev @types/express @types/node @types/cors @types/cookie-parser

COPY . .

EXPOSE 5000

CMD ["npm", "run", "dev"]
