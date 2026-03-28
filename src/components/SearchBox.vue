<template>
  <div class="search-box">
    <input
      v-model="searchQuery"
      type="text"
      placeholder="搜索..."
      class="search-input"
      @keyup.enter="handleSearch"
    />
    <button @click="handleSearch" class="search-button">搜索</button>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useSearchApi } from '../api/search'

const { search } = useSearchApi()
const searchQuery = ref('')

async function handleSearch() {
  if (!searchQuery.value.trim()) {
    return
  }

  try {
    const result = await search(searchQuery.value)
    console.log('搜索结果:', result)
    
    if (result.message === '成功啦') {
      alert('暗号验证成功！已解锁登录和评论功能')
      window.location.reload()
    } else {
      alert(result.message || '功能尚未开发')
    }
  } catch (error) {
    console.error('搜索失败:', error)
    alert('搜索失败，请稍后重试')
  }
}
</script>

<style scoped>
.search-box {
  display: flex;
  gap: 0.5rem;
}

.search-input {
  padding: 8px 12px;
  border: 1px solid rgba(210, 210, 215, 0.5);
  border-radius: 6px;
  font-size: 0.9rem;
  width: 150px;
  transition: border-color 0.3s;
  background-color: rgba(245, 245, 247, 0.5);
  /* 透明度 */
  opacity: 0.5;
}

.search-input:focus {
  outline: none;
  border-color: var(--theme-primary);
}

.search-button {
  padding: 8px 16px;
  background-color: rgba(239, 239, 237, 0.913);
  color: #6e6e73;
  border-radius: 6px;
  font-size: 0.9rem;
  font-weight: 500;
  transition: background-color 0.3s;
}

.search-button:hover {
  background-color: rgba(232, 232, 237, 0.8);
}

@media (max-width: 1020px) {
  .search-input {
    width: 200px;
    font-size: 16px;
    padding: 10px 14px;
  }

  .search-button {
    padding: 10px 18px;
    font-size: 1rem;
  }
}

@media (max-width: 480px) {
  .search-input {
    width: 200px;
    font-size: 16px;
    padding: 12px 16px;
  }

  .search-button {
    padding: 12px 16px;
    font-size: 16px;
  }
}
</style>
