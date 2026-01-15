import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAppStore = defineStore('app', () => {
  const currentSection = ref('home')
  const isLoading = ref(false)

  function setSection(section) {
    currentSection.value = section
  }

  function setLoading(status) {
    isLoading.value = status
  }

  return {
    currentSection,
    isLoading,
    setSection,
    setLoading
  }
})
