<template>
  <div class="contact-page">
    <div class="contact-page__container">
      <h1 class="contact-page__title">{{ t('pages.contact.title') }}</h1>
      
      <div class="contact-page__grid">
        <!-- Левая колонка: Контакты и форма -->
        <div class="contact-page__left">
          <!-- Форма обратной связи -->
          <div class="contact-page__section">
            <h2 class="contact-page__section-title">{{ t('pages.contact.sendMessage') }}</h2>
            <form class="contact-form" @submit.prevent="handleSubmit">
              <!-- Honeypot поле для защиты от спама -->
              <input
                v-model="formData.honeypot"
                type="text"
                name="website"
                autocomplete="off"
                tabindex="-1"
                class="contact-form__honeypot"
              />
              
              <div class="form-group">
                <label class="form-label">{{ t('pages.contact.form.name') }}</label>
                <input
                  v-model="formData.name"
                  type="text"
                  class="form-input"
                  :class="{ 'form-input--error': errors.name }"
                  :placeholder="t('pages.contact.form.namePlaceholder')"
                  required
                  @blur="validateField('name')"
                />
                <span v-if="errors.name" class="form-error">{{ errors.name }}</span>
              </div>

              <div class="form-group">
                <label class="form-label">{{ t('pages.contact.form.email') }}</label>
                <input
                  v-model="formData.email"
                  type="email"
                  class="form-input"
                  :class="{ 'form-input--error': errors.email }"
                  :placeholder="t('pages.contact.form.emailPlaceholder')"
                  required
                  @blur="validateField('email')"
                />
                <span v-if="errors.email" class="form-error">{{ errors.email }}</span>
              </div>

              <div class="form-group">
                <label class="form-label">{{ t('pages.contact.form.message') }}</label>
                <textarea
                  v-model="formData.message"
                  class="form-textarea"
                  :class="{ 'form-textarea--error': errors.message }"
                  :placeholder="t('pages.contact.form.messagePlaceholder')"
                  rows="5"
                  required
                  @blur="validateField('message')"
                ></textarea>
                <span v-if="errors.message" class="form-error">{{ errors.message }}</span>
              </div>

              <div v-if="submitError" class="form-error form-error--global">
                {{ submitError }}
              </div>

              <div v-if="submitSuccess" class="form-success">
                {{ t('pages.contact.form.success') }}
              </div>

              <button
                type="submit"
                class="form-button"
                :disabled="isSubmitting || !isFormValid"
              >
                {{ isSubmitting ? t('common.loading') : t('pages.contact.form.send') }}
              </button>
            </form>
          </div>

          <!-- Контактная информация -->
          <div class="contact-page__section">
            <h2 class="contact-page__section-title">{{ t('pages.contact.contactInfo') }}</h2>
            <div class="contact-info">
              <a :href="`mailto:${email}`" class="contact-item">
                <span class="contact-item__icon">📧</span>
                <span class="contact-item__value">{{ email }}</span>
              </a>
              
              <a :href="`tel:${phone}`" class="contact-item">
                <span class="contact-item__icon">📞</span>
                <span class="contact-item__value">{{ phone }}</span>
              </a>
              
              <a :href="whatsappUrl" target="_blank" rel="noopener noreferrer" class="contact-item">
                <span class="contact-item__icon">💬</span>
                <span class="contact-item__value">WhatsApp: {{ phone }}</span>
              </a>
            </div>
          </div>

          <!-- Социальные сети -->
          <div class="contact-page__section">
            <h2 class="contact-page__section-title">{{ t('pages.contact.socialMedia') }}</h2>
            <div class="social-links">
              <a href="#" target="_blank" rel="noopener noreferrer" class="social-link">
                <span class="social-link__icon">📘</span>
                <span class="social-link__text">Facebook</span>
              </a>
              <a href="#" target="_blank" rel="noopener noreferrer" class="social-link">
                <span class="social-link__icon">📷</span>
                <span class="social-link__text">Instagram</span>
              </a>
              <a href="#" target="_blank" rel="noopener noreferrer" class="social-link">
                <span class="social-link__icon">🎵</span>
                <span class="social-link__text">TikTok</span>
              </a>
            </div>
          </div>
        </div>

        <!-- Правая колонка: Залы -->
        <div class="contact-page__right">
          <div class="contact-page__section">
            <h2 class="contact-page__section-title">{{ t('pages.contact.locations.title') }}</h2>
            
            <div class="locations">
              <!-- Зал 1: Breaking Spot -->
              <div class="location-card">
                <h3 class="location-card__title">{{ t('pages.contact.locations.breakingSpot.name') }}</h3>
                <div class="location-card__address">
                  <span class="location-card__icon">📍</span>
                  <div class="location-card__address-text">
                    <p>{{ t('pages.contact.locations.breakingSpot.address') }}</p>
                    <p class="location-card__domofon">{{ t('pages.contact.locations.breakingSpot.domofon') }}</p>
                  </div>
                </div>
                <div class="location-card__map">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2417.9778989231568!2d16.930214499999998!3d52.4098822!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47045b47991c1aa7%3A0x1bf89ac585649ed4!2s23%20Lutego%2026%2C%2061-743%20Pozna%C5%84!5e1!3m2!1sru!2spl!4v1769343729201!5m2!1sru!2spl"
                    width="100%"
                    height="250"
                    style="border:0; border-radius: var(--radius-lg);"
                    allowfullscreen=""
                    loading="lazy"
                    referrerpolicy="no-referrer-when-downgrade"
                  ></iframe>
                </div>
              </div>

              <!-- Зал 2: Body Lab One -->
              <div class="location-card">
                <h3 class="location-card__title">{{ t('pages.contact.locations.bodyLabOne.name') }}</h3>
                <div class="location-card__address">
                  <span class="location-card__icon">📍</span>
                  <div class="location-card__address-text">
                    <p>{{ t('pages.contact.locations.bodyLabOne.address') }}</p>
                  </div>
                </div>
                <div class="location-card__map">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2418.20418529698!2d16.88748377646467!3d52.405754244681994!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x470445905544ce3f%3A0x25c8f3d11b95d791!2sBody%20Lab%20One!5e1!3m2!1sru!2spl!4v1769343829139!5m2!1sru!2spl"
                    width="100%"
                    height="250"
                    style="border:0; border-radius: var(--radius-lg);"
                    allowfullscreen=""
                    loading="lazy"
                    referrerpolicy="no-referrer-when-downgrade"
                  ></iframe>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, reactive } from 'vue'
