import { ref } from 'vue'
import { useAuthApi } from '../api/auth'

const { check } = useAuthApi()
const isUnlocked = ref(false)

async function checkSecretCode() {
  try {
    const result = await check()
    isUnlocked.value = result.auth === true
    return result.auth === true
  } catch (error) {
    isUnlocked.value = false
    return false
  }
}

function useSecretCode() {
  checkSecretCode()

  return {
    isUnlocked,
    checkSecretCode
  }
}

export default useSecretCode
