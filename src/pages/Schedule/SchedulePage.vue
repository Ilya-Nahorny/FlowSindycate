<template>
  <div class="schedule-page">
    <div class="schedule-page__container">
      <div
        v-for="day in schedule"
        :key="day.name"
        class="schedule-day"
      >
        <h2 class="schedule-day__title">{{ day.name }}</h2>
        <div class="schedule-day__classes">
          <div
            v-for="classItem in day.classes"
            :key="`${day.name}-${classItem.time}`"
            class="class-item"
          >
            <span class="class-item__time">{{ classItem.time }}</span>
            <span class="class-item__name">{{ classItem.name }}</span>
            <span class="class-item__trainer">{{ classItem.trainer }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { computed } from 'vue'

/**
 * Страница расписания
 */

interface ClassItem {
  time: string
  nameKey: string
  trainer: string
}

interface ScheduleDay {
  nameKey: string
  classes: ClassItem[]
}

const { t } = useI18n()

const scheduleData: ScheduleDay[] = [
  {
    nameKey: 'monday',
    classes: [
      {
        time: '18:00 - 19:30',
        nameKey: 'foundations',
        trainer: 'Alex'
      },
      {
        time: '19:45 - 21:15',
        nameKey: 'flowState',
        trainer: 'Maya'
      }
    ]
  },
  {
    nameKey: 'wednesday',
    classes: [
      {
        time: '18:00 - 19:30',
        nameKey: 'foundations',
        trainer: 'Jordan'
      },
      {
        time: '19:45 - 22:00',
        nameKey: 'syndicateElite',
        trainer: 'Kaito'
      }
    ]
  },
  {
    nameKey: 'friday',
    classes: [
      {
        time: '18:00 - 19:30',
        nameKey: 'foundations',
        trainer: 'Alex'
      },
      {
        time: '19:45 - 21:15',
        nameKey: 'flowState',
        trainer: 'Maya'
      }
    ]
  }
]

const schedule = computed(() => scheduleData.map(day => ({
  name: t(`schedule.days.${day.nameKey}`),
  classes: day.classes.map(classItem => ({
    time: classItem.time,
    name: t(`schedule.classes.${classItem.nameKey}`),
    trainer: classItem.trainer
  }))
})))
</script>

<style scoped lang="scss">
.schedule-page {
  width: 100%;
  min-height: 100%;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding: var(--spacing-4xl) var(--spacing-xl);
  padding-top: var(--spacing-4xl);

  &__container {
    max-width: 800px;
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: var(--spacing-xl);
  }
}

.schedule-day {
  background: var(--color-bg-secondary);
  border-radius: var(--radius-xl);
  padding: var(--spacing-2xl);
  display: flex;
  flex-direction: column;
  gap: var(--spacing-lg);

  &__title {
    font-size: 2rem;
    font-weight: 700;
    color: var(--color-text-primary);
    margin: 0;
    font-family: var(--font-family-heading);
  }

  &__classes {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-md);
  }
}

.class-item {
  background: var(--color-bg-tertiary);
  border-radius: var(--radius-lg);
  padding: var(--spacing-lg) var(--spacing-xl);
  display: grid;
  grid-template-columns: 1fr 2fr 1fr;
  gap: var(--spacing-lg);
  align-items: center;

  &__time {
    font-size: var(--font-size-base);
    color: var(--color-text-primary);
    font-weight: 500;
  }

  &__name {
    font-size: var(--font-size-base);
    color: var(--color-text-primary);
    font-weight: 500;
    text-align: center;
  }

  &__trainer {
    font-size: var(--font-size-base);
    color: var(--color-text-secondary);
    text-align: right;
    font-weight: 400;
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: var(--spacing-sm);
    text-align: left;

    &__name {
      text-align: left;
    }

    &__trainer {
      text-align: left;
    }
  }
}
</style>
