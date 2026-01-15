<template>
  <div class="home-section section-container">
    <div class="section-content animate-fade-in-up">
      <h1 class="section-title">{{ t('app.welcome') }}</h1>
      <p class="section-subtitle">
        Experience fullscreen section-based navigation
      </p>
      
      <div class="button-group">
        <button class="btn btn-primary btn-lg" @click="goNext">
          Explore
        </button>
        <button class="btn btn-glass btn-lg">
          Learn More
        </button>
      </div>
      
      <div class="scroll-hint animate-bounce">
        <span>Scroll or use arrow keys</span>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path d="M12 5v14M19 12l-7 7-7-7" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useI18n } from 'vue-i18n'
import { useSectionStore } from '@/stores/section'

const { t } = useI18n()
const sectionStore = useSectionStore()

const goNext = () => {
  sectionStore.nextSection()
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/variables.scss';

.home-section {
  background: linear-gradient(135deg, $bg-primary 0%, $bg-secondary 100%);
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: 
      radial-gradient(circle at 20% 50%, rgba(0, 255, 136, 0.05) 0%, transparent 50%),
      radial-gradient(circle at 80% 50%, rgba(0, 136, 255, 0.05) 0%, transparent 50%);
    pointer-events: none;
  }
}

.section-container {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  padding: $spacing-8;
}

.section-content {
  max-width: 800px;
  text-align: center;
  position: relative;
  z-index: 1;
}

.section-title {
  font-size: $font-size-7xl;
  font-weight: $font-weight-extrabold;
  margin-bottom: $spacing-6;
  background: linear-gradient(135deg, $text-primary 0%, $accent-primary 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  
  @media (max-width: 768px) {
    font-size: $font-size-5xl;
  }
}

.section-subtitle {
  font-size: $font-size-2xl;
  color: $text-secondary;
  margin-bottom: $spacing-10;
  
  @media (max-width: 768px) {
    font-size: $font-size-lg;
  }
}

.button-group {
  display: flex;
  gap: $spacing-4;
  justify-content: center;
  flex-wrap: wrap;
}

.scroll-hint {
  position: absolute;
  bottom: $spacing-8;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: $spacing-2;
  color: $text-tertiary;
  font-size: $font-size-sm;
  opacity: 0.8;
  
  svg {
    width: 24px;
    height: 24px;
  }
}
</style>
