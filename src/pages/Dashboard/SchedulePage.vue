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
            :min="new Date().toISOString().split('T')[0]"
            required
          />
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
  isBookingModalOpen.value = true
}

/**
 * Запись на занятие
 */
async function handleBookClass(): Promise<void> {
  if (!selectedClass.value) return

  try {
    await classesStore.bookClass(bookingData.value)
    isBookingModalOpen.value = false
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
