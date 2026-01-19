<template>
  <div class="admin-schedule-page">
    <div class="admin-schedule-page__header">
      <h1 class="admin-schedule-page__title">{{ t('admin.schedule') }}</h1>
      <Button @click="isAddModalOpen = true" variant="primary">
        {{ t('admin.addClass') }}
      </Button>
    </div>

    <div v-if="classesStore.isLoading" class="admin-schedule-page__loading">
      {{ t('common.loading') }}
    </div>

    <div v-else class="admin-schedule-page__content">
      <div
        v-for="(classes, day) in classesStore.scheduleByDay"
        :key="day"
        v-show="classes.length > 0"
        class="admin-schedule-day glass-medium"
      >
        <h2 class="admin-schedule-day__title">{{ t(`schedule.days.${day}`) }}</h2>
        <div class="admin-schedule-day__classes">
          <div
            v-for="scheduleClass in classes"
            :key="scheduleClass.id"
            class="admin-schedule-class"
          >
            <div class="admin-schedule-class__info">
              <span class="admin-schedule-class__time">
                {{ scheduleClass.startTime }} - {{ scheduleClass.endTime }}
              </span>
              <span class="admin-schedule-class__name">
                {{ getGroupName(scheduleClass.groupId) }}
              </span>
              <span class="admin-schedule-class__trainer">
                {{ scheduleClass.trainerName || t('schedule.trainerTBA') }}
              </span>
            </div>
            <button
              class="admin-schedule-class__delete"
              @click="handleDeleteClass(scheduleClass.id)"
            >
              {{ t('common.delete') }}
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Модальное окно добавления занятия -->
    <Modal
      :is-open="isAddModalOpen"
      :title="t('admin.addClass')"
      @update:is-open="isAddModalOpen = $event"
    >
      <form class="add-class-form" @submit.prevent="handleAddClass">
        <div class="form-group">
          <label class="form-label">{{ t('admin.group') }}</label>
          <select v-model="newClass.groupId" class="form-input" required>
            <option value="">{{ t('admin.selectGroup') }}</option>
            <option
              v-for="group in classesStore.groups"
              :key="group.id"
              :value="group.id"
            >
              {{ group.name }}
            </option>
          </select>
        </div>

        <div class="form-group">
          <label class="form-label">{{ t('admin.dayOfWeek') }}</label>
          <select v-model="newClass.dayOfWeek" class="form-input" required>
            <option value="monday">{{ t('schedule.days.monday') }}</option>
            <option value="tuesday">{{ t('schedule.days.tuesday') }}</option>
            <option value="wednesday">{{ t('schedule.days.wednesday') }}</option>
            <option value="thursday">{{ t('schedule.days.thursday') }}</option>
            <option value="friday">{{ t('schedule.days.friday') }}</option>
            <option value="saturday">{{ t('schedule.days.saturday') }}</option>
            <option value="sunday">{{ t('schedule.days.sunday') }}</option>
          </select>
        </div>

        <div class="form-group">
          <label class="form-label">{{ t('admin.startTime') }}</label>
          <input
            v-model="newClass.startTime"
            type="time"
            class="form-input"
            required
          />
        </div>

        <div class="form-group">
          <label class="form-label">{{ t('admin.endTime') }}</label>
          <input
            v-model="newClass.endTime"
            type="time"
            class="form-input"
            required
          />
        </div>

        <div class="form-group">
          <label class="form-label">{{ t('admin.trainerName') }}</label>
          <input
            v-model="newClass.trainerName"
            type="text"
            class="form-input"
            :placeholder="t('admin.trainerNamePlaceholder')"
          />
        </div>
      </form>

      <template #footer>
        <Button
          type="button"
          variant="outline"
          @click="isAddModalOpen = false"
        >
          {{ t('common.cancel') }}
        </Button>
        <Button
          type="button"
          variant="primary"
          :disabled="classesStore.isLoading"
          @click="handleAddClass"
        >
          {{ classesStore.isLoading ? t('common.loading') : t('common.add') }}
        </Button>
      </template>
    </Modal>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { useClassesStore } from '@/stores/classes'
import { Button } from '@/components/ui/Button'
import { Modal } from '@/components/ui/Modal'
import type { CreateScheduleData } from '@/types'
import { WeekDay } from '@/types'

/**
 * Страница управления расписанием (админ)
 */

const { t } = useI18n()
const classesStore = useClassesStore()

const isAddModalOpen = ref(false)
const newClass = ref<CreateScheduleData>({
  groupId: '',
  dayOfWeek: WeekDay.MONDAY,
  startTime: '18:00',
  endTime: '19:30',
  trainerName: ''
})

/**
 * Получение названия группы
 */
function getGroupName(groupId: string): string {
  const group = classesStore.getGroupById(groupId)
  return group?.name || ''
}

/**
 * Добавление занятия
 */
async function handleAddClass(): Promise<void> {
  try {
    await classesStore.createScheduleClass(newClass.value)
    isAddModalOpen.value = false
    newClass.value = {
      groupId: '',
      dayOfWeek: WeekDay.MONDAY,
      startTime: '18:00',
      endTime: '19:30',
      trainerName: ''
    }
  } catch (err) {
    // Ошибка уже в store
  }
}

/**
 * Удаление занятия
 */
async function handleDeleteClass(classId: string): Promise<void> {
  if (confirm(t('admin.confirmDeleteClass'))) {
    await classesStore.deleteScheduleClass(classId)
  }
}

/**
 * Загрузка данных
 */
onMounted(async () => {
  await classesStore.loadSchedule()
  await classesStore.loadGroups()
})
</script>

<style scoped lang="scss">
@import './SchedulePage.styles.scss';
</style>
