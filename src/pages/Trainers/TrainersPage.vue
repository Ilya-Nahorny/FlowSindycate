<template>
  <div class="trainers-page">
    <h1>{{ t('pages.trainers.title') }}</h1>
    <p class="text-secondary">{{ t('pages.trainers.content') }}</p>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'

/**
 * Страница тренеров
 */
const { t } = useI18n()
</script>

<style scoped lang="scss">
.trainers-page {
  width: 100%;
  min-height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  gap: var(--spacing-md);
  padding: var(--spacing-4xl) var(--spacing-xl);
  padding-top: var(--spacing-4xl);
}
</style>
