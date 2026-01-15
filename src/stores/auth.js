import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAuthStore = defineStore('auth', () => {
  const user = ref(null)
  const token = ref(null)
  const isAuthenticated = ref(false)

  function login(userData, authToken) {
    user.value = userData
    token.value = authToken
    isAuthenticated.value = true
  }

  function logout() {
    user.value = null
    token.value = null
    isAuthenticated.value = false
  }

  return {
    user,
    token,
    isAuthenticated,
    login,
    logout
  }
})
