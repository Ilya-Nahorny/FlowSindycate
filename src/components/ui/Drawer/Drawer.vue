<template>
  <Teleport to="body">
    <Transition name="drawer">
      <div
        v-if="isOpen"
        class="drawer-overlay"
        @click.self="handleOverlayClick"
      >
        <div
          class="drawer-container glass-heavy"
          :class="[`drawer-container--${position}`]"
        >
          <div class="drawer-header">
            <h3 v-if="title" class="drawer-title">{{ title }}</h3>
            <button
              class="drawer-close"
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
          <div class="drawer-content">
            <slot />
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { watch } from 'vue'

/**
 * Drawer (выдвижная панель) с glass-эффектом
 */

interface Props {
  isOpen: boolean
  title?: string
  position?: 'left' | 'right' | 'bottom'
  closeOnOverlay?: boolean
}

interface Emits {
  (e: 'update:isOpen', value: boolean): void
  (e: 'close'): void
}

const props = withDefaults(defineProps<Props>(), {
  position: 'right',
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
 * Блокировка скролла при открытии drawer
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
@import './Drawer.styles.scss';
</style>
