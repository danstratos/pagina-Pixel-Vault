#!/bin/bash

echo "🎮 PIXEL VAULT - GAME STORE 🎮"
echo "================================"
echo ""
echo "📦 Instalando dependencias..."
npm install

echo ""
echo "🚀 Iniciando aplicación..."
echo ""
echo "⚠️  IMPORTANTE: Necesitas ejecutar el backend en otra terminal:"
echo "   Terminal 2: npm run server"
echo ""
echo "🌐 Frontend iniciando en http://localhost:3000"
echo "🔌 Backend disponible en http://localhost:3001"
echo ""

npm run dev
