<template>
  <div class="auth-button-wrapper">
    <button
      v-if="!authStore.isAuthenticated"
      class="auth-button glass-interactive"
      @click="isAuthModalOpen = true"
    >
      {{ t('common.login') }}
    </button>
    <div v-else class="auth-button-user">
      <RouterLink to="/dashboard" class="auth-button-link">
        {{ t('dashboard.title') }}
      </RouterLink>
      <button
        v-if="authStore.isAdmin"
        class="auth-button-link"
        @click="goToAdmin"
      >
        {{ t('admin.title') }}
      </button>
      <button
        class="auth-button-logout"
        @click="handleLogout"
      >
        {{ t('auth.logout') }}
      </button>
    </div>
    <AuthModal
      v-model:is-open="isAuthModalOpen"
      @close="isAuthModalOpen = false"
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
 * Кнопка входа/регистрации
 * Показывает модальное окно авторизации или ссылку на dashboard
 */

const { t } = useI18n()
const router = useRouter()
const authStore = useAuthStore()

const isAuthModalOpen = ref(false)

/**
 * Переход в админ-панель
 */
function goToAdmin(): void {
  router.push('/admin')
}

/**
 * Выход из системы
 */
function handleLogout(): void {
  authStore.logout()
  router.push('/')
}
</script>

<style scoped lang="scss">
@import './AuthButton.styles.scss';
</style>
