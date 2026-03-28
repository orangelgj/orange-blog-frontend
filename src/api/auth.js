import api from '../utils/api'

export function useAuthApi() {
  async function check() {
    const response = await api.get('/v1/check')
    return response
  }

  async function login(username, password) {
    const response = await api.post('/v1/login', { username, password })
    return response
  }

  async function register(username, password, email, description) {
    const response = await api.post('/v1/register', { username, password, email, description })
    return response
  }

  async function updateUsername(oldPassword, newUsername) {
    const response = await api.post('/v1/user/username', { old_password: oldPassword, new_username: newUsername })
    return response
  }

  async function updatePassword(oldPassword, newPassword) {
    const response = await api.post('/v1/user/password', { old_password: oldPassword, new_password: newPassword })
    return response
  }

  return {
    check,
    login,
    register,
    updateUsername,
    updatePassword
  }
}
