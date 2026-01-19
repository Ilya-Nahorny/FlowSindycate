/**
 * Store для управления данными пользователя и его детей
 */
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { Child, AddChildData, ClassBooking, Payment, Pricing } from '@/types'
import { useAuthStore } from './auth'

export const useUserStore = defineStore('user', () => {
  const authStore = useAuthStore()

  // Состояние
  const children = ref<Child[]>([])
  const bookings = ref<ClassBooking[]>([])
  const payments = ref<Payment[]>([])
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  // Цены на занятия
  const pricing: Pricing = {
    single: 70,
    subscriptionWeekly: 250,
    subscriptionBiweekly: 380,
    individualMin: 120
  }

  // Геттеры
  const hasChildren = computed(() => children.value.length > 0)
  const plannedBookings = computed(() => 
    bookings.value.filter(b => b.status === 'planned')
  )
  const attendedBookings = computed(() => 
    bookings.value.filter(b => b.status === 'attended')
  )

  /**
   * Загрузка детей пользователя
   */
  async function loadChildren(): Promise<void> {
    if (!authStore.user) return

    isLoading.value = true
    error.value = null

    try {
      // TODO: Заменить на реальный API вызов
      // const response = await api.get(`/users/${authStore.user.id}/children`)
      
      // Моковая реализация
      const mockChildren: Child[] = JSON.parse(
        localStorage.getItem(`children_${authStore.user.id}`) || '[]'
      )
      children.value = mockChildren
    } catch (err: any) {
      error.value = err.message || 'Ошибка загрузки детей'
    } finally {
      isLoading.value = false
    }
  }

  /**
   * Добавление нового ребенка
   */
  async function addChild(data: AddChildData): Promise<Child> {
    if (!authStore.user) {
      throw new Error('Пользователь не авторизован')
    }

    isLoading.value = true
    error.value = null

    try {
      // TODO: Заменить на реальный API вызов
      // const response = await api.post(`/users/${authStore.user.id}/children`, data)
      
      const newChild: Child = {
        id: `child_${Date.now()}`,
        userId: authStore.user.id,
        firstName: data.firstName,
        lastName: data.lastName,
        birthDate: data.birthDate,
        phone: data.phone,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }

      children.value.push(newChild)
      
      // Сохраняем в localStorage
      localStorage.setItem(
        `children_${authStore.user.id}`,
        JSON.stringify(children.value)
      )

      return newChild
    } catch (err: any) {
      error.value = err.message || 'Ошибка добавления ребенка'
      throw err
    } finally {
      isLoading.value = false
    }
  }

  /**
   * Удаление ребенка
   */
  async function removeChild(childId: string): Promise<void> {
    if (!authStore.user) return

    isLoading.value = true
    error.value = null

    try {
      // TODO: Заменить на реальный API вызов
      // await api.delete(`/users/${authStore.user.id}/children/${childId}`)
      
      children.value = children.value.filter(c => c.id !== childId)
      
      // Сохраняем в localStorage
      localStorage.setItem(
        `children_${authStore.user.id}`,
        JSON.stringify(children.value)
      )
    } catch (err: any) {
      error.value = err.message || 'Ошибка удаления ребенка'
      throw err
    } finally {
      isLoading.value = false
    }
  }

  /**
   * Загрузка записей на занятия
   */
  async function loadBookings(): Promise<void> {
    if (!authStore.user) return

    isLoading.value = true
    error.value = null

    try {
      // TODO: Заменить на реальный API вызов
      // const response = await api.get(`/users/${authStore.user.id}/bookings`)
      
      // Моковая реализация
      const mockBookings: ClassBooking[] = JSON.parse(
        localStorage.getItem(`bookings_${authStore.user.id}`) || '[]'
      )
      bookings.value = mockBookings
    } catch (err: any) {
      error.value = err.message || 'Ошибка загрузки записей'
    } finally {
      isLoading.value = false
    }
  }

  /**
   * Загрузка платежей
   */
  async function loadPayments(): Promise<void> {
    if (!authStore.user) return

    isLoading.value = true
    error.value = null

    try {
      // TODO: Заменить на реальный API вызов
      // const response = await api.get(`/users/${authStore.user.id}/payments`)
      
      // Моковая реализация
      const mockPayments: Payment[] = JSON.parse(
        localStorage.getItem(`payments_${authStore.user.id}`) || '[]'
      )
      payments.value = mockPayments
    } catch (err: any) {
      error.value = err.message || 'Ошибка загрузки платежей'
    } finally {
      isLoading.value = false
    }
  }

  /**
   * Расчет суммы к оплате
   */
  function calculateTotalAmount(): number {
    // TODO: Реализовать логику расчета на основе записей и абонементов
    return payments.value
      .filter(p => p.status === 'pending')
      .reduce((sum, p) => sum + p.amount, 0)
  }

  /**
   * Очистка данных при выходе
   */
  function clearData(): void {
    children.value = []
    bookings.value = []
    payments.value = []
    error.value = null
  }

  return {
    children,
    bookings,
    payments,
    pricing,
    isLoading,
    error,
    hasChildren,
    plannedBookings,
    attendedBookings,
    loadChildren,
    addChild,
    removeChild,
    loadBookings,
    loadPayments,
    calculateTotalAmount,
    clearData
  }
})
