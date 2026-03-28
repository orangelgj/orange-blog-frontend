<template>
  <div class="login-page">
    <div class="container">
      <div class="login-box">
        <h1 class="login-title">登录</h1>
        <div class="login-form">
          <div class="form-group">
            <label>用户名</label>
            <input
              v-model="username"
              type="text"
              placeholder="请输入用户名"
              class="form-input"
            />
          </div>
          <div class="form-group">
            <label>密码</label>
            <input
              v-model="password"
              type="password"
              placeholder="请输入密码"
              class="form-input"
            />
          </div>
          <button @click="handleLogin" class="btn-login" :disabled="loading">
            {{ loading ? '登录中...' : '登录' }}
          </button>
        </div>
        <p class="login-hint">
          还没有账号？<router-link to="/register">立即注册</router-link>
        </p>
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
const { login: loginApi } = useAuthApi()
const userStore = useUserStore()
const username = ref('')
const password = ref('')
const loading = ref(false)

async function handleLogin() {
  if (!username.value.trim()) {
    alert('请输入用户名')
    return
  }
  if (!password.value.trim()) {
    alert('请输入密码')
    return
  }

  loading.value = true
  try {
    const response = await loginApi(username.value, password.value)
    
    if (response.code === 200) {
      const { token, username: loggedInUsername, userId, role } = response.data
      userStore.login(token, loggedInUsername, userId, role)
      alert(`登录成功，欢迎 ${loggedInUsername}`)
      router.push('/')
    } else {
      alert(response.msg || '登录失败')
    }
  } catch (error) {
    console.error('登录错误:', error)
    alert(error.response?.data?.msg || '登录失败，请稍后重试')
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.login-page {
  min-height: calc(100vh - 60px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem 0;
}

.login-box {
  width: 100%;
  max-width: 400px;
  background: white;
  border: 1px solid #e5e5e5;
  border-radius: 12px;
  padding: 3rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
}

.login-title {
  font-size: 2rem;
  font-weight: 700;
  text-align: center;
  margin-bottom: 2rem;
  color: #1d1d1f;
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: #1d1d1f;
}

.form-input {
  width: 100%;
  padding: 12px 16px;
  border: 1px solid #d2d2d7;
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.3s;
}

.form-input:focus {
  outline: none;
  border-color: var(--theme-primary);
}

.btn-login {
  width: 100%;
  padding: 14px;
  background-color: var(--theme-primary);
  color: white;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 500;
  transition: background-color 0.3s;
}

.btn-login:hover {
  background-color: var(--theme-primary-hover);
}

.login-hint {
  text-align: center;
  margin-top: 1.5rem;
  color: #86868b;
  font-size: 0.9rem;
}

.login-hint a {
  color: var(--theme-primary);
  font-weight: 500;
}

.login-hint a:hover {
  text-decoration: underline;
}

@media (max-width: 768px) {
  .login-page {
    padding: 1.5rem 0;
  }

  .login-box {
    max-width: 360px;
    padding: 2.5rem;
  }

  .login-title {
    font-size: 1.75rem;
    margin-bottom: 1.5rem;
  }

  .form-group {
    margin-bottom: 1.25rem;
  }

  .form-input {
    padding: 10px 14px;
    font-size: 16px;
  }

  .btn-login {
    padding: 12px;
    font-size: 0.95rem;
  }

  .login-hint {
    font-size: 0.85rem;
    margin-top: 1.25rem;
  }
}

@media (max-width: 480px) {
  .login-page {
    padding: 1rem 0;
    align-items: flex-start;
  }

  .login-box {
    max-width: 100%;
    padding: 1.5rem 1.25rem;
    margin: 0;
    border-radius: 16px;
    border: 1px solid #e5e5e5;
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
  }

  .login-title {
    font-size: 3.5rem;
    margin-bottom: 1.5rem;
  }

  .form-group {
    margin-bottom: 1.25rem;
  }

  .form-group label {
    font-size: 2rem;
    margin-bottom: 0.6rem;
  }

  .form-input {
    padding: 12px 14px;
    font-size: 16px;
  }

  .btn-login {
    padding: 10px;
    font-size: 1.7rem;
    margin-top: 0.5rem;
  }

  .login-hint {
    font-size: 1.3rem;
    margin-top: 1.5rem;
  }
}
</style>
