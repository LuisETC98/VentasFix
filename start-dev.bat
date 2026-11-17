@echo off
echo =======================================================
echo     Iniciando Entorno de Desarrollo VentasFix PRO
echo =======================================================

echo [1/2] Levantando Backend (Spring Boot - Puerto 8080)...
start "VentasFix - Backend (Spring Boot)" cmd /k "cd backend && .\mvnw.cmd spring-boot:run"

echo [2/2] Levantando Frontend (React/Vite - Puerto 5173)...
start "VentasFix - Frontend (React)" cmd /k "cd frontend && npm run dev"

echo.
echo =======================================================
echo Los servicios se estan ejecutando en ventanas separadas.
echo Cierra las ventanas emergentes para detener los servidores.
echo =======================================================
pause
