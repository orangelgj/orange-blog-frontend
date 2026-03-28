<template>
  <Teleport to="body">
  <div class="theme-settings-overlay" @click.self="$emit('close')">
    <div class="theme-settings">
      <div class="theme-settings-header">
        <h2 class="theme-settings-title">主题设置</h2>
        <button class="btn-close" @click="$emit('close')" aria-label="关闭">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      </div>

      <div class="theme-settings-content">
        <div class="theme-section">
          <h3 class="theme-section-title">预设主题</h3>
          <div class="theme-grid">
            <button
              v-for="theme in MACARON_COLORS"
              :key="theme.name"
              class="theme-card"
              :class="{ 'theme-card-active': selectedThemeName === theme.name }"
              @click="selectTheme(theme)"
            >
              <div class="theme-color-preview">
                <div class="theme-color-primary" :style="{ backgroundColor: theme.primary }"></div>
                <div class="theme-color-hover" :style="{ backgroundColor: theme.hover }"></div>
              </div>
              <span class="theme-name">{{ theme.name }}</span>
              <svg v-if="selectedThemeName === theme.name" class="theme-check" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
            </button>
          </div>
        </div>

        <div class="theme-section">
          <h3 class="theme-section-title">自定义主题</h3>
          <div class="custom-theme-form">
            <div class="form-group">
              <label class="form-label">主色调</label>
              <div class="color-input-wrapper">
                <input
                  type="color"
                  v-model="customColors.primary"
                  class="color-input"
                  @input="previewCustomTheme"
                />
                <input
                  type="text"
                  v-model="customColors.primary"
                  class="color-text-input"
                  @input="previewCustomTheme"
                  placeholder="#0071e3"
                />
              </div>
            </div>

            <div class="form-group">
              <label class="form-label">悬停色</label>
              <div class="color-input-wrapper">
                <input
                  type="color"
                  v-model="customColors.hover"
                  class="color-input"
                  @input="previewCustomTheme"
                />
                <input
                  type="text"
                  v-model="customColors.hover"
                  class="color-text-input"
                  @input="previewCustomTheme"
                  placeholder="#0077ed"
                />
              </div>
            </div>

            <div class="form-actions">
              <button class="btn btn-apply" @click="applyCustomTheme">应用自定义主题</button>
              <button class="btn btn-reset" @click="resetTheme">重置默认</button>
            </div>
          </div>
        </div>

        <div class="theme-section">
          <h3 class="theme-section-title">当前主题预览</h3>
          <div class="theme-preview">
            <div class="preview-buttons">
              <button class="preview-btn preview-btn-primary" :style="{ backgroundColor: themeColors.primary }">
                主按钮
              </button>
              <button class="preview-btn preview-btn-secondary" :style="{ backgroundColor: themeColors.hover }">
                悬停效果
              </button>
            </div>
            <div class="preview-links">
              <a href="#" class="preview-link" :style="{ color: themeColors.primary }">链接样式</a>
              <a href="#" class="preview-link" :style="{ color: themeColors.hover }">悬停链接</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  </Teleport>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useTheme } from '../composables/useTheme'

const emit = defineEmits(['close'])

const {
  themeColors,
  selectedThemeName,
  MACARON_COLORS,
  setTheme,
  setCustomTheme,
  resetTheme
} = useTheme()

const customColors = ref({
  primary: themeColors.value.primary,
  hover: themeColors.value.hover
})

const selectTheme = (theme) => {
  setTheme(theme.name, theme.primary, theme.hover)
}

const previewCustomTheme = () => {
  const root = document.documentElement
  root.style.setProperty('--theme-primary', customColors.value.primary)
  root.style.setProperty('--theme-primary-hover', customColors.value.hover)
}

const applyCustomTheme = () => {
  setCustomTheme(customColors.value.primary, customColors.value.hover)
}

onMounted(() => {
  customColors.value = {
    primary: themeColors.value.primary,
    hover: themeColors.value.hover
  }
})
</script>

<style scoped>
.theme-settings-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 20px;
  animation: fadeIn 0.2s ease;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.theme-settings {
  background: white;
  border-radius: 16px;
  width: 100%;
  max-width: 600px;
  max-height: 90vh;
  overflow: hidden;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  animation: slideUp 0.3s ease;
}