import { useI18n } from 'vue-i18n'

/**
 * Страница контактов
 */

const { t } = useI18n()

const email = 'info@flowsyndicate.pl'
const phone = '506 684 694'
const phoneClean = phone.replace(/\s/g, '')

const whatsappUrl = computed(() => {
  return `https://wa.me/${phoneClean}`
})

// Форма обратной связи
const formData = reactive({
  name: '',
  email: '',
  message: '',
  honeypot: '' // Защита от спама
})

const errors = reactive({
  name: '',
  email: '',
  message: ''
})

const isSubmitting = ref(false)
const submitError = ref('')
const submitSuccess = ref(false)
const lastSubmitTime = ref(0)

// Валидация email
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

/**
 * Валидация поля
 */
function validateField(field: 'name' | 'email' | 'message'): void {
  errors[field] = ''
  
  switch (field) {
    case 'name':
      if (!formData.name.trim()) {
        errors.name = t('pages.contact.form.validation.nameRequired')
      } else if (formData.name.trim().length < 2) {
        errors.name = t('pages.contact.form.validation.nameMinLength')
      } else if (formData.name.trim().length > 100) {
        errors.name = t('pages.contact.form.validation.nameMaxLength')
      }
      break
      
    case 'email':
      if (!formData.email.trim()) {
        errors.email = t('pages.contact.form.validation.emailRequired')
      } else if (!emailRegex.test(formData.email)) {
        errors.email = t('pages.contact.form.validation.emailInvalid')
      }
      break
      
    case 'message':
      if (!formData.message.trim()) {
        errors.message = t('pages.contact.form.validation.messageRequired')
      } else if (formData.message.trim().length < 10) {
        errors.message = t('pages.contact.form.validation.messageMinLength')
      } else if (formData.message.trim().length > 2000) {
        errors.message = t('pages.contact.form.validation.messageMaxLength')
      }
      break
  }
}

