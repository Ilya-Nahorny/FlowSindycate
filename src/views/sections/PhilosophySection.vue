<template>
  <div class="philosophy-section section-container">
    <LanguageSwitcher />
    <BottomNavigation />
    
    <div class="section-content animate-fade-in-up">
      <h2 class="section-title">Our Philosophy</h2>
      <p class="section-text">
        At Flow Syndicate, we believe in the transformative power of movement.
        Dance is not just an art form—it's a way of life, a path to self-discovery,
        and a celebration of human expression.
      </p>
    </div>
  </div>
</template>

<script setup>
import LanguageSwitcher from '@/components/LanguageSwitcher.vue'
import BottomNavigation from '@/components/BottomNavigation.vue'
</script>

<style lang="scss" scoped>
@import '@/assets/styles/variables.scss';

.philosophy-section {
  background: linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%);
}

.section-container {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  padding: $spacing-12 $spacing-8;
  padding-bottom: 200px;
}

.section-content {
  max-width: 800px;
  text-align: center;
}

.section-title {
  font-size: $font-size-5xl;
  font-weight: $font-weight-bold;
  margin-bottom: $spacing-8;
  color: $text-primary;
}

.section-text {
  font-size: $font-size-xl;
  color: $text-secondary;
  line-height: $line-height-relaxed;
}

@media (max-width: 768px) {
  .section-container {
    padding-bottom: 160px;
  }
}
</style>
