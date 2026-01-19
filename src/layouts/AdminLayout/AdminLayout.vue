<template>
  <div class="admin-layout">
    <!-- Sidebar -->
    <aside class="admin-layout__sidebar glass-medium">
      <div class="admin-layout__sidebar-header">
        <RouterLink to="/" class="admin-layout__logo">
          Flow Syndicate
        </RouterLink>
        <div class="admin-layout__admin-badge">
          {{ t('admin.title') }}
        </div>
      </div>
      <nav class="admin-layout__nav">
        <RouterLink
          v-for="item in navItems"
          :key="item.path"
          :to="item.path"
          class="admin-nav-item"
          :exact-active-class="'admin-nav-item--active'"
        >
          <component :is="item.icon" class="admin-nav-item__icon" />
          <span>{{ item.label }}</span>
        </RouterLink>
      </nav>
      <div class="admin-layout__sidebar-footer">
        <div class="admin-layout__user-info">
          <span class="admin-layout__user-email">{{ authStore.user?.email }}</span>
        </div>
        <button
          class="admin-layout__logout"
          @click="handleLogout"
        >
          {{ t('auth.logout') }}
        </button>
      </div>
    </aside>

    <!-- Main Content -->
    <main class="admin-layout__content">
      <RouterView v-slot="{ Component }">
        <Transition name="fade" mode="out-in">
          <component :is="Component" />
        </Transition>
      </RouterView>
    </main>
  </div>
</template>

<script setup lang="ts">
import { computed, h } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useAuthStore } from '@/stores/auth'
import LanguageSwitcher from '@/components/header/LanguageSwitcher'

/**
 * Layout для административной панели
 */

const { t } = useI18n()
const router = useRouter()
const authStore = useAuthStore()

// Иконки для навигации (упрощенные SVG компоненты)
const UsersIcon = () => h('svg', { width: 20, height: 20, viewBox: '0 0 24 24', fill: 'none' }, [
  h('path', { d: 'M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2', stroke: 'currentColor', 'stroke-width': 2, 'stroke-linecap': 'round' }),
  h('circle', { cx: 9, cy: 7, r: 4, stroke: 'currentColor', 'stroke-width': 2 }),
  h('path', { d: 'M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75', stroke: 'currentColor', 'stroke-width': 2, 'stroke-linecap': 'round' })
])

const CalendarIcon = () => h('svg', { width: 20, height: 20, viewBox: '0 0 24 24', fill: 'none' }, [
  h('rect', { x: 3, y: 4, width: 18, height: 18, rx: 2, ry: 2, stroke: 'currentColor', 'stroke-width': 2 }),
  h('line', { x1: 16, y1: 2, x2: 16, y2: 6, stroke: 'currentColor', 'stroke-width': 2 }),
  h('line', { x1: 8, y1: 2, x2: 8, y2: 6, stroke: 'currentColor', 'stroke-width': 2 }),
  h('line', { x1: 3, y1: 10, x2: 21, y2: 10, stroke: 'currentColor', 'stroke-width': 2 })
])

const CheckIcon = () => h('svg', { width: 20, height: 20, viewBox: '0 0 24 24', fill: 'none' }, [
  h('path', { d: 'M22 11.08V12a10 10 0 1 1-5.93-9.14', stroke: 'currentColor', 'stroke-width': 2, 'stroke-linecap': 'round' }),
  h('polyline', { points: '22 4 12 14.01 9 11.01', stroke: 'currentColor', 'stroke-width': 2, 'stroke-linecap': 'round' })
])

const DollarIcon = () => h('svg', { width: 20, height: 20, viewBox: '0 0 24 24', fill: 'none' }, [
  h('line', { x1: 12, y1: 1, x2: 12, y2: 23, stroke: 'currentColor', 'stroke-width': 2 }),
  h('path', { d: 'M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6', stroke: 'currentColor', 'stroke-width': 2, 'stroke-linecap': 'round' })
])

const navItems = computed(() => [
  { path: '/admin', label: t('admin.overview'), icon: CalendarIcon },
  { path: '/admin/users', label: t('admin.users'), icon: UsersIcon },
  { path: '/admin/schedule', label: t('admin.schedule'), icon: CalendarIcon },
  { path: '/admin/attendance', label: t('admin.attendance'), icon: CheckIcon },
  { path: '/admin/finances', label: t('admin.finances'), icon: DollarIcon }
])

/**
 * Выход из системы
 */
function handleLogout(): void {
  authStore.logout()
  router.push('/')
}
</script>

<style scoped lang="scss">
@import './AdminLayout.styles.scss';
</style>
