<template>
  <div class="home-view">
    <div class="hero-content animate-fade-in-up">
      <h1 class="hero-title">{{ t('app.welcome') }}</h1>
      <p class="hero-subtitle">Modern design system ready for your dance studio</p>
      
      <div class="button-group">
        <button class="btn btn-primary btn-lg">
          Get Started
        </button>
        <button class="btn btn-glass btn-lg">
          Learn More
        </button>
      </div>

      <!-- Design System Preview -->
      <div class="preview-cards">
        <div class="card-glass animate-fade-in-up delay-100">
          <div class="badge badge-primary mb-3">New</div>
          <h3 class="card-title">Dark Theme</h3>
          <p class="card-text">Beautiful dark theme with smooth animations</p>
        </div>

        <div class="card-glass animate-fade-in-up delay-200">
          <div class="badge badge-success mb-3">Ready</div>
          <h3 class="card-title">Glass Effects</h3>
          <p class="card-text">Modern glassmorphism design throughout</p>
        </div>

        <div class="card-glass animate-fade-in-up delay-300">
          <div class="badge badge-secondary mb-3">Built-in</div>
          <h3 class="card-title">Responsive</h3>
          <p class="card-text">Mobile-first responsive design system</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
</script>

<style lang="scss" scoped>
@import '@/assets/styles/variables.scss';
@import '@/assets/styles/mixins.scss';

.home-view {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: $bg-primary;
  padding: $spacing-8;
}

.hero-content {
  max-width: 1200px;
  text-align: center;
}

.hero-title {
  font-size: $font-size-6xl;
  font-weight: $font-weight-bold;
  margin-bottom: $spacing-4;
  background: linear-gradient(135deg, $text-primary 0%, $accent-primary 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  
  @media (max-width: 768px) {
    font-size: $font-size-4xl;
  }
}

.hero-subtitle {
  font-size: $font-size-xl;
  color: $text-secondary;
  margin-bottom: $spacing-8;
  
  @media (max-width: 768px) {
    font-size: $font-size-lg;
  }
}

.button-group {
  display: flex;
  gap: $spacing-4;
  justify-content: center;
  margin-bottom: $spacing-12;
  flex-wrap: wrap;
}

.preview-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: $spacing-6;
  margin-top: $spacing-12;
}
</style>
