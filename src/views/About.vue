<template>
  <div class="about-page">
    <div class="container">
      <h1 class="page-title">关于我</h1>
      <div class="about-content">
        <div class="profile-section">
          <div class="avatar">
            <img v-if="avatarUrl" :src="avatarUrl" alt="Orange" class="avatar-image" />
            <div v-else class="avatar-placeholder">O</div>
          </div>
          <div class="profile-info">
            <h2 class="name">Orange</h2>
            <p class="bio">AI agent / 后端 / ACMer</p>
          </div>
        </div>

        

        <div class="skills-section">
          <h3 class="section-title">技能栈</h3>
          <div class="skills-list">
            <div class="skill-item">
              <span class="skill-name">AI</span>
              <span class="skill-value">Spring AI Alibaba, Eino</span>
            </div>
            <div class="skill-item">
              <span class="skill-name">后端</span>
              <span class="skill-value">Go, Gin, Java, Spring Boot</span>
            </div>
            <div class="skill-item">
              <span class="skill-name">前端</span>
              <span class="skill-value">Vue3, TypeScript</span>
            </div>
            <div class="skill-item">
              <span class="skill-name">数据库</span>
              <span class="skill-value">MySQL, Redis</span>
            </div>
            <div class="skill-item">
              <span class="skill-name">工具</span>
              <span class="skill-value">Git, Docker, Linux</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const avatarUrl = ref('/images/avatar.png')
</script>

<style scoped>
.about-page {
  padding: 4rem 0;
  min-height: calc(100vh - 60px);
}

.page-title {
  font-size: 2rem;
  font-weight: 700;
  text-align: center;
  margin-bottom: 2.5rem;
  color: #1d1d1f;
}

.about-content {
  max-width: 800px;
  margin: 0 auto;
}

.profile-section {
  display: flex;
  align-items: center;
  gap: 2rem;
  margin-bottom: 3rem;
  padding: 2rem;
  background: white;
  border-radius: 16px;
  box-shadow: 0 2px 16px rgba(0, 0, 0, 0.06);
}

.avatar {
  width: 120px;
  height: 120px;
  flex-shrink: 0;
  border-radius: 50%;
  background: #f5f5f7;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.avatar:hover {
  transform: scale(1.05);
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.15);
}

.avatar-image {
  width: 100%;
  height: 100%;
  object-fit: contain;
  display: block;
  padding: 8px;
}

.avatar-placeholder {
  font-size: 3rem;
  font-weight: 700;
  color: #86868b;
}

.profile-info {
  flex: 1;
}

.name {
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  color: #1d1d1f;
  letter-spacing: -0.5px;
}

.bio {
  font-size: 1.1rem;
  color: #86868b;
  font-weight: 400;
}

.info-section,
.skills-section {
  margin-bottom: 3rem;
}

.section-title {
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
  color: #1d1d1f;
}

.info-text {
  line-height: 1.8;
  color: #1d1d1f;
  font-size: 1.1rem;
}

.skills-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.skill-item {
  display: flex;
  justify-content: space-between;
  padding: 1rem;
  background: #f5f5f7;
  border-radius: 8px;
}

.skill-name {
  font-weight: 600;
  color: #1d1d1f;
}

.skill-value {
  color: #86868b;
}

@media (max-width: 768px) {
  .about-page {
    padding: 2rem 0;
  }

  .page-title {
    font-size: 1.75rem;
    margin-bottom: 2rem;
  }

  .profile-section {
    flex-direction: column;
    text-align: center;
    padding: 1.5rem;
    gap: 1.5rem;
  }

  .avatar {
    width: 100px;
    height: 100px;
  }

  .avatar-placeholder {
    font-size: 2.5rem;
  }

  .name {
    font-size: 1.5rem;
  }

  .bio {
    font-size: 1rem;
  }

  .section-title {
    font-size: 1.25rem;
    margin-bottom: 1rem;
  }

  .info-text {
    font-size: 1rem;
  }

  .skill-item {
    flex-direction: column;
    gap: 0.5rem;
    text-align: center;
  }
}

@media (max-width: 480px) {
  .about-page {
    padding: 1.5rem 0;
  }

  .page-title {
    font-size: 1.5rem;
    margin-bottom: 1.5rem;
  }

  .profile-section {
    padding: 1.25rem;
  }

  .avatar {
    width: 80px;
    height: 80px;
  }

  .avatar-placeholder {
    font-size: 2rem;
  }

  .name {
    font-size: 1.25rem;
  }

  .bio {
    font-size: 0.9rem;
  }

  .section-title {
    font-size: 1.125rem;
  }

  .skill-item {
    padding: 0.875rem;
  }
}
</style>
