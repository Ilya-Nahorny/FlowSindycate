<template>
  <Modal
    :is-open="isOpen"
    :title="isLoginMode ? t('auth.login') : t('auth.register')"
    @update:is-open="handleUpdate"
    @close="handleClose"
  >
    <div class="auth-modal">
      <!-- Переключение между входом и регистрацией -->
      <div class="auth-modal__tabs">
        <button
          class="auth-tab"
          :class="{ 'auth-tab--active': isLoginMode }"
          @click="isLoginMode = true"
        >
          {{ t('auth.login') }}
        </button>
        <button
          class="auth-tab"
          :class="{ 'auth-tab--active': !isLoginMode }"
          @click="isLoginMode = false"
        >
          {{ t('auth.register') }}
        </button>
      </div>

      <!-- Форма входа -->
      <form
        v-if="isLoginMode"
        class="auth-form"
        @submit.prevent="handleLogin"
      >
        <div class="form-group">
          <label class="form-label">{{ t('auth.email') }}</label>
          <input
            v-model="loginData.email"
            type="email"
            class="form-input"
            :placeholder="t('auth.emailPlaceholder')"
            required
          />
        </div>

        <div class="form-group">
          <label class="form-label">{{ t('auth.password') }}</label>
          <input
            v-model="loginData.password"
            type="password"
            class="form-input"
            :placeholder="t('auth.passwordPlaceholder')"
            required
          />
        </div>

        <div v-if="authStore.error" class="form-error">
          {{ authStore.error }}
        </div>

        <button
          type="submit"
          class="form-button form-button--primary"
          :disabled="authStore.isLoading"
        >
          {{ authStore.isLoading ? t('common.loading') : t('auth.login') }}
        </button>
      </form>

      <!-- Форма регистрации -->
      <form
        v-else
        class="auth-form"
        @submit.prevent="handleRegister"
      >
        <div class="form-group">
          <label class="form-label">{{ t('auth.email') }}</label>
          <input
            v-model="registerData.email"
            type="email"
            class="form-input"
            :placeholder="t('auth.emailPlaceholder')"
            required
          />
        </div>

        <div class="form-group">
          <label class="form-label">{{ t('auth.phone') }}</label>
          <input
            v-model="registerData.phone"
            type="tel"
            class="form-input"
            :placeholder="t('auth.phonePlaceholder')"
            required
          />
        </div>

        <div v-if="authStore.error" class="form-error">
          {{ authStore.error }}
        </div>

        <button
          type="submit"
          class="form-button form-button--primary"
          :disabled="authStore.isLoading"
        >
          {{ authStore.isLoading ? t('common.loading') : t('auth.register') }}
        </button>
      </form>
    </div>
  </Modal>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { Modal } from '@/components/ui/Modal'
import type { LoginData, RegisterData } from '@/types'

/**
 * Модальное окно авторизации и регистрации
 */

interface Props {
  isOpen: boolean
  redirectClassType?: string | null
}

interface Emits {
  (e: 'update:isOpen', value: boolean): void
  (e: 'close'): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()
const { t } = useI18n()
const router = useRouter()
const authStore = useAuthStore()

const isLoginMode = ref(true)
const loginData = ref<LoginData>({
  email: '',
  password: ''
})
const registerData = ref<RegisterData>({
  email: '',
  phone: ''
})

/**
 * Обработка обновления состояния
 */
function handleUpdate(value: boolean): void {
  emit('update:isOpen', value)
}

/**
 * Обработка закрытия
 */
function handleClose(): void {
  emit('update:isOpen', false)
  authStore.clearError()
  // Сброс форм
  loginData.value = { email: '', password: '' }
  registerData.value = { email: '', phone: '' }
}

/**
 * Обработка входа
 */
async function handleLogin(): Promise<void> {
  try {
    await authStore.login(loginData.value)
    handleClose()
    
    // Перенаправление в зависимости от роли
    if (authStore.isAdmin) {
      router.push('/admin')
    } else {
      const query = props.redirectClassType ? { classType: props.redirectClassType } : {}
      router.push({ name: 'dashboard', query })
    }
  } catch (err) {
    // Ошибка уже в store
  }
}

/**
 * Обработка регистрации
 */
async function handleRegister(): Promise<void> {
  try {
    await authStore.register(registerData.value)
    handleClose()
    const query = props.redirectClassType ? { classType: props.redirectClassType } : {}
    router.push({ name: 'dashboard', query })
  } catch (err) {
    // Ошибка уже в store
  }
}

/**
 * Очистка ошибки при переключении режима
 */
watch(isLoginMode, () => {
  authStore.clearError()
})
</script>

<style scoped lang="scss">
@import './AuthModal.styles.scss';
</style>
