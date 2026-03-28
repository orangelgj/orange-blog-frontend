<template>
  <div class="hero">
    <div class="container">
      <h1 class="hero-title">你好，我是 Orange</h1>
      <p class="hero-subtitle">欢迎来到我的个人博客</p>
      <div class="hero-buttons">
        <router-link to="/articles" class="btn btn-primary">阅读文章</router-link>
        <router-link to="/about" class="btn btn-secondary">了解更多</router-link>
      </div>
    </div>
  </div>
</template>

<script setup>

</script>

<style scoped>
.hero {
  min-height: 84vh;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  background: linear-gradient(135deg, #FFFBFA 0%, #FFF5F0 50%, #FFE8D6 100%);
  padding: 2rem 0;
}

.hero-title {
  font-size: 3.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
  color: #1d1d1f;
}

.hero-subtitle {
  font-size: 1.5rem;
  color: #86868b;
  margin-bottom: 3rem;
}

.hero-buttons {
  display: flex;
  gap: 1rem;
  justify-content: center;
}

.btn {
  padding: 12px 32px;
  font-size: 1rem;
  font-weight: 500;
  border-radius: 8px;
  transition: all 0.3s;
}

.btn-primary {
  background-color: var(--theme-primary);
  color: white;
}

.btn-primary:hover {
  background-color: var(--theme-primary-hover);
  transform: translateY(-2px);
}

.btn-secondary {
  background-color: #f5f5f7;
  color: #1d1d1f;
}

.btn-secondary:hover {
  background-color: #e8e8ed;
  transform: translateY(-2px);
}

@media (max-width: 1024px) {
  .hero-title {
    font-size: 3rem;
  }

  .hero-subtitle {
    font-size: 1.25rem;
  }
}

@media (max-width: 768px) {
  .hero {
    min-height: 95vh;
    padding: 1.5rem 0;
  }

  .hero-title {
    font-size: 2.75rem;
  }

  .hero-subtitle {
    font-size: 1.25rem;
    margin-bottom: 2.5rem;
  }

  .hero-buttons {
    flex-direction: column;
    gap: 1rem;
    padding: 0 2rem;
  }

  .btn {
    width: 100%;
    padding: 16px 32px;
    font-size: 1.125rem;
    border-radius: 14px;
  }
}

@media (max-width: 480px) {
  .hero {
    min-height: 85vh;
    padding: 1.5rem 0;
  }

  .hero-title {
    font-size: 2.25rem;
  }

  .hero-subtitle {
    font-size: 1.125rem;
    margin-bottom: 2rem;
  }

  .hero-buttons {
    padding: 0 1.5rem;
  }

  .btn {
    padding: 14px 28px;
    font-size: 1rem;
    border-radius: 12px;
  }
}
</style>
