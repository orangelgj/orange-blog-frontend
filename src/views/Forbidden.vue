<template>
  <div class="forbidden">
    <div class="container">
      <p class="error-message">403 Forbidden</p>
      <img src="/images/miku1.png" alt="Miku" class="error-image">
      <br>
      <router-link to="/" class="btn-home">返回首页</router-link>
    </div>
  </div>
</template>

<script setup>

</script>

<style scoped>
.forbidden {
  min-height: calc(100vh - 60px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4rem 0;
}

.error-message {
  font-size: 3rem;
  color: #ff6b6b;
  margin-bottom: 2rem;
}

.error-image {
  width: 300px;
  height: 300px;
  object-fit: contain;
  margin-bottom: 2rem;
}

.btn-home {
  display: inline-block;
  padding: 12px 32px;
  background-color: #ff6b6b;
  color: white;
  border-radius: 8px;
  font-weight: 500;
  transition: background-color 0.3s;
}

.btn-home:hover {
  background-color: #ee5a5a;
}

@media (max-width: 768px) {
  .forbidden {
    padding: 2rem 0;
  }

  .error-message {
    font-size: 1.25rem;
  }

  .error-image {
    width: 200px;
    height: 200px;
  }

  .btn-home {
    padding: 10px 24px;
  }
}

@media (max-width: 480px) {
  .error-message {
    font-size: 1rem;
  }

  .error-image {
    width: 150px;
    height: 150px;
  }
}
</style>
