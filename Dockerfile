# Utilizar la imagen base node:alpine
FROM node:22-alpine3.19

# Establecer el directorio de trabajo dentro del contenedor
WORKDIR /usr/src/app

# Instalar pnpm globalmente
RUN npm install -g pnpm

# Instalar el cliente de PostgreSQL
RUN apk update && apk add postgresql-client

# Copiar los archivos package.json y pnpm-lock.yaml al directorio de trabajo en el contenedor
COPY package.json pnpm-lock.yaml ./

# Instalar todas las dependencias incluyendo las de desarrollo
RUN pnpm install

# Verificar que TypeScript está instalado y disponible
RUN ./node_modules/.bin/tsc --version

# Copiar el resto del código de la aplicación al directorio de trabajo en el contenedor
COPY . .

# Exponer el puerto que utilizará la aplicación
EXPOSE 3001

# Comando para ejecutar la aplicación usando el script de desarrollo
CMD ["pnpm", "run", "dev"]
