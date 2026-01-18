@echo off
title Figma MCP Intermediate Server
echo ========================================================
echo   KHOI DONG SERVER TRUNG GIAN (FIGMA MCP)
echo ========================================================
echo.
echo 1. Hay dam bao ban da cai dat figma-mcp-server
echo 2. Hay dam bao ban da bat Plugin trong Figma Desktop
echo.

:: Cấu hình đường dẫn tới thư mục repo figma-mcp-server
:: Mặc định giả định nó nằm cùng cấp với thư mục này
set SERVER_DIR=%~dp0figma-mcp-server

if exist "%SERVER_DIR%\dist\index.js" (
    cd /d "%SERVER_DIR%"
    echo Dang khoi dong server tai: %CD%
    echo Server dang cho ket noi tu Figma Plugin...
    echo.
    node dist\index.js
) else (
    echo [LOI] Khong tim thay file dist\index.js tai %SERVER_DIR%
    echo Vui long cai dat 'figma-mcp-server' va chay 'npm run build' truoc.
    echo Hoac chinh sua duong dan trong file .bat nay.
    pause
)
