# 🚀 Быстрая настройка для becho96

## Ваш URL приложения будет:
**https://becho96.github.io/telegram-task-manager**

## 📋 Пошаговая инструкция:

### 1. Создайте репозиторий на GitHub

1. **Откройте:** https://github.com/new
2. **Заполните форму:**
   - Repository name: `telegram-task-manager`
   - Description: `Telegram Mini App - Менеджер Заданий`
   - Выберите **Public** ✅
   - ❌ НЕ отмечайте "Add a README file"
   - ❌ НЕ отмечайте "Add .gitignore"
   - ❌ НЕ отмечайте "Choose a license"
3. **Нажмите "Create repository"**

### 2. После создания репозитория выполните команды:

```bash
# Удалите текущий remote (если есть)
git remote remove origin

# Добавьте правильный remote
git remote add origin https://github.com/becho96/telegram-task-manager.git

# Загрузите файлы
git push -u origin main
```

### 3. Включите GitHub Pages

1. **Перейдите в настройки репозитория:**
   - Откройте: https://github.com/becho96/telegram-task-manager
   - Нажмите вкладку **"Settings"**
   - Прокрутите вниз до раздела **"Pages"**

2. **Настройте GitHub Pages:**
   - В разделе "Source" выберите **"Deploy from a branch"**
   - В разделе "Branch" выберите **"main"**
   - В разделе "Folder" выберите **"/ (root)"**
   - Нажмите **"Save"**

3. **Дождитесь развертывания** (1-2 минуты)

### 4. Проверьте приложение

Откройте в браузере: **https://becho96.github.io/telegram-task-manager**

### 5. Настройте Telegram бота

1. **Найдите @BotFather в Telegram**
2. **Создайте бота:**
   ```
   /newbot
   Название: Менеджер Заданий
   Username: becho96_task_manager_bot
   ```

3. **Создайте Mini App:**
   ```
   /newapp
   Выберите бота: becho96_task_manager_bot
   Название: Менеджер Заданий
   Описание: Персональный менеджер регулярных заданий
   URL: https://becho96.github.io/telegram-task-manager
   ```

4. **Настройте кнопку меню:**
   ```
   /setmenubutton
   Выберите бота: becho96_task_manager_bot
   Текст: 📋 Менеджер Заданий
   URL: https://becho96.github.io/telegram-task-manager
   ```

## 🎯 Финальная проверка

После выполнения всех шагов:

1. ✅ Приложение доступно по адресу: https://becho96.github.io/telegram-task-manager
2. ✅ Telegram бот создан и настроен
3. ✅ Кнопка меню работает
4. ✅ Приложение открывается в Telegram

## 🔧 Если что-то не работает:

### Проблема: "Repository not found"
**Решение:** Убедитесь, что репозиторий `telegram-task-manager` создан на GitHub

### Проблема: "Permission denied"
**Решение:** Убедитесь, что вы авторизованы в Git:
```bash
git config --global user.name "becho96"
git config --global user.email "your-email@example.com"
```

### Проблема: Приложение не загружается
**Решение:** 
- Проверьте, что GitHub Pages включен
- Убедитесь, что файл `index.html` в корне репозитория
- Подождите 2-3 минуты после включения Pages

## 📱 Готово!

После выполнения всех шагов ваш Telegram Mini App будет доступен по адресу:
**https://becho96.github.io/telegram-task-manager**

Поделитесь ссылкой на бота с друзьями! 🎉