/**
 * Проверка валидности формы
 */
const isFormValid = computed(() => {
  return (
    formData.name.trim().length >= 2 &&
    formData.name.trim().length <= 100 &&
    emailRegex.test(formData.email) &&
    formData.message.trim().length >= 10 &&
    formData.message.trim().length <= 2000 &&
    !formData.honeypot // Honeypot должен быть пустым
  )
})

/**
 * Обработка отправки формы
 */
async function handleSubmit(): Promise<void> {
  // Проверка honeypot (защита от ботов)
  if (formData.honeypot) {
    submitError.value = t('pages.contact.form.spamDetected')
    return
  }

  // Rate limiting - не более 1 отправки в 5 секунд
  const now = Date.now()
  if (now - lastSubmitTime.value < 5000) {
    submitError.value = t('pages.contact.form.tooManyRequests')
    return
  }

  // Валидация всех полей
  validateField('name')
  validateField('email')
  validateField('message')

  if (!isFormValid.value) {
    submitError.value = t('pages.contact.form.validationError')
    return
  }

  isSubmitting.value = true
  submitError.value = ''
  submitSuccess.value = false

  try {
    // TODO: Заменить на реальный API вызов
    // const response = await fetch('/api/contact', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({
    //     name: formData.name.trim(),
    //     email: formData.email.trim(),
    //     message: formData.message.trim()
    //   })
    // })
    
    // Имитация отправки
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // Успешная отправка
    submitSuccess.value = true
    lastSubmitTime.value = now
    
    // Очистка формы
    formData.name = ''
    formData.email = ''
    formData.message = ''
    formData.honeypot = ''
    
    // Скрыть сообщение об успехе через 5 секунд
    setTimeout(() => {
      submitSuccess.value = false
    }, 5000)
    
  } catch (err: any) {
    submitError.value = t('pages.contact.form.sendError')
  } finally {
    isSubmitting.value = false
  }
}
</script>

<style scoped lang="scss">
.contact-page {
  width: 100%;
  min-height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding: var(--spacing-3xl) var(--spacing-xl);
  padding-top: var(--spacing-3xl);

  &__container {
    max-width: 1400px;
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: var(--spacing-2xl);
  }

  &__title {
    font-size: 2.5rem;
    font-weight: 700;
    color: var(--color-text-primary);
    margin: 0 0 var(--spacing-xl) 0;
    text-align: center;
    font-family: var(--font-family-heading);

    @media (max-width: 768px) {
      font-size: 2rem;
    }
  }

  &__grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: var(--spacing-2xl);

    @media (max-width: 968px) {
      grid-template-columns: 1fr;
    }
  }

  &__left,
  &__right {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-xl);
  }

  &__section {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-md);
  }

  &__section-title {
    font-size: var(--font-size-xl);
    font-weight: 600;
    color: var(--color-text-primary);
    margin: 0;
  }
}

.contact-form {
  background: var(--color-bg-secondary);
  border-radius: var(--radius-xl);
  padding: var(--spacing-xl);
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
  border: 1px solid rgba(255, 255, 255, 0.1);

  &__honeypot {
    position: absolute;
    left: -9999px;
    opacity: 0;
    pointer-events: none;
  }
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xs);
}

.form-label {
  font-size: var(--font-size-sm);
  font-weight: 500;
  color: var(--color-text-secondary);
}

.form-input,
.form-textarea {
  padding: var(--spacing-md);
  border-radius: var(--radius-lg);
  font-size: var(--font-size-base);
  color: var(--color-text-primary);
  background: var(--color-bg-tertiary);
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: all var(--transition-base);
  font-family: inherit;

  &:focus {
    outline: none;
    border-color: rgba(255, 255, 255, 0.3);
    background: var(--color-bg-secondary);
  }

  &--error {
    border-color: rgba(239, 68, 68, 0.5);
  }

  &::placeholder {
    color: var(--color-text-muted);
  }
}

