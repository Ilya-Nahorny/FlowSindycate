<template>
  <div class="contact-section section-container">
    <LanguageSwitcher />
    <BottomNavigation />
    
    <div class="section-content animate-fade-in-up">
      <h2 class="section-title">Get In Touch</h2>
      <p class="section-subtitle">
        Ready to start your dance journey?
      </p>
      
      <div class="contact-card card-glass">
        <form class="contact-form" @submit.prevent="handleSubmit">
          <div class="form-group">
            <label class="form-label">Name</label>
            <input 
              type="text" 
              class="form-input form-input-glass" 
              placeholder="Your name"
              v-model="formData.name"
            >
          </div>
          
          <div class="form-group">
            <label class="form-label">Email</label>
            <input 
              type="email" 
              class="form-input form-input-glass" 
              placeholder="your@email.com"
              v-model="formData.email"
            >
          </div>
          
          <div class="form-group">
            <label class="form-label">Message</label>
            <textarea 
              class="form-textarea form-input-glass" 
              placeholder="Your message..."
              v-model="formData.message"
              rows="4"
            ></textarea>
          </div>
          
          <button type="submit" class="btn btn-primary btn-lg w-full">
            Send Message
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive } from 'vue'
import LanguageSwitcher from '@/components/LanguageSwitcher.vue'
import BottomNavigation from '@/components/BottomNavigation.vue'

const formData = reactive({
  name: '',
  email: '',
  message: ''
})

const handleSubmit = () => {
  console.log('Form submitted:', formData)
  // Handle form submission
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/variables.scss';

.contact-section {
  background: linear-gradient(135deg, $bg-secondary 0%, $bg-primary 100%);
}

.section-container {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100%;
  padding: $spacing-8;
  padding-bottom: 200px;
}

.section-content {
  max-width: 600px;
  width: 100%;
  text-align: center;
}

.section-title {
  font-size: $font-size-5xl;
  font-weight: $font-weight-bold;
  margin-bottom: $spacing-4;
  color: $text-primary;
  
  @media (max-width: 768px) {
    font-size: $font-size-4xl;
  }
}

.section-subtitle {
  font-size: $font-size-xl;
  color: $text-secondary;
  margin-bottom: $spacing-8;
}

.contact-card {
  padding: $spacing-8;
  text-align: left;
}

.contact-form {
  .form-group {
    margin-bottom: $spacing-6;
    
    &:last-of-type {
      margin-bottom: $spacing-8;
    }
  }
}

.w-full {
  width: 100%;
}
</style>
