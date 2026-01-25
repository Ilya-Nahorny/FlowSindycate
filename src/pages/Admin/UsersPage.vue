<template>
  <div class="users-page">
    <h1 class="users-page__title">{{ t('admin.users') }}</h1>

    <div v-if="adminStore.isLoading" class="users-page__loading">
      {{ t('common.loading') }}
    </div>

    <div v-else-if="regularUsers.length === 0" class="users-page__empty">
      {{ t('admin.noUsers') }}
    </div>

    <div v-else class="users-page__list">
      <div
        v-for="user in regularUsers"
        :key="user.id"
        class="user-card glass-medium"
      >
        <div class="user-card__header">
          <div class="user-card__info">
            <h3 class="user-card__email">{{ user.email }}</h3>
            <span class="user-card__phone">{{ user.phone }}</span>
          </div>
          <div class="user-card__badge" :class="`user-card__badge--${user.role}`">
            {{ t(`admin.role.${user.role}`) }}
          </div>
        </div>
        <div class="user-card__children">
          <h4 class="user-card__children-title">
            {{ t('admin.children') }} ({{ getChildrenCount(user.id) }})
          </h4>
          <div v-if="getChildrenCount(user.id) === 0" class="user-card__no-children">
            {{ t('admin.noChildren') }}
          </div>
          <div v-else class="user-card__children-list">
            <div
              v-for="child in getChildrenByUserId(user.id)"
              :key="child.id"
              class="user-card__child"
            >
              {{ child.firstName }} {{ child.lastName }}
              <span v-if="child.birthDate" class="user-card__child-age">
                ({{ getAge(child.birthDate) }} {{ t('dashboard.years') }})
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { useAdminStore } from '@/stores/admin'
import { UserRole } from '@/types'

/**
 * Страница управления пользователями
 */

const { t } = useI18n()
const adminStore = useAdminStore()

/**
 * Только обычные пользователи (без администраторов)
 */
const regularUsers = computed(() => {
  return adminStore.users.filter(user => user.role === UserRole.USER)
})

/**
 * Получение количества детей пользователя
 */
function getChildrenCount(userId: string): number {
  return adminStore.getChildrenByUserId(userId).length
}

/**
 * Получение детей пользователя
 */
function getChildrenByUserId(userId: string) {
  return adminStore.getChildrenByUserId(userId)
}

/**
 * Вычисление возраста по дате рождения
 */
function getAge(birthDate: string): number {
  if (!birthDate) return 0
  const birth = new Date(birthDate)
  const today = new Date()
  let age = today.getFullYear() - birth.getFullYear()
  const monthDiff = today.getMonth() - birth.getMonth()
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
    age--
  }
  return age
}

/**
 * Загрузка данных
 */
onMounted(async () => {
  await adminStore.loadUsers()
  await adminStore.loadAllChildren()
})
</script>

<style scoped lang="scss">
@import './UsersPage.styles.scss';
</style>
