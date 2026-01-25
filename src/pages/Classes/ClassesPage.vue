<template>
  <div class="classes-page">
    <div class="classes-page__container">
      <h1 class="classes-page__title">{{ t('pages.classes.title') }}</h1>
      
      <div class="classes-page__grid">
        <div
          v-for="classType in classTypes"
          :key="classType.id"
          class="class-card"
          @click="handleClassClick(classType.id)"
        >
          <div class="class-card__icon">{{ classType.icon }}</div>
          <h3 class="class-card__title">{{ t(`pages.classes.types.${classType.id}.title`) }}</h3>
          <p class="class-card__description">{{ t(`pages.classes.types.${classType.id}.description`) }}</p>
          <div class="class-card__age">{{ t(`pages.classes.types.${classType.id}.age`) }}</div>
          <button class="class-card__button">{{ t('pages.classes.bookButton') }}</button>
        </div>
      </div>
    </div>
    
    <AuthModal
      v-model:is-open="isAuthModalOpen"
      :redirect-class-type="selectedClassType"
      @close="handleAuthModalClose"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useAuthStore } from '@/stores/auth'
import { AuthModal } from '@/components/auth/AuthModal'

/**
 * Страница классов
 */

const { t } = useI18n()
const router = useRouter()
const authStore = useAuthStore()

const isAuthModalOpen = ref(false)
const selectedClassType = ref<string | null>(null)

const classTypes = [
  {
    id: 'beginners',
    icon: '🎯'
  },
  {
    id: 'advanced',
    icon: '🔥'
  },
  {
    id: 'individual',
    icon: '⭐'
  }
]

/**
 * Обработка клика по типу занятий
 */
function handleClassClick(classTypeId: string): void {
  if (authStore.isAuthenticated) {
    // Если авторизован, переходим в dashboard с параметром типа занятия
    router.push({
      name: 'dashboard',
      query: { classType: classTypeId }
    })
  } else {
    // Если не авторизован, открываем модальное окно авторизации
    selectedClassType.value = classTypeId
    isAuthModalOpen.value = true
  }
}

/**
 * Обработка закрытия модального окна авторизации
 */
function handleAuthModalClose(): void {
  isAuthModalOpen.value = false
  selectedClassType.value = null
}
</script>

<style scoped lang="scss">
.classes-page {
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

  &__grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: var(--spacing-2xl);

    @media (max-width: 768px) {
      grid-template-columns: 1fr;
      gap: var(--spacing-xl);
    }
  }
}

.class-card {
  background: var(--color-bg-secondary);
  border-radius: var(--radius-xl);
  padding: var(--spacing-3xl);
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: var(--spacing-lg);
  cursor: pointer;
  transition: all var(--transition-base);
  border: 1px solid rgba(255, 255, 255, 0.1);

  &:hover {
    transform: translateY(-4px);
    background: var(--color-bg-tertiary);
    border-color: rgba(255, 255, 255, 0.2);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
  }

  &__icon {
    font-size: 4rem;
    line-height: 1;
  }

  &__title {
    font-size: var(--font-size-2xl);
    font-weight: 600;
    color: var(--color-text-primary);
    margin: 0;
  }

  &__description {
    font-size: var(--font-size-base);
    color: var(--color-text-secondary);
    line-height: var(--line-height-relaxed);
    margin: 0;
  }

  &__age {
    font-size: var(--font-size-sm);
    color: var(--color-text-muted);
    margin: 0;
  }

  &__button {
    padding: var(--spacing-md) var(--spacing-2xl);
    border-radius: var(--radius-lg);
    font-size: var(--font-size-base);
    font-weight: 500;
    color: var(--color-text-primary);
    background: var(--color-bg-tertiary);
    border: 1px solid rgba(255, 255, 255, 0.2);
    cursor: pointer;
    transition: all var(--transition-base);
    margin-top: var(--spacing-sm);

    &:hover {
      background: rgba(255, 255, 255, 0.1);
      border-color: rgba(255, 255, 255, 0.3);
    }
  }
}
</style>
