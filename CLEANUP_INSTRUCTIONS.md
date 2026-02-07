# ⚠️ ВАЖНО: Удаление старой структуры ebatelbase/

## Проблема

Типы компиляции Next.js падают с ошибкой:
```
./ebatelbase/app/components/SafeArea.tsx:3:28
Type error: Cannot find module '@/app/providers/MiniAppProvider'
```

Причина: **Старая директория `ebatelbase/` все еще существует** в репозитории, и TypeScript пытается её проверить при билде.

## Решение

Необходимо **физически удалить** директорию `ebatelbase/` из Git истории.

### Вариант 1: Через Git локально (РЕКОМЕНДУЕТСЯ)

```bash
# Склонируй ветку
git clone -b restructure-mytrump https://github.com/oriuma/baseapp_mrt.git temp-cleanup
cd temp-cleanup

# Удали старую структуру
git rm -rf ebatelbase/
git rm -f DEPLOY_TRIGGER.txt

# Закоммить удаление
git commit -m "Remove old ebatelbase directory and DEPLOY_TRIGGER.txt"

# Запушить
git push origin restructure-mytrump

# Очистить временную директорию
cd ..
rm -rf temp-cleanup
```

### Вариант 2: Через GitHub Web UI

1. Перейди на https://github.com/oriuma/baseapp_mrt/tree/restructure-mytrump
2. Открой директорию `ebatelbase/`
3. Нажми на `...` (три точки) → **Delete directory**
4. Подтверди удаление и создай коммит
5. Повтори для файла `DEPLOY_TRIGGER.txt`

### Проверка

После удаления запусти редеплой в Vercel. Билд должен пройти успешно:
```
✓ Compiled successfully
✓ Linting and checking validity of types
✓ Generating static pages
```

## Почему .gitignore не помог?

`.gitignore` игнорирует **новые** файлы, но не удаляет **уже закоммиченные**. Поэтому нужно явно выполнить `git rm`.
