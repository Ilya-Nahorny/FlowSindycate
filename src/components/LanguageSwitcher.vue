<template>
  <div class="language-switcher">
    <button class="lang-button" @click="toggleDropdown">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <circle cx="12" cy="12" r="10" stroke-width="2"/>
        <line x1="2" y1="12" x2="22" y2="12" stroke-width="2"/>
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" stroke-width="2"/>
      </svg>
      <span>{{ currentLocale.toUpperCase() }}</span>
    </button>
    
    <Transition name="dropdown">
      <div v-if="showDropdown" class="lang-dropdown">
        <button
          v-for="lang in languages"
          :key="lang.code"
          :class="['lang-option', { active: currentLocale === lang.code }]"
          @click="changeLanguage(lang.code)"
        >
          <span class="lang-flag">{{ lang.flag }}</span>
          <span class="lang-name">{{ lang.name }}</span>
        </button>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { useI18n } from 'vue-i18n'

const { locale } = useI18n()
const showDropdown = ref(false)

const languages = [
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'pl', name: 'Polski', flag: '🇵🇱' }
]

const currentLocale = computed(() => locale.value)

const toggleDropdown = () => {
  showDropdown.value = !showDropdown.value
}

const changeLanguage = (lang) => {
  locale.value = lang
  localStorage.setItem('locale', lang)
  showDropdown.value = false
}

// Close dropdown when clicking outside
const handleClickOutside = (event) => {
  const switcher = event.target.closest('.language-switcher')
  if (!switcher && showDropdown.value) {
    showDropdown.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>

<style lang="scss" scoped>
@import '@/assets/styles/variables.scss';
@import '@/assets/styles/mixins.scss';

.language-switcher {
  position: fixed;
  top: $spacing-6;
  right: $spacing-6;
  z-index: $z-dropdown + 100;
}

.lang-button {
  display: flex;
  align-items: center;
  gap: $spacing-2;
  padding: $spacing-3 $spacing-4;
  background: rgba(20, 20, 20, 0.6);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: $radius-full;
  color: $text-primary;
  font-size: $font-size-sm;
  font-weight: $font-weight-medium;
  cursor: pointer;
  transition: all $transition-base;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
  
  svg {
    width: 20px;
    height: 20px;
  }
  
  &:hover {
    background: rgba(20, 20, 20, 0.8);
    border-color: rgba(255, 255, 255, 0.2);
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3);
  }
}

.lang-dropdown {
  position: absolute;
  top: calc(100% + $spacing-2);
  right: 0;
  min-width: 180px;
  background: rgba(20, 20, 20, 0.95);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: $radius-lg;
  overflow: hidden;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
}

.lang-option {
  display: flex;
  align-items: center;
  gap: $spacing-3;
  width: 100%;
  padding: $spacing-3 $spacing-4;
  background: transparent;
  border: none;
  color: $text-secondary;
  font-size: $font-size-sm;
  text-align: left;
  cursor: pointer;
  transition: all $transition-fast;
  
  &:hover {
    background: rgba(255, 255, 255, 0.05);
    color: $text-primary;
  }
  
  &.active {
    background: rgba(255, 255, 255, 0.08);
    color: $text-primary;
    font-weight: $font-weight-medium;
  }
}

.lang-flag {
  font-size: $font-size-lg;
}

.lang-name {
  flex: 1;
}

// Dropdown transition
.dropdown-enter-active,
.dropdown-leave-active {
  transition: all 0.2s ease;
}

.dropdown-enter-from,
.dropdown-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

@media (max-width: 640px) {
  .language-switcher {
    top: $spacing-4;
    right: $spacing-4;
  }
  
  .lang-button {
    padding: $spacing-2 $spacing-3;
  }
}
</style>
