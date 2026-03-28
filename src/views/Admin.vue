<template>
  <div class="admin-page">
    <div class="container">
      <h1 class="admin-title">管理后台</h1>
      <p class="admin-welcome">欢迎，{{ userStore.username }}！</p>
      <div class="admin-content">
        <div class="admin-section">
          <h2 class="section-title">文章管理</h2>
          <p class="section-description">管理您的文章内容</p>
          <div class="section-actions">
            <router-link to="/publish" class="btn-primary">发布新文章</router-link>
            <button class="btn-secondary">查看所有文章</button>
          </div>
        </div>
        <div class="admin-section">
          <h2 class="section-title">个人信息</h2>
          <p class="section-description">管理您的账户信息</p>
          <div class="section-actions">
            <router-link to="/profile" class="btn-secondary">前往个人信息</router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useUserStore } from '../stores/user'

const userStore = useUserStore()
</script>

<style scoped>
.admin-page {
  min-height: calc(100vh - 60px);
  padding: 3rem 0;
}

.admin-title {
  font-size: 2.5rem;
  font-weight: 700;
  color: #1d1d1f;
  margin-bottom: 0.5rem;
}

.admin-welcome {
  font-size: 1.125rem;
  color: #86868b;
  margin-bottom: 3rem;
}

.admin-content {
  display: grid;
  gap: 2rem;
}

.admin-section {
  background: white;
  border: 1px solid #e5e5e5;
  border-radius: 12px;
  padding: 2rem;
}

.section-title {
  font-size: 1.5rem;
  font-weight: 600;
  color: #1d1d1f;
  margin-bottom: 0.5rem;
}

.section-description {
  color: #86868b;
  margin-bottom: 1.5rem;
}

.section-actions {
  display: flex;
  gap: 1rem;
}

.btn-primary,
.btn-secondary {
  padding: 10px 20px;
  border-radius: 8px;
  font-weight: 500;
  font-size: 0.9rem;
  transition: all 0.3s;
  text-decoration: none;
  display: inline-block;
  cursor: pointer;
  border: none;
}

.btn-primary {
  background-color: var(--theme-primary);
  color: white;
}

.btn-primary:hover {
  background-color: var(--theme-primary-hover);
}

.btn-secondary {
  background-color: #f5f5f7;
  color: #1d1d1f;
}

.btn-secondary:hover {
  background-color: #e8e8ed;
}

@media (max-width: 768px) {
  .admin-page {
    padding: 2rem 0;
  }

  .admin-title {
    font-size: 2rem;
  }

  .admin-welcome {
    font-size: 1rem;
    margin-bottom: 2rem;
  }

  .admin-section {
    padding: 1.5rem;
  }

  .section-title {
    font-size: 1.25rem;
  }

  .section-actions {
    flex-direction: column;
  }

  .btn-primary,
  .btn-secondary {
    width: 100%;
    text-align: center;
  }
}
</style>
