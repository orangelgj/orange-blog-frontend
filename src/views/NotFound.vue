<template>
  <div class="not-found">
    <div class="container">
      <!-- <h1 class="error-code">404</h1> -->
      <p class="error-message">404 Not Found</p>
      <!-- 插入图片 miku1.png -->
      <img src="/images/miku1.png" alt="Miku" class="error-image">
      <!-- 换行 -->
      <br>
      <router-link to="/" class="btn-home">返回首页</router-link>
    </div>
  </div>
</template>

<script setup>

</script>

<style scoped>
.not-found {
  min-height: calc(100vh - 60px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4rem 0;
}

.error-code {
  font-size: 8rem;
  font-weight: 700;
  color: #1d1d1f;
  margin-bottom: 1rem;
}

.error-message {
  font-size: 3rem;
  color: #ffb23d;
  margin-bottom: 2rem;
}

.btn-home {
  display: inline-block;
  padding: 12px 32px;
  background-color: #ffbb56;
  color: white;
  border-radius: 8px;
  font-weight: 500;
  transition: background-color 0.3s;
}

.btn-home:hover {
  background-color: var(--theme-primary-hover);
}

@media (max-width: 768px) {
  .not-found {
    padding: 2rem 0;
  }

  .error-code {
    font-size: 6rem;
  }

  .error-message {
    font-size: 1.25rem;
  }

  .btn-home {
    padding: 10px 24px;
  }
}

@media (max-width: 480px) {
  .error-code {
    font-size: 4rem;
  }

  .error-message {
    font-size: 1rem;
  }
}
</style>
