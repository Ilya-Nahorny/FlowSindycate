<template>
  <div class="payments-page">
    <h1 class="payments-page__title">{{ t('dashboard.payments') }}</h1>

    <!-- Сумма к оплате -->
    <div class="payments-page__summary glass-medium">
      <div class="payment-summary">
        <div class="payment-summary__amount">
          <span class="payment-summary__label">{{ t('dashboard.totalToPay') }}</span>
          <span class="payment-summary__value">
            {{ userStore.calculateTotalAmount() }} PLN
          </span>
        </div>
        <Button
          v-if="userStore.calculateTotalAmount() > 0"
          @click="openPaymentModal"
          variant="primary"
          size="lg"
        >
          {{ t('dashboard.pay') }}
        </Button>
      </div>
    </div>

    <!-- История платежей -->
    <div class="payments-page__history">
      <h2 class="payments-page__subtitle">{{ t('dashboard.paymentHistory') }}</h2>

      <div v-if="userStore.isLoading" class="payments-page__loading">
        {{ t('common.loading') }}
      </div>

      <div v-else-if="userStore.payments.length === 0" class="payments-page__empty">
        {{ t('dashboard.noPayments') }}
      </div>

      <div v-else class="payments-page__list">
        <div
          v-for="payment in userStore.payments"
          :key="payment.id"
          class="payment-card glass-medium"
        >
          <div class="payment-card__header">
            <div class="payment-card__amount">
              {{ payment.amount }} {{ payment.currency }}
            </div>
            <div
              class="payment-card__status"
              :class="`payment-card__status--${payment.status}`"
            >
              {{ t(`dashboard.paymentStatus.${payment.status}`) }}
            </div>
          </div>
          <div class="payment-card__content">
            <div class="payment-card__date">
              {{ formatDate(payment.createdAt) }}
            </div>
            <div v-if="payment.description" class="payment-card__description">
              {{ payment.description }}
            </div>
            <div v-if="payment.paidAt" class="payment-card__paid">
              {{ t('dashboard.paidAt') }}: {{ formatDate(payment.paidAt) }}
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Модальное окно оплаты -->
    <Modal
      :is-open="isPaymentModalOpen"
      :title="t('dashboard.payment')"
      @update:is-open="isPaymentModalOpen = $event"
    >
      <div class="payment-modal">
        <div class="payment-modal__amount">
          <span class="payment-modal__amount-label">{{ t('dashboard.amount') }}</span>
          <span class="payment-modal__amount-value">
            {{ userStore.calculateTotalAmount() }} PLN
          </span>
        </div>

        <div class="payment-modal__methods">
          <h3 class="payment-modal__methods-title">{{ t('dashboard.paymentMethod') }}</h3>
          <div class="payment-methods">
            <button
              class="payment-method"
              :class="{ 'payment-method--active': selectedMethod === 'blik' }"
              @click="selectedMethod = 'blik'"
            >
              <span>BLIK</span>
            </button>
            <button
              class="payment-method"
              :class="{ 'payment-method--active': selectedMethod === 'przelewy24' }"
              @click="selectedMethod = 'przelewy24'"
            >
              <span>Przelewy24</span>
            </button>
          </div>
        </div>

        <div class="payment-modal__note">
          {{ t('dashboard.paymentNote') }}
        </div>
      </div>

      <template #footer>
        <Button
          type="button"
          variant="outline"
          @click="isPaymentModalOpen = false"
        >
          {{ t('common.cancel') }}
        </Button>
        <Button
          @click="handlePayment"
          variant="primary"
          :disabled="!selectedMethod"
        >
          {{ t('dashboard.pay') }}
        </Button>
      </template>
    </Modal>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { useUserStore } from '@/stores/user'
import { Button } from '@/components/ui/Button'
import { Modal } from '@/components/ui/Modal'

/**
 * Страница платежей
 */

const { t } = useI18n()
const userStore = useUserStore()

const isPaymentModalOpen = ref(false)
const selectedMethod = ref<'blik' | 'przelewy24' | null>(null)

/**
 * Открытие модального окна оплаты
 */
function openPaymentModal(): void {
  if (userStore.calculateTotalAmount() === 0) {
    return
  }
  selectedMethod.value = null
  isPaymentModalOpen.value = true
}

/**
 * Обработка оплаты
 */
async function handlePayment(): Promise<void> {
  if (!selectedMethod.value) return

  // TODO: Интеграция с платежной системой
  // В реальном приложении здесь будет вызов API для создания платежа
  // и редирект на страницу оплаты Przelewy24 или открытие BLIK

  alert(t('dashboard.paymentInDevelopment'))
  isPaymentModalOpen.value = false

  // После успешной оплаты обновляем платежи
  await userStore.loadPayments()
}

/**
 * Форматирование даты
 */
function formatDate(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleDateString('ru-RU', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

/**
 * Загрузка данных
 */
onMounted(async () => {
  await userStore.loadPayments()
})
</script>

<style scoped lang="scss">
@import './PaymentsPage.styles.scss';
</style>
