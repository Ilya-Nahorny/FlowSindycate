<template>
  <div class="schedule-page">
    <h1 class="schedule-page__title">{{ t('dashboard.schedule') }}</h1>

    <div v-if="classesStore.isLoading" class="schedule-page__loading">
      {{ t('common.loading') }}
    </div>

    <div v-else class="schedule-page__content">
      <div
        v-for="(classes, day) in classesStore.scheduleByDay"
        :key="day"
        v-show="classes.length > 0"
        class="schedule-day glass-medium"
      >
        <h2 class="schedule-day__title">{{ t(`schedule.days.${day}`) }}</h2>
        <div class="schedule-day__classes">
          <div
            v-for="scheduleClass in classes"
            :key="scheduleClass.id"
            class="schedule-class"
          >
            <div class="schedule-class__info">
              <span class="schedule-class__time">
                {{ scheduleClass.startTime }} - {{ scheduleClass.endTime }}
              </span>
              <span class="schedule-class__name">
                {{ getGroupName(scheduleClass.groupId) }}
              </span>
              <span class="schedule-class__trainer">
                {{ scheduleClass.trainerName || t('schedule.trainerTBA') }}
              </span>
            </div>
            <Button
              @click="openBookingModal(scheduleClass)"
              variant="primary"
              size="sm"
            >
              {{ t('dashboard.bookClass') }}
            </Button>
          </div>
        </div>
      </div>
    </div>

    <!-- Модальное окно записи на занятие -->
    <Modal
      :is-open="isBookingModalOpen"
      :title="t('dashboard.bookClass')"
      @update:is-open="isBookingModalOpen = $event"
    >
      <form v-if="selectedClass" class="booking-form" @submit.prevent="handleBookClass">
        <div class="form-group">
          <label class="form-label">{{ t('dashboard.selectChild') }}</label>
          <select
            v-model="bookingData.childId"
            class="form-input"
            required
          >
            <option value="">{{ t('dashboard.selectChildPlaceholder') }}</option>
            <option
              v-for="child in userStore.children"
              :key="child.id"
              :value="child.id"
            >
              {{ child.firstName }} {{ child.lastName }}
            </option>
          </select>
        </div>

        <div class="form-group">
          <label class="form-label">{{ t('dashboard.classType') }}</label>
          <select
            v-model="bookingData.classType"
            class="form-input"
            required
          >
            <option value="single">
              {{ t('dashboard.singleClass') }} {{ isFirstClass ? `(${t('dashboard.firstClassFree')})` : '(70 PLN)' }}
            </option>
            <option value="subscription_weekly">
              {{ t('dashboard.subscriptionWeekly') }} (250 PLN/мес)
            </option>
            <option value="subscription_biweekly">
              {{ t('dashboard.subscriptionBiweekly') }} (380 PLN/мес)
            </option>
          </select>
          <div v-if="isFirstClass && bookingData.classType === 'single'" class="form-note form-note--info">
            {{ t('dashboard.firstClassFreeNote') }}
          </div>
        </div>

        <div class="form-group">
          <label class="form-label">{{ t('dashboard.date') }}</label>
          <input
            v-model="bookingData.date"
            type="date"
            class="form-input"
            :min="minDate"
            :max="maxDate"
            :disabled="!selectedClass"
            @change="validateSelectedDate"
            required
          />
          <div v-if="dateError" class="form-error-message">
            {{ dateError }}
          </div>
          <div v-if="selectedClass && availableDatesInfo" class="form-note form-note--info">
            {{ availableDatesInfo }}
          </div>
        </div>

        <div v-if="classesStore.error" class="form-error">
          {{ classesStore.error }}
        </div>
      </form>

      <template #footer>
        <Button
          type="button"
          variant="outline"
          @click="isBookingModalOpen = false"
        >
          {{ t('common.cancel') }}
        </Button>
        <Button
          type="button"
          variant="primary"
          :disabled="classesStore.isLoading || !selectedClass"
          @click="handleBookClass"
        >
          {{ classesStore.isLoading ? t('common.loading') : t('dashboard.book') }}
        </Button>
      </template>
    </Modal>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { useUserStore } from '@/stores/user'
import { useClassesStore } from '@/stores/classes'
import { useAuthStore } from '@/stores/auth'
import { Button } from '@/components/ui/Button'
import { Modal } from '@/components/ui/Modal'
import type { ScheduleClass, BookClassData } from '@/types'
import { ClassType } from '@/types'

/**
 * Страница расписания для записи на занятия
 */

const { t } = useI18n()
const userStore = useUserStore()
const classesStore = useClassesStore()
const authStore = useAuthStore()

const isBookingModalOpen = ref(false)
const selectedClass = ref<ScheduleClass | null>(null)
const bookingData = ref<BookClassData>({
  childId: '',
  scheduleClassId: '',
  classType: ClassType.SINGLE,
  date: ''
})
const dateError = ref('')

/**
 * Проверка, является ли это первым занятием
 * Проверяется по телефону или email пользователя
 */
const isFirstClass = computed(() => {
  if (!authStore.user || !bookingData.value.childId) return false
  
  // Проверяем, есть ли уже записи у этого пользователя или ребенка
  const hasExistingBookings = userStore.bookings.length > 0
  
  // Если есть записи, это не первое занятие
  if (hasExistingBookings) return false
  
  // Проверяем по телефону/email - если это новый пользователь без записей, первое занятие бесплатно
  return true
})

