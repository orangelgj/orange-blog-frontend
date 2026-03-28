<template>
  <div class="contact-page">
    <div class="container">
      <h1 class="page-title">联系我</h1>
      <div class="contact-content">
        <div class="contact-info">
          <h2 class="section-title">联系方式</h2>
          <div class="info-item">
            <div class="info-icon">📧</div>
            <div class="info-details">
              <div class="info-label">邮箱</div>
              <div class="info-value">orange2006cn@foxmail.com</div>
            </div>
          </div>
          <div class="info-item">
            <div class="info-icon">💻</div>
            <div class="info-details">
              <div class="info-label">GitHub</div>
              <div class="info-value">github.com/orangelgj</div>
            </div>
          </div>
          <div class="info-item">
            <div class="info-icon">📍</div>
            <div class="info-details">
              <div class="info-label">位置</div>
              <div class="info-value">中国 广州</div>
            </div>
          </div>
        </div>

        <div class="contact-form">
          <h2 class="section-title">欢迎直接发送邮箱向我联系，任何事情</h2>
          <!-- <div class="form-group">
            <label>姓名</label>
            <input
              v-model="form.name"
              type="text"
              placeholder="请输入您的姓名"
              class="form-input"
            />
          </div>
          <div class="form-group">
            <label>邮箱</label>
            <input
              v-model="form.email"
              type="email"
              placeholder="请输入您的邮箱"
              class="form-input"
            />
          </div>
          <div class="form-group">
            <label>留言内容</label>
            <textarea
              v-model="form.message"
              placeholder="请输入您的留言"
              class="form-textarea"
              rows="6"
            ></textarea>
          </div>
          <button @click="handleSubmit" class="btn-submit">发送留言</button> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const form = ref({
  name: '',
  email: '',
  message: ''
})

function handleSubmit() {
  if (!form.value.name.trim()) {
    alert('请输入姓名')
    return
  }
  if (!form.value.email.trim()) {
    alert('请输入邮箱')
    return
  }
  if (!form.value.message.trim()) {
    alert('请输入留言内容')
    return
  }

  alert('留言功能开发中，请等待后端接口完成')
}
</script>

<style scoped>
.contact-page {
  padding: 4rem 0;
  min-height: calc(100vh - 60px);
}

.page-title {
  font-size: 2.5rem;
  font-weight: 700;
  text-align: center;
  margin-bottom: 3rem;
  color: #1d1d1f;
}

.contact-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  max-width: 1000px;
  margin: 0 auto;
}

@media (max-width: 768px) {
  .contact-content {
    grid-template-columns: 1fr;
  }
}

.section-title {
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 2rem;
  color: #1d1d1f;
}

.contact-info {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.info-item {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  padding: 1.5rem;
  background: #f5f5f7;
  border-radius: 12px;
}

.info-icon {
  font-size: 2rem;
}

.info-label {
  font-weight: 600;
  color: #1d1d1f;
  margin-bottom: 0.25rem;
}

.info-value {
  color: #86868b;
}

.contact-form {
  background: white;
  border: 1px solid #e5e5e5;
  border-radius: 12px;
  padding: 2rem;
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

.form-input,
.form-textarea {
  width: 100%;
  padding: 12px 16px;
  border: 1px solid #d2d2d7;
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.3s;
}

.form-input:focus,
.form-textarea:focus {
  outline: none;
  border-color: var(--theme-primary);
}

.form-textarea {
  resize: vertical;
  font-family: inherit;
}

.btn-submit {
  width: 100%;
  padding: 14px;
  background-color: var(--theme-primary);
  color: white;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 500;
  transition: background-color 0.3s;
}

.btn-submit:hover {
  background-color: var(--theme-primary-hover);
}

@media (max-width: 768px) {
  .contact-page {
    padding: 2rem 0;
  }

  .page-title {
    font-size: 2rem;
    margin-bottom: 2rem;
  }

  .contact-content {
    gap: 2rem;
  }

  .section-title {
    font-size: 1.25rem;
    margin-bottom: 1.5rem;
  }

  .info-item {
    padding: 1.25rem;
    gap: 1rem;
  }

  .info-icon {
    font-size: 1.5rem;
  }

  .contact-form {
    padding: 1.5rem;
  }

  .form-group {
    margin-bottom: 1.25rem;
  }

  .form-input,
  .form-textarea {
    padding: 10px 14px;
    font-size: 16px;
  }

  .btn-submit {
    padding: 12px;
    font-size: 0.95rem;
  }
}

@media (max-width: 480px) {
  .contact-page {
    padding: 1.5rem 0;
  }

  .page-title {
    font-size: 1.75rem;
    margin-bottom: 1.5rem;
  }

  .info-item {
    padding: 1rem;
    gap: 0.75rem;
  }

  .info-icon {
    font-size: 1.25rem;
  }

  .contact-form {
    padding: 1.25rem;
  }

  .form-input,
  .form-textarea {
    padding: 8px 12px;
    font-size: 16px;
  }

  .btn-submit {
    padding: 10px;
    font-size: 0.9rem;
  }
}
</style>
