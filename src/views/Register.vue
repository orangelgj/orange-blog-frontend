<template>
  <div class="register-page">
    <div class="container">
      <div class="register-box">
        <h1 class="register-title">注册</h1>
        <div class="register-form">
          <div class="form-group">
            <label>用户名</label>
            <small class="form-hint">可以是中文，同时用作登录名和昵称哦～<br>但是不能重复</small>
            <input
              v-model="username"
              type="text"
              placeholder="请输入用户名，长度为 2-20 个字符"
              class="form-input"
            />
          </div>
          <div class="form-group">
            <label>邮箱</label>
            <small class="form-hint">暂时不支持用于登录，也不会公开</small>
            <input
              v-model="email"
              type="email"
              placeholder="请输入邮箱，注意符合邮箱格式"
              class="form-input"
            />
          </div>
          <div class="form-group">
            <label>密码</label>
            <small class="form-hint">注册和登录时密码在后端会使用bcrypt加密，任何人（包括橘子和你本人）都不能查看你的真实密码</small>
            <input
              v-model="password"
              type="password"
              placeholder="请输入密码，长度为 8-50 个字符"
              class="form-input"
            />
          </div>
          <div class="form-group">
            <label>确认密码</label>
            <input
              v-model="confirmPassword"
              type="password"
              placeholder="请再次输入密码"
              class="form-input"
            />
          </div>
          <div class="form-group">
            <label>你是谁？</label>
            <small class="form-hint">用于橘子后期若要删除用户时查看，不会被公开，长度为 2-200 个字符</small>
            <input
              v-model="description"
              type="text"
              placeholder="请输入你的身份"
              class="form-input"
            />
          </div>
          <button @click="handleRegister" class="btn-register" :disabled="loading">
            {{ loading ? '注册中...' : '注册' }}
          </button>
        </div>
        <p class="register-hint">
          已有账号？<router-link to="/login">立即登录</router-link>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthApi } from '../api/auth'

const router = useRouter()
const { register } = useAuthApi()
const username = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const description = ref('')
const loading = ref(false)

async function handleRegister() {
  if (!username.value.trim()) {
    alert('请输入用户名')
    return
  }
  if (username.value.length < 2 || username.value.length > 20) {
    alert('用户名长度必须在2-20个字符之间')
    return
  }
  if (!email.value.trim()) {
    alert('请输入邮箱')
    return
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email.value)) {
    alert('请输入有效的邮箱地址')
    return
  }
  if (!password.value.trim()) {
    alert('请输入密码')
    return
  }
  if (password.value.length < 8 || password.value.length > 50) {
    alert('密码长度必须在8-50个字符之间')
    return
  }
  if (password.value !== confirmPassword.value) {
    alert('两次输入的密码不一致')
    return
  }
  if (description.value.length < 2 || description.value.length > 200) {
    alert('描述长度必须在2-200个字符之间')
    return
  }

  loading.value = true
  try {
    const response = await register(
      username.value,
      password.value,
      email.value,
      description.value
    )

    if (response.code === 200) {
      alert(response.msg || '注册成功')
      router.push('/login')
    } else {
      alert(response.msg || '注册失败')
    }
  } catch (error) {
    console.error('注册错误:', error)
    if (error.response?.status === 401) {
      alert('权限不足，无法注册')
    } else if (error.response?.status === 409) {
      alert('用户名或邮箱已被注册')
    } else {
      alert(error.response?.data?.msg || '注册失败，请稍后重试')
    }
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.register-page {
  min-height: calc(100vh - 60px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem 0;
}

.register-box {
  width: 100%;
  max-width: 400px;
  background: white;
  border: 1px solid #e5e5e5;
  border-radius: 12px;
  padding: 3rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
}

.register-title {
  font-size: 2rem;
  font-weight: 700;
  text-align: center;
  margin-bottom: 2rem;
  color: #1d1d1f;
}

.form-group {
  margin-bottom: 1.2rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: #1d1d1f;
}

.form-hint {
  display: block;
  margin-bottom: 0.3rem;
  font-size: 0.8rem;
  color: #2e2e2f;
  opacity: 0.7;
  line-height: 1.4;
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

.btn-register {
  width: 100%;
  padding: 14px;
  background-color: var(--theme-primary);
  color: white;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 500;
  transition: background-color 0.3s;
}

.btn-register:hover {
  background-color: var(--theme-primary-hover);
}

.register-hint {
  text-align: center;
  margin-top: 1.5rem;
  color: #86868b;
  font-size: 0.9rem;
}

.register-hint a {
  color: var(--theme-primary);
  font-weight: 500;
}

.register-hint a:hover {
  text-decoration: underline;
}

@media (max-width: 768px) {
  .register-page {
    padding: 1.5rem 0;
  }

  .register-box {
    max-width: 360px;
    padding: 2.5rem;
  }

  .register-title {
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

  .btn-register {
    padding: 12px;
    font-size: 0.95rem;
  }

  .register-hint {
    font-size: 0.85rem;
    margin-top: 1.25rem;
  }
}

@media (max-width: 480px) {
  .register-page {
    padding: 1rem 0;
    align-items: flex-start;
  }

  .register-box {
    max-width: 100%;
    padding: 1.5rem 1.25rem;
    margin: 0;
    border-radius: 16px;
    border: 1px solid #e5e5e5;
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
  }

  .register-title {
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

  .form-hint {
    font-size: 1.2rem;
    margin-bottom: 0.3rem;
    line-height: 1.3;
  }

  .form-input {
    padding: 12px 14px;
    font-size: 16px;
  }

  .btn-register {
    padding: 10px;
    font-size: 1.7rem;
    margin-top: 0.5rem;
  }

  .register-hint {
    font-size: 1.3rem;
    margin-top: 1.5rem;
  }
}
</style>
