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

## Удалить приложение из PM2 и поднять заново

Если нужно полностью убрать процесс из PM2 и создать его с нуля:

```bash
cd ~/apps/vizit/front

# Удалить процесс из PM2
pm2 delete vizit

# Запустить заново
pm2 start "pnpm start" --name vizit --cwd $(pwd)

# Сохранить конфиг (чтобы пережило перезагрузку сервера)
pm2 save
```

После этого проверь: `pm2 status` и `pm2 logs vizit`.

## Полезные команды PM2

```bash
pm2 status          # Статус всех процессов
pm2 logs vizit      # Логи приложения
pm2 restart vizit   # Перезапуск
pm2 stop vizit      # Остановка
pm2 delete vizit    # Удаление из PM2
```

## Деплой через Docker

Из папки `front/`:

```bash
cd front

# Сборка образа
docker build -t vizit .

# Запуск (порт 3000)
docker run -d -p 3000:3000 --name vizit vizit
```

Либо из корня репозитория (контекст — папка front):

```bash
docker build -f front/Dockerfile -t vizit front
```

Переменные окружения (если понадобятся):

```bash
docker run -d -p 3000:3000 -e NODE_ENV=production --name vizit vizit
```

Остановка и удаление контейнера:

```bash
docker stop vizit && docker rm vizit
```

---

## Деплой на GitHub Pages

Сайт собирается в статику и публикуется на GitHub Pages при каждом пуше в ветку `main`.

### Что сделано в репозитории

- **`front/next.config.ts`** — включён `output: "export"` и `basePath` для корректных путей на Pages.
- **`.github/workflows/pages.yml`** — workflow: сборка Next.js и деплой через GitHub Actions.

### Что сделать в GitHub

1. Запушь репозиторий на GitHub (если ещё не запушен).
2. Включи GitHub Pages: **Settings → Pages** → в блоке **Build and deployment** выбери **Source: GitHub Actions**.
3. После успешного запуска workflow (Actions → Deploy to GitHub Pages) сайт появится по адресу:  
   **`https://<твой-username>.github.io/<имя-репозитория>/`**  
   Например, при репозитории `vizit`: `https://Niks6455.github.io/vizit/`.

### Локальная разработка

Локально `BASE_PATH` не задаётся — сайт открывается с корня (`http://localhost:3000`). В GitHub Actions при сборке подставляется `BASE_PATH=/<имя-репозитория>`, поэтому стили и ссылки на Pages работают правильно.

### Если workflow падает

- Открой **Actions** в репозитории и посмотри логи упавшего run.
- Убедись, что в **Settings → Pages** выбран источник **GitHub Actions**.
- Если деплой нужен с другой ветки — в `.github/workflows/pages.yml` в `on.push.branches` укажи нужную ветку (например `master`).

### Кастомный домен (например keykap.space)

Чтобы открывать сайт по своему домену **https://keykap.space/**:

1. **В GitHub:** зайди в репозиторий → **Settings → Pages**. В блоке **Custom domain** введи `keykap.space` (или `www.keykap.space`, если нужен вариант с www) и нажми **Save**.
2. **У регистратора домена (где куплен keykap.space):** настрой DNS:
   - **Вариант A (рекомендуется):** создай запись **CNAME** с именем `@` (или корневой домен, как у регистратора) или `www`, чтобы она указывала на `<твой-username>.github.io` (например `niks6455.github.io`).  
     Если регистратор не даёт CNAME для корня (@), используй **ANAME**/ALIAS на `niks6455.github.io` или записи **A** на IP GitHub:
     - `185.199.108.153`
     - `185.199.109.153`
     - `185.199.110.153`
     - `185.199.111.153`
   - **Вариант с www:** CNAME для `www` → `niks6455.github.io`. Корень (@) — по желанию через A-записи выше или редирект с корня на www у регистратора.
3. Подожди 5–60 минут, пока обновятся DNS. В **Settings → Pages** GitHub покажет, что домен проверен (галочка).
4. Включи **Enforce HTTPS** в том же блоке Custom domain.

После этого сайт будет открываться по **https://keykap.space/** (и по **https://niks6455.github.io/vizit/** по-прежнему). Иконки и картинки должны грузиться: в сборке используется префикс путей для GitHub Pages.

---

## Если что-то не работает

1. Проверь логи: `pm2 logs vizit`
2. Проверь, что порт 3000 свободен: `netstat -tulpn | grep 3000`
3. Проверь nginx: `systemctl status nginx`
4. Проверь, что приложение запущено: `pm2 status`
