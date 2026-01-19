<template>
  <div class="services-page">
    <h1>{{ t('pages.services.title') }}</h1>
    <p class="text-secondary">{{ t('pages.services.content') }}</p>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'

/**
 * Страница услуг
 */
const { t } = useI18n()
</script>

<style scoped lang="scss">
.services-page {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-md);
}
</style>
