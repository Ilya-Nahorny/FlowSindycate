<template>
  <div class="classes-page">
    <h1>{{ t('pages.classes.title') }}</h1>
    <p class="text-secondary">{{ t('pages.classes.content') }}</p>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'

/**
 * Страница классов
 */
const { t } = useI18n()
</script>

<style scoped lang="scss">
.classes-page {
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
