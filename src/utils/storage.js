const TOKEN_KEY = 'token'
const USERNAME_KEY = 'username'
const USERID_KEY = 'userId'
const ROLE_KEY = 'role'

export function getToken() {
  return localStorage.getItem(TOKEN_KEY)
}

export function setToken(token) {
  localStorage.setItem(TOKEN_KEY, token)
}

export function removeToken() {
  localStorage.removeItem(TOKEN_KEY)
}

export function getUsername() {
  return localStorage.getItem(USERNAME_KEY)
}

export function setUsername(username) {
  localStorage.setItem(USERNAME_KEY, username)
}

export function removeUsername() {
  localStorage.removeItem(USERNAME_KEY)
}

export function getUserId() {
  return localStorage.getItem(USERID_KEY)
}

export function setUserId(userId) {
  localStorage.setItem(USERID_KEY, userId)
}

export function removeUserId() {
  localStorage.removeItem(USERID_KEY)
}

export function getRole() {
  return localStorage.getItem(ROLE_KEY)
}

export function setRole(role) {
  localStorage.setItem(ROLE_KEY, role)
}

export function removeRole() {
  localStorage.removeItem(ROLE_KEY)
}

export function clearAuth() {
  removeToken()
  removeUsername()
  removeUserId()
  removeRole()
}

export function isLoggedIn() {
  return !!getToken()
}