/**
 * Получение названия группы
 */
function getGroupName(groupId: string): string {
  const group = classesStore.getGroupById(groupId)
  return group?.name || ''
}

/**
 * Минимальная доступная дата (сегодня)
 */
const minDate = computed(() => {
  return new Date().toISOString().split('T')[0]
})

/**
 * Максимальная доступная дата (3 месяца вперед)
 */
const maxDate = computed(() => {
  const date = new Date()
  date.setMonth(date.getMonth() + 3)
  return date.toISOString().split('T')[0]
})

/**
 * Информация о доступных датах
 */
const availableDatesInfo = computed(() => {
  if (!selectedClass.value) return ''
  
  const dayName = t(`schedule.days.${selectedClass.value.dayOfWeek}`)
  const nextDates = getNextAvailableDates(3) // Показываем 3 ближайшие даты
  if (nextDates.length > 0) {
    const datesStr = nextDates.map(d => formatDateShort(d)).join(', ')
    return `${t('dashboard.availableOn')} ${dayName}. ${t('dashboard.nextDates')}: ${datesStr}`
  }
  return `${t('dashboard.availableOn')} ${dayName}`
})

/**
 * Получение ближайших доступных дат для выбранного занятия
 */
function getNextAvailableDates(count: number = 5): Date[] {
  if (!selectedClass.value) return []
  
  const dates: Date[] = []
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  
  const dayOfWeekMap: Record<string, number> = {
    'sunday': 0,
    'monday': 1,
    'tuesday': 2,
    'wednesday': 3,
    'thursday': 4,
    'friday': 5,
    'saturday': 6
  }
  
  const targetDay = dayOfWeekMap[selectedClass.value.dayOfWeek]
  const currentDay = today.getDay()
  
  // Вычисляем количество дней до следующего нужного дня недели
  let daysUntilTarget = (targetDay - currentDay + 7) % 7
  if (daysUntilTarget === 0) {
    // Если сегодня нужный день, берем следующий
    daysUntilTarget = 7
  }
  
  // Находим ближайшие даты
  for (let i = 0; i < count; i++) {
    const date = new Date(today)
    date.setDate(today.getDate() + daysUntilTarget + (i * 7))
    dates.push(date)
  }
  
  return dates
}

/**
 * Форматирование даты в короткий формат
 */
function formatDateShort(date: Date): string {
  const day = String(date.getDate()).padStart(2, '0')
  const month = String(date.getMonth() + 1).padStart(2, '0')
  return `${day}.${month}`
}

/**
 * Валидация выбранной даты
 * Проверяет, что выбранная дата соответствует дню недели занятия
 */
function validateSelectedDate(): void {
  if (!selectedClass.value || !bookingData.value.date) {
    dateError.value = ''
    return
  }

  const selectedDate = new Date(bookingData.value.date)
  const selectedDayOfWeek = getDayOfWeek(selectedDate)
  const classDayOfWeek = selectedClass.value.dayOfWeek

  // Преобразуем день недели занятия в числовой формат (0 = воскресенье, 1 = понедельник, ...)
  const dayOfWeekMap: Record<string, number> = {
    'sunday': 0,
    'monday': 1,
    'tuesday': 2,
    'wednesday': 3,
    'thursday': 4,
    'friday': 5,
    'saturday': 6
  }

  const expectedDay = dayOfWeekMap[classDayOfWeek]
  
  if (selectedDayOfWeek !== expectedDay) {
    const dayName = t(`schedule.days.${classDayOfWeek}`)
    dateError.value = t('dashboard.dateError.wrongDay', { day: dayName })
    bookingData.value.date = ''
    return
  }

  dateError.value = ''
}

/**
 * Получение дня недели из даты (0 = воскресенье, 1 = понедельник, ...)
 */
function getDayOfWeek(date: Date): number {
  return date.getDay()
}

/**
 * Открытие модального окна записи
 */
function openBookingModal(scheduleClass: ScheduleClass): void {
  if (userStore.children.length === 0) {
    alert(t('dashboard.addChildFirst'))
    return
  }

  selectedClass.value = scheduleClass
  bookingData.value = {
    childId: userStore.children[0].id,
    scheduleClassId: scheduleClass.id,
    classType: ClassType.SINGLE,
    date: ''
  }
  dateError.value = ''
  isBookingModalOpen.value = true
}

/**
 * Запись на занятие
 */
async function handleBookClass(): Promise<void> {
  if (!selectedClass.value) return

  // Проверяем валидность даты перед отправкой
  validateSelectedDate()
  if (dateError.value || !bookingData.value.date) {
    return
  }

  try {
    await classesStore.bookClass(bookingData.value)
    isBookingModalOpen.value = false
    dateError.value = ''
    await userStore.loadBookings()
  } catch (err) {
    // Ошибка уже в store
  }
}

/**
 * Загрузка данных
 */
onMounted(async () => {
  await classesStore.loadSchedule()
  await classesStore.loadGroups()
  await userStore.loadChildren()
})
</script>

<style scoped lang="scss">
@import './SchedulePage.styles.scss';
</style>
