<template>
  <div class="video-background">
    <!-- Видео фон -->
    <video
      v-if="videoSrc"
      class="video-background__video"
      :src="videoSrc"
      autoplay
      loop
      muted
      playsinline
    />
    
    <!-- Fallback изображение, если видео не загружено -->
    <div v-else class="video-background__fallback" />
    
    <!-- Overlay для затемнения и размытия -->
    <div class="video-background__overlay" :style="overlayStyle" />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

/**
 * Фоновое видео для публичных страниц
 * Поддерживает настройку overlay и blur
 */

interface Props {
  videoSrc?: string
  overlayOpacity?: number
  blurAmount?: number
}

const props = withDefaults(defineProps<Props>(), {
  videoSrc: '',
  overlayOpacity: 0.5,
  blurAmount: 0
})

// Стили для overlay
const overlayStyle = computed(() => ({
  backgroundColor: `rgba(0, 0, 0, ${props.overlayOpacity})`,
  backdropFilter: props.blurAmount > 0 ? `blur(${props.blurAmount}px)` : 'none',
  WebkitBackdropFilter: props.blurAmount > 0 ? `blur(${props.blurAmount}px)` : 'none'
}))
</script>

<style scoped lang="scss">
@import './VideoBackground.styles.scss';
</style>
