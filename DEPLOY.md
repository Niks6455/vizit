# Инструкция по деплою на сервер

## Шаг 1: Подключение к серверу

```bash
ssh root@92.246.139.23
```

## Шаг 2: Установка необходимого ПО

```bash
# Обновление системы
apt update && apt upgrade -y

# Установка Node.js 20.x
curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
apt install -y nodejs

# Установка pnpm
npm install -g pnpm

# Установка PM2 (процесс-менеджер)
npm install -g pm2

# Установка nginx (если еще не установлен)
apt install -y nginx
```

## Шаг 3: Клонирование проекта

**Вариант 1: Через HTTPS (проще, если репозиторий публичный):**

```bash
cd ~/apps
git clone https://github.com/Niks6455/vizit.git
cd vizit
```

**Вариант 2: Загрузить через scp с локальной машины (если репозиторий приватный):**

На своей локальной машине выполни:
```bash
scp -r /Users/nikita/Desktop/работа/vizit root@92.246.139.23:~/apps/
```

Затем на сервере:
```bash
cd ~/apps/vizit
```

**Вариант 3: Настроить SSH ключ (для приватных репо):**

На сервере:
```bash
ssh-keygen -t ed25519 -C "server@vizit"  # Просто жми Enter на все вопросы
cat ~/.ssh/id_ed25519.pub  # Скопируй вывод
```

Затем добавь этот ключ в GitHub: Settings → SSH and GPG keys → New SSH key

## Шаг 4: Настройка и сборка

```bash
cd ~/apps/vizit/front

# Установка зависимостей
pnpm install --frozen-lockfile

# Сборка проекта
pnpm build
```

## Шаг 5: Запуск через PM2

```bash
cd ~/apps/vizit/front

# Запуск приложения
pm2 start "pnpm start" --name vizit --cwd $(pwd)

# Сохранение конфигурации PM2
pm2 save
pm2 startup  # Выполни команду, которую он покажет

# Проверка статуса
pm2 status
pm2 logs vizit
```

## Шаг 6: Настройка Nginx (reverse proxy)

Создай конфиг nginx:

```bash
nano /etc/nginx/sites-available/vizit
```

Вставь:

```nginx
server {
    listen 80;
    server_name 92.246.139.23;  # или твой домен

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

Активируй конфиг:

```bash
ln -s /etc/nginx/sites-available/vizit /etc/nginx/sites-enabled/
nginx -t  # Проверка конфига
systemctl reload nginx
```

## Шаг 7: Обновление (после изменений)

```bash
cd ~/apps/vizit
git pull  # или загрузи новые файлы
cd front
pnpm install
pnpm build
pm2 restart vizit
```

## Полезные команды PM2

```bash
pm2 status          # Статус всех процессов
pm2 logs vizit      # Логи приложения
pm2 restart vizit   # Перезапуск
pm2 stop vizit      # Остановка
pm2 delete vizit    # Удаление из PM2
```

## Если что-то не работает

1. Проверь логи: `pm2 logs vizit`
2. Проверь, что порт 3000 свободен: `netstat -tulpn | grep 3000`
3. Проверь nginx: `systemctl status nginx`
4. Проверь, что приложение запущено: `pm2 status`
