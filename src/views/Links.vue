<template>
  <div class="links-page">
    <div class="container">
      <h1 class="page-title">友情链接</h1>
      <div class="links-grid">
        <div v-for="(link, index) in links" :key="index" class="link-card">
          <div class="link-icon">
            <img v-if="link.iconUrl" :src="link.iconUrl" :alt="link.name" class="link-icon-img" />
            <span v-else class="link-icon-text">{{ link.icon }}</span>
          </div>
          <h3 class="link-name">{{ link.name }}</h3>
          <p class="link-desc">{{ link.description }}</p>
          <a :href="link.url" target="_blank" class="link-url">访问网站 &rarr;</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const links = ref([
  {
    name: 'Vue.js',
    url: 'https://vuejs.org',
    description: '渐进式 JavaScript 框架',
    icon: 'V'
  },
  {
    name: 'Gin',
    url: 'https://gin-gonic.com',
    description: 'Go 语言 Web 框架',
    icon: 'G'
  },
  {
    name: 'GitHub',
    url: 'https://github.com',
    description: '代码托管平台',
    icon: 'GH'
  },
  {
    name: "YinFeng's Blog",
    url: 'http://www.windchant.online/',
    description: '个人技术博客',
    iconUrl: 'http://www.windchant.online/wp-content/uploads/2026/03/Aemeath.jpg'
  },
  
])
</script>

<style scoped>
.links-page {
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

.links-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
}

.link-card {
  background: white;
  border: 1px solid #e5e5e5;
  border-radius: 12px;
  padding: 2rem;
  text-align: center;
  transition: all 0.3s;
}

.link-card:hover {
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  transform: translateY(-4px);
}

.link-icon {
  width: 60px;
  height: 60px;
  margin: 0 auto 1.5rem;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--theme-primary) 0%, var(--theme-primary-hover) 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.link-icon-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 50%;
}

.link-icon-text {
  font-size: 1.5rem;
  font-weight: 700;
  color: white;
}

.link-name {
  font-size: 1.3rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: #1d1d1f;
}

.link-desc {
  color: #86868b;
  margin-bottom: 1.5rem;
  line-height: 1.6;
}

.link-url {
  display: inline-block;
  color: var(--theme-primary);
  font-weight: 500;
  transition: color 0.3s;
}

.link-url:hover {
  color: var(--theme-primary-hover);
}

@media (max-width: 768px) {
  .links-page {
    padding: 2rem 0;
  }

  .page-title {
    font-size: 2rem;
    margin-bottom: 2rem;
  }

  .links-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }

  .link-card {
    padding: 1.5rem;
  }

  .link-icon {
    width: 50px;
    height: 50px;
    margin-bottom: 1rem;
  }

  .link-icon-text {
    font-size: 1.25rem;
  }

  .link-name {
    font-size: 1.125rem;
  }

  .link-desc {
    font-size: 0.95rem;
    margin-bottom: 1rem;
  }
}

@media (max-width: 480px) {
  .links-page {
    padding: 1.5rem 0;
  }

  .page-title {
    font-size: 1.75rem;
    margin-bottom: 1.5rem;
  }

  .link-card {
    padding: 1.25rem;
  }

  .link-icon {
    width: 45px;
    height: 45px;
  }

  .link-icon-text {
    font-size: 1.125rem;
  }

  .link-name {
    font-size: 1rem;
  }

  .link-desc {
    font-size: 0.9rem;
  }
}
</style>
