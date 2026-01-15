<template>
  <div class="home-view">
    <!-- Global Navigation - Outside transitions -->
    <LanguageSwitcher />
    <BottomNavigation />
    
    <!-- Section Content with Fade Transition -->
    <SectionLayout 
      :sections="sections" 
      :show-indicators="false"
      :enable-keyboard-nav="true"
      :enable-wheel-nav="true"
    />
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useSectionStore } from '@/stores/section'
import SectionLayout from '@/components/SectionLayout.vue'
import LanguageSwitcher from '@/components/LanguageSwitcher.vue'
import BottomNavigation from '@/components/BottomNavigation.vue'
import HomeSection from './sections/HomeSection.vue'
import PhilosophySection from './sections/PhilosophySection.vue'
import ClassesSection from './sections/ClassesSection.vue'
import AboutSection from './sections/AboutSection.vue'
import ContactSection from './sections/ContactSection.vue'

const sectionStore = useSectionStore()

// Define sections for the public site - matching navigation
const sections = [
  { name: 'home', component: HomeSection },
  { name: 'philosophy', component: PhilosophySection },
  { name: 'classes', component: ClassesSection },
  { name: 'schedule', component: AboutSection }, // Reuse for now
  { name: 'trainers', component: AboutSection }, // Reuse for now
  { name: 'join', component: AboutSection }, // Reuse for now
  { name: 'contacts', component: ContactSection }
]

// Initialize section store
onMounted(() => {
  sectionStore.registerSections(sections.map(s => s.name))
  sectionStore.setSection('home')
})
</script>

<style lang="scss" scoped>
.home-view {
  position: relative;
  width: 100%;
  height: 100vh;
  overflow: hidden;
}
</style>
