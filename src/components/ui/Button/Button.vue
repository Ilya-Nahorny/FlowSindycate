<template>
  <button
    :class="['button', `button--${variant}`, `button--${size}`, { 'button--full': fullWidth }]"
    :disabled="disabled"
    @click="$emit('click', $event)"
  >
    <slot />
  </button>
</template>

<script setup lang="ts">
/**
 * Универсальная кнопка
 */

interface Props {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  fullWidth?: boolean
  disabled?: boolean
}

interface Emits {
  (e: 'click', event: MouseEvent): void
}

withDefaults(defineProps<Props>(), {
  variant: 'primary',
  size: 'md',
  fullWidth: false,
  disabled: false
})

defineEmits<Emits>()
</script>

<style scoped lang="scss">
@import './Button.styles.scss';
</style>
