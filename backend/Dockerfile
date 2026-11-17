# --- Etapa 1: Compilación de la aplicación con Maven y Java 21 ---
FROM maven:3.9.9-eclipse-temurin-21-alpine AS builder
WORKDIR /app

# Copiar descriptor de dependencias primero para optimizar cache de Docker
COPY pom.xml .
RUN mvn dependency:go-offline -B

# Copiar código fuente y compilar empaquetando el JAR ejecutable
COPY src ./src
RUN mvn clean package -DskipTests -B

# --- Etapa 2: Imagen de ejecución ligera con JRE 21 ---
FROM eclipse-temurin:21-jre-alpine
WORKDIR /app

# Crear usuario sin privilegios para seguridad en la nube
RUN addgroup -S appgroup && adduser -S appuser -G appgroup
USER appuser

# Copiar el artefacto compilado desde la etapa anterior
COPY --from=builder /app/target/*.jar app.jar

# Variables de entorno por defecto (sobrescribibles por OCI)
ENV PORT=8080
ENV SPRING_PROFILES_ACTIVE=prod

EXPOSE 8080

# Verificación de estado de salud (Health Check)
HEALTHCHECK --interval=30s --timeout=5s --start-period=40s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:${PORT}/api/health || exit 1

ENTRYPOINT ["java", "-Djava.security.egd=file:/dev/./urandom", "-jar", "app.jar"]
