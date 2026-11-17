# --- Etapa 1: Construcción de la aplicación con Node.js ---
FROM node:20-alpine AS builder
WORKDIR /app

# Argumento para inyectar la URL de la API durante la construcción (build-time)
ARG VITE_API_URL=/api
ENV VITE_API_URL=$VITE_API_URL

# Copiar archivos de dependencias
COPY package*.json ./
RUN npm ci || npm install

# Copiar el código fuente y compilar
COPY . .
RUN npm run build

# --- Etapa 2: Servidor Nginx de producción para alojar los archivos compilados ---
FROM nginx:alpine
WORKDIR /usr/share/nginx/html

# Eliminar configuración y archivos por defecto de Nginx
RUN rm -rf ./* /etc/nginx/conf.d/default.conf

# Copiar configuración personalizada de Nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copiar el build compilado desde la etapa anterior
COPY --from=builder /app/dist .

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
