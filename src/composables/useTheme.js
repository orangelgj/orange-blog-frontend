import { ref, watch } from 'vue'

const MACARON_COLORS = [
  { name: '奶油橘', primary: '#FFA726', hover: '#FF8C00' },
  { name: '天空蓝', primary: '#0071e3', hover: '#0077ed' },
  { name: '樱花粉', primary: '#ff8fa3', hover: '#ff6b8a' },
  { name: '薄荷绿', primary: '#5cb85c', hover: '#4cae4c' },
  { name: '柠檬黄', primary: '#f0ad4e', hover: '#ec971f' },
  { name: '薰衣草紫', primary: '#9370db', hover: '#8a2be2' },
  { name: '蜜桃橙', primary: '#ff9f43', hover: '#ee8c2c' },
  { name: '珊瑚红', primary: '#ee5a5a', hover: '#e74c3c' },
  { name: '海蓝', primary: '#5dade2', hover: '#3498db' },
  { name: '薄荷蓝', primary: '#48c9b0', hover: '#1abc9c' },
  { name: '玫瑰金', primary: '#c0392b', hover: '#a93226' }
]

const DEFAULT_THEME = MACARON_COLORS[0]

const themeColors = ref({
  primary: localStorage.getItem('theme-primary') || DEFAULT_THEME.primary,
  hover: localStorage.getItem('theme-hover') || DEFAULT_THEME.hover
})

const selectedThemeName = ref(localStorage.getItem('theme-name') || DEFAULT_THEME.name)

function applyTheme() {
  const root = document.documentElement
  root.style.setProperty('--theme-primary', themeColors.value.primary)
  root.style.setProperty('--theme-primary-hover', themeColors.value.hover)
}

function setTheme(name, primary, hover) {
  themeColors.value = { primary, hover }
  selectedThemeName.value = name
  localStorage.setItem('theme-primary', primary)
  localStorage.setItem('theme-hover', hover)
  localStorage.setItem('theme-name', name)
  applyTheme()
}

function setCustomTheme(primary, hover) {
  themeColors.value = { primary, hover }
  selectedThemeName.value = '自定义'
  localStorage.setItem('theme-primary', primary)
  localStorage.setItem('theme-hover', hover)
  localStorage.setItem('theme-name', '自定义')
  applyTheme()
}

function resetTheme() {
  setTheme(DEFAULT_THEME.name, DEFAULT_THEME.primary, DEFAULT_THEME.hover)
}

watch(themeColors, () => {
  applyTheme()
}, { immediate: true })

export function useTheme() {
  return {
    themeColors,
    selectedThemeName,
    MACARON_COLORS,
    setTheme,
    setCustomTheme,
    resetTheme
  }
}
