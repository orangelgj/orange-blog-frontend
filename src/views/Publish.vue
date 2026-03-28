<template>
  <div class="publish-page">
    <div class="container">
      <h1 class="page-title">发布新文章</h1>
      
      <div class="form-header">
        <div class="form-row">
          <div class="form-group">
            <label>标题 <span class="required">*</span></label>
            <input v-model="title" type="text" placeholder="请输入文章标题" class="form-input" />
          </div>
          <div class="form-group">
            <label>作者 <span class="required">*</span></label>
            <input v-model="author" type="text" placeholder="请输入作者名" class="form-input" />
          </div>
        </div>
        <div class="form-row">
          <div class="form-group">
            <label>分类ID <span class="required">*</span></label>
            <input v-model="categoryId" type="text" placeholder="请输入分类ID" class="form-input" />
          </div>
          <div class="form-group">
            <label>摘要</label>
            <input v-model="summary" type="text" placeholder="请输入文章摘要" class="form-input" />
          </div>
        </div>
      </div>

      <div class="editor-container">
        <div class="editor-input">
          <div class="form-group">
            <label>Markdown内容 <span class="required">*</span></label>
            <textarea v-model="content" placeholder="请粘贴您的Markdown内容..." class="form-textarea markdown-input"></textarea>
          </div>
          <div class="form-actions">
            <button @click="handlePublish" class="btn-primary" :disabled="loading">
              {{ loading ? '发布中...' : '发布文章' }}
            </button>
            <button @click="handleCancel" class="btn-secondary">
              取消
            </button>
          </div>
        </div>
        <div class="editor-preview">
          <div class="preview-header">
            <h3>实时预览</h3>
          </div>
          <div class="preview-content">
            <MarkdownRenderer :content="content" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import MarkdownRenderer from '../components/MarkdownRenderer.vue'
import { useArticleApi } from '../api/article'
import { useUserStore } from '../stores/user'

const router = useRouter()
const { createArticle } = useArticleApi()
const userStore = useUserStore()

const title = ref('')
const author = ref('橘子')
const categoryId = ref('')
const summary = ref('')
const content = ref('')
const loading = ref(false)

async function handlePublish() {
  if (!title.value.trim()) {
    alert('请输入文章标题')
    return
  }
  if (!author.value.trim()) {
    alert('请输入作者名')
    return
  }
  if (!categoryId.value.trim()) {
    alert('请输入分类ID')
    return
  }
  if (!content.value.trim()) {
    alert('请输入文章内容')
    return
  }

  loading.value = true
  try {
    const response = await createArticle({
      title: title.value,
      author: author.value,
      category_id: parseInt(categoryId.value),
      summary: summary.value,
      content: content.value
    })
    
    if (response.code === 200) {
      alert('文章发布成功！')
      router.push('/articles')
    } else {
      alert(response.msg || '发布失败')
    }
  } catch (error) {
    console.error('发布错误:', error)
    alert(error.response?.data?.msg || '发布失败，请稍后重试')
  } finally {
    loading.value = false
  }
}

function handleCancel() {
  router.push('/admin')
}
</script>

<style scoped>
.publish-page {
  min-height: calc(100vh - 60px);
  padding: 1.5rem 0;
}

.page-title {
  font-size: 1.75rem;
  font-weight: 700;
  color: #1d1d1f;
  margin-bottom: 1rem;
}

.form-header {
  background: white;
  border: 1px solid #e5e5e5;
  border-radius: 12px;
  padding: 1rem;
  margin-bottom: 1rem;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  margin-bottom: 1rem;
}

.form-row:last-child {
  margin-bottom: 0;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.form-group label {
  font-weight: 500;
  color: #1d1d1f;
  font-size: 0.9rem;
}

.required {
  color: #ff6b6b;
  margin-left: 0.25rem;
}

.form-input {
  padding: 8px 12px;
  border: 1px solid #d2d2d7;
  border-radius: 8px;
  font-size: 0.9rem;
  transition: border-color 0.3s;
}

.form-input:focus {
  outline: none;
  border-color: var(--theme-primary);
}

.form-textarea {
  padding: 8px 12px;
  border: 1px solid #d2d2d7;
  border-radius: 8px;
  font-size: 0.9rem;
  min-height: 500px;
  resize: vertical;
  transition: border-color 0.3s;
}

.form-textarea:focus {
  outline: none;
  border-color: var(--theme-primary);
}

.markdown-input {
  min-height: 600px;
  font-family: 'Courier New', Courier, monospace;
  font-size: 0.9rem;
}

.form-actions {
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
}

.btn-primary,
.btn-secondary {
  padding: 10px 20px;
  border-radius: 8px;
  font-weight: 500;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.3s;
  border: none;
}

.btn-primary {
  background-color: var(--theme-primary);
  color: white;
}

.btn-primary:hover {
  background-color: var(--theme-primary-hover);
}

.btn-primary:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.btn-secondary {
  background-color: #f5f5f7;
  color: #1d1d1f;
}

.btn-secondary:hover {
  background-color: #e8e8ed;
}

.editor-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
  align-items: start;
}

.editor-input {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.editor-preview {
  background: white;
  border: 1px solid #e5e5e5;
  border-radius: 12px;
  padding: 1.25rem;
  height: fit-content;
  max-height: calc(100vh - 30px);
  overflow-y: auto;
}

.preview-header {
  padding-bottom: 0.75rem;
  border-bottom: 1px solid #e5e5e5;
  margin-bottom: 0.75rem;
}

.preview-header h3 {
  font-size: 1.125rem;
  font-weight: 600;
  color: #1d1d1f;
}

.preview-content {
  max-height: calc(100vh - 305px);
  overflow-y: auto;
}

@media (max-width: 1024px) {
  .editor-container {
    grid-template-columns: 1fr;
  }

  .editor-preview {
    max-height: 500px;
  }

  .preview-content {
    max-height: 400px;
  }
}

@media (max-width: 768px) {
  .publish-page {
    padding: 1rem 0;
  }

  .page-title {
    font-size: 1.5rem;
    margin-bottom: 0.75rem;
  }

  .form-header {
    padding: 0.75rem;
    margin-bottom: 0.75rem;
  }

  .form-row {
    grid-template-columns: 1fr;
    gap: 0.75rem;
  }

  .form-input,
  .form-textarea {
    padding: 8px 10px;
    font-size: 16px;
  }

  .markdown-input {
    min-height: 400px;
  }

  .form-actions {
    flex-direction: column;
  }

  .btn-primary,
  .btn-secondary {
    width: 100%;
  }
}

@media (max-width: 480px) {
  .page-title {
    font-size: 1.25rem;
  }

  .form-header {
    padding: 0.5rem;
  }

  .form-input,
  .form-textarea {
    padding: 6px 8px;
    font-size: 16px;
  }

  .markdown-input {
    min-height: 300px;
  }

  .editor-preview {
    padding: 1rem;
  }
}
</style>
