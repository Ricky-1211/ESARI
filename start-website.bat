@echo off
title ESARI Official Website Server
echo ===================================================
echo Starting ESARI Luxury E-Commerce Website...
echo ===================================================
cd /d "%~dp0"
start "" "http://localhost:5173/"
npm.cmd run dev
pause
