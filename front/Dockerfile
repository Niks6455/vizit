# Сборка приложения
FROM node:20-alpine AS builder

RUN corepack enable && corepack prepare pnpm@latest --activate
WORKDIR /app

# Зависимости
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

# Исходный код и сборка
COPY . ./
RUN pnpm build && pnpm prune --prod

# Продакшен-образ
FROM node:20-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000
EXPOSE 3000

# Копируем только нужное для запуска
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./
COPY --from=builder /app/next.config.ts ./

CMD ["node", "node_modules/next/dist/bin/next", "start"]
