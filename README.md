# Flow Syndicate

A modern Vue 3 application for managing dance classes and student enrollment.

## Tech Stack

- **Vue 3** - Progressive JavaScript framework
- **Vite** - Next generation frontend tooling
- **Vue Router** - Official router for Vue.js
- **Pinia** - State management for Vue
- **vue-i18n** - Internationalization plugin (EN/PL)
- **SCSS** - CSS preprocessor

## Project Structure

```
src/
├── assets/          # Static assets (styles, images)
│   └── styles/      # Global SCSS files
├── components/      # Reusable Vue components
├── i18n/           # Internationalization
│   └── locales/    # Language files (en.json, pl.json)
├── router/         # Vue Router configuration
├── stores/         # Pinia stores
├── views/          # Page components
└── main.js         # Application entry point
```

## Getting Started

### Install Dependencies

```bash
npm install
```

### Development Server

```bash
npm run dev
```

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## Features

- 🎨 Modern dark theme with glass morphism effects
- 🌍 Multi-language support (English/Polish)
- 📱 Responsive design
- ⚡ Fast development with Vite HMR
- 🔐 Authentication system ready
- 📊 State management with Pinia
