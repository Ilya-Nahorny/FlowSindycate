# Flow Syndicate

Modern Vue 3 + Vite application with dark theme and glassmorphism design.

## Tech Stack

- **Vue 3** - Progressive JavaScript Framework
- **Vite** - Next Generation Frontend Tooling
- **TypeScript** - Typed JavaScript
- **Vue Router** - Official Router for Vue.js
- **Pinia** - State Management
- **Vue I18n** - Internationalization
- **SCSS** - CSS Preprocessor

## Project Structure

```
src/
├─ app/              # Application initialization
├─ layouts/          # Layout components (Public, Dashboard)
├─ pages/            # Page components
├─ components/       # Reusable UI components
├─ composables/      # Composable functions
├─ stores/           # Pinia stores
├─ router/           # Vue Router configuration
├─ i18n/             # Internationalization
└─ styles/           # Global styles
```

## Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Architecture Principles

- **One component - one responsibility**
- Each component in its own folder
- Minimal logic in `.vue` files
- Complex logic extracted to composables
- Comments in Russian language
- Modular and maintainable code

## Features

- ✅ Dark theme with CSS variables
- ✅ Glassmorphism design
- ✅ Fullscreen no-scroll layout
- ✅ Multi-language support (EN/PL)
- ✅ TypeScript support
- ✅ SCSS with global variables
