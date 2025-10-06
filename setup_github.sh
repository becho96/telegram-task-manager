#!/bin/bash

# Скрипт для настройки GitHub репозитория

echo "🚀 Настройка GitHub репозитория для Telegram Mini App"
echo ""

# Проверяем статус git
echo "📊 Текущий статус Git:"
git status
echo ""

# Показываем команды для выполнения
echo "📋 Выполните следующие шаги:"
echo ""
echo "1. Создайте репозиторий на GitHub:"
echo "   - Откройте https://github.com/new"
echo "   - Название: telegram-task-manager"
echo "   - Описание: Telegram Mini App - Менеджер Заданий"
echo "   - Выберите Public"
echo "   - НЕ инициализируйте с README (у нас уже есть файлы)"
echo ""

echo "2. После создания репозитория выполните команды:"
echo ""
echo "   git remote add origin https://github.com/YOUR_USERNAME/telegram-task-manager.git"
echo "   git branch -M main"
echo "   git push -u origin main"
echo ""

echo "3. Включите GitHub Pages:"
echo "   - Перейдите в Settings → Pages"
echo "   - Source: Deploy from a branch"
echo "   - Branch: main"
echo "   - Folder: / (root)"
echo ""

echo "4. URL вашего приложения будет:"
echo "   https://YOUR_USERNAME.github.io/telegram-task-manager"
echo ""

echo "5. Настройте бота в @BotFather с этим URL"
echo ""

# Проверяем наличие файлов
echo "📁 Файлы готовы к загрузке:"
ls -la | grep -E "\.(html|css|js|json|md)$"
echo ""

echo "✅ Все готово для развертывания!"
echo "Следуйте инструкциям выше для завершения настройки."
