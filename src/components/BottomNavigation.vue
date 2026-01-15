<template>
  <nav class="bottom-navigation">
    <div class="nav-container">
      <button
        v-for="item in navItems"
        :key="item.name"
        :class="['nav-item', { active: activeSection === item.name }]"
        @click="navigateTo(item.name)"
      >
        {{ item.label }}
      </button>
    </div>
  </nav>
</template>

<script setup>
import { computed } from 'vue'
import { useSectionStore } from '@/stores/section'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const sectionStore = useSectionStore()

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

.nav-container {
  max-width: 1200px;
  margin: 0 auto;
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
  pointer-events: auto;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
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

// Responsive
@media (max-width: 1024px) {
  .bottom-navigation {
    padding: $spacing-6 $spacing-4 $spacing-4;
  }
  
  .nav-container {
    padding: $spacing-3 $spacing-4;
    gap: $spacing-2;
    overflow-x: auto;
    justify-content: flex-start;
    border-radius: $radius-xl;
    
    // Hide scrollbar but keep functionality
    scrollbar-width: none;
    -ms-overflow-style: none;
    
    &::-webkit-scrollbar {
      display: none;
    }
  }
  
  .nav-item {
    padding: $spacing-2 $spacing-4;
    font-size: $font-size-sm;
  }
}

@media (max-width: 640px) {
  .nav-container {
    padding: $spacing-2 $spacing-3;
    gap: $spacing-1;
  }
  
  .nav-item {
    padding: $spacing-2 $spacing-3;
    font-size: $font-size-xs;
  }
}
</style>
