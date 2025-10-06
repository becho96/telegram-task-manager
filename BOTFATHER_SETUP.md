# 🤖 Настройка бота в @BotFather

## 📱 Пошаговая инструкция

### 1. Откройте Telegram и найдите @BotFather
- В поиске Telegram введите: `@BotFather`
- Нажмите на бота и начните диалог

### 2. Создайте нового бота
Отправьте команду: `/newbot`

**BotFather спросит:**
- **"Alright, a new bot. How are we going to call it? Please choose a name for your bot."**
- **Ответ:** `Менеджер Заданий`

**BotFather спросит:**
- **"Good. Now let's choose a username for your bot. It must end in `_bot`. Like this, for example: TetrisBot or tetris_bot."**
- **Ответ:** `becho96_task_manager_bot`

**BotFather ответит:**
```
Done! Congratulations on your new bot. You will find it at t.me/becho96_task_manager_bot. You can now add a description, about section and profile picture for your bot, see /help for a list of commands.

Use this token to access the HTTP API:
123456789:ABCdefGHIjklMNOpqrsTUVwxyz

Keep your token secure and store it safely, it can be used by anyone to control your bot.
```

### 3. Создайте Mini App
Отправьте команду: `/newapp`

**BotFather спросит:**
- **"Choose a bot to add a Mini App to:"**
- **Выберите:** `@becho96_task_manager_bot`

**BotFather спросит:**
- **"Choose a name for your Mini App:"**
- **Ответ:** `Менеджер Заданий`

**BotFather спросит:**
- **"Choose a description for your Mini App:"**
- **Ответ:** `Персональный менеджер регулярных заданий с напоминаниями и статистикой`

**BotFather спросит:**
- **"Choose a photo for your Mini App (optional):"**
- **Ответ:** Пропустите (нажмите "Skip")

**BotFather спросит:**
- **"Choose a URL for your Mini App:"**
- **Ответ:** `https://becho96.github.io/telegram-task-manager`

**BotFather спросит:**
- **"Choose a URL for your Mini App's privacy policy (optional):"**
- **Ответ:** Пропустите (нажмите "Skip")

### 4. Настройте кнопку меню
Отправьте команду: `/setmenubutton`

**BotFather спросит:**
- **"Choose a bot to set a menu button for:"**
- **Выберите:** `@becho96_task_manager_bot`

**BotFather спросит:**
- **"Choose a text for the menu button:"**
- **Ответ:** `📋 Менеджер Заданий`

**BotFather спросит:**
- **"Choose a URL for the menu button:"**
- **Ответ:** `https://becho96.github.io/telegram-task-manager`

### 5. Настройте описание бота
Отправьте команду: `/setdescription`

**BotFather спросит:**
- **"Choose a bot to change its description:"**
- **Выберите:** `@becho96_task_manager_bot`

**BotFather спросит:**
- **"Please send a new description for your bot:"**
- **Ответ:** `📋 Менеджер Заданий - создавайте и отслеживайте регулярные задания. Поддерживает ежедневные, еженедельные и ежемесячные задачи с напоминаниями и статистикой.`

### 6. Настройте короткое описание
Отправьте команду: `/setshortdescription`

**BotFather спросит:**
- **"Choose a bot to change its short description:"**
- **Выберите:** `@becho96_task_manager_bot`

**BotFather спросит:**
- **"Please send a new short description for your bot:"**
- **Ответ:** `📋 Менеджер регулярных заданий`

### 7. Настройте команды бота
Отправьте команду: `/setcommands`

**BotFather спросит:**
- **"Choose a bot to set commands for:"**
- **Выберите:** `@becho96_task_manager_bot`

**BotFather спросит:**
- **"Please send a list of commands for your bot. Use this format:"**
- **Ответ:**
```
start - Запустить менеджер заданий
help - Помощь по использованию
stats - Показать статистику
```

## 🎯 Проверка настройки

### 1. Найдите вашего бота
- В поиске Telegram введите: `@becho96_task_manager_bot`
- Откройте бота

### 2. Проверьте кнопку меню
- В боте должна появиться кнопка "📋 Менеджер Заданий"
- Нажмите на неё

### 3. Проверьте приложение
- Приложение должно открыться в Telegram
- Проверьте все функции:
  - Создание заданий
  - Переключение между вкладками
  - Статистика

## 🔧 Возможные проблемы

### Проблема: Кнопка меню не появляется
**Решение:**
- Убедитесь, что команда `/setmenubutton` выполнена
- Проверьте, что URL правильный
- Перезапустите Telegram

### Проблема: Приложение не открывается
**Решение:**
- Проверьте URL: https://becho96.github.io/telegram-task-manager
- Убедитесь, что GitHub Pages включен
- Проверьте, что приложение доступно в браузере

### Проблема: Ошибки в приложении
**Решение:**
- Откройте DevTools в Telegram (если возможно)
- Проверьте консоль на ошибки
- Убедитесь, что все файлы загружены

## 🎉 Готово!

После выполнения всех шагов:
- ✅ Бот создан и настроен
- ✅ Mini App подключен
- ✅ Кнопка меню работает
- ✅ Приложение открывается в Telegram

**Ваш бот:** @becho96_task_manager_bot
**URL приложения:** https://becho96.github.io/telegram-task-manager

Поделитесь ссылкой на бота с друзьями! 🚀
