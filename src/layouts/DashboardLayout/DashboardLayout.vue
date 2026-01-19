<template>
  <div class="dashboard-layout">
    <!-- Header -->
    <header class="dashboard-layout__header glass-medium">
      <div class="dashboard-layout__header-content">
        <div class="dashboard-layout__top-row">
          <RouterLink to="/" class="dashboard-layout__logo">
            Flow Syndicate
          </RouterLink>
          <div class="dashboard-layout__user">
            <LanguageSwitcher />
            <span class="dashboard-layout__user-email">{{ authStore.user?.email }}</span>
            <button
              class="dashboard-layout__logout"
              @click="handleLogout"
            >
              {{ t('auth.logout') }}
            </button>
          </div>
        </div>
        <nav 
          ref="navContainer"
          class="dashboard-layout__nav"
          @scroll="handleNavScroll"
        >
          <div class="dashboard-layout__nav-fade-left"></div>
          <div class="dashboard-layout__nav-items">
            <RouterLink
              v-for="item in navItems"
              :key="item.path"
              :to="item.path"
              class="dashboard-nav-item"
              :exact-active-class="'dashboard-nav-item--active'"
            >
              {{ item.label }}
            </RouterLink>
          </div>
          <div class="dashboard-layout__nav-fade-right"></div>
        </nav>
      </div>
    </header>

    <!-- Main Content -->
    <main class="dashboard-layout__content">
      <RouterView v-slot="{ Component }">
        <Transition name="fade" mode="out-in">
          <component :is="Component" />
        </Transition>
      </RouterView>
    </main>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useAuthStore } from '@/stores/auth'
import LanguageSwitcher from '@/components/header/LanguageSwitcher'

/**
 * Layout для личного кабинета пользователя
 */

const { t } = useI18n()
const router = useRouter()
const route = useRoute()
const authStore = useAuthStore()

const navContainer = ref<HTMLElement | null>(null)

const navItems = computed(() => [
  { path: '/dashboard', label: t('dashboard.overview'), exact: true },
  { path: '/dashboard/participants', label: t('dashboard.participants') },
  { path: '/dashboard/schedule', label: t('dashboard.schedule') },
  { path: '/dashboard/bookings', label: t('dashboard.bookings') },
  { path: '/dashboard/payments', label: t('dashboard.payments') }
])

/**
 * Обработчик скролла навигации для fade-эффектов
 */
function handleNavScroll(): void {
  if (!navContainer.value) return
  
  const container = navContainer.value
  const scrollLeft = container.scrollLeft
  const scrollWidth = container.scrollWidth
  const clientWidth = container.clientWidth
  const maxScroll = scrollWidth - clientWidth
  
  const fadeLeft = container.querySelector('.dashboard-layout__nav-fade-left') as HTMLElement
  const fadeRight = container.querySelector('.dashboard-layout__nav-fade-right') as HTMLElement
  
  if (fadeLeft) {
    fadeLeft.style.opacity = scrollLeft > 10 ? '1' : '0'
  }
  
  if (fadeRight) {
    fadeRight.style.opacity = scrollLeft < maxScroll - 10 ? '1' : '0'
  }
}

/**
 * Выход из системы
 */
function handleLogout(): void {
  authStore.logout()
  router.push('/')
}

onMounted(() => {
  handleNavScroll()
  if (navContainer.value) {
    navContainer.value.addEventListener('scroll', handleNavScroll)
  }
})
</script>

<style scoped lang="scss">
@import './DashboardLayout.styles.scss';
</style>
