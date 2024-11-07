# Usa una imagen oficial de Node.js como base
FROM node:18-alpine

# Directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiar los archivos package.json y package-lock.json (para aprovechar el cache de Docker)
COPY package*.json ./

# Instalar las dependencias
RUN npm install

# Copiar todo el contenido de la aplicación al contenedor
COPY . .

# Exponer el puerto 3000 (que es el puerto por defecto de React)
EXPOSE 3000

# Comando para iniciar el servidor de desarrollo de React
CMD ["npm", "start"]
