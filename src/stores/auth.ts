/**
 * Store для управления аутентификацией
 */
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { User, LoginData, RegisterData } from '@/types'
import { UserRole } from '@/types'

export const useAuthStore = defineStore('auth', () => {
  // Состояние
  const user = ref<User | null>(null)
  const token = ref<string | null>(null)
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  // Геттеры
  const isAuthenticated = computed(() => !!user.value && !!token.value)
  const isAdmin = computed(() => user.value?.role === UserRole.ADMIN)
  const isUser = computed(() => user.value?.role === UserRole.USER)

  /**
   * Регистрация нового пользователя
   */
  async function register(data: RegisterData): Promise<void> {
    isLoading.value = true
    error.value = null

    try {
      // TODO: Заменить на реальный API вызов
      // const response = await api.post('/auth/register', data)
      
      // Моковая реализация для демонстрации
      const mockUser: User = {
        id: `user_${Date.now()}`,
        email: data.email,
        phone: data.phone,
        role: UserRole.USER,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }

      const mockToken = `token_${Date.now()}`

      user.value = mockUser
      token.value = mockToken
      
      // Сохраняем в localStorage
      localStorage.setItem('auth_token', mockToken)
      localStorage.setItem('auth_user', JSON.stringify(mockUser))
    } catch (err: any) {
      error.value = err.message || 'Ошибка регистрации'
      throw err
    } finally {
      isLoading.value = false
    }
  }

  /**
   * Вход в систему
   */
  async function login(data: LoginData): Promise<void> {
    isLoading.value = true
    error.value = null

    try {
      // TODO: Заменить на реальный API вызов
      // const response = await api.post('/auth/login', data)
      
      // Моковая реализация для демонстрации
      // Для тестирования админки: email = 'admin@flowsyndicate.pl'
      const isAdminEmail = data.email === 'admin@flowsyndicate.pl'
      
      const mockUser: User = {
        id: isAdminEmail ? 'admin_1' : `user_${Date.now()}`,
        email: data.email,
        phone: '+48123456789',
        role: isAdminEmail ? UserRole.ADMIN : UserRole.USER,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }

      const mockToken = `token_${Date.now()}`

      user.value = mockUser
      token.value = mockToken
      
      // Сохраняем в localStorage
      localStorage.setItem('auth_token', mockToken)
      localStorage.setItem('auth_user', JSON.stringify(mockUser))
    } catch (err: any) {
      error.value = err.message || 'Ошибка входа'
      throw err
    } finally {
      isLoading.value = false
    }
  }

  /**
   * Выход из системы
   */
  function logout(): void {
    user.value = null
    token.value = null
    localStorage.removeItem('auth_token')
    localStorage.removeItem('auth_user')
  }

  /**
   * Восстановление сессии из localStorage
   */
  function restoreSession(): void {
    const storedToken = localStorage.getItem('auth_token')
    const storedUser = localStorage.getItem('auth_user')

    if (storedToken && storedUser) {
      try {
        token.value = storedToken
        user.value = JSON.parse(storedUser)
      } catch (err) {
        // Если данные повреждены, очищаем
        logout()
      }
    }
  }

  /**
   * Очистка ошибки
   */
  function clearError(): void {
    error.value = null
  }

  return {
    user,
    token,
    isLoading,
    error,
    isAuthenticated,
    isAdmin,
    isUser,
    register,
    login,
    logout,
    restoreSession,
    clearError
  }
})
