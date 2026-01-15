<template>
  <nav class="bottom-navigation">
    <div class="nav-wrapper">
      <div class="nav-container" ref="navContainer">
        <button
          v-for="item in navItems"
          :key="item.name"
          :ref="el => { if (el) navItemRefs[item.name] = el }"
          :class="['nav-item', { active: activeSection === item.name }]"
          @click="navigateTo(item.name)"
        >
          {{ item.label }}
        </button>
      </div>
      
      <!-- Fade edges for mobile -->
      <div class="nav-fade nav-fade-left"></div>
      <div class="nav-fade nav-fade-right"></div>
    </div>
  </nav>
</template>

<script setup>
import { ref, computed, watch, nextTick, onMounted } from 'vue'
import { useSectionStore } from '@/stores/section'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const sectionStore = useSectionStore()

const navContainer = ref(null)
const navItemRefs = ref({})

const navItems = [
  { name: 'home', label: 'Home' },
  { name: 'philosophy', label: 'Philosophy' },
  { name: 'classes', label: 'Classes' },
  { name: 'schedule', label: 'Schedule' },
  { name: 'trainers', label: 'Trainers' },
  { name: 'join', label: 'Join' },
  { name: 'contacts', label: 'Contacts' }
]

const activeSection = computed(() => sectionStore.currentSection)

const navigateTo = (sectionName) => {
  sectionStore.setSection(sectionName)
}

// Scroll active item to center
const scrollToActiveItem = () => {
  if (!navContainer.value) return
  
  const activeItemEl = navItemRefs.value[activeSection.value]
  if (!activeItemEl) return
  
  const container = navContainer.value
  const item = activeItemEl
  
  // Calculate position to center the item
  const containerWidth = container.offsetWidth
  const itemLeft = item.offsetLeft
  const itemWidth = item.offsetWidth
  
  const scrollPosition = itemLeft - (containerWidth / 2) + (itemWidth / 2)
  
  // Smooth scroll to position
  container.scrollTo({
    left: scrollPosition,
    behavior: 'smooth'
  })
}

// Watch for section changes
watch(activeSection, () => {
  nextTick(() => {
    scrollToActiveItem()
  })
})

// Initial scroll on mount
onMounted(() => {
  nextTick(() => {
    scrollToActiveItem()
  })
})
</script>

<style lang="scss" scoped>
@import '@/assets/styles/variables.scss';
@import '@/assets/styles/mixins.scss';

.bottom-navigation {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: $z-sticky;
  padding: $spacing-8 $spacing-8 $spacing-6;
  pointer-events: none;
  
  // Gradient fade at top
  &::before {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 200px;
    background: linear-gradient(to top, rgba(0, 0, 0, 0.8) 0%, transparent 100%);
    pointer-events: none;
    z-index: -1;
  }
}

.nav-wrapper {
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
  pointer-events: auto;
}

.nav-container {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: $spacing-4;
  background: rgba(20, 20, 20, 0.4);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: $radius-full;
  padding: $spacing-4 $spacing-8;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
  position: relative;
}

.nav-item {
  position: relative;
  padding: $spacing-3 $spacing-5;
  font-size: $font-size-base;
  font-weight: $font-weight-medium;
  color: rgba(255, 255, 255, 0.5);
  background: transparent;
  border: none;
  border-radius: $radius-full;
  cursor: pointer;
  transition: all $transition-base;
  white-space: nowrap;
  
  &::after {
    content: '';
    position: absolute;
    bottom: 8px;
    left: 50%;
    transform: translateX(-50%) scaleX(0);
    width: 60%;
    height: 2px;
    background: $text-primary;
    border-radius: $radius-full;
    transition: transform $transition-base;
  }
  
  &:hover {
    color: rgba(255, 255, 255, 0.9);
    background: rgba(255, 255, 255, 0.05);
  }
  
  &.active {
    color: $text-primary;
    
    &::after {
      transform: translateX(-50%) scaleX(1);
    }
  }
}

// Fade edges
.nav-fade {
  display: none; // Hidden on desktop
}

// Responsive
@media (max-width: 1024px) {
  .bottom-navigation {
    padding: $spacing-6 $spacing-4 $spacing-4;
  }
  
  .nav-container {
    padding: $spacing-3 $spacing-8;
    gap: $spacing-3;
    overflow-x: auto;
    overflow-y: hidden;
    justify-content: flex-start;
    border-radius: $radius-xl;
    scroll-behavior: smooth;
    
    // Hide scrollbar but keep functionality
    scrollbar-width: none;
    -ms-overflow-style: none;
    
    &::-webkit-scrollbar {
      display: none;
    }
  }
  
  .nav-item {
    // Keep full size - don't shrink
    flex-shrink: 0;
    padding: $spacing-3 $spacing-5;
    font-size: $font-size-base;
  }
  
  // Show fade edges on mobile
  .nav-fade {
    display: block;
    position: absolute;
    top: 0;
    bottom: 0;
    width: 80px;
    pointer-events: none;
    z-index: 2;
  }
  
  .nav-fade-left {
    left: 0;
    background: linear-gradient(to right, 
      rgba(0, 0, 0, 0.9) 0%,
      rgba(0, 0, 0, 0.6) 30%,
      transparent 100%
    );
    border-radius: $radius-xl 0 0 $radius-xl;
  }
  
  .nav-fade-right {
    right: 0;
    background: linear-gradient(to left, 
      rgba(0, 0, 0, 0.9) 0%,
      rgba(0, 0, 0, 0.6) 30%,
      transparent 100%
    );
    border-radius: 0 $radius-xl $radius-xl 0;
  }
}

@media (max-width: 640px) {
  .bottom-navigation {
    padding: $spacing-4 $spacing-3 $spacing-3;
  }
  
  .nav-container {
    padding: $spacing-2 $spacing-6;
    gap: $spacing-2;
  }
  
  .nav-item {
    padding: $spacing-2 $spacing-4;
    font-size: $font-size-sm;
  }
  
  .nav-fade {
    width: 60px;
  }
}
</style>
