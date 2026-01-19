/**
 * Store для управления занятиями и расписанием
 */
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { ScheduleClass, Group, ClassBooking, BookClassData, CreateScheduleData } from '@/types'
import { WeekDay, ClassType, ClassStatus } from '@/types'
import { useAuthStore } from './auth'
import { useUserStore } from './user'

export const useClassesStore = defineStore('classes', () => {
  const authStore = useAuthStore()
  const userStore = useUserStore()

  // Состояние
  const schedule = ref<ScheduleClass[]>([])
  const groups = ref<Group[]>([])
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  // Геттеры
  const scheduleByDay = computed(() => {
    const grouped: Record<WeekDay, ScheduleClass[]> = {
      [WeekDay.MONDAY]: [],
      [WeekDay.TUESDAY]: [],
      [WeekDay.WEDNESDAY]: [],
      [WeekDay.THURSDAY]: [],
      [WeekDay.FRIDAY]: [],
      [WeekDay.SATURDAY]: [],
      [WeekDay.SUNDAY]: []
    }

    schedule.value
      .filter(c => c.isActive)
      .forEach(classItem => {
        grouped[classItem.dayOfWeek].push(classItem)
      })

    // Сортируем по времени начала
    Object.keys(grouped).forEach(day => {
      grouped[day as WeekDay].sort((a, b) => 
        a.startTime.localeCompare(b.startTime)
      )
    })

    return grouped
  })

  /**
   * Загрузка расписания
   */
  async function loadSchedule(): Promise<void> {
    isLoading.value = true
    error.value = null

    try {
      // TODO: Заменить на реальный API вызов
      // const response = await api.get('/schedule')
      
      // Моковая реализация
      const mockSchedule: ScheduleClass[] = JSON.parse(
        localStorage.getItem('schedule') || '[]'
      )
      
      if (mockSchedule.length === 0) {
        // Создаем начальное расписание
        schedule.value = getDefaultSchedule()
        localStorage.setItem('schedule', JSON.stringify(schedule.value))
      } else {
        schedule.value = mockSchedule
      }
    } catch (err: any) {
      error.value = err.message || 'Ошибка загрузки расписания'
    } finally {
      isLoading.value = false
    }
  }

  /**
   * Загрузка групп
   */
  async function loadGroups(): Promise<void> {
    isLoading.value = true
    error.value = null

    try {
      // TODO: Заменить на реальный API вызов
      // const response = await api.get('/groups')
      
      // Моковая реализация
      const mockGroups: Group[] = JSON.parse(
        localStorage.getItem('groups') || '[]'
      )
      
      if (mockGroups.length === 0) {
        groups.value = getDefaultGroups()
        localStorage.setItem('groups', JSON.stringify(groups.value))
      } else {
        groups.value = mockGroups
      }
    } catch (err: any) {
      error.value = err.message || 'Ошибка загрузки групп'
    } finally {
      isLoading.value = false
    }
  }

  /**
   * Запись на занятие
   */
  async function bookClass(data: BookClassData): Promise<ClassBooking> {
    if (!authStore.user) {
      throw new Error('Пользователь не авторизован')
    }

    isLoading.value = true
    error.value = null

    try {
      // TODO: Заменить на реальный API вызов
      // const response = await api.post('/bookings', data)
      
      const newBooking: ClassBooking = {
        id: `booking_${Date.now()}`,
        childId: data.childId,
        scheduleClassId: data.scheduleClassId,
        classType: data.classType,
        status: ClassStatus.PLANNED,
        date: data.date,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }

      // Добавляем в store пользователя
      userStore.bookings.push(newBooking)
      
      // Сохраняем в localStorage
      if (authStore.user) {
        localStorage.setItem(
          `bookings_${authStore.user.id}`,
          JSON.stringify(userStore.bookings)
        )
      }

      return newBooking
    } catch (err: any) {
      error.value = err.message || 'Ошибка записи на занятие'
      throw err
    } finally {
      isLoading.value = false
    }
  }

  /**
   * Создание занятия в расписании (админ)
   */
  async function createScheduleClass(data: CreateScheduleData): Promise<ScheduleClass> {
    if (!authStore.isAdmin) {
      throw new Error('Доступ запрещен')
    }

    isLoading.value = true
    error.value = null

    try {
      // TODO: Заменить на реальный API вызов
      // const response = await api.post('/schedule', data)
      
      const newClass: ScheduleClass = {
        id: `schedule_${Date.now()}`,
        groupId: data.groupId,
        dayOfWeek: data.dayOfWeek,
        startTime: data.startTime,
        endTime: data.endTime,
        trainerId: data.trainerId,
        trainerName: data.trainerName,
        isActive: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }

      schedule.value.push(newClass)
      localStorage.setItem('schedule', JSON.stringify(schedule.value))

      return newClass
    } catch (err: any) {
      error.value = err.message || 'Ошибка создания занятия'
      throw err
    } finally {
      isLoading.value = false
    }
  }

  /**
   * Удаление занятия из расписания (админ)
   */
  async function deleteScheduleClass(classId: string): Promise<void> {
    if (!authStore.isAdmin) {
      throw new Error('Доступ запрещен')
    }

    isLoading.value = true
    error.value = null

    try {
      // TODO: Заменить на реальный API вызов
      // await api.delete(`/schedule/${classId}`)
      
      schedule.value = schedule.value.filter(c => c.id !== classId)
      localStorage.setItem('schedule', JSON.stringify(schedule.value))
    } catch (err: any) {
      error.value = err.message || 'Ошибка удаления занятия'
      throw err
    } finally {
      isLoading.value = false
    }
  }

  /**
   * Получение занятия по ID
   */
  function getClassById(classId: string): ScheduleClass | undefined {
    return schedule.value.find(c => c.id === classId)
  }

  /**
   * Получение группы по ID
   */
  function getGroupById(groupId: string): Group | undefined {
    return groups.value.find(g => g.id === groupId)
  }

  /**
   * Дефолтное расписание (для моков)
   */
  function getDefaultSchedule(): ScheduleClass[] {
    return [
      {
        id: 'schedule_1',
        groupId: 'group_1',
        dayOfWeek: WeekDay.MONDAY,
        startTime: '18:00',
        endTime: '19:30',
        trainerName: 'Alex',
        isActive: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        id: 'schedule_2',
        groupId: 'group_2',
        dayOfWeek: WeekDay.MONDAY,
        startTime: '19:45',
        endTime: '21:15',
        trainerName: 'Maya',
        isActive: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        id: 'schedule_3',
        groupId: 'group_1',
        dayOfWeek: WeekDay.WEDNESDAY,
        startTime: '18:00',
        endTime: '19:30',
        trainerName: 'Jordan',
        isActive: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        id: 'schedule_4',
        groupId: 'group_3',
        dayOfWeek: WeekDay.WEDNESDAY,
        startTime: '19:45',
        endTime: '22:00',
        trainerName: 'Kaito',
        isActive: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        id: 'schedule_5',
        groupId: 'group_1',
        dayOfWeek: WeekDay.FRIDAY,
        startTime: '18:00',
        endTime: '19:30',
        trainerName: 'Alex',
        isActive: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        id: 'schedule_6',
        groupId: 'group_2',
        dayOfWeek: WeekDay.FRIDAY,
        startTime: '19:45',
        endTime: '21:15',
        trainerName: 'Maya',
        isActive: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
    ]
  }

  /**
   * Дефолтные группы (для моков)
   */
  function getDefaultGroups(): Group[] {
    return [
      {
        id: 'group_1',
        name: 'Foundations',
        description: 'Базовые навыки брейкинга',
        maxParticipants: 15,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        id: 'group_2',
        name: 'Flow State',
        description: 'Продвинутый уровень',
        maxParticipants: 12,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        id: 'group_3',
        name: 'Syndicate Elite',
        description: 'Элитная группа',
        maxParticipants: 10,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
    ]
  }

  return {
    schedule,
    groups,
    isLoading,
    error,
    scheduleByDay,
    loadSchedule,
    loadGroups,
    bookClass,
    createScheduleClass,
    deleteScheduleClass,
    getClassById,
    getGroupById
  }
})
