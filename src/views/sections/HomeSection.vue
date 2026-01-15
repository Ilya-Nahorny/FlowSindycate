<template>
  <div class="home-section">
    <!-- Fullscreen Background Video -->
    <VideoBackground
      :youtube-url="youtubeUrl"
      :overlay-opacity="0.75"
      :overlay-color="'#000000'"
      :blur="0"
    />

    <!-- Language Switcher -->
    <LanguageSwitcher />

    <!-- Bottom Navigation -->
    <BottomNavigation />

    <!-- Hero Content -->
    <div class="hero-container">
      <div class="hero-content">
        <!-- Main Title -->
        <h1 class="hero-title" :class="{ 'animate-in': isVisible }">
          <div class="title-line" style="animation-delay: 0.1s">Flow</div>
          <div class="title-line" style="animation-delay: 0.2s">Syndicate</div>
        </h1>
        
        <!-- Subtitle -->
        <p class="hero-subtitle" :class="{ 'animate-in': isVisible }" style="animation-delay: 0.4s">
          Break the limits. Find your flow.
        </p>
        
        <!-- CTA Button -->
        <div class="hero-cta" :class="{ 'animate-in': isVisible }" style="animation-delay: 0.6s">
          <button class="cta-button" @click="goNext">
            Start Your Journey
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useSectionStore } from '@/stores/section'
import VideoBackground from '@/components/VideoBackground.vue'
import LanguageSwitcher from '@/components/LanguageSwitcher.vue'
import BottomNavigation from '@/components/BottomNavigation.vue'

const sectionStore = useSectionStore()

// YouTube video URL
const youtubeUrl = ref('https://www.youtube.com/watch?v=QrXwkG8boAQ')

const isVisible = ref(false)

const goNext = () => {
  sectionStore.nextSection()
}

onMounted(() => {
  // Trigger entrance animations
  setTimeout(() => {
    isVisible.value = true
  }, 200)
})
</script>

<style lang="scss" scoped>
@import '@/assets/styles/variables.scss';
@import '@/assets/styles/mixins.scss';

.home-section {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: #000;
}

.hero-container {
  position: relative;
  z-index: 10;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  padding: $spacing-12 $spacing-8;
  padding-bottom: 200px; // Space for bottom navigation
}

.hero-content {
  max-width: 900px;
  text-align: center;
  position: relative;
}

// Hero Title - Exactly like screenshot
.hero-title {
  display: flex;
  flex-direction: column;
  gap: 0;
  margin-bottom: $spacing-8;
  line-height: 0.9;
  
  .title-line {
    display: block;
    font-size: clamp(4rem, 15vw, 10rem);
    font-weight: $font-weight-extrabold;
    color: $text-primary;
    letter-spacing: -0.02em;
    opacity: 0;
    transform: translateY(40px);
    transition: all 1s cubic-bezier(0.16, 1, 0.3, 1);
  }
  
  &.animate-in .title-line {
    opacity: 1;
    transform: translateY(0);
  }
}

// Hero Subtitle - Exactly like screenshot
.hero-subtitle {
  font-size: clamp($font-size-base, 2vw, $font-size-xl);
  color: rgba(255, 255, 255, 0.7);
  font-weight: $font-weight-normal;
  line-height: $line-height-relaxed;
  margin: 0 auto $spacing-12;
  opacity: 0;
  transform: translateY(30px);
  transition: all 1s cubic-bezier(0.16, 1, 0.3, 1);
  
  &.animate-in {
    opacity: 1;
    transform: translateY(0);
  }
}

// CTA Button - Exactly like screenshot
.hero-cta {
  opacity: 0;
  transform: translateY(30px);
  transition: all 1s cubic-bezier(0.16, 1, 0.3, 1);
  
  &.animate-in {
    opacity: 1;
    transform: translateY(0);
  }
}

.cta-button {
  padding: $spacing-4 $spacing-10;
  font-size: $font-size-base;
  font-weight: $font-weight-medium;
  color: rgba(255, 255, 255, 0.9);
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: $radius-full;
  cursor: pointer;
  transition: all $transition-base;
  white-space: nowrap;
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  
  &:hover {
    background: rgba(255, 255, 255, 0.1);
    border-color: rgba(255, 255, 255, 0.3);
    color: $text-primary;
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
  }
  
  &:active {
    transform: translateY(0);
  }
}

// Responsive
@media (max-width: 1024px) {
  .hero-container {
    padding-bottom: 180px;
  }
}

@media (max-width: 768px) {
  .hero-container {
    padding: $spacing-8 $spacing-4;
    padding-bottom: 160px;
  }
  
  .hero-title {
    margin-bottom: $spacing-6;
  }
  
  .hero-subtitle {
    margin-bottom: $spacing-8;
  }
  
  .cta-button {
    padding: $spacing-3 $spacing-8;
    font-size: $font-size-sm;
  }
}

@media (max-width: 640px) {
  .hero-container {
    padding-bottom: 140px;
  }
}
</style>
