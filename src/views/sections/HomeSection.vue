<template>
  <div class="home-section">
    <!-- Fullscreen Background Video -->
    <VideoBackground
      :video-src="videoSrc"
      :fallback-image="fallbackImage"
      :overlay-opacity="0.65"
      :overlay-color="'#0a0a0a'"
      :blur="0"
    />

    <!-- Hero Content -->
    <div class="hero-container">
      <div class="hero-content">
        <!-- Main Title with Entrance Animation -->
        <h1 class="hero-title" :class="{ 'animate-in': isVisible }">
          <span class="title-line" style="animation-delay: 0.1s">Flow</span>
          <span class="title-line" style="animation-delay: 0.3s">Syndicate</span>
        </h1>
        
        <!-- Subtitle with Stagger Animation -->
        <p class="hero-subtitle" :class="{ 'animate-in': isVisible }" style="animation-delay: 0.5s">
          Elevate your dance journey with modern class management
        </p>
        
        <!-- Divider -->
        <div class="hero-divider" :class="{ 'animate-in': isVisible }" style="animation-delay: 0.7s"></div>
        
        <!-- CTA Buttons -->
        <div class="hero-cta" :class="{ 'animate-in': isVisible }" style="animation-delay: 0.9s">
          <button class="btn btn-primary btn-xl" @click="goNext">
            <span>Get Started</span>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M5 12h14M12 5l7 7-7 7" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>
          <button class="btn btn-glass btn-xl">
            <span>Watch Demo</span>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M5 3l14 9-14 9V3z" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>
        </div>
        
        <!-- Features Badges -->
        <div class="hero-features" :class="{ 'animate-in': isVisible }" style="animation-delay: 1.1s">
          <div class="feature-badge">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M22 4L12 14.01l-3-3" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <span>Modern Design</span>
          </div>
          <div class="feature-badge">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <span>Lightning Fast</span>
          </div>
          <div class="feature-badge">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M12 2L2 7l10 5 10-5-10-5z" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M2 17l10 5 10-5M2 12l10 5 10-5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <span>Fully Featured</span>
          </div>
        </div>
      </div>
      
      <!-- Scroll Hint -->
      <div class="scroll-hint" :class="{ 'animate-in': isVisible }" style="animation-delay: 1.3s">
        <span>Scroll to explore</span>
        <div class="scroll-icon">
          <div class="scroll-wheel"></div>
        </div>
      </div>
    </div>

    <!-- Decorative Elements -->
    <div class="hero-decoration">
      <div class="glow-orb glow-orb-1"></div>
      <div class="glow-orb glow-orb-2"></div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { useSectionStore } from '@/stores/section'
import VideoBackground from '@/components/VideoBackground.vue'

const { t } = useI18n()
const sectionStore = useSectionStore()

// Video source - can be updated with actual video URL
const videoSrc = ref('') // Add your video URL here
const fallbackImage = ref('') // Add fallback image URL here

const isVisible = ref(false)

const goNext = () => {
  sectionStore.nextSection()
}

