<template>
  <SectionLayout 
    :sections="sections" 
    :show-indicators="true"
    :enable-keyboard-nav="true"
    :enable-wheel-nav="true"
  />
</template>

<script setup>
import { onMounted } from 'vue'
import { useSectionStore } from '@/stores/section'
import SectionLayout from '@/components/SectionLayout.vue'
import HomeSection from './sections/HomeSection.vue'
import AboutSection from './sections/AboutSection.vue'
import ContactSection from './sections/ContactSection.vue'

const sectionStore = useSectionStore()

// Define sections for the public site
const sections = [
  { name: 'home', component: HomeSection },
  { name: 'about', component: AboutSection },
  { name: 'contact', component: ContactSection }
]

// Initialize section store
onMounted(() => {
  sectionStore.registerSections(sections.map(s => s.name))
  sectionStore.setSection('home')
})
</script>

<style lang="scss" scoped>
// Styles are handled by SectionLayout component
</style>
