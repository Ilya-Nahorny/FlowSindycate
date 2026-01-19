<template>
  <Teleport to="body">
    <Transition name="modal">
      <div
        v-if="isOpen"
        class="modal-overlay"
        @click.self="handleOverlayClick"
      >
        <div class="modal-container glass-heavy">
          <div class="modal-header">
            <h3 v-if="title" class="modal-title">{{ title }}</h3>
            <button
              class="modal-close"
              @click="handleClose"
              aria-label="Close"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path
                  d="M18 6L6 18M6 6L18 18"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                />
              </svg>
            </button>
          </div>
          <div class="modal-content">
            <slot />
          </div>
          <div v-if="$slots.footer" class="modal-footer">
            <slot name="footer" />
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { watch } from 'vue'

/**
 * Модальное окно с glass-эффектом
 */

interface Props {
  isOpen: boolean
  title?: string
  closeOnOverlay?: boolean
}

interface Emits {
  (e: 'update:isOpen', value: boolean): void
  (e: 'close'): void
}

const props = withDefaults(defineProps<Props>(), {
  closeOnOverlay: true
})

const emit = defineEmits<Emits>()

/**
 * Обработка закрытия
 */
function handleClose(): void {
  emit('update:isOpen', false)
  emit('close')
}

/**
 * Обработка клика по overlay
 */
function handleOverlayClick(): void {
  if (props.closeOnOverlay) {
    handleClose()
  }
}

/**
 * Блокировка скролла при открытии модалки
 */
watch(() => props.isOpen, (isOpen) => {
  if (isOpen) {
    document.body.style.overflow = 'hidden'
  } else {
    document.body.style.overflow = ''
  }
})
</script>

<style scoped lang="scss">
@import './Modal.styles.scss';
</style>
