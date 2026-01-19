/**
 * Store для административной панели
 */
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { User, Child, Attendance, FinancialStats, AttendanceStats } from '@/types'
import { useAuthStore } from './auth'
import { useClassesStore } from './classes'

export const useAdminStore = defineStore('admin', () => {
  const authStore = useAuthStore()
  const classesStore = useClassesStore()

  // Состояние
  const users = ref<User[]>([])
  const allChildren = ref<Child[]>([])
  const attendances = ref<Attendance[]>([])
  const financialStats = ref<FinancialStats | null>(null)
  const attendanceStats = ref<AttendanceStats | null>(null)
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  /**
   * Загрузка всех пользователей
   */
  async function loadUsers(): Promise<void> {
    if (!authStore.isAdmin) {
      throw new Error('Доступ запрещен')
    }

    isLoading.value = true
    error.value = null

    try {
      // TODO: Заменить на реальный API вызов
      // const response = await api.get('/admin/users')
      
      // Моковая реализация - собираем всех пользователей из localStorage
      const allUsers: User[] = []
      const keys = Object.keys(localStorage)
      
      keys.forEach(key => {
        if (key.startsWith('auth_user')) {
          try {
            const user = JSON.parse(localStorage.getItem(key) || '{}')
            if (user.id && user.email) {
              allUsers.push(user)
            }
          } catch (e) {
            // Игнорируем поврежденные данные
          }
        }
      })

      users.value = allUsers
    } catch (err: any) {
      error.value = err.message || 'Ошибка загрузки пользователей'
    } finally {
      isLoading.value = false
    }
  }

  /**
   * Загрузка всех детей
   */
  async function loadAllChildren(): Promise<void> {
    if (!authStore.isAdmin) {
      throw new Error('Доступ запрещен')
    }

    isLoading.value = true
    error.value = null

    try {
      // TODO: Заменить на реальный API вызов
      // const response = await api.get('/admin/children')
      
      // Моковая реализация
      const allChildrenList: Child[] = []
      const keys = Object.keys(localStorage)
      
      keys.forEach(key => {
        if (key.startsWith('children_')) {
          try {
            const children = JSON.parse(localStorage.getItem(key) || '[]')
            if (Array.isArray(children)) {
              allChildrenList.push(...children)
            }
          } catch (e) {
            // Игнорируем поврежденные данные
          }
        }
      })

      allChildren.value = allChildrenList
    } catch (err: any) {
      error.value = err.message || 'Ошибка загрузки детей'
    } finally {
      isLoading.value = false
    }
  }

  /**
   * Загрузка посещаемости
   */
  async function loadAttendances(): Promise<void> {
    if (!authStore.isAdmin) {
      throw new Error('Доступ запрещен')
    }

    isLoading.value = true
    error.value = null

    try {
      // TODO: Заменить на реальный API вызов
      // const response = await api.get('/admin/attendances')
      
      // Моковая реализация
      const mockAttendances: Attendance[] = JSON.parse(
        localStorage.getItem('attendances') || '[]'
      )
      attendances.value = mockAttendances
    } catch (err: any) {
      error.value = err.message || 'Ошибка загрузки посещаемости'
    } finally {
      isLoading.value = false
    }
  }

  /**
   * Отметка посещения
   */
  async function markAttendance(
    bookingId: string,
    childId: string,
    scheduleClassId: string,
    date: string,
    attended: boolean,
    notes?: string
  ): Promise<Attendance> {
    if (!authStore.isAdmin) {
      throw new Error('Доступ запрещен')
    }

    isLoading.value = true
    error.value = null

    try {
      // TODO: Заменить на реальный API вызов
      // const response = await api.post('/admin/attendances', { ... })
      
      const newAttendance: Attendance = {
        id: `attendance_${Date.now()}`,
        bookingId,
        childId,
        scheduleClassId,
        date,
        attended,
        notes,
        markedBy: authStore.user?.id || '',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }

      attendances.value.push(newAttendance)
      localStorage.setItem('attendances', JSON.stringify(attendances.value))

      return newAttendance
    } catch (err: any) {
      error.value = err.message || 'Ошибка отметки посещения'
      throw err
    } finally {
      isLoading.value = false
    }
  }

  /**
   * Загрузка финансовой статистики
   */
  async function loadFinancialStats(startDate?: string, endDate?: string): Promise<void> {
    if (!authStore.isAdmin) {
      throw new Error('Доступ запрещен')
    }

    isLoading.value = true
    error.value = null

    try {
      // TODO: Заменить на реальный API вызов
      // const response = await api.get('/admin/financial-stats', { params: { startDate, endDate } })
      
      // Моковая реализация
      const stats: FinancialStats = {
        totalRevenue: 0,
        pendingPayments: 0,
        revenueByClass: {},
        revenueByGroup: {},
        revenueByUser: {},
        period: {
          start: startDate || new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
          end: endDate || new Date().toISOString()
        }
      }

      // Собираем данные из платежей
      const keys = Object.keys(localStorage)
      keys.forEach(key => {
        if (key.startsWith('payments_')) {
          try {
            const payments = JSON.parse(localStorage.getItem(key) || '[]')
            payments.forEach((payment: any) => {
              if (payment.status === 'paid') {
                stats.totalRevenue += payment.amount
              } else if (payment.status === 'pending') {
                stats.pendingPayments += payment.amount
              }
            })
          } catch (e) {
            // Игнорируем
          }
        }
      })

      financialStats.value = stats
    } catch (err: any) {
      error.value = err.message || 'Ошибка загрузки статистики'
    } finally {
      isLoading.value = false
    }
  }

  /**
   * Загрузка статистики посещаемости
   */
  async function loadAttendanceStats(): Promise<void> {
    if (!authStore.isAdmin) {
      throw new Error('Доступ запрещен')
    }

    isLoading.value = true
    error.value = null

    try {
      // TODO: Заменить на реальный API вызов
      // const response = await api.get('/admin/attendance-stats')
      
      // Моковая реализация
      const total = attendances.value.length
      const attended = attendances.value.filter(a => a.attended).length
      const missed = total - attended
      const rate = total > 0 ? (attended / total) * 100 : 0

      const stats: AttendanceStats = {
        totalBookings: total,
        attended,
        missed,
        attendanceRate: rate,
        byGroup: {},
        byChild: {}
      }

      attendanceStats.value = stats
    } catch (err: any) {
      error.value = err.message || 'Ошибка загрузки статистики посещаемости'
    } finally {
      isLoading.value = false
    }
  }

  /**
   * Получение детей пользователя
   */
  function getChildrenByUserId(userId: string): Child[] {
    return allChildren.value.filter(c => c.userId === userId)
  }

  return {
    users,
    allChildren,
    attendances,
    financialStats,
    attendanceStats,
    isLoading,
    error,
    loadUsers,
    loadAllChildren,
    loadAttendances,
    markAttendance,
    loadFinancialStats,
    loadAttendanceStats,
    getChildrenByUserId
  }
})