@keyframes slideUp {
  from {
    transform: translateY(20px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

.theme-settings-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 24px;
  border-bottom: 1px solid #e5e5e5;
}

.theme-settings-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: #1d1d1f;
  margin: 0;
}

.btn-close {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: #f5f5f7;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #86868b;
  transition: all 0.2s;
}

.btn-close:hover {
  background: #e8e8ed;
  color: #1d1d1f;
}

.theme-settings-content {
  padding: 24px;
  overflow-y: auto;
  max-height: calc(90vh - 80px);
}

.theme-section {
  margin-bottom: 32px;
}

.theme-section:last-child {
  margin-bottom: 0;
}

.theme-section-title {
  font-size: 1rem;
  font-weight: 600;
  color: #1d1d1f;
  margin: 0 0 16px 0;
}

.theme-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  gap: 12px;
}

.theme-card {
  position: relative;
  background: #f5f5f7;
  border: 2px solid transparent;
  border-radius: 12px;
  padding: 16px;
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}

.theme-card:hover {
  background: #e8e8ed;
  transform: translateY(-2px);
}

.theme-card-active {
  border-color: var(--theme-primary);
  background: rgba(0, 113, 227, 0.05);
}

.theme-color-preview {
  display: flex;
  gap: 4px;
  width: 60px;
  height: 24px;
  border-radius: 4px;
  overflow: hidden;
}

.theme-color-primary,
.theme-color-hover {
  flex: 1;
  height: 100%;
}

.theme-name {
  font-size: 0.875rem;
  font-weight: 500;
  color: #1d1d1f;
}

.theme-check {
  position: absolute;
  top: 8px;
  right: 8px;
  color: var(--theme-primary);
}

.custom-theme-form {
  background: #f5f5f7;
  border-radius: 12px;
  padding: 20px;
}

.form-group {
  margin-bottom: 20px;
}

.form-group:last-child {
  margin-bottom: 0;
}

.form-label {
  display: block;
  font-size: 0.875rem;
  font-weight: 500;
  color: #1d1d1f;
  margin-bottom: 8px;
}

.color-input-wrapper {
  display: flex;
  gap: 12px;
  align-items: center;
}

.color-input {
  width: 48px;
  height: 48px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  padding: 0;
  background: transparent;
}

.color-input::-webkit-color-swatch-wrapper {
  padding: 0;
}

.color-input::-webkit-color-swatch {
  border: 2px solid #e5e5e5;
  border-radius: 6px;
}

.color-text-input {
  flex: 1;
  padding: 12px 16px;
  border: 1px solid #e5e5e5;
  border-radius: 8px;
  font-size: 0.875rem;
  font-family: inherit;
  background: white;
  color: #1d1d1f;
  transition: border-color 0.2s;
}

.color-text-input:focus {
  outline: none;
  border-color: var(--theme-primary);
}

.form-actions {
  display: flex;
  gap: 12px;
  margin-top: 24px;
}

.btn {
  flex: 1;
  padding: 12px 24px;
  border-radius: 8px;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  border: none;
}

.btn-apply {
  background: var(--theme-primary);
  color: white;
}

.btn-apply:hover {
  background: var(--theme-primary-hover);
  transform: translateY(-1px);
}

.btn-reset {
  background: white;
  color: #1d1d1f;
  border: 1px solid #e5e5e5;
}

.btn-reset:hover {
  background: #f5f5f7;
}

.theme-preview {
  background: linear-gradient(135deg, #f5f7fa 0%, #ffffff 100%);
  border-radius: 12px;
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.preview-buttons {
  display: flex;
  gap: 12px;
}

.preview-btn {
  padding: 10px 20px;
  border-radius: 6px;
  font-size: 0.875rem;
  font-weight: 500;
  color: white;
  border: none;
  cursor: pointer;
  transition: transform 0.2s;
}

.preview-btn:hover {
  transform: translateY(-1px);
}

.preview-links {
  display: flex;
  gap: 16px;
}

.preview-link {
  font-size: 0.875rem;
  font-weight: 500;
  text-decoration: none;
  transition: opacity 0.2s;
}

.preview-link:hover {
  opacity: 0.8;
}

@media (max-width: 768px) {
  .theme-settings-overlay {
    padding: 12px;
  }

  .theme-settings {
    max-height: 95vh;
  }

  .theme-settings-content {
    padding: 16px;
  }

  .theme-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 8px;
  }

  .theme-card {
    padding: 12px;
  }

  .theme-section {
    margin-bottom: 24px;
  }

  .form-actions {
    flex-direction: column;
  }

  .preview-buttons {
    flex-direction: column;
  }

  .preview-links {
    flex-direction: column;
    gap: 8px;
  }
}

@media (max-width: 480px) {
  .theme-settings-header {
    padding: 16px;
  }

  .theme-settings-title {
    font-size: 1.125rem;
  }

  .theme-grid {
    grid-template-columns: 1fr;
  }
}
</style>
