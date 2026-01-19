<template>
  <div class="admin-page">
    <h1 class="admin-page__title">{{ t('admin.overview') }}</h1>

    <div v-if="adminStore.isLoading" class="admin-page__loading">
      {{ t('common.loading') }}
    </div>

    <div v-else class="admin-page__grid">
      <!-- Статистика пользователей -->
      <div class="admin-stats-card glass-medium">
        <h3 class="admin-stats-card__title">{{ t('admin.users') }}</h3>
        <div class="admin-stats-card__value">{{ adminStore.users.length }}</div>
        <RouterLink to="/admin/users" class="admin-stats-card__link">
          {{ t('admin.viewAll') }} →
        </RouterLink>
      </div>

      <!-- Статистика детей -->
      <div class="admin-stats-card glass-medium">
        <h3 class="admin-stats-card__title">{{ t('admin.children') }}</h3>
        <div class="admin-stats-card__value">{{ adminStore.allChildren.length }}</div>
        <RouterLink to="/admin/users" class="admin-stats-card__link">
          {{ t('admin.viewAll') }} →
        </RouterLink>
      </div>

      <!-- Статистика занятий -->
      <div class="admin-stats-card glass-medium">
        <h3 class="admin-stats-card__title">{{ t('admin.classes') }}</h3>
        <div class="admin-stats-card__value">{{ classesStore.schedule.length }}</div>
        <RouterLink to="/admin/schedule" class="admin-stats-card__link">
          {{ t('admin.viewAll') }} →
        </RouterLink>
      </div>

      <!-- Статистика посещаемости -->
      <div class="admin-stats-card glass-medium">
        <h3 class="admin-stats-card__title">{{ t('admin.attendance') }}</h3>
        <div class="admin-stats-card__value">
          {{ adminStore.attendanceStats?.attendanceRate.toFixed(1) || 0 }}%
        </div>
        <RouterLink to="/admin/attendance" class="admin-stats-card__link">
          {{ t('admin.viewAll') }} →
        </RouterLink>
      </div>
    </div>

    <!-- Быстрые действия -->
    <div class="admin-page__actions glass-medium">
      <h2 class="admin-page__subtitle">{{ t('admin.quickActions') }}</h2>
      <div class="admin-actions">
        <RouterLink to="/admin/schedule" class="admin-action">
          {{ t('admin.manageSchedule') }}
        </RouterLink>
        <RouterLink to="/admin/attendance" class="admin-action">
          {{ t('admin.markAttendance') }}
        </RouterLink>
        <RouterLink to="/admin/finances" class="admin-action">
          {{ t('admin.viewFinances') }}
        </RouterLink>
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
 * Главная страница административной панели
 */

const { t } = useI18n()
const adminStore = useAdminStore()
const classesStore = useClassesStore()

/**
 * Загрузка данных
 */
onMounted(async () => {
  await adminStore.loadUsers()
  await adminStore.loadAllChildren()
  await adminStore.loadAttendances()
  await adminStore.loadAttendanceStats()
  await classesStore.loadSchedule()
})
</script>

<style scoped lang="scss">
@import './AdminPage.styles.scss';
</style>
