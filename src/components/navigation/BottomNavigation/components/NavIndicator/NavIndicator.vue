<template>
  <div class="nav-indicator">
    <div
      class="nav-indicator__line"
      :style="{ transform: `translateX(${indicatorPosition}px)` }"
    />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

/**
 * Индикатор активного элемента навигации
 * Анимированная полоска под активным пунктом
 */

interface Props {
  activeIndex: number
  itemsCount: number
}

const props = defineProps<Props>()

// Позиция индикатора
const indicatorPosition = computed(() => {
  // Примерный расчет позиции на основе количества элементов
  const itemWidth = 150 // Примерная ширина элемента
  return props.activeIndex * itemWidth
})
</script>

<style scoped lang="scss">
@import './NavIndicator.styles.scss';
</style>
