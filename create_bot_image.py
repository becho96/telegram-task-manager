#!/usr/bin/env python3
"""
Скрипт для создания изображения бота размером 640x360
"""

try:
    from PIL import Image, ImageDraw, ImageFont
    import os
except ImportError:
    print("Устанавливаем необходимые библиотеки...")
    os.system("pip install Pillow")
    from PIL import Image, ImageDraw, ImageFont

def create_bot_image():
    # Создаем изображение 640x360
    width, height = 640, 360
    image = Image.new('RGB', (width, height), color='#0088cc')
    draw = ImageDraw.Draw(image)
    
    # Создаем градиентный фон
    for y in range(height):
        color_ratio = y / height
        r = int(0 + (0 * color_ratio))
        g = int(136 + (102 * color_ratio))
        b = int(204 + (170 * color_ratio))
        draw.line([(0, y), (width, y)], fill=(r, g, b))
    
    # Основной круг
    circle_center = (320, 180)
    circle_radius = 80
    draw.ellipse([circle_center[0] - circle_radius, circle_center[1] - circle_radius,
                  circle_center[0] + circle_radius, circle_center[1] + circle_radius],
                 fill='white', outline='white', width=2)
    
    # Иконка списка задач
    # Основание блокнота
    clipboard_x, clipboard_y = 280, 140
    clipboard_width, clipboard_height = 80, 100
    
    # Тень (упрощенная)
    draw.rectangle([clipboard_x + 4, clipboard_y + 4, 
                   clipboard_x + clipboard_width + 4, clipboard_y + clipboard_height + 4],
                   fill='#cccccc')
    
    # Основной блокнот
    draw.rectangle([clipboard_x, clipboard_y, 
                   clipboard_x + clipboard_width, clipboard_y + clipboard_height],
                   fill='white', outline='#e0e0e0', width=2)
    
    # Верхняя часть блокнота
    draw.rectangle([clipboard_x + 20, clipboard_y - 8, 
                   clipboard_x + 60, clipboard_y + 8],
                   fill='white', outline='#e0e0e0', width=1)
    
    # Элементы списка
    list_items = [
        (20, 25, 60, 25, '#28a745'),  # Выполнено
        (20, 40, 55, 40, '#28a745'),  # Выполнено
        (20, 55, 50, 55, '#6c757d'), # Не выполнено
        (20, 70, 45, 70, '#6c757d')   # Не выполнено
    ]
    
    for x1, y1, x2, y2, color in list_items:
        # Линия задачи
        draw.line([clipboard_x + x1, clipboard_y + y1, clipboard_x + x2, clipboard_y + y1], 
                  fill=color, width=3)
        # Кружок статуса
        draw.ellipse([clipboard_x + x1 - 5, clipboard_y + y1 - 3, 
                     clipboard_x + x1 + 1, clipboard_y + y1 + 3], 
                     fill=color)
    
    # Галочка (выполнено)
    check_x, check_y = 450, 120
    draw.ellipse([check_x - 25, check_y - 25, check_x + 25, check_y + 25], 
                 fill='#28a745', outline='white', width=2)
    # Галочка
    draw.line([check_x - 8, check_y, check_x - 2, check_y + 6], fill='white', width=3)
    draw.line([check_x - 2, check_y + 6, check_x + 8, check_y - 4], fill='white', width=3)
    
    # Часы
    clock_x, clock_y = 450, 220
    draw.ellipse([clock_x - 25, clock_y - 25, clock_x + 25, clock_y + 25], 
                 fill='#ffc107', outline='white', width=2)
    draw.ellipse([clock_x - 20, clock_y - 20, clock_x + 20, clock_y + 20], 
                 fill='white')
    # Стрелки часов
    draw.line([clock_x, clock_y, clock_x, clock_y - 12], fill='#ffc107', width=2)
    draw.line([clock_x, clock_y, clock_x + 8, clock_y], fill='#ffc107', width=2)
    draw.ellipse([clock_x - 2, clock_y - 2, clock_x + 2, clock_y + 2], fill='#ffc107')
    
    # График статистики
    chart_x, chart_y = 150, 250
    draw.rectangle([chart_x, chart_y, chart_x + 60, chart_y + 40], 
                   fill='white', outline='#e0e0e0', width=1)
    
    # Столбцы графика
    bars = [(8, 25, 6, 15, '#0088cc'), (16, 20, 6, 20, '#28a745'), 
            (24, 15, 6, 25, '#ffc107'), (32, 10, 6, 30, '#dc3545'), 
            (40, 18, 6, 22, '#6c757d')]
    
    for x, y, w, h, color in bars:
        draw.rectangle([chart_x + x, chart_y + y, 
                       chart_x + x + w, chart_y + y + h], 
                       fill=color)
    
    # Заголовок
    try:
        # Пытаемся использовать системный шрифт
        title_font = ImageFont.truetype("/System/Library/Fonts/Arial.ttf", 32)
        subtitle_font = ImageFont.truetype("/System/Library/Fonts/Arial.ttf", 18)
    except:
        # Если системный шрифт недоступен, используем стандартный
        title_font = ImageFont.load_default()
        subtitle_font = ImageFont.load_default()
    
    # Заголовок
    title_text = "📋 Менеджер Заданий"
    title_bbox = draw.textbbox((0, 0), title_text, font=title_font)
    title_width = title_bbox[2] - title_bbox[0]
    title_x = (width - title_width) // 2
    draw.text((title_x, 320), title_text, fill='white', font=title_font)
    
    # Подзаголовок
    subtitle_text = "Telegram Mini App"
    subtitle_bbox = draw.textbbox((0, 0), subtitle_text, font=subtitle_font)
    subtitle_width = subtitle_bbox[2] - subtitle_bbox[0]
    subtitle_x = (width - subtitle_width) // 2
    draw.text((subtitle_x, 350), subtitle_text, fill='white', font=subtitle_font)
    
    # Сохраняем изображение
    image.save('bot_icon.png', 'PNG', quality=95)
    print("✅ Изображение бота создано: bot_icon.png (640x360)")
    return True

if __name__ == "__main__":
    try:
        create_bot_image()
    except Exception as e:
        print(f"❌ Ошибка при создании изображения: {e}")
        print("💡 Попробуйте установить Pillow: pip install Pillow")
