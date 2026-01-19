<template>
  <div class="bookings-page">
    <h1 class="bookings-page__title">{{ t('dashboard.bookings') }}</h1>

    <div class="bookings-page__tabs">
      <button
        class="bookings-tab"
        :class="{ 'bookings-tab--active': activeTab === 'planned' }"
        @click="activeTab = 'planned'"
      >
        {{ t('dashboard.plannedClasses') }} ({{ userStore.plannedBookings.length }})
      </button>
      <button
        class="bookings-tab"
        :class="{ 'bookings-tab--active': activeTab === 'attended' }"
        @click="activeTab = 'attended'"
      >
        {{ t('dashboard.attendedClasses') }} ({{ userStore.attendedBookings.length }})
      </button>
    </div>

    <div v-if="userStore.isLoading" class="bookings-page__loading">
      {{ t('common.loading') }}
    </div>

    <div v-else-if="displayedBookings.length === 0" class="bookings-page__empty">
      {{ activeTab === 'planned' ? t('dashboard.noPlannedClasses') : t('dashboard.noAttendedClasses') }}
    </div>

    <div v-else class="bookings-page__list">
      <div
        v-for="booking in displayedBookings"
        :key="booking.id"
        class="booking-card glass-medium"
      >
        <div class="booking-card__header">
          <div class="booking-card__date">
            {{ formatDate(booking.date) }}
          </div>
          <div class="booking-card__status" :class="`booking-card__status--${booking.status}`">
            {{ t(`dashboard.status.${booking.status}`) }}
          </div>
        </div>
        <div class="booking-card__content">
          <div class="booking-card__info">
            <span class="booking-card__child">
              {{ getChildName(booking.childId) }}
            </span>
            <span class="booking-card__class">
              {{ getClassName(booking.scheduleClassId) }}
            </span>
            <span class="booking-card__time">
              {{ getClassTime(booking.scheduleClassId) }}
            </span>
          </div>
          <div class="booking-card__type">
            {{ t(`dashboard.classType.${booking.classType}`) }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { useUserStore } from '@/stores/user'
import { useClassesStore } from '@/stores/classes'
import type { ClassBooking } from '@/types'

/**
 * Страница записей на занятия
 */

const { t } = useI18n()
const userStore = useUserStore()
const classesStore = useClassesStore()

const activeTab = ref<'planned' | 'attended'>('planned')

/**
 * Отображаемые записи
 */
const displayedBookings = computed(() => {
  if (activeTab.value === 'planned') {
    return userStore.plannedBookings.sort((a, b) => 
      new Date(a.date).getTime() - new Date(b.date).getTime()
    )
  } else {
    return userStore.attendedBookings.sort((a, b) => 
      new Date(b.date).getTime() - new Date(a.date).getTime()
    )
  }
})

/**
 * Получение имени ребенка
 */
function getChildName(childId: string): string {
  const child = userStore.children.find(c => c.id === childId)
  return child ? `${child.firstName} ${child.lastName}` : ''
}

/**
 * Получение названия класса
 */
function getClassName(scheduleClassId: string): string {
  const scheduleClass = classesStore.getClassById(scheduleClassId)
  if (scheduleClass) {
    return classesStore.getGroupById(scheduleClass.groupId)?.name || ''
  }
  return ''
}

/**
 * Получение времени занятия
 */
function getClassTime(scheduleClassId: string): string {
  const scheduleClass = classesStore.getClassById(scheduleClassId)
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
    year: 'numeric',
    weekday: 'long'
  })
}

/**
 * Загрузка данных
 */
onMounted(async () => {
  await userStore.loadChildren()
  await userStore.loadBookings()
  await classesStore.loadSchedule()
  await classesStore.loadGroups()
})
</script>

<style scoped lang="scss">
@import './BookingsPage.styles.scss';
</style>
