import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useSectionStore = defineStore('section', () => {
  const currentSection = ref('home')
  const sections = ref([])
  const transitionDirection = ref('forward')
  
  // Set current section
  function setSection(sectionName) {
    const currentIndex = sections.value.findIndex(s => s === currentSection.value)
    const newIndex = sections.value.findIndex(s => s === sectionName)
    
    if (newIndex !== -1) {
      transitionDirection.value = newIndex > currentIndex ? 'forward' : 'backward'
      currentSection.value = sectionName
    }
  }
  
  // Register available sections
  function registerSections(sectionNames) {
    sections.value = sectionNames
  }
  
  // Navigate to next section
  function nextSection() {
    const currentIndex = sections.value.findIndex(s => s === currentSection.value)
    if (currentIndex < sections.value.length - 1) {
      transitionDirection.value = 'forward'
      currentSection.value = sections.value[currentIndex + 1]
    }
  }
  
  // Navigate to previous section
  function prevSection() {
    const currentIndex = sections.value.findIndex(s => s === currentSection.value)
    if (currentIndex > 0) {
      transitionDirection.value = 'backward'
      currentSection.value = sections.value[currentIndex - 1]
    }
  }
  
  // Computed values
  const currentSectionIndex = computed(() => 
    sections.value.findIndex(s => s === currentSection.value)
  )
  
  const isFirstSection = computed(() => currentSectionIndex.value === 0)
  const isLastSection = computed(() => 
    currentSectionIndex.value === sections.value.length - 1
  )
  
  return {
    currentSection,
    sections,
    transitionDirection,
    currentSectionIndex,
    isFirstSection,
    isLastSection,
    setSection,
    registerSections,
    nextSection,
    prevSection
  }
})
