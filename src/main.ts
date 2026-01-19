import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createI18n } from 'vue-i18n'
import router from './router'
import App from './app/App.vue'
import './styles/main.scss'

// Импорт локалей для i18n
import en from './i18n/locales/en.json'
import pl from './i18n/locales/pl.json'
import ru from './i18n/locales/ru.json'

// Конфигурация i18n
const i18n = createI18n({
  legacy: false,
  locale: 'en',
  fallbackLocale: 'en',
  messages: {
    en,
    pl,
    ru
  }
})

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.use(router)
app.use(i18n)

// Восстановление сессии при загрузке приложения
import { useAuthStore } from './stores/auth'
const authStore = useAuthStore()
authStore.restoreSession()

app.mount('#app')
