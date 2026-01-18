# Flow Syndicate — Cursor Tasks Roadmap

> Проект используется как учебный пример для изучения Vue 3, архитектуры SPA, анимаций, i18n и современного frontend-подхода.
> **Важно:** код пишется максимально модульно, с большим количеством компонентов и комментариев на русском языке.

---

## ОБЩИЕ ПРИНЦИПЫ АРХИТЕКТУРЫ

* **Один компонент — одна ответственность**
* Каждый компонент и микрокомпонент находится **в отдельной папке**
* В каждой папке:

  * `ComponentName.vue` — логика и шаблон
  * `ComponentName.styles.scss` — стили
  * `index.ts` — реэкспорт (для удобных импортов)
* Минимум логики в `.vue`, сложная логика выносится в composables
* Все ключевые места снабжены комментариями на русском языке

Пример:

```
components/
 └─ navigation/
    └─ LanguageSwitcher/
       ├─ LanguageSwitcher.vue
       ├─ LanguageSwitcher.styles.scss
       └─ index.ts
```

---

## PHASE 1 — PROJECT FOUNDATION

### [ ] Task 1: Project Bootstrap

* Initialize **Vue 3 + Vite**
* Install & configure:

  * Vue Router
  * Pinia
  * SCSS
  * vue-i18n
* Create base folder structure:

```
src/
 ├─ app/              # Инициализация приложения
 ├─ layouts/          # Layout-компоненты (Public, Dashboard)
 ├─ pages/            # Страницы (Home, Philosophy и т.д.)
 ├─ components/       # UI и логические компоненты
 ├─ composables/      # Переиспользуемая логика
 ├─ stores/           # Pinia stores
 ├─ router/
 ├─ i18n/
 ├─ styles/           # Глобальные стили
```

* Initial commit

---

### [ ] Task 2: Global Design System

* Dark theme variables
* Typography system
* Spacing & layout helpers
* Blur / glass utilities
* Global transitions

Файлы:

```
styles/
 ├─ _variables.scss
 ├─ _typography.scss
 ├─ _glass.scss
 ├─ _transitions.scss
 └─ main.scss
```

---

## PHASE 2 — PUBLIC SPA (NO SCROLL)

### [ ] Task 3: Fullscreen App Layout

**Desktop:**

* Полный запрет scroll по X и Y
* Контент меняется внутри layout-обёртки
* Навигация и переключатель языка **всегда на месте**

Компоненты:

```
layouts/
 └─ PublicLayout/
    ├─ PublicLayout.vue
    ├─ PublicLayout.styles.scss
    └─ index.ts
```

---

### [ ] Task 4: Background Video System

* Фоновое видео для всех публичных страниц
* Полупрозрачный overlay / blur

Компоненты:

```
components/background/
 └─ VideoBackground/
    ├─ VideoBackground.vue
    ├─ VideoBackground.styles.scss
    └─ index.ts
```

---

### [ ] Task 5: Home / Video Hero

* Fullscreen hero без скролла
* Заголовок, подзаголовок, CTA
* Анимации появления

Компоненты:

```
pages/Home/
 ├─ HomePage.vue
 ├─ HomePage.styles.scss
 └─ components/
    └─ HeroContent/
       ├─ HeroContent.vue
       ├─ HeroContent.styles.scss
       └─ index.ts
```

---

### [ ] Task 6: Horizontal Navigation (Desktop)

**Поведение:**

* Переключение страниц **только кликами**
* Контент длинных страниц скроллится **по оси X**
* Скролл должен быть визуально понятным

Компоненты:

```
components/navigation/
 └─ BottomNavigation/
    ├─ BottomNavigation.vue
    ├─ BottomNavigation.styles.scss
    ├─ components/
    │  ├─ NavItem/
    │  └─ NavIndicator/
    └─ index.ts
```

---

### [ ] Task 7: Mobile Navigation

**Поведение:**

* Навигация видна частично
* Активный пункт по центру
* Соседние уходят в прозрачность
* Перетаскивание меню — навигация
* Переход на страницу — только по клику
* Контент скроллится по Y

---

### [ ] Task 8: Language Switcher + Auth Entry

* Переключатель EN / PL
* Кнопка **Login / Register** рядом

Компоненты:

```
components/header/
 ├─ LanguageSwitcher/
 ├─ AuthButton/
 └─ HeaderControls/
```

---

## PHASE 3 — AUTHENTICATION

### [ ] Task 9: Auth UI

* Login modal
* Registration modal
* Email / phone / password

Каждая форма — отдельный компонент

---

### [ ] Task 10: Auth Logic

* JWT auth
* Pinia auth store
* Protected routes
* Role handling

---

## PHASE 4 — USER DASHBOARD

### [ ] Task 11: Dashboard Layout

* Отдельный layout
* Повторное использование дизайн-системы

---

### [ ] Task 12: Students Management

* CRUD студентов
* Минимум логики в компонентах

---

### [ ] Task 13: Classes & Schedule

* Расписание
* Привязка студентов

---

### [ ] Task 14: Pricing & Payments

* Абонементы
* Разовые занятия
* Przelewy24

---

## PHASE 5 — ADMIN CRM

### [ ] Task 15: Admin Dashboard

* Users
* Students
* Classes

---

### [ ] Task 16: Attendance System

* Отметка посещений
* История

---

### [ ] Task 17: Analytics & Finance

* Доходы
* Задолженности

---

## PHASE 6 — POLISH & PRODUCTION

### [ ] Task 18: UX Polish

* Hover
* Micro animations
* Skeleton loaders

---

### [ ] Task 19: Security & Performance

* Validation
* Roles

---

### [ ] Task 20: Production Ready

* Env
* Build
* Deploy
