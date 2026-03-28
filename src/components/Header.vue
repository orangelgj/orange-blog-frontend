<template>
  <header class="header">
    <div class="container">
      <div class="header-content">
        <div class="logo-section">
          <div class="avatar">
            <img v-if="avatarUrl" :src="avatarUrl" alt="Orange" class="avatar-image" />
            <div v-else class="avatar-placeholder">O</div>
          </div>
          <router-link to="/" class="logo-text">Orange</router-link>
        </div>
        <nav class="nav" :class="{ 'nav-open': isMenuOpen }">
          <div class="nav-search">
            <SearchBox />
          </div>
          <router-link to="/" class="nav-link" @click="closeMenu">首页</router-link>
          <router-link to="/articles" class="nav-link" @click="closeMenu">文章</router-link>
          <router-link to="/about" class="nav-link" @click="closeMenu">关于</router-link>
          <router-link to="/links" class="nav-link" @click="closeMenu">友链</router-link>
          <router-link to="/contact" class="nav-link" @click="closeMenu">联系</router-link>
          <router-link to="/404" class="nav-link" @click="closeMenu">404</router-link>
        </nav>
        <div class="header-actions">
          <button class="btn-theme" @click="toggleThemeSettings" title="主题设置">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="12" r="10"></circle>
              <path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"></path>
            </svg>
          </button>
          <template v-if="userStore.isLoggedIn">
            <UserDropdown :username="userStore.username" :is-admin="userStore.isAdmin" @logout="handleLogout" @profile="handleProfile" @admin="handleAdmin" />
          </template>
          <template v-else>
            <router-link v-if="isUnlocked" to="/login" class="btn-login">登录</router-link>
            <router-link v-if="isUnlocked" to="/register" class="btn-register">注册</router-link>
          </template>
          <button class="menu-toggle" @click="toggleMenu" aria-label="Toggle menu">
            <span class="hamburger"></span>
          </button>
        </div>
      </div>
    </div>
    <ThemeSettings v-if="showThemeSettings" @close="showThemeSettings = false" />
  </header>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import useSecretCode from '../composables/useSecretCode'
import { useUserStore } from '../stores/user'
import SearchBox from './SearchBox.vue'
import ThemeSettings from './ThemeSettings.vue'
import UserDropdown from './UserDropdown.vue'

const router = useRouter()
const { isUnlocked, checkSecretCode } = useSecretCode()
const userStore = useUserStore()
const isMenuOpen = ref(false)
const avatarUrl = ref('/images/avatar.svg')
const showThemeSettings = ref(false)

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}

const closeMenu = () => {
  isMenuOpen.value = false
}

const toggleThemeSettings = () => {
  showThemeSettings.value = !showThemeSettings.value
}

const handleLogout = () => {
  userStore.logout()
  router.push('/')
}

const handleProfile = () => {
  router.push('/profile')
}

const handleAdmin = () => {
  router.push('/admin')
}

onMounted(() => {
  checkSecretCode()
})
</script>

<style scoped>
.header {
  background-color: rgba(253, 252, 248, 0.8);
  backdrop-filter: blur(20px);
  border-bottom: 1px solid #e5e5e5;
  position: sticky;
  top: 0;
  z-index: 100;
}

.header-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 60px;
}

.logo-section {
  display: flex;
  align-items: center;
  gap: 1rem;
  position: relative;
  z-index: 103;
}

