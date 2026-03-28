<template>
  <footer class="footer">
    <div class="container">
      <div class="footer-content">
      <div class="footer-main">
        <p class="footer-text">&copy; 2026 Orange</p>
        <div class="footer-divider">✦</div>
        <p class="footer-text">Powered by Go & Vue3</p>
      </div>
      <div class="footer-bottom">
        <p class="footer-opensource">
          Open sourced under <a href="https://www.gnu.org/licenses/gpl-3.0.html" target="_blank" rel="noopener noreferrer">GPL v3</a>
        </p>
        <div class="footer-divider-small">·</div>
        <p class="footer-made">
          Made with 🧡 <a href="https://github.com/orangelgj" target="_blank" rel="noopener noreferrer">橘子</a>
        </p>
      </div>
      <div class="footer-icp">
        <p class="footer-icp">Permissions required for redistribution</p>
        
      </div>
    </div>
    </div>
  </footer>
</template>

<script setup>

</script>

<style scoped>
.footer {
  background-color: #f5f5f0;
  padding: 0.8rem 0;
  margin-top: auto;
}

.footer-content {
  text-align: center;
}

.footer-main {
  display: flex;
  align-items: center;
  justify-content: center;
  gap:1rem;
  margin-bottom: 0.3rem;
}

.footer-text {
  color: #86868b;
  font-size: 0.8rem;
}

.footer-opensource,
.footer-made {
  color: #86868b;
  font-size: 0.8rem;
}

.footer-opensource a,
.footer-made a {
  color: var(--theme-primary);
  text-decoration: none;
  transition: color 0.3s;
}

.footer-opensource a:hover,
.footer-made a:hover {
  color: var(--theme-primary-hover);
  text-decoration: underline;
}

.footer-divider {
  color: #FFD700;
  font-size: 0.7rem;
  opacity: 1;
}

.footer-divider-small {
  color: #86868b;
  font-size: 0.8rem;
  opacity: 0.5;
}

.footer-subtext {
  color: #a0a0a0;
  font-size: 0.7rem;
  font-style: italic;
  opacity: 0.8;
}

.footer-icp {
  color: #a0a0a0;
  font-size: 0.7rem;
  margin-top: 0.3rem;
  opacity: 0.8;
}

.footer-bottom {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.8rem;
  margin-top: 0.4rem;
  flex-wrap: wrap;
}

.footer-icp {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  margin-top: 0.4rem;
}

@media (max-width: 768px) {
  .footer {
    padding: 0.5rem 0;
  }

  .footer-main {
    gap: 0.5rem;
    margin-bottom: 0.2rem;
  }

  .footer-text,
  .footer-opensource,
  .footer-made {
    font-size: 0.75rem;
  }

  .footer-divider {
    font-size: 0.6rem;
  }

  .footer-divider-small {
    font-size: 0.75rem;
  }

  .footer-bottom {
    gap: 0.5rem;
    margin-top: 0.2rem;
  }

  .footer-icp {
    flex-direction: column;
    gap: 0.15rem;
    margin-top: 0.2rem;
  }

  .footer-subtext {
    font-size: 0.65rem;
  }
}

@media (max-width: 480px) {
  .footer {
    padding: 0.6rem 0;
  }

  .footer-text {
    font-size: 0.7rem;
  }

  .footer-subtext {
    font-size: 0.6rem;
  }
}
</style>