.form-textarea {
  resize: vertical;
  min-height: 120px;
}

.form-error {
  font-size: var(--font-size-sm);
  color: rgba(239, 68, 68, 0.9);
  margin-top: var(--spacing-xs);

  &--global {
    padding: var(--spacing-sm);
    background: rgba(239, 68, 68, 0.1);
    border-radius: var(--radius-md);
    border: 1px solid rgba(239, 68, 68, 0.3);
  }
}

.form-success {
  padding: var(--spacing-sm);
  background: rgba(34, 197, 94, 0.1);
  border-radius: var(--radius-md);
  border: 1px solid rgba(34, 197, 94, 0.3);
  color: rgba(34, 197, 94, 0.9);
  font-size: var(--font-size-sm);
}

.form-button {
  padding: var(--spacing-md) var(--spacing-xl);
  border-radius: var(--radius-lg);
  font-size: var(--font-size-base);
  font-weight: 500;
  color: var(--color-text-primary);
  background: var(--color-bg-tertiary);
  border: 1px solid rgba(255, 255, 255, 0.2);
  cursor: pointer;
  transition: all var(--transition-base);
  margin-top: var(--spacing-sm);

  &:hover:not(:disabled) {
    background: rgba(255, 255, 255, 0.1);
    border-color: rgba(255, 255, 255, 0.3);
    transform: translateY(-1px);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
}

.contact-info {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
}

.contact-item {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  padding: var(--spacing-md);
  background: var(--color-bg-secondary);
  border-radius: var(--radius-lg);
  text-decoration: none;
  color: var(--color-text-primary);
  transition: all var(--transition-base);
  border: 1px solid rgba(255, 255, 255, 0.1);
  font-size: var(--font-size-sm);

  &:hover {
    background: var(--color-bg-tertiary);
    border-color: rgba(255, 255, 255, 0.2);
  }

  &__icon {
    font-size: 1.25rem;
    line-height: 1;
  }

  &__value {
    font-size: var(--font-size-sm);
    color: var(--color-text-primary);
    flex: 1;
  }
}

.social-links {
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-sm);
}

.social-link {
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);
  padding: var(--spacing-sm) var(--spacing-md);
  background: var(--color-bg-secondary);
  border-radius: var(--radius-lg);
  text-decoration: none;
  color: var(--color-text-primary);
  transition: all var(--transition-base);
  border: 1px solid rgba(255, 255, 255, 0.1);
  font-size: var(--font-size-sm);

  &:hover {
    background: var(--color-bg-tertiary);
    border-color: rgba(255, 255, 255, 0.2);
  }

  &__icon {
    font-size: 1rem;
    line-height: 1;
  }

  &__text {
    font-size: var(--font-size-sm);
    font-weight: 500;
  }
}

.locations {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xl);
}

.location-card {
  background: var(--color-bg-secondary);
  border-radius: var(--radius-xl);
  padding: var(--spacing-xl);
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
  border: 1px solid rgba(255, 255, 255, 0.1);

  &__title {
    font-size: var(--font-size-lg);
    font-weight: 600;
    color: var(--color-text-primary);
    margin: 0;
  }

  &__address {
    display: flex;
    align-items: flex-start;
    gap: var(--spacing-sm);
  }

  &__icon {
    font-size: 1.25rem;
    line-height: 1;
    margin-top: 2px;
  }

  &__address-text {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-xs);
    flex: 1;

    p {
      font-size: var(--font-size-sm);
      color: var(--color-text-primary);
      margin: 0;
      line-height: var(--line-height-normal);
    }
  }

  &__domofon {
    font-size: var(--font-size-xs);
    color: var(--color-text-secondary);
  }

  &__map {
    width: 100%;
    border-radius: var(--radius-lg);
    overflow: hidden;
    background: var(--color-bg-tertiary);

    iframe {
      display: block;
      width: 100%;
      height: 250px;

      @media (max-width: 768px) {
        height: 200px;
      }
    }
  }
}
</style>
