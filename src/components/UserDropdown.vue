<template>
  <div class="user-dropdown" ref="dropdownRef">
    <button class="user-button" @click="toggleDropdown">
      <span class="username">{{ username }}</span>
      <svg class="dropdown-icon" :class="{ 'open': isOpen }" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <polyline points="6 9 12 15 18 9"></polyline>
      </svg>
    </button>
    <div v-if="isOpen" class="dropdown-menu">
      <div class="menu-header">
        <div class="user-avatar">{{ username.charAt(0).toUpperCase() }}</div>
        <div class="user-info">
          <div class="user-name">{{ username }}</div>
          <div class="user-role">用户</div>
        </div>
      </div>
      <div class="menu-items">
        <button class="menu-item" @click="handleProfile">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
            <circle cx="12" cy="7" r="4"></circle>
          </svg>
          <span>个人信息</span>
        </button>
        <button v-if="isAdmin" class="menu-item" @click="handleAdmin">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
          </svg>
          <span>管理后台</span>
        </button>
        <button class="menu-item" @click="handleLogout">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
            <polyline points="16 17 21 12 16 7"></polyline>
            <line x1="21" y1="12" x2="9" y2="12"></line>
          </svg>
          <span>退出登录</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

const props = defineProps({
  username: {
    type: String,
    required: true
  },
  isAdmin: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['logout', 'profile', 'admin'])

const isOpen = ref(false)
const dropdownRef = ref(null)

function toggleDropdown() {
  isOpen.value = !isOpen.value
}

function handleLogout() {
  isOpen.value = false
  emit('logout')
}

function handleProfile() {
  isOpen.value = false
  emit('profile')
}

function handleAdmin() {
  isOpen.value = false
  emit('admin')
}

function handleClickOutside(event) {
  if (dropdownRef.value && !dropdownRef.value.contains(event.target)) {
    isOpen.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>

<style scoped>
.user-dropdown {
  position: relative;
}

.user-button {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 6px 12px;
  background-color: transparent;
  color: var(--theme-primary);
  border: 1px solid var(--theme-primary);
  border-radius: 6px;
  font-weight: 500;
  font-size: 0.875rem;
  transition: all 0.3s;
  cursor: pointer;
  position: relative;
  z-index: 102;
  -webkit-tap-highlight-color: transparent;
}

.user-button:hover {
  background-color: var(--theme-primary);
  color: white;
}

.username {
  max-width: 120px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.dropdown-icon {
  transition: transform 0.3s;
}

.dropdown-icon.open {
  transform: rotate(180deg);
}

.dropdown-menu {
  position: absolute;
  top: calc(100% + 8px);
  right: 0;
  width: 240px;
  background: white;
  border: 1px solid #e5e5e5;
  border-radius: 12px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  overflow: hidden;
}

.menu-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1.25rem;
  border-bottom: 1px solid #f5f5f7;
  background: linear-gradient(135deg, #f5f5f7 0%, #ffffff 100%);
}

.user-avatar {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--theme-primary) 0%, var(--theme-primary-hover) 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1.25rem;
  font-weight: 700;
  flex-shrink: 0;
}

.user-info {
  flex: 1;
  min-width: 0;
}

.user-name {
  font-size: 1rem;
  font-weight: 600;
  color: #1d1d1f;
  margin-bottom: 0.25rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.user-role {
  font-size: 0.8rem;
  color: #86868b;
}

.menu-items {
  padding: 0.5rem;
}

.menu-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  width: 100%;
  padding: 0.75rem 1rem;
  background: transparent;
  border: none;
  border-radius: 8px;
  color: #1d1d1f;
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  -webkit-tap-highlight-color: transparent;
}

.menu-item:hover {
  background-color: #f5f5f7;
}

.menu-item svg {
  flex-shrink: 0;
}

@media (max-width: 768px) {
  .user-button {
    padding: 8px 14px;
    font-size: 1rem;
  }

  .username {
    max-width: 100px;
  }

  .dropdown-menu {
    width: 220px;
  }

  .menu-header {
    padding: 1rem;
  }

  .user-avatar {
    width: 40px;
    height: 40px;
    font-size: 1.125rem;
  }

  .user-name {
    font-size: 0.95rem;
  }

  .user-role {
    font-size: 0.75rem;
  }
}
</style>
