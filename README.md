###Основной стек технологий:
1. Node js
2. Next.js
3. React
4. Apollo
5. Postgres
6. Knex

Демо
Демо сервиса доступно по адресу: http://front-hack.techno-team.ru/auth

Реквизиты тестового пользователя: email: pochta_6@ya.ru, пароль: qwerty15


## СРЕДА ЗАПУСКА

1. развертывание сервиса производится на debian-like linux (debian 9+);
2. docker (последняя стабильная версия), docker-compose (1.29.* и выше) [docs link](https://docs.docker.com/compose/install/#install-compose-on-linux-systems);

## УСТАНОВКА

#### Front
1. переименовать .env.ex в .env
2. поставить url backenda в переменную NEXT_PUBLIC_BASE_API
3. запустить docker-compose up -d

#### Back
1. cd back
2. распаковать дамп базы в back/data/database [пример базы](https://drive.google.com/file/d/1JsHu4P3vV3lRz9Bx6BLpHRjSgeYX2VKl/view?usp=sharing)
3. установить в docker-compose.yml файле переменные ADMIN_PASSWORD и ADMIN_EMAIL для root аккаунта
4. docker-compose up -d
