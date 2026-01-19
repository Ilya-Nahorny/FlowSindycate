<template>
  <button
    class="language-switcher"
    @click="toggleLanguage"
  >
    <span class="language-switcher__icon">🌐</span>
    <span class="language-switcher__text">{{ currentLocale.toUpperCase() }}</span>
  </button>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { computed } from 'vue'

/**
 * Переключатель языков
 * Позволяет выбрать между EN, PL и RU
 */

const { locale } = useI18n()

// Доступные языки
const availableLanguages = ['en', 'pl', 'ru'] as const

// Текущая локаль
const currentLocale = computed(() => locale.value)

/**
 * Переключение языка
 */
const toggleLanguage = () => {
  const currentIndex = availableLanguages.indexOf(locale.value as typeof availableLanguages[number])
  const nextIndex = (currentIndex + 1) % availableLanguages.length
  locale.value = availableLanguages[nextIndex]
}
</script>

<style scoped lang="scss">
@import './LanguageSwitcher.styles.scss';
</style>