.avatar {
  width: 40px;
  height: 40px;
  flex-shrink: 0;
  border-radius: 50%;
  background: #f5f5f7;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.avatar:hover {
  transform: scale(1.05);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.avatar-image {
  width: 100%;
  height: 100%;
  object-fit: contain;
  display: block;
  padding: 4px;
}

.avatar-placeholder {
  font-size: 1.25rem;
  font-weight: 700;
  color: #86868b;
}

.logo-text {
  font-size: 1.5rem;
  font-weight: 700;
  color: #1d1d1f;
  transition: color 0.3s;
  position: relative;
  z-index: 103;
  -webkit-tap-highlight-color: transparent;
}

.logo-text:hover {
  color: var(--theme-primary);
}

.nav {
  display: flex;
  gap: 2rem;
  align-items: center;
  flex: 1;
  justify-content: center;
}

.nav-search {
  display: flex;
  align-items: center;
}

.nav-link {
  color: #6e6e73;
  font-weight: 400;
  transition: color 0.3s;
  white-space: nowrap;
}

.nav-link:hover,
.nav-link.router-link-active {
  color: var(--theme-primary);
}

.header-actions {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.btn-theme {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: #f5f5f7;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s;
  color: #1d1d1f;
  position: relative;
  z-index: 102;
  -webkit-tap-highlight-color: transparent;
}

.btn-theme:hover {
  background: #e8e8ed;
  transform: rotate(45deg);
}

.btn-theme:active {
  transform: rotate(45deg) scale(0.95);
}

.btn-login {
  padding: 6px 14px;
  background-color: transparent;
  color: var(--theme-primary);
  border: 1px solid var(--theme-primary);
  border-radius: 6px;
  font-weight: 500;
  font-size: 0.875rem;
  transition: all 0.3s;
  position: relative;
  z-index: 102;
  -webkit-tap-highlight-color: transparent;
}

.btn-login:hover {
  background-color: var(--theme-primary);
  color: white;
}

.btn-login:active {
  transform: scale(0.95);
}

.btn-register {
  padding: 6px 14px;
  background-color: transparent;
  color: #6e6e73;
  border: 1px solid #d2d2d7;
  border-radius: 6px;
  font-weight: 500;
  font-size: 0.875rem;
  transition: all 0.3s;
  position: relative;
  z-index: 102;
  -webkit-tap-highlight-color: transparent;
}

.btn-register:hover {
  background-color: #f5f5f7;
  color: #1d1d1f;
}

.btn-register:active {
  transform: scale(0.95);
}

.menu-toggle {
  display: none;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 44px;
  height: 44px;
  background: transparent;
  padding: 0;
  z-index: 101;
  cursor: pointer;
  border-radius: 4px;
  transition: background-color 0.3s;
}

.menu-toggle:hover {
  background-color: rgba(0, 0, 0, 0.05);
}

.menu-toggle:active {
  background-color: rgba(0, 0, 0, 0.1);
}

.hamburger {
  width: 24px;
  height: 2px;
  background-color: #1d1d1f;
  position: relative;
  transition: background-color 0.3s;
}

.hamburger::before,
.hamburger::after {
  content: '';
  position: absolute;
  width: 24px;
  height: 2px;
  background-color: #1d1d1f;
  left: 0;
  transition: transform 0.3s, background-color 0.3s;
}

.hamburger::before {
  top: -7px;
}

.hamburger::after {
  top: 7px;
}

.nav-open .hamburger {
  background-color: transparent;
}

.nav-open .hamburger::before {
  transform: rotate(45deg);
  top: 0;
}

.nav-open .hamburger::after {
  transform: rotate(-45deg);
  top: 0;
}

@media (max-width: 1020px) {
  .logo-section {
    gap: 0.75rem;
    z-index: 103;
  }

  .avatar {
    width: 36px;
    height: 36px;
  }

  .avatar-placeholder {
    font-size: 1.125rem;
  }

  .logo-text {
    font-size: 1.25rem;
    z-index: 103;
  }

  .menu-toggle {
    display: flex;
  }

  .btn-theme {
    width: 44px;
    height: 44px;
  }

  .btn-theme svg {
    width: 22px;
    height: 22px;
  }

  .btn-login,
  .btn-register {
    padding: 8px 14px;
    font-size: 1rem;
  }

  .nav {
    position: fixed;
    top: 60px;
    left: 0;
    right: 0;
    background-color: rgba(255, 255, 255, 0.98);
    backdrop-filter: blur(20px);
    flex-direction: column;
    gap: 0;
    padding: 0;
    border-bottom: 1px solid #e5e5e5;
    transform: translateY(-100%);
    opacity: 0;
    transition: transform 0.3s ease, opacity 0.3s ease;
    z-index: 99;
  }

  .nav-open {
    transform: translateY(0);
    opacity: 1;
  }

  .nav-search {
    width: 100%;
    padding: 1rem;
    border-bottom: 1px solid #f5f5f7;
    justify-content: center;
  }

  .nav-search .search-box {
    width: 100%;
    max-width: 300px;
  }

  .nav-search .search-input {
    width: 100%;
  }

  .nav-link {
    padding: 18px 20px;
    border-bottom: 1px solid #f5f5f7;
    width: 100%;
    display: block;
    font-size: 1.1rem;
  }

  .header-actions {
    gap: 0.5rem;
    align-items: center;
  }
}

@media (max-width: 480px) {
  .logo-section {
    gap: 0.5rem;
  }

  .avatar {
    width: 32px;
    height: 32px;
  }

  .avatar-placeholder {
    font-size: 1rem;
  }

  .logo-text {
    font-size: 1.125rem;
  }

  .header-content {
    height: 56px;
  }

  .nav {
    top: 56px;
  }
}
</style>
