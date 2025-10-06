#!/bin/bash

# Скрипт для быстрого развертывания Telegram Mini App

echo "🚀 Развертывание Telegram Mini App..."

# Проверяем наличие git
if ! command -v git &> /dev/null; then
    echo "❌ Git не установлен. Установите Git и повторите попытку."
    exit 1
fi

# Инициализируем git репозиторий если его нет
if [ ! -d ".git" ]; then
    echo "📁 Инициализация Git репозитория..."
    git init
    git add .
    git commit -m "Initial commit: Telegram Mini App - Менеджер Заданий"
fi

# Проверяем статус git
echo "📊 Статус Git репозитория:"
git status

echo ""
echo "✅ Приложение готово к развертыванию!"
echo ""
echo "📋 Следующие шаги:"
echo "1. Создайте репозиторий на GitHub"
echo "2. Выполните команды:"
echo "   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git"
echo "   git branch -M main"
echo "   git push -u origin main"
echo ""
echo "3. Включите GitHub Pages в настройках репозитория"
echo "4. URL будет: https://YOUR_USERNAME.github.io/YOUR_REPO"
echo ""
echo "5. Настройте бота в @BotFather с этим URL"
echo ""
echo "🔧 Для локального тестирования:"
echo "   python3 -m http.server 8000"
echo "   Откройте: http://localhost:8000"
