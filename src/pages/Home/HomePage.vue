<template>
  <div class="home-page">
    <HeroContent />
  </div>
</template>

<script setup lang="ts">
/**
 * Главная страница приложения
 * Содержит fullscreen hero без скролла
 */
import HeroContent from './components/HeroContent'
</script>

<style scoped lang="scss">
@import './HomePage.styles.scss';
</style>
