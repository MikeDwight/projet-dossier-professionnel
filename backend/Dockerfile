FROM node:18

WORKDIR /app

# Copie des fichiers package.json et package-lock.json si présent
COPY package*.json ./

# Installation des dépendances
RUN npm install

# Installation des outils globaux
RUN npm install -g ts-node nodemon

# Copie du reste de l'application
COPY . .

# Port exposé
EXPOSE 5000

# Commande de démarrage
CMD ["npm", "run", "dev"]