onMounted(() => {
  // Trigger entrance animations
  setTimeout(() => {
    isVisible.value = true
  }, 100)
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
  padding: $spacing-8;
}

.hero-content {
  max-width: 1000px;
  text-align: center;
  position: relative;
}

// Hero Title with Split Animation
.hero-title {
  display: flex;
  flex-direction: column;
  gap: $spacing-2;
  margin-bottom: $spacing-6;
  
  .title-line {
    display: block;
    font-size: clamp(3rem, 10vw, 7rem);
    font-weight: $font-weight-extrabold;
    line-height: 1;
    letter-spacing: -0.03em;
    background: linear-gradient(135deg, $text-primary 0%, $accent-primary 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    opacity: 0;
    transform: translateY(50px);
    transition: all 0.8s cubic-bezier(0.16, 1, 0.3, 1);
  }
  
  &.animate-in .title-line {
    opacity: 1;
    transform: translateY(0);
  }
}

// Hero Subtitle
.hero-subtitle {
  font-size: clamp($font-size-lg, 3vw, $font-size-2xl);
  color: $text-secondary;
  font-weight: $font-weight-normal;
  line-height: $line-height-relaxed;
  max-width: 700px;
  margin: 0 auto $spacing-8;
  opacity: 0;
  transform: translateY(30px);
  transition: all 0.8s cubic-bezier(0.16, 1, 0.3, 1);
  
  &.animate-in {
    opacity: 1;
    transform: translateY(0);
  }
}

// Decorative Divider
.hero-divider {
  width: 60px;
  height: 3px;
  background: linear-gradient(90deg, transparent, $accent-primary, transparent);
  margin: 0 auto $spacing-8;
  opacity: 0;
  transform: scaleX(0);
  transition: all 0.8s cubic-bezier(0.16, 1, 0.3, 1);
  
  &.animate-in {
    opacity: 1;
    transform: scaleX(1);
  }
}

// CTA Buttons
.hero-cta {
  display: flex;
  gap: $spacing-4;
  justify-content: center;
  flex-wrap: wrap;
  margin-bottom: $spacing-12;
  opacity: 0;
  transform: translateY(30px);
  transition: all 0.8s cubic-bezier(0.16, 1, 0.3, 1);
  
  &.animate-in {
    opacity: 1;
    transform: translateY(0);
  }
  
  .btn {
    display: inline-flex;
    align-items: center;
    gap: $spacing-3;
    
    svg {
      transition: transform $transition-base;
    }
    
    &:hover svg {
      transform: translateX(4px);
    }
  }
}

// Feature Badges
.hero-features {
  display: flex;
  gap: $spacing-6;
  justify-content: center;
  flex-wrap: wrap;
  opacity: 0;
  transform: translateY(20px);
  transition: all 0.8s cubic-bezier(0.16, 1, 0.3, 1);
  
  &.animate-in {
    opacity: 1;
    transform: translateY(0);
  }
}

.feature-badge {
  display: flex;
  align-items: center;
  gap: $spacing-2;
  padding: $spacing-2 $spacing-4;
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: $radius-full;
  font-size: $font-size-sm;
  color: $text-secondary;
  transition: all $transition-base;
  
  svg {
    color: $accent-primary;
  }
  
  &:hover {
    background: rgba(255, 255, 255, 0.08);
    border-color: $accent-primary;
    color: $text-primary;
    transform: translateY(-2px);
  }
}

// Scroll Hint
.scroll-hint {
  position: absolute;
  bottom: $spacing-8;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: $spacing-3;
  color: $text-tertiary;
  font-size: $font-size-sm;
  opacity: 0;
  transition: all 0.8s cubic-bezier(0.16, 1, 0.3, 1);
  
  &.animate-in {
    opacity: 0.7;
  }
  
  &:hover {
    opacity: 1;
  }
}

.scroll-icon {
  width: 24px;
  height: 40px;
  border: 2px solid $border-primary;
  border-radius: $radius-full;
  position: relative;
  
  .scroll-wheel {
    width: 4px;
    height: 8px;
    background: $accent-primary;
    border-radius: $radius-full;
    position: absolute;
    top: 8px;
    left: 50%;
    transform: translateX(-50%);
    animation: scroll-bounce 2s infinite;
  }
}

@keyframes scroll-bounce {
  0%, 100% {
    transform: translate(-50%, 0);
    opacity: 1;
  }
  50% {
    transform: translate(-50%, 12px);
    opacity: 0.5;
  }
}

// Decorative Glow Orbs
.hero-decoration {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 1;
  overflow: hidden;
}

.glow-orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
  opacity: 0.3;
  animation: float 20s infinite ease-in-out;
}

.glow-orb-1 {
  width: 400px;
  height: 400px;
  background: radial-gradient(circle, rgba(0, 255, 136, 0.4) 0%, transparent 70%);
  top: -200px;
  left: -200px;
}

.glow-orb-2 {
  width: 500px;
  height: 500px;
  background: radial-gradient(circle, rgba(0, 136, 255, 0.3) 0%, transparent 70%);
  bottom: -250px;
  right: -250px;
  animation-delay: -10s;
}

@keyframes float {
  0%, 100% {
    transform: translate(0, 0) scale(1);
  }
  33% {
    transform: translate(30px, -30px) scale(1.1);
  }
  66% {
    transform: translate(-20px, 20px) scale(0.9);
  }
}

// Responsive
@media (max-width: 768px) {
  .hero-container {
    padding: $spacing-6 $spacing-4;
  }
  
  .hero-cta {
    flex-direction: column;
    width: 100%;
    
    .btn {
      width: 100%;
    }
  }
  
  .hero-features {
    gap: $spacing-3;
  }
  
  .feature-badge {
    font-size: $font-size-xs;
    padding: $spacing-1 $spacing-3;
  }
  
  .glow-orb-1 {
    width: 250px;
    height: 250px;
  }
  
  .glow-orb-2 {
    width: 300px;
    height: 300px;
  }
}
</style>
