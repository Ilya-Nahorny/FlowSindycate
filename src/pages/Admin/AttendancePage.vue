<template>
  <div class="attendance-page">
    <h1 class="attendance-page__title">{{ t('admin.attendance') }}</h1>

    <div v-if="adminStore.isLoading" class="attendance-page__loading">
      {{ t('common.loading') }}
    </div>

    <div v-else class="attendance-page__content">
      <div class="attendance-page__stats glass-medium">
        <div class="attendance-stat">
          <span class="attendance-stat__label">{{ t('admin.totalBookings') }}</span>
          <span class="attendance-stat__value">{{ adminStore.attendanceStats?.totalBookings || 0 }}</span>
        </div>
        <div class="attendance-stat">
          <span class="attendance-stat__label">{{ t('admin.attended') }}</span>
          <span class="attendance-stat__value attendance-stat__value--success">
            {{ adminStore.attendanceStats?.attended || 0 }}
          </span>
        </div>
        <div class="attendance-stat">
          <span class="attendance-stat__label">{{ t('admin.missed') }}</span>
          <span class="attendance-stat__value attendance-stat__value--error">
            {{ adminStore.attendanceStats?.missed || 0 }}
          </span>
        </div>
        <div class="attendance-stat">
          <span class="attendance-stat__label">{{ t('admin.attendanceRate') }}</span>
          <span class="attendance-stat__value">
            {{ adminStore.attendanceStats?.attendanceRate.toFixed(1) || 0 }}%
          </span>
        </div>
      </div>

      <div class="attendance-page__list">
        <div
          v-for="attendance in adminStore.attendances"
          :key="attendance.id"
          class="attendance-card glass-medium"
        >
          <div class="attendance-card__header">
            <div class="attendance-card__date">{{ formatDate(attendance.date) }}</div>
            <div
              class="attendance-card__status"
              :class="`attendance-card__status--${attendance.attended ? 'attended' : 'missed'}`"
            >
              {{ attendance.attended ? t('admin.attended') : t('admin.missed') }}
            </div>
          </div>
          <div class="attendance-card__content">
            <div class="attendance-card__child">
              {{ getChildName(attendance.childId) }}
            </div>
            <div class="attendance-card__class">
              {{ getClassName(attendance.scheduleClassId) }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { useAdminStore } from '@/stores/admin'
import { useClassesStore } from '@/stores/classes'

/**
 * Страница управления посещаемостью
 */

const { t, locale } = useI18n()
const adminStore = useAdminStore()
const classesStore = useClassesStore()

/**
 * Получение имени ребенка
 */
function getChildName(childId: string): string {
  const child = adminStore.allChildren.find(c => c.id === childId)
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
 * Форматирование даты
 */
function formatDate(dateString: string): string {
  const date = new Date(dateString)
  const dateLocale = locale.value === 'ru' ? 'ru-RU' : locale.value === 'pl' ? 'pl-PL' : 'en-US'
  return date.toLocaleDateString(dateLocale, {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  })
}

/**
 * Загрузка данных
 */
onMounted(async () => {
  await adminStore.loadAttendances()
  await adminStore.loadAllChildren()
  await adminStore.loadAttendanceStats()
  await classesStore.loadSchedule()
  await classesStore.loadGroups()
})
</script>

<style scoped lang="scss">
@import './AttendancePage.styles.scss';
</style>
