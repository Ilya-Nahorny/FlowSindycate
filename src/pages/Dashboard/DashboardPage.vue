<template>
  <div class="dashboard-page">
    <h1 class="dashboard-page__title">{{ t('dashboard.title') }}</h1>
    
    <div class="dashboard-page__grid">
      <!-- Статистика -->
      <div class="dashboard-card glass-medium">
        <h3 class="dashboard-card__title">{{ t('dashboard.statistics') }}</h3>
        <div class="dashboard-stats">
          <div class="dashboard-stat">
            <span class="dashboard-stat__label">{{ t('dashboard.children') }}</span>
            <span class="dashboard-stat__value">{{ userStore.children.length }}</span>
          </div>
          <div class="dashboard-stat">
            <span class="dashboard-stat__label">{{ t('dashboard.plannedClasses') }}</span>
            <span class="dashboard-stat__value">{{ userStore.plannedBookings.length }}</span>
          </div>
          <div class="dashboard-stat">
            <span class="dashboard-stat__label">{{ t('dashboard.attendedClasses') }}</span>
            <span class="dashboard-stat__value">{{ userStore.attendedBookings.length }}</span>
          </div>
        </div>
      </div>

      <!-- Ближайшие занятия -->
      <div class="dashboard-card glass-medium">
        <h3 class="dashboard-card__title">{{ t('dashboard.upcomingClasses') }}</h3>
        <div v-if="upcomingBookings.length === 0" class="dashboard-empty">
          {{ t('dashboard.noUpcomingClasses') }}
        </div>
        <div v-else class="dashboard-bookings">
          <div
            v-for="booking in upcomingBookings"
            :key="booking.id"
            class="dashboard-booking"
          >
            <div class="dashboard-booking__info">
              <span class="dashboard-booking__date">{{ formatDate(booking.date) }}</span>
              <span class="dashboard-booking__time">{{ getClassTime(booking) }}</span>
            </div>
            <span class="dashboard-booking__child">{{ getChildName(booking.childId) }}</span>
          </div>
        </div>
      </div>

      <!-- Оплаты -->
      <div class="dashboard-card glass-medium">
        <h3 class="dashboard-card__title">{{ t('dashboard.payments') }}</h3>
        <div class="dashboard-payment-summary">
          <div class="dashboard-payment-amount">
            <span class="dashboard-payment-amount__label">{{ t('dashboard.totalToPay') }}</span>
            <span class="dashboard-payment-amount__value">
              {{ userStore.calculateTotalAmount() }} PLN
            </span>
          </div>
          <Button
            v-if="userStore.calculateTotalAmount() > 0"
            @click="openPaymentModal"
            variant="primary"
            full-width
          >
            {{ t('dashboard.pay') }}
          </Button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { useUserStore } from '@/stores/user'
import { useClassesStore } from '@/stores/classes'
import { Button } from '@/components/ui/Button'
import type { ClassBooking } from '@/types'

/**
 * Главная страница личного кабинета
 */

const { t } = useI18n()
const userStore = useUserStore()
const classesStore = useClassesStore()

/**
 * Ближайшие запланированные занятия
 */
const upcomingBookings = computed(() => {
  const now = new Date()
  return userStore.plannedBookings
    .filter(b => new Date(b.date) >= now)
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(0, 5)
})

/**
 * Получение имени ребенка
 */
function getChildName(childId: string): string {
  const child = userStore.children.find(c => c.id === childId)
  return child ? `${child.firstName} ${child.lastName}` : ''
}

/**
 * Получение времени занятия
 */
function getClassTime(booking: ClassBooking): string {
  const scheduleClass = classesStore.getClassById(booking.scheduleClassId)
  if (scheduleClass) {
    return `${scheduleClass.startTime} - ${scheduleClass.endTime}`
  }
  return ''
}

/**
 * Форматирование даты
 */
function formatDate(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleDateString('ru-RU', {
    day: 'numeric',
    month: 'long',
    weekday: 'short'
  })
}

/**
 * Открытие модального окна оплаты
 */
function openPaymentModal(): void {
  // TODO: Реализовать модальное окно оплаты
  console.log('Open payment modal')
}

/**
 * Загрузка данных
 */
onMounted(async () => {
  await userStore.loadChildren()
  await userStore.loadBookings()
  await userStore.loadPayments()
  await classesStore.loadSchedule()
})
</script>

<style scoped lang="scss">
@import './DashboardPage.styles.scss';
</style>
