<template>
  <div class="profile-page">
    <div class="container">
      <div class="profile-container">
        <div class="profile-header">
          <h1 class="profile-title">个人信息</h1>
          <p class="profile-subtitle">管理您的账户信息和安全设置</p>
        </div>

        <div class="profile-content">
          <div class="info-card">
            <div class="card-header">
              <h2 class="card-title">基本信息</h2>
            </div>
            <div class="card-body">
              <div class="info-item">
                <label class="info-label">用户名</label>
                <div class="info-value">
                  <span>{{ userStore.username }}</span>
                  <button class="btn-edit" @click="showUsernameModal = true">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                    </svg>
                    修改
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div class="info-card">
            <div class="card-header">
              <h2 class="card-title">账户安全</h2>
            </div>
            <div class="card-body">
              <div class="info-item">
                <label class="info-label">密码</label>
                <div class="info-value">
                  <span>••••••••</span>
                  <button class="btn-edit" @click="showPasswordModal = true">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                    </svg>
                    修改
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-if="showUsernameModal" class="modal-overlay" @click="closeModals">
      <div class="modal" @click.stop>
        <div class="modal-header">
          <h3>修改用户名</h3>
          <button class="modal-close" @click="closeModals">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
        <div class="modal-body">
          <div class="form-group">
            <label>当前用户名</label>
            <input type="text" :value="userStore.username" disabled class="form-input disabled" />
          </div>
          <div class="form-group">
            <label>旧密码 <span class="required">*</span></label>
            <input
              v-model="usernameForm.oldPassword"
              type="password"
              placeholder="请输入旧密码"
              class="form-input"
            />
          </div>
          <div class="form-group">
            <label>新用户名 <span class="required">*</span></label>
            <input
              v-model="usernameForm.newUsername"
              type="text"
              placeholder="请输入新用户名"
              class="form-input"
            />
          </div>
          <div v-if="usernameError" class="error-message">{{ usernameError }}</div>
        </div>
        <div class="modal-footer">
          <button class="btn-cancel" @click="closeModals">取消</button>
          <button class="btn-confirm" @click="handleUpdateUsername" :disabled="usernameLoading">
            {{ usernameLoading ? '修改中...' : '确认修改' }}
          </button>
        </div>
      </div>
    </div>

    <div v-if="showPasswordModal" class="modal-overlay" @click="closeModals">
      <div class="modal" @click.stop>
        <div class="modal-header">
          <h3>修改密码</h3>
          <button class="modal-close" @click="closeModals">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
        <div class="modal-body">
          <div class="form-group">
            <label>旧密码 <span class="required">*</span></label>
            <input
              v-model="passwordForm.oldPassword"
              type="password"
              placeholder="请输入旧密码"
              class="form-input"
            />
          </div>
          <div class="form-group">
            <label>新密码 <span class="required">*</span></label>
            <input
              v-model="passwordForm.newPassword"
              type="password"
              placeholder="请输入新密码（至少8位）"
              class="form-input"
            />
          </div>
          <div class="form-group">
            <label>确认密码 <span class="required">*</span></label>
            <input
              v-model="passwordForm.confirmPassword"
              type="password"
              placeholder="请再次输入新密码"
              class="form-input"
            />
          </div>
          <div v-if="passwordError" class="error-message">{{ passwordError }}</div>
        </div>
        <div class="modal-footer">
          <button class="btn-cancel" @click="closeModals">取消</button>
          <button class="btn-confirm" @click="handleUpdatePassword" :disabled="passwordLoading">
            {{ passwordLoading ? '修改中...' : '确认修改' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthApi } from '../api/auth'
import { useUserStore } from '../stores/user'

const router = useRouter()
const { updateUsername, updatePassword } = useAuthApi()
const userStore = useUserStore()

const showUsernameModal = ref(false)
const showPasswordModal = ref(false)
const usernameLoading = ref(false)
const passwordLoading = ref(false)
const usernameError = ref('')
const passwordError = ref('')

const usernameForm = ref({
  oldPassword: '',
  newUsername: ''
})

const passwordForm = ref({
  oldPassword: '',
  newPassword: '',
  confirmPassword: ''
})

function closeModals() {
  showUsernameModal.value = false
  showPasswordModal.value = false
  usernameError.value = ''
  passwordError.value = ''
  usernameForm.value = {
    oldPassword: '',
    newUsername: ''
  }
  passwordForm.value = {
    oldPassword: '',
    newPassword: '',
    confirmPassword: ''
  }
}

async function handleUpdateUsername() {
  if (!usernameForm.value.oldPassword || !usernameForm.value.newUsername) {
    usernameError.value = '请填写完整信息'
    return
  }

  if (usernameForm.value.newUsername.length < 2 || usernameForm.value.newUsername.length > 20) {
    usernameError.value = '用户名长度必须在2-20个字符之间'
    return
  }

  usernameLoading.value = true
  usernameError.value = ''

  try {
    const response = await updateUsername(
      usernameForm.value.oldPassword,
      usernameForm.value.newUsername
    )

    if (response.code === 200) {
      alert('用户名修改成功，请重新登录')
      userStore.logout()
      router.push('/login')
    } else {
      usernameError.value = response.msg || '修改失败，请重试'
    }
  } catch (error) {
    console.error('修改用户名失败:', error)
    if (error.status === 403) {
      usernameError.value = error.message || '权限不足'
    } else if (error.status === 401) {
      usernameError.value = error.message || '认证失败'
    } else {
      usernameError.value = '修改失败，请检查网络连接'
    }
  } finally {
    usernameLoading.value = false
  }
}

async function handleUpdatePassword() {
  if (!passwordForm.value.oldPassword || !passwordForm.value.newPassword || !passwordForm.value.confirmPassword) {
    passwordError.value = '请填写完整信息'
    return
  }

  if (passwordForm.value.newPassword.length < 8) {
    passwordError.value = '新密码长度不能少于8位'
    return
  }

  if (passwordForm.value.newPassword !== passwordForm.value.confirmPassword) {
    passwordError.value = '两次输入的密码不一致'
    return
  }

  passwordLoading.value = true
  passwordError.value = ''

  try {
    const response = await updatePassword(
      passwordForm.value.oldPassword,
      passwordForm.value.newPassword
    )

    if (response.code === 200) {
      alert('密码修改成功，请重新登录')
      userStore.logout()
      router.push('/login')
    } else {
      passwordError.value = response.msg || '修改失败，请重试'
    }
  } catch (error) {
    console.error('修改密码失败:', error)
    if (error.status === 403) {
      passwordError.value = error.message || '权限不足'
    } else if (error.status === 401) {
      passwordError.value = error.message || '认证失败'
    } else {
      passwordError.value = '修改失败，请检查网络连接'
    }
  } finally {
    passwordLoading.value = false
  }
}
</script>

<style scoped>
.profile-page {
  min-height: calc(100vh - 60px);
  background-color: #f5f5f7;
  padding: 2rem 0;
}

.profile-container {
  max-width: 800px;
  margin: 0 auto;
}

.profile-header {
  text-align: center;
  margin-bottom: 2rem;
}

.profile-title {
  font-size: 2rem;
  font-weight: 700;
  color: #1d1d1f;
  margin-bottom: 0.5rem;
}

.profile-subtitle {
  font-size: 1rem;
  color: #86868b;
}

.profile-content {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.info-card {
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
  overflow: hidden;
}

.card-header {
  padding: 1.25rem 1.5rem;
  border-bottom: 1px solid #f5f5f7;
}

.card-title {
  font-size: 1.125rem;
  font-weight: 600;
  color: #1d1d1f;
  margin: 0;
}

.card-body {
  padding: 1.5rem;
}

.info-item {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.info-label {
  font-size: 0.875rem;
  font-weight: 500;
  color: #6e6e73;
}

.info-value {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
}

.info-value span {
  font-size: 1rem;
  color: #1d1d1f;
}

.btn-edit {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background: transparent;
  color: var(--theme-primary);
  border: 1px solid var(--theme-primary);
  border-radius: 6px;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s;
  -webkit-tap-highlight-color: transparent;
}

.btn-edit:hover {
  background: var(--theme-primary);
  color: white;
}

.btn-edit:active {
  transform: scale(0.95);
}

.btn-edit svg {
  flex-shrink: 0;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 1rem;
}

.modal {
  background: white;
  border-radius: 12px;
  width: 100%;
  max-width: 400px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12);
  overflow: hidden;
}

.modal-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.25rem 1.5rem;
  border-bottom: 1px solid #f5f5f7;
}

.modal-header h3 {
  font-size: 1.125rem;
  font-weight: 600;
  color: #1d1d1f;
  margin: 0;
}

.modal-close {
  width: 32px;
  height: 32px;
  border-radius: 6px;
  background: transparent;
  border: none;
  color: #86868b;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
  -webkit-tap-highlight-color: transparent;
}

.modal-close:hover {
  background: #f5f5f7;
  color: #1d1d1f;
}

.modal-body {
  padding: 1.5rem;
}

.form-group {
  margin-bottom: 1rem;
}

.form-group:last-child {
  margin-bottom: 0;
}

.form-group label {
  display: block;
  font-size: 0.875rem;
  font-weight: 500;
  color: #1d1d1f;
  margin-bottom: 0.5rem;
}

.required {
  color: #ff3b30;
}

.form-input {
  width: 100%;
  padding: 0.75rem 1rem;
  border: 1px solid #d2d2d7;
  border-radius: 8px;
  font-size: 0.9rem;
  color: #1d1d1f;
  transition: all 0.2s;
  -webkit-tap-highlight-color: transparent;
}

.form-input:focus {
  outline: none;
  border-color: var(--theme-primary);
  box-shadow: 0 0 0 3px rgba(0, 122, 255, 0.1);
}

.form-input.disabled {
  background: #f5f5f7;
  color: #86868b;
  cursor: not-allowed;
}

.error-message {
  margin-top: 0.75rem;
  padding: 0.75rem;
  background: #fff2f2;
  border: 1px solid #ffcccc;
  border-radius: 6px;
  color: #ff3b30;
  font-size: 0.875rem;
}

.modal-footer {
  display: flex;
  gap: 0.75rem;
  padding: 1rem 1.5rem;
  border-top: 1px solid #f5f5f7;
  background: #f9f9f9;
}

.btn-cancel,
.btn-confirm {
  flex: 1;
  padding: 0.75rem 1rem;
  border-radius: 8px;
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  -webkit-tap-highlight-color: transparent;
}

.btn-cancel {
  background: white;
  color: #1d1d1f;
  border: 1px solid #d2d2d7;
}

.btn-cancel:hover {
  background: #f5f5f7;
}

.btn-cancel:active {
  transform: scale(0.98);
}

.btn-confirm {
  background: var(--theme-primary);
  color: white;
  border: none;
}

.btn-confirm:hover:not(:disabled) {
  background: var(--theme-primary-hover);
}

.btn-confirm:active:not(:disabled) {
  transform: scale(0.98);
}

.btn-confirm:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

@media (max-width: 768px) {
  .profile-page {
    padding: 1rem 0;
  }

  .profile-title {
    font-size: 1.5rem;
  }

  .profile-subtitle {
    font-size: 0.9rem;
  }

  .card-header,
  .card-body {
    padding: 1rem;
  }

  .modal {
    max-width: 100%;
  }

  .modal-header,
  .modal-body,
  .modal-footer {
    padding: 1rem;
  }
}
</style>
