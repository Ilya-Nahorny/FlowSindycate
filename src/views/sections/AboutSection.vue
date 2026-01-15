<template>
  <div class="about-section section-container">
    <LanguageSwitcher />
    <BottomNavigation />
    
    <div class="section-content animate-fade-in-up">
      <h2 class="section-title">About Flow Syndicate</h2>
      <p class="section-subtitle">
        A modern platform for dance class management
      </p>
      
      <div class="features-grid">
        <div class="feature-card card-glass animate-fade-in-up delay-100">
          <div class="feature-icon">🎨</div>
          <h3>Beautiful Design</h3>
          <p>Modern dark theme with glass morphism effects</p>
        </div>
        
        <div class="feature-card card-glass animate-fade-in-up delay-200">
          <div class="feature-icon">⚡</div>
          <h3>Fast & Smooth</h3>
          <p>Powered by Vue 3 and Vite for blazing performance</p>
        </div>
        
        <div class="feature-card card-glass animate-fade-in-up delay-300">
          <div class="feature-icon">📱</div>
          <h3>Responsive</h3>
          <p>Perfect experience on any device</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import LanguageSwitcher from '@/components/LanguageSwitcher.vue'
import BottomNavigation from '@/components/BottomNavigation.vue'
</script>

<style lang="scss" scoped>
@import '@/assets/styles/variables.scss';
@import '@/assets/styles/mixins.scss';

.about-section {
  background: $bg-secondary;
  position: relative;
  overflow-y: auto;
  
  &::before {
    content: '';
    position: absolute;
    top: -50%;
    right: -50%;
    width: 100%;
    height: 100%;
    background: radial-gradient(circle, rgba(0, 136, 255, 0.1) 0%, transparent 70%);
    pointer-events: none;
  }
}

.section-container {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100%;
  padding: $spacing-12 $spacing-8;
  padding-bottom: 200px;
}

.section-content {
  max-width: 1200px;
  text-align: center;
  position: relative;
  z-index: 1;
}

.section-title {
  font-size: $font-size-5xl;
  font-weight: $font-weight-bold;
  margin-bottom: $spacing-4;
  color: $text-primary;
  
  @media (max-width: 768px) {
    font-size: $font-size-4xl;
  }
}

.section-subtitle {
  font-size: $font-size-xl;
  color: $text-secondary;
  margin-bottom: $spacing-12;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: $spacing-6;
  margin-top: $spacing-8;
}

.feature-card {
  padding: $spacing-8;
  text-align: center;
  transition: all $transition-base;
  
  &:hover {
    transform: translateY(-8px);
  }
  
  h3 {
    font-size: $font-size-xl;
    font-weight: $font-weight-semibold;
    margin: $spacing-4 0;
    color: $text-primary;
  }
  
  p {
    color: $text-secondary;
    line-height: $line-height-relaxed;
  }
}

.feature-icon {
  font-size: 3rem;
  margin-bottom: $spacing-4;
}
</style>
