# 🚀 Включение GitHub Pages

## ✅ Файлы успешно загружены на GitHub!

Ваш репозиторий: https://github.com/becho96/telegram-task-manager

## 📋 Следующий шаг: Включить GitHub Pages

### 1. Откройте настройки репозитория
Перейдите по ссылке: https://github.com/becho96/telegram-task-manager/settings/pages

### 2. Настройте GitHub Pages
- **Source:** Deploy from a branch
- **Branch:** main
- **Folder:** / (root)
- Нажмите **"Save"**

### 3. Дождитесь развертывания
- Процесс займет 1-2 минуты
- Вы увидите зеленую галочку, когда развертывание завершится

### 4. URL вашего приложения
**https://becho96.github.io/telegram-task-manager**

## 🎯 После включения Pages:

### Проверьте приложение:
1. Откройте в браузере: https://becho96.github.io/telegram-task-manager
2. Убедитесь, что приложение загружается
3. Проверьте все функции:
   - Создание заданий
   - Переключение между вкладками
   - Статистика

### Настройте Telegram бота:
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

## 🔧 Если что-то не работает:

### Проблема: Pages не включается
**Решение:** 
- Убедитесь, что файл `index.html` в корне репозитория
- Проверьте, что репозиторий публичный
- Подождите 2-3 минуты

### Проблема: Приложение не загружается
**Решение:**
- Проверьте URL: https://becho96.github.io/telegram-task-manager
- Убедитесь, что GitHub Pages включен
- Проверьте консоль браузера на ошибки

### Проблема: Telegram не открывает приложение
**Решение:**
- Убедитесь, что URL начинается с `https://`
- Проверьте, что приложение доступно в браузере
- Убедитесь, что настройки бота корректны

## 🎉 Готово!

После выполнения всех шагов ваш Telegram Mini App будет доступен по адресу:
**https://becho96.github.io/telegram-task-manager**

Поделитесь ссылкой на бота с друзьями! 🚀
