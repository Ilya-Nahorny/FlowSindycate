import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

// Импорт layouts
import PublicLayout from '@/layouts/PublicLayout'
import DashboardLayout from '@/layouts/DashboardLayout'
import AdminLayout from '@/layouts/AdminLayout'

// Импорт публичных страниц
import HomePage from '@/pages/Home/HomePage.vue'
import PhilosophyPage from '@/pages/Philosophy/PhilosophyPage.vue'
import ClassesPage from '@/pages/Classes/ClassesPage.vue'
import SchedulePage from '@/pages/Schedule/SchedulePage.vue'
import TrainersPage from '@/pages/Trainers/TrainersPage.vue'
import ContactPage from '@/pages/Contact/ContactPage.vue'

// Импорт страниц dashboard
import DashboardPage from '@/pages/Dashboard/DashboardPage.vue'
import ChildrenPage from '@/pages/Dashboard/ChildrenPage.vue'
import DashboardSchedulePage from '@/pages/Dashboard/SchedulePage.vue'
import BookingsPage from '@/pages/Dashboard/BookingsPage.vue'
import PaymentsPage from '@/pages/Dashboard/PaymentsPage.vue'

// Импорт страниц админ-панели
import AdminPage from '@/pages/Admin/AdminPage.vue'
import UsersPage from '@/pages/Admin/UsersPage.vue'
import AdminSchedulePage from '@/pages/Admin/SchedulePage.vue'
import AttendancePage from '@/pages/Admin/AttendancePage.vue'
import FinancesPage from '@/pages/Admin/FinancesPage.vue'

/**
 * Защита маршрутов - проверка аутентификации
 */
function requireAuth(to: any, from: any, next: any) {
  const authStore = useAuthStore()
  if (!authStore.isAuthenticated) {
    next({ name: 'home' })
  } else {
    next()
  }
}

/**
 * Защита маршрутов - проверка прав администратора
 */
function requireAdmin(to: any, from: any, next: any) {
  const authStore = useAuthStore()
  if (!authStore.isAuthenticated || !authStore.isAdmin) {
    next({ name: 'home' })
  } else {
    next()
  }
}

/**
 * Определение маршрутов приложения
 */
const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: PublicLayout,
    children: [
      {
        path: '',
        name: 'home',
        component: HomePage
      },
      {
        path: 'philosophy',
        name: 'philosophy',
        component: PhilosophyPage
      },
      {
        path: 'classes',
        name: 'classes',
        component: ClassesPage
      },
      {
        path: 'schedule',
        name: 'schedule',
        component: SchedulePage
      },
      {
        path: 'trainers',
        name: 'trainers',
        component: TrainersPage
      },
      {
        path: 'contact',
        name: 'contact',
        component: ContactPage
      }
    ]
  },
  {
    path: '/dashboard',
    component: DashboardLayout,
    beforeEnter: requireAuth,
    children: [
      {
        path: '',
        name: 'dashboard',
        component: DashboardPage
      },
      {
        path: 'participants',
        name: 'dashboard-participants',
        component: ChildrenPage
      },
      {
        path: 'schedule',
        name: 'dashboard-schedule',
        component: DashboardSchedulePage
      },
      {
        path: 'bookings',
        name: 'dashboard-bookings',
        component: BookingsPage
      },
      {
        path: 'payments',
        name: 'dashboard-payments',
        component: PaymentsPage
      }
    ]
  },
  {
    path: '/admin',
    component: AdminLayout,
    beforeEnter: requireAdmin,
    children: [
      {
        path: '',
        name: 'admin',
        component: AdminPage
      },
      {
        path: 'users',
        name: 'admin-users',
        component: UsersPage
      },
      {
        path: 'schedule',
        name: 'admin-schedule',
        component: AdminSchedulePage
      },
      {
        path: 'attendance',
        name: 'admin-attendance',
        component: AttendancePage
      },
      {
        path: 'finances',
        name: 'admin-finances',
        component: FinancesPage
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
