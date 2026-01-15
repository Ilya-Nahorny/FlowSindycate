<template>
  <div class="section-layout">
    <!-- Current Active Section -->
    <transition 
      :name="transitionName" 
      mode="out-in"
      @before-enter="onBeforeEnter"
      @after-leave="onAfterLeave"
    >
      <component 
        :is="currentSectionComponent" 
        :key="currentSection"
        class="section"
      />
    </transition>

    <!-- Section Navigation Indicators (optional) -->
    <div v-if="showIndicators" class="section-indicators">
      <button
        v-for="section in sections"
        :key="section.name"
        :class="['indicator', { active: currentSection === section.name }]"
        @click="navigateToSection(section.name)"
        :aria-label="`Go to ${section.name} section`"
      >
        <span class="indicator-dot"></span>
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { useAppStore } from '@/stores/app'
import { useSectionStore } from '@/stores/section'

const props = defineProps({
  sections: {
    type: Array,
    required: true,
    // Array of { name: string, component: Component }
  },
  showIndicators: {
    type: Boolean,
    default: true
  },
  enableKeyboardNav: {
    type: Boolean,
    default: true
  },
  enableWheelNav: {
    type: Boolean,
    default: true
  }
})

const sectionStore = useSectionStore()
const transitionName = ref('slide-up')
const isTransitioning = ref(false)

const currentSection = computed(() => sectionStore.currentSection)

const currentSectionComponent = computed(() => {
  const section = props.sections.find(s => s.name === currentSection.value)
  return section?.component || props.sections[0]?.component
})

// Navigation methods
const navigateToSection = (sectionName) => {
  if (isTransitioning.value) return
  
  const currentIndex = props.sections.findIndex(s => s.name === currentSection.value)
  const targetIndex = props.sections.findIndex(s => s.name === sectionName)
  
  if (currentIndex === targetIndex) return
  
  // Set transition direction
  transitionName.value = targetIndex > currentIndex ? 'slide-up' : 'slide-down'
  
  sectionStore.setSection(sectionName)
}

const navigateNext = () => {
  const currentIndex = props.sections.findIndex(s => s.name === currentSection.value)
  if (currentIndex < props.sections.length - 1) {
    transitionName.value = 'slide-up'
    navigateToSection(props.sections[currentIndex + 1].name)
  }
}

const navigatePrev = () => {
  const currentIndex = props.sections.findIndex(s => s.name === currentSection.value)
  if (currentIndex > 0) {
    transitionName.value = 'slide-down'
    navigateToSection(props.sections[currentIndex - 1].name)
  }
}

// Transition event handlers
const onBeforeEnter = () => {
  isTransitioning.value = true
}

const onAfterLeave = () => {
  setTimeout(() => {
    isTransitioning.value = false
  }, 100)
}

// Keyboard navigation
const handleKeyboard = (e) => {
  if (!props.enableKeyboardNav || isTransitioning.value) return
  
  if (e.key === 'ArrowDown' || e.key === 'PageDown') {
    e.preventDefault()
    navigateNext()
  } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
    e.preventDefault()
    navigatePrev()
  } else if (e.key === 'Home') {
    e.preventDefault()
    transitionName.value = 'slide-down'
    navigateToSection(props.sections[0].name)
  } else if (e.key === 'End') {
    e.preventDefault()
    transitionName.value = 'slide-up'
    navigateToSection(props.sections[props.sections.length - 1].name)
  }
}

// Mouse wheel navigation
let wheelTimeout = null
const handleWheel = (e) => {
  if (!props.enableWheelNav || isTransitioning.value) return
  
  e.preventDefault()
  
  // Debounce wheel events
  if (wheelTimeout) return
  
  wheelTimeout = setTimeout(() => {
    wheelTimeout = null
  }, 1000)
  
  if (e.deltaY > 0) {
    navigateNext()
  } else if (e.deltaY < 0) {
    navigatePrev()
  }
}

// Touch navigation
let touchStartY = 0
let touchEndY = 0

const handleTouchStart = (e) => {
  touchStartY = e.touches[0].clientY
}

const handleTouchMove = (e) => {
  e.preventDefault()
}

const handleTouchEnd = (e) => {
  if (isTransitioning.value) return
  
  touchEndY = e.changedTouches[0].clientY
  const diff = touchStartY - touchEndY
  
  // Minimum swipe distance
  if (Math.abs(diff) > 50) {
    if (diff > 0) {
      navigateNext()
    } else {
      navigatePrev()
    }
  }
}

// Lifecycle
onMounted(() => {
  if (props.enableKeyboardNav) {
    window.addEventListener('keydown', handleKeyboard)
  }
  if (props.enableWheelNav) {
    window.addEventListener('wheel', handleWheel, { passive: false })
  }
  
  // Touch events
  window.addEventListener('touchstart', handleTouchStart, { passive: true })
  window.addEventListener('touchmove', handleTouchMove, { passive: false })
  window.addEventListener('touchend', handleTouchEnd, { passive: true })
})

onBeforeUnmount(() => {
  window.removeEventListener('keydown', handleKeyboard)
  window.removeEventListener('wheel', handleWheel)
  window.removeEventListener('touchstart', handleTouchStart)
  window.removeEventListener('touchmove', handleTouchMove)
  window.removeEventListener('touchend', handleTouchEnd)
})

// Expose methods for parent components
defineExpose({
  navigateToSection,
  navigateNext,
  navigatePrev
})
</script>

<style lang="scss" scoped>
@import '@/assets/styles/variables.scss';

.section-layout {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  overflow: hidden;
}

.section {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

// Section Indicators
.section-indicators {
  position: fixed;
  right: $spacing-6;
  top: 50%;
  transform: translateY(-50%);
  z-index: $z-sticky;
  display: flex;
  flex-direction: column;
  gap: $spacing-3;
}

.indicator {
  width: 12px;
  height: 12px;
  padding: 0;
  background: transparent;
  border: none;
  cursor: pointer;
  transition: all $transition-base;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 32px;
    height: 32px;
    border-radius: 50%;
  }
  
  &:hover {
    .indicator-dot {
      background: $accent-primary;
      transform: scale(1.2);
    }
  }
  
  &.active {
    .indicator-dot {
      background: $accent-primary;
      transform: scale(1.5);
      box-shadow: 0 0 12px rgba($accent-primary, 0.5);
    }
  }
}

.indicator-dot {
  display: block;
  width: 8px;
  height: 8px;
  background: $border-primary;
  border-radius: 50%;
  transition: all $transition-base;
}

// Transition: Slide Up
.slide-up-enter-active,
.slide-up-leave-active {
  transition: all 0.6s cubic-bezier(0.645, 0.045, 0.355, 1);
}

.slide-up-enter-from {
  transform: translateY(100%);
  opacity: 0;
}

.slide-up-leave-to {
  transform: translateY(-100%);
  opacity: 0;
}

// Transition: Slide Down
.slide-down-enter-active,
.slide-down-leave-active {
  transition: all 0.6s cubic-bezier(0.645, 0.045, 0.355, 1);
}

.slide-down-enter-from {
  transform: translateY(-100%);
  opacity: 0;
}

.slide-down-leave-to {
  transform: translateY(100%);
  opacity: 0;
}

// Transition: Fade
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.4s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

@media (max-width: 768px) {
  .section-indicators {
    right: $spacing-4;
    gap: $spacing-2;
  }
  
  .indicator {
    width: 10px;
    height: 10px;
  }
  
  .indicator-dot {
    width: 6px;
    height: 6px;
  }
}
</style>
