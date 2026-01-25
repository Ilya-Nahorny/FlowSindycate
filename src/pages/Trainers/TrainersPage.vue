<template>
  <div class="trainers-page">
    <div class="trainers-page__container">
      <h1 class="trainers-page__title">{{ t('pages.trainers.title') }}</h1>
      
      <div class="trainers-page__content">
        <div
          v-for="trainer in trainers"
          :key="trainer.id"
          class="trainer-card"
        >
          <div class="trainer-card__image">
            <img
              :src="trainer.image"
              :alt="trainer.name"
              class="trainer-card__img"
            />
          </div>
          <div class="trainer-card__info">
            <h3 class="trainer-card__name">{{ trainer.name }}</h3>
            <p class="trainer-card__name-en">{{ trainer.nameEn }}</p>
            <p class="trainer-card__description">{{ t(`pages.trainers.trainers.${trainer.id}.description`) }}</p>
            <div class="trainer-card__experience">
              <h4 class="trainer-card__experience-title">{{ t('pages.trainers.experience') }}</h4>
              <p class="trainer-card__experience-text">{{ t(`pages.trainers.trainers.${trainer.id}.experience`) }}</p>
            </div>
            <div class="trainer-card__approach">
              <h4 class="trainer-card__approach-title">{{ t('pages.trainers.approach') }}</h4>
              <p class="trainer-card__approach-text">{{ t(`pages.trainers.trainers.${trainer.id}.approach`) }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'

/**
 * Страница тренеров
 */

const { t } = useI18n()

const trainers = [
  {
    id: 'ilya',
    name: 'Илья Нагорный',
    nameEn: 'Ilya Nahorny',
    image: 'https://via.placeholder.com/300x400?text=Ilya+Nahorny'
  }
]
</script>

<style scoped lang="scss">
.trainers-page {
  width: 100%;
  min-height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding: var(--spacing-4xl) var(--spacing-xl);
  padding-top: var(--spacing-4xl);

  &__container {
    max-width: 1200px;
    width: 100%;
  }

  &__title {
    font-size: 3rem;
    font-weight: 700;
    color: var(--color-text-primary);
    margin: 0 0 var(--spacing-4xl) 0;
    text-align: center;
    font-family: var(--font-family-heading);

    @media (max-width: 768px) {
      font-size: 2rem;
    }
  }

  &__content {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-4xl);
  }
}

.trainer-card {
  background: var(--color-bg-secondary);
  border-radius: var(--radius-xl);
  padding: var(--spacing-3xl);
  display: grid;
  grid-template-columns: 300px 1fr;
  gap: var(--spacing-3xl);
  align-items: start;

  @media (max-width: 968px) {
    grid-template-columns: 1fr;
    gap: var(--spacing-2xl);
  }

  &__image {
    width: 100%;
    max-width: 300px;
    aspect-ratio: 3/4;
    border-radius: var(--radius-lg);
    overflow: hidden;
    background: var(--color-bg-tertiary);

    @media (max-width: 968px) {
      max-width: 100%;
      margin: 0 auto;
    }
  }

  &__img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  &__info {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-lg);
  }

  &__name {
    font-size: var(--font-size-3xl);
    font-weight: 700;
    color: var(--color-text-primary);
    margin: 0;
    font-family: var(--font-family-heading);
  }

  &__name-en {
    font-size: var(--font-size-xl);
    color: var(--color-text-secondary);
    margin: 0;
    font-style: italic;
  }

  &__description {
    font-size: var(--font-size-base);
    color: var(--color-text-primary);
    line-height: var(--line-height-relaxed);
    margin: 0;
  }

  &__experience,
  &__approach {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-sm);
  }

  &__experience-title,
  &__approach-title {
    font-size: var(--font-size-lg);
    font-weight: 600;
    color: var(--color-text-primary);
    margin: 0;
  }

  &__experience-text,
  &__approach-text {
    font-size: var(--font-size-base);
    color: var(--color-text-secondary);
    line-height: var(--line-height-relaxed);
    margin: 0;
  }
}
</style>
