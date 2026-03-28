<template>
  <div class="article-list">
    <div class="container">
      <h1 class="page-title">文章列表</h1>
      
      <div v-if="categoriesLoading" class="loading">加载分类中...</div>
      <div v-else-if="categories.length > 0" class="category-tabs">
        <button
          v-for="category in [{ id: 0, name: '全部' }, ...categories]"
          :key="category.id"
          :class="['category-tab', { active: selectedCategoryId === category.id }]"
          @click="selectCategory(category.id)"
        >
          {{ category.name }}
        </button>
      </div>
      
      <div v-if="loading" class="loading">加载中...</div>
      <div v-else-if="error" class="error">{{ error }}</div>
      <div v-else class="articles">
        <div
          v-for="article in articles"
          :key="article.id"
          class="article-card"
          @click="goToDetail(article.id)"
        >
          <h2 class="article-title">{{ article.title }}</h2>
          <p class="article-summary">{{ article.summary }}</p>
          <div class="article-meta">
            <span class="article-author">{{ article.author }}</span>
            <span class="article-date">{{ formatDate(article.create_time) }}</span>
          </div>
        </div>
        
        <div v-if="articles.length > 0" class="load-more">
          <button
            v-if="hasMore"
            @click="loadMore"
            :disabled="loadingMore"
            class="btn-load-more"
          >
            {{ loadingMore ? '加载中...' : '加载更多' }}
          </button>
          <p v-else class="no-more">没有更多了</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useArticleApi } from '../api/article'

const router = useRouter()
const { getArticles, getCategories } = useArticleApi()

const articles = ref([])
const categories = ref([])
const selectedCategoryId = ref(0)
const loading = ref(true)
const categoriesLoading = ref(true)
const error = ref('')
const currentPage = ref(1)
const hasMore = ref(true)
const loadingMore = ref(false)

function formatDate(dateString) {
  if (!dateString) return ''
  
  let date
  if (typeof dateString === 'string') {
    date = new Date(dateString)
  } else if (dateString instanceof Date) {
    date = dateString
  } else {
    return ''
  }
  
  if (isNaN(date.getTime())) return ''
  
  return date.toLocaleString('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit'
  })
}

async function loadCategories() {
  try {
    categoriesLoading.value = true
    const response = await getCategories()
    if (response.code === 200) {
      categories.value = response.data
    }
  } catch (err) {
    console.error('加载分类失败:', err)
  } finally {
    categoriesLoading.value = false
  }
}

async function loadArticles(reset = true) {
  try {
    if (reset) {
      loading.value = true
      currentPage.value = 1
      articles.value = []
      hasMore.value = true
    } else {
      loadingMore.value = true
    }
    
    error.value = ''
    const response = await getArticles(selectedCategoryId.value, currentPage.value, 10)
    if (response.code === 200) {
      if (reset) {
        articles.value = response.data
      } else {
        articles.value = [...articles.value, ...response.data]
      }
      
      if (response.data.length < 10) {
        hasMore.value = false
      } else {
        hasMore.value = true
      }
    } else {
      error.value = response.msg || '加载失败'
    }
  } catch (err) {
    console.error('加载文章失败:', err)
    error.value = '加载文章失败，请稍后重试'
  } finally {
    loading.value = false
    loadingMore.value = false
  }
}

function loadMore() {
  if (loadingMore.value || !hasMore.value) return
  currentPage.value++
  loadArticles(false)
}

function selectCategory(categoryId) {
  selectedCategoryId.value = categoryId
  loadArticles()
}

function goToDetail(id) {
  router.push(`/articles/${id}`)
}

onMounted(() => {
  loadCategories()
  loadArticles()
})
</script>

<style scoped>
.article-list {
  padding: 4rem 0;
  min-height: calc(100vh - 60px);
}

.page-title {
  font-size: 2.5rem;
  font-weight: 700;
  text-align: center;
  margin-bottom: 2rem;
  color: #1d1d1f;
}

.category-tabs {
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
  justify-content: center;
  margin-bottom: 2rem;
  padding: 0 1rem;
}

.category-tab {
  padding: 0.5rem 1.25rem;
  border: 1px solid #e5e5e5;
  border-radius: 20px;
  background: white;
  color: #6e6e73;
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s;
}

.category-tab:hover {
  border-color: var(--theme-primary);
  color: var(--theme-primary);
}

.category-tab.active {
  background: var(--theme-primary);
  color: white;
  border-color: var(--theme-primary);
}

.loading,
.error {
  text-align: center;
  padding: 2rem;
  color: #86868b;
}

.load-more {
  text-align: center;
  margin-top: 2rem;
}

.btn-load-more {
  padding: 0.75rem 2rem;
  background: var(--theme-primary);
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s;
}

.btn-load-more:hover:not(:disabled) {
  background: var(--theme-primary-hover);
  transform: translateY(-2px);
}

.btn-load-more:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.no-more {
  text-align: center;
  color: #86868b;
  font-size: 0.9rem;
  margin-top: 2rem;
}

.articles {
  display: grid;
  gap: 2rem;
}

.article-card {
  background: white;
  border: 1px solid #e5e5e5;
  border-radius: 12px;
  padding: 2rem;
  cursor: pointer;
  transition: all 0.3s;
}

.article-card:hover {
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  transform: translateY(-2px);
}

.article-title {
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: #1d1d1f;
}

.article-summary {
  color: #86868b;
  line-height: 1.8;
  margin-bottom: 1rem;
}

.article-meta {
  display: flex;
  gap: 1rem;
  color: #86868b;
  font-size: 0.9rem;
}

@media (max-width: 768px) {
  .article-list {
    padding: 2rem 0;
  }

  .page-title {
    font-size: 2rem;
    margin-bottom: 1.5rem;
  }

  .category-tabs {
    gap: 0.5rem;
    margin-bottom: 1.5rem;
  }

  .category-tab {
    padding: 0.4rem 1rem;
    font-size: 0.85rem;
  }

  .load-more {
    margin-top: 1.5rem;
  }

  .btn-load-more {
    padding: 0.6rem 1.5rem;
    font-size: 0.9rem;
  }

  .articles {
    gap: 1.5rem;
  }

  .article-card {
    padding: 1.5rem;
  }

  .article-title {
    font-size:1.25rem;
  }

  .article-summary {
    font-size: 0.95rem;
  }

  .article-meta {
    font-size: 0.85rem;
  }
}

@media (max-width: 480px) {
  .article-list {
    padding: 1.5rem 0;
  }

  .page-title {
    font-size: 1.75rem;
    margin-bottom: 1rem;
  }

  .category-tabs {
    gap: 0.4rem;
    margin-bottom: 1rem;
  }

  .category-tab {
    padding: 0.35rem 0.85rem;
    font-size: 0.8rem;
  }

  .load-more {
    margin-top: 1rem;
  }

  .btn-load-more {
    padding: 0.5rem 1.25rem;
    font-size: 0.85rem;
  }

  .article-card {
    padding: 1.25rem;
    border-radius: 8px;
  }

  .article-title {
    font-size: 1.125rem;
  }

  .article-summary {
    font-size: 0.9rem;
  }
}
</style>
