<template>
  <div class="philosophy-page">
    <div class="philosophy-page__container">
      <!-- Левая секция с текстом -->
      <div class="philosophy-page__content">
        <h1 class="philosophy-page__title">{{ t('navigation.philosophy') }}</h1>
        <p class="philosophy-page__subtitle">{{ t('philosophy.subtitle') }}</p>
        <p class="philosophy-page__description">
          {{ t('philosophy.description') }}
        </p>
      </div>

      <!-- Правая секция с карточками -->
      <div class="philosophy-page__values">
        <div class="value-card">
          <h3 class="value-card__title">{{ t('philosophy.values.authenticity.title') }}</h3>
          <p class="value-card__subtitle">{{ t('philosophy.values.authenticity.subtitle') }}</p>
        </div>
        <div class="value-card">
          <h3 class="value-card__title">{{ t('philosophy.values.community.title') }}</h3>
          <p class="value-card__subtitle">{{ t('philosophy.values.community.subtitle') }}</p>
        </div>
        <div class="value-card">
          <h3 class="value-card__title">{{ t('philosophy.values.creativity.title') }}</h3>
          <p class="value-card__subtitle">{{ t('philosophy.values.creativity.subtitle') }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'

/**
 * Страница философии
 */
const { t } = useI18n()
</script>

<style scoped lang="scss">
.philosophy-page {
  width: 100%;
  min-height: 100%;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding: var(--spacing-4xl) var(--spacing-xl);
  padding-top: var(--spacing-4xl);

  &__container {
    max-width: 1200px;
    width: 100%;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: var(--spacing-4xl);
    align-items: start;

    @media (max-width: 968px) {
      grid-template-columns: 1fr;
      gap: var(--spacing-3xl);
    }
  }

  &__content {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-lg);
  }

  &__title {
    font-size: 4rem;
    font-weight: 700;
    color: var(--color-text-primary);
    line-height: 1.1;
    margin: 0;
    font-family: var(--font-family-heading);

    @media (max-width: 768px) {
      font-size: 2.5rem;
    }
  }

  &__subtitle {
    font-size: var(--font-size-xl);
    color: var(--color-text-secondary);
    margin: 0;
    font-weight: 400;
  }

  &__description {
    font-size: var(--font-size-base);
    color: var(--color-text-primary);
    line-height: var(--line-height-relaxed);
    margin: 0;
    max-width: 500px;
  }

  &__values {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-lg);
  }
}

.value-card {
  background: var(--color-bg-secondary);
  border-radius: var(--radius-xl);
  padding: var(--spacing-2xl) var(--spacing-3xl);
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);

  &__title {
    font-size: var(--font-size-2xl);
    font-weight: 600;
    color: var(--color-text-primary);
    margin: 0;
  }

  &__subtitle {
    font-size: var(--font-size-base);
    color: var(--color-text-secondary);
    margin: 0;
    font-weight: 400;
  }
}
</style>
