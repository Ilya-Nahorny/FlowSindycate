<template>
  <div class="public-layout">
    <!-- Градиент сверху -->
    <div class="public-layout__header-gradient"></div>
    
    <!-- Header с контролами -->
    <header class="public-layout__header">
      <HeaderControls />
    </header>

    <!-- Основной контент -->
    <main class="public-layout__content">
      <RouterView v-slot="{ Component }">
        <Transition name="fade" mode="out-in">
          <component :is="Component" />
        </Transition>
      </RouterView>
    </main>

    <!-- Градиент под навигацией -->
    <div class="public-layout__footer-gradient"></div>
    
    <!-- Нижняя навигация -->
    <footer class="public-layout__footer">
      <BottomNavigation />
    </footer>
  </div>
</template>

<script setup lang="ts">
/**
 * Публичный layout для неавторизованных страниц
 * Содержит header с контролами, контент и нижнюю навигацию
 * Скролл полностью запрещен, контент меняется внутри layout
 */
import HeaderControls from '@/components/header/HeaderControls'
import BottomNavigation from '@/components/navigation/BottomNavigation'
</script>

<style scoped lang="scss">
@import './PublicLayout.styles.scss';
</style>
