<template>
  <button
    class="nav-item"
    :class="{ 'nav-item--active': isActive }"
    @click="$emit('click')"
  >
    <span class="nav-item__label">{{ item.label }}</span>
  </button>
</template>

<script setup lang="ts">
/**
 * Элемент навигации
 * Отображает один пункт меню
 */

interface NavigationItem {
  name: string
  label: string
  path: string
}

interface Props {
  item: NavigationItem
  isActive: boolean
}

defineProps<Props>()
defineEmits<{
  click: []
}>()
</script>

<style scoped lang="scss">
@import './NavItem.styles.scss';
</style>
