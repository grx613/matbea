# Matbea Education (Next.js)

## Что умеет
- Форма сбора телефона → SMS-код → страница с ссылкой на PDF
- Телефоны не сохраняются (в продакшне), только проверка OTP
- Готов к деплою на Vercel

## Быстрый старт
1. `npm i`
2. Скопируйте `.env.local.example` в `.env.local` и заполните `OTP_SECRET`. Положите `public/crypto-edu.pdf`.
3. `npm run dev` и откройте http://localhost:3000

## Прод: подключить SigmaSMS
- Зарегистрируйтесь в SigmaSMS, получите API токен.
- Установите `@sigmamessaging/otp-sdk` и раскомментируйте участки в `app/api/otp/*`.
- Установите `SIGMA_API_TOKEN` и `SIGMA_API_BASE_URL` (пример: `https://api.sigmasms.ru`) в переменные окружения.

## Деплой на Vercel
- Vercel CLI: `npm i -g vercel` → `vercel` в папке проекта → следуйте инструкциям.

## Юридически важно
- Добавьте страницу политики конфиденциальности и чекбокс согласия.
