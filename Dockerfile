# Imagen base
FROM node:18

# Establece el directorio de trabajo
WORKDIR /app

# Copia los archivos de configuración
COPY package*.json ./

# Instala dependencias
RUN npm install

# Copia el resto de la app
COPY . .

# Expone el puerto de Vite
EXPOSE 5173

# Comando de arranque
CMD npm run dev