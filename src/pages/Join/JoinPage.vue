<template>
  <div class="join-page">
    <h1>{{ t('pages.join.title') }}</h1>
    <p class="text-secondary">{{ t('pages.join.content') }}</p>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'

/**
 * Страница присоединения
 */
const { t } = useI18n()
</script>

<style scoped lang="scss">
.join-page {
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
