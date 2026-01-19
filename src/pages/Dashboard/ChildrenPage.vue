<template>
  <div class="children-page">
    <div class="children-page__header">
      <h1 class="children-page__title">{{ t('dashboard.participants') }}</h1>
      <Button @click="openAddModal" variant="primary">
        {{ t('dashboard.addChild') }}
      </Button>
    </div>

    <div v-if="userStore.isLoading" class="children-page__loading">
      {{ t('common.loading') }}
    </div>

    <div v-else-if="userStore.children.length === 0" class="children-page__empty">
      <p>{{ t('dashboard.noChildren') }}</p>
      <Button @click="openAddModal" variant="primary">
        {{ t('dashboard.addFirstChild') }}
      </Button>
    </div>

    <div v-else class="children-page__grid">
      <div
        v-for="child in userStore.children"
        :key="child.id"
        class="child-card glass-medium"
      >
        <div class="child-card__header">
          <h3 class="child-card__name">
            {{ child.firstName }} {{ child.lastName }}
          </h3>
          <button
            class="child-card__delete"
            @click="handleDeleteChild(child.id)"
            :aria-label="t('common.delete')"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path
                d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
              />
            </svg>
          </button>
        </div>
        <div class="child-card__info">
          <div class="child-card__info-item">
            <span class="child-card__info-label">{{ t('dashboard.birthDate') }}</span>
            <span class="child-card__info-value">{{ child.birthDate ? formatDate(child.birthDate) : '-' }}</span>
          </div>
          <div class="child-card__info-item">
            <span class="child-card__info-label">{{ t('dashboard.phone') }}</span>
            <span class="child-card__info-value">{{ child.phone || '-' }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Модальное окно добавления ребенка -->
    <Modal
      :is-open="isAddModalOpen"
      :title="t('dashboard.addChild')"
      @update:is-open="isAddModalOpen = $event"
    >
      <form class="add-child-form" @submit.prevent="handleAddChild">
        <div class="form-group">
          <label class="form-label">{{ t('dashboard.firstName') }}</label>
          <input
            v-model="newChild.firstName"
            type="text"
            class="form-input"
            :class="{ 'form-input--error': firstNameError }"
            :placeholder="t('dashboard.firstNamePlaceholder')"
            @blur="validateFirstName"
            required
          />
          <div v-if="firstNameError" class="form-error-message">
            {{ firstNameError }}
          </div>
        </div>

        <div class="form-group">
          <label class="form-label">{{ t('dashboard.lastName') }}</label>
          <input
            v-model="newChild.lastName"
            type="text"
            class="form-input"
            :class="{ 'form-input--error': lastNameError }"
            :placeholder="t('dashboard.lastNamePlaceholder')"
            @blur="validateLastName"
            required
          />
          <div v-if="lastNameError" class="form-error-message">
            {{ lastNameError }}
          </div>
        </div>

        <div class="form-group">
          <label class="form-label">{{ t('dashboard.birthDate') }}</label>
          <input
            v-model="formattedBirthDate"
            type="text"
            class="form-input"
            :class="{ 'form-input--error': dateError }"
            :placeholder="t('dashboard.birthDatePlaceholder')"
            @input="handleDateInput"
            @blur="validateAndFormatDate"
            maxlength="10"
            required
          />
          <div v-if="dateError" class="form-error-message">
            {{ dateError }}
          </div>
        </div>

        <div class="form-group">
          <label class="form-label">{{ t('dashboard.phone') }}</label>
          <input
            v-model="newChild.phone"
            type="tel"
            class="form-input"
            :class="{ 'form-input--error': phoneError }"
            :placeholder="t('dashboard.phonePlaceholder')"
            @blur="validatePhone"
            @input="handlePhoneInput"
            required
          />
          <div v-if="phoneError" class="form-error-message">
            {{ phoneError }}
          </div>
        </div>

        <div v-if="userStore.error" class="form-error">
          {{ userStore.error }}
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
          :disabled="userStore.isLoading || !!dateError || !!firstNameError || !!lastNameError || !!phoneError || !newChild.birthDate || !newChild.firstName.trim() || !newChild.lastName.trim() || !newChild.phone.trim()"
          @click="handleAddChild"
        >
          {{ userStore.isLoading ? t('common.loading') : t('common.add') }}
        </Button>
      </template>
    </Modal>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { useUserStore } from '@/stores/user'
import { Button } from '@/components/ui/Button'
import { Modal } from '@/components/ui/Modal'
import type { AddChildData } from '@/types'

/**
 * Страница управления детьми
 */

const { t } = useI18n()
const userStore = useUserStore()

const isAddModalOpen = ref(false)
const newChild = ref<AddChildData>({
  firstName: '',
  lastName: '',
  birthDate: '',
  phone: ''
})

const formattedBirthDate = ref('')
const dateError = ref('')
const firstNameError = ref('')
const lastNameError = ref('')
const phoneError = ref('')

/**
 * Валидация имени
 */
function validateFirstName(): void {
  const value = newChild.value.firstName.trim()
  
  if (!value) {
    firstNameError.value = t('dashboard.validation.firstNameRequired')
    return
  }
  
  if (value.length < 2) {
    firstNameError.value = t('dashboard.validation.firstNameMinLength')
    return
  }
  
  if (value.length > 50) {
    firstNameError.value = t('dashboard.validation.firstNameMaxLength')
    return
  }
  
  // Проверка на наличие только букв, дефисов, пробелов и апострофов
  const namePattern = /^[a-zA-Zа-яА-ЯёЁ\s\-']+$/u
  if (!namePattern.test(value)) {
    firstNameError.value = t('dashboard.validation.firstNameInvalid')
    return
  }
  
  firstNameError.value = ''
}

/**
 * Валидация фамилии
 */
function validateLastName(): void {
  const value = newChild.value.lastName.trim()
  
  if (!value) {
    lastNameError.value = t('dashboard.validation.lastNameRequired')
    return
  }
  
  if (value.length < 2) {
    lastNameError.value = t('dashboard.validation.lastNameMinLength')
    return
  }
  
  if (value.length > 50) {
    lastNameError.value = t('dashboard.validation.lastNameMaxLength')
    return
  }
  
  // Проверка на наличие только букв, дефисов, пробелов и апострофов
  const namePattern = /^[a-zA-Zа-яА-ЯёЁ\s\-']+$/u
  if (!namePattern.test(value)) {
    lastNameError.value = t('dashboard.validation.lastNameInvalid')
    return
  }
  
  lastNameError.value = ''
}

/**
 * Обработка ввода телефона с форматированием
 */
function handlePhoneInput(event: Event): void {
  const input = event.target as HTMLInputElement
  let value = input.value
  
  // Если начинается с +, сохраняем его, иначе добавляем
  if (!value.startsWith('+')) {
    // Удаляем все нецифровые символы
    value = value.replace(/\D/g, '')
    // Ограничиваем длину
    if (value.length > 15) {
      value = value.slice(0, 15)
    }
    // Добавляем + если есть цифры
    if (value.length > 0) {
      value = '+' + value
    }
  } else {
    // Если уже есть +, оставляем его и только цифры после
    const afterPlus = value.slice(1).replace(/\D/g, '')
    if (afterPlus.length > 15) {
      value = '+' + afterPlus.slice(0, 15)
    } else {
      value = '+' + afterPlus
    }
  }
  
  newChild.value.phone = value
  phoneError.value = ''
}

/**
 * Валидация телефона
 */
function validatePhone(): void {
  const value = newChild.value.phone.trim()
  
  if (!value) {
    phoneError.value = t('dashboard.validation.phoneRequired')
    return
  }
  
  // Удаляем все нецифровые символы кроме +
  const digitsOnly = value.replace(/\D/g, '')
  
  // Проверка минимальной длины (9 цифр для польских номеров)
  if (digitsOnly.length < 9) {
    phoneError.value = t('dashboard.validation.phoneMinLength')
    return
  }
  
  // Проверка максимальной длины
  if (digitsOnly.length > 15) {
    phoneError.value = t('dashboard.validation.phoneMaxLength')
    return
  }
  
  // Проверка формата (должен начинаться с + и содержать только цифры после)
  const phonePattern = /^\+?\d{9,15}$/
  if (!phonePattern.test(value.replace(/\s/g, ''))) {
    phoneError.value = t('dashboard.validation.phoneInvalid')
    return
  }
  
  phoneError.value = ''
}

/**
 * Обработка ввода даты с автоматическим форматированием и валидацией
 */
function handleDateInput(event: Event): void {
  const input = event.target as HTMLInputElement
  let value = input.value.replace(/\D/g, '') // Удаляем все нецифровые символы
  
  // Ограничиваем длину до 8 цифр (ддммгггг)
  if (value.length > 8) {
    value = value.slice(0, 8)
  }
  
  // Форматируем: дд/мм/гггг
  let formatted = value
  if (value.length > 2) {
    formatted = value.slice(0, 2) + '/' + value.slice(2)
  }
  if (value.length > 4) {
    formatted = value.slice(0, 2) + '/' + value.slice(2, 4) + '/' + value.slice(4)
  }
  
  formattedBirthDate.value = formatted
  dateError.value = ''
  
  // Валидация в реальном времени
  if (value.length >= 2) {
    const day = parseInt(value.slice(0, 2), 10)
    if (day > 31 || day < 1) {
      dateError.value = t('dashboard.dateError.invalidDay')
      return
    }
  }
  
  if (value.length >= 4) {
    const month = parseInt(value.slice(2, 4), 10)
    if (month > 12 || month < 1) {
      dateError.value = t('dashboard.dateError.invalidMonth')
      return
    }
  }
  
  if (value.length >= 8) {
    const year = parseInt(value.slice(4, 8), 10)
    const currentYear = new Date().getFullYear()
    if (year < 1900 || year > currentYear) {
      dateError.value = t('dashboard.dateError.invalidYear')
      return
    }
    
    // Проверяем полную дату
    const day = parseInt(value.slice(0, 2), 10)
    const month = parseInt(value.slice(2, 4), 10)
    validateFullDate(day, month, year)
  }
}

/**
 * Валидация полной даты
 */
function validateFullDate(day: number, month: number, year: number): void {
  // Проверка базовых ограничений
  if (day < 1 || day > 31) {
    dateError.value = t('dashboard.dateError.invalidDay')
    return
  }
  
  if (month < 1 || month > 12) {
    dateError.value = t('dashboard.dateError.invalidMonth')
    return
  }
  
  const currentYear = new Date().getFullYear()
  if (year < 1900 || year > currentYear) {
    dateError.value = t('dashboard.dateError.invalidYear')
    return
  }
  
  // Проверка существования даты
  const date = new Date(year, month - 1, day)
  if (date.getDate() !== day || date.getMonth() !== month - 1 || date.getFullYear() !== year) {
    dateError.value = t('dashboard.dateError.invalidDate')
    return
  }
  
  // Проверка, что дата не в будущем
  if (date > new Date()) {
    dateError.value = t('dashboard.dateError.futureDate')
    return
  }
  
  // Проверка разумного возраста (не старше 120 лет)
  const age = new Date().getFullYear() - year
  if (age > 120) {
    dateError.value = t('dashboard.dateError.tooOld')
    return
  }
  
  // Если все проверки пройдены
  dateError.value = ''
  const formatted = year + '-' + String(month).padStart(2, '0') + '-' + String(day).padStart(2, '0')
  newChild.value.birthDate = formatted
}

/**
 * Валидация и преобразование даты в формат YYYY-MM-DD для сохранения
 */
function validateAndFormatDate(): void {
  const value = formattedBirthDate.value
  
  if (!value) {
    dateError.value = ''
    newChild.value.birthDate = ''
    return
  }
  
  const parts = value.split('/')
  
  if (parts.length !== 3 || !parts[0] || !parts[1] || !parts[2]) {
    dateError.value = t('dashboard.dateError.incomplete')
    newChild.value.birthDate = ''
    return
  }
  
  const day = parseInt(parts[0], 10)
  const month = parseInt(parts[1], 10)
  const year = parseInt(parts[2], 10)
  
  validateFullDate(day, month, year)
  
  // Если есть ошибка, очищаем сохраненную дату
  if (dateError.value) {
    newChild.value.birthDate = ''
  }
}

/**
 * Открытие модального окна добавления
 */
function openAddModal(): void {
  isAddModalOpen.value = true
  formattedBirthDate.value = ''
  dateError.value = ''
  firstNameError.value = ''
  lastNameError.value = ''
  phoneError.value = ''
  newChild.value = {
    firstName: '',
    lastName: '',
    birthDate: '',
    phone: ''
  }
}

/**
 * Добавление ребенка
 */
async function handleAddChild(): Promise<void> {
  // Валидация всех полей перед отправкой
  validateFirstName()
  validateLastName()
  validatePhone()
  validateAndFormatDate()
  
  // Проверяем наличие ошибок
  if (firstNameError.value || lastNameError.value || phoneError.value || dateError.value) {
    return
  }
  
  // Проверяем, что все поля заполнены
  if (!newChild.value.firstName.trim() || !newChild.value.lastName.trim() || 
      !newChild.value.phone.trim() || !newChild.value.birthDate) {
    return
  }
  
  try {
    await userStore.addChild(newChild.value)
    isAddModalOpen.value = false
    newChild.value = {
      firstName: '',
      lastName: '',
      birthDate: '',
      phone: ''
    }
    formattedBirthDate.value = ''
    dateError.value = ''
    firstNameError.value = ''
    lastNameError.value = ''
    phoneError.value = ''
  } catch (err) {
    // Ошибка уже в store
  }
}

/**
 * Удаление ребенка
 */
async function handleDeleteChild(childId: string): Promise<void> {
  if (confirm(t('dashboard.confirmDeleteChild'))) {
    await userStore.removeChild(childId)
  }
}

/**
 * Форматирование даты в формате День/Месяц/Год
 */
function formatDate(dateString: string): string {
  if (!dateString) return '-'
  const date = new Date(dateString)
  const day = String(date.getDate()).padStart(2, '0')
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const year = date.getFullYear()
  return day + '/' + month + '/' + year
}

/**
 * Загрузка данных
 */
onMounted(async () => {
  await userStore.loadChildren()
})
</script>

<style scoped lang="scss">
@import './ChildrenPage.styles.scss';
</style>
