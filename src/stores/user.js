import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { getToken, setToken, removeToken, getUsername, setUsername, removeUsername, getUserId, setUserId, removeUserId, getRole, setRole, removeRole } from '../utils/storage'

export const useUserStore = defineStore('user', () => {
  const token = ref(getToken() || '')
  const username = ref(getUsername() || '')
  const userId = ref(getUserId() || '')
  const role = ref(parseInt(getRole() || '2'))

  const isLoggedIn = computed(() => !!token.value)
  const isAdmin = computed(() => role.value === 1)

  function login(userToken, userName, userUserId, userRole) {
    token.value = userToken
    username.value = userName
    userId.value = userUserId
    role.value = parseInt(userRole)
    setToken(userToken)
    setUsername(userName)
    setUserId(userUserId)
    setRole(userRole)
  }

  function logout() {
    token.value = ''
    username.value = ''
    userId.value = ''
    role.value = 2
    removeToken()
    removeUsername()
    removeUserId()
    removeRole()
  }

  function updateUsername(newUsername) {
    username.value = newUsername
    setUsername(newUsername)
  }

  return {
    token,
    username,
    userId,
    role,
    isLoggedIn,
    isAdmin,
    login,
    logout,
    updateUsername
  }
})
