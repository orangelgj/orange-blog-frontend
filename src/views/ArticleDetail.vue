<template>
  <div class="article-detail">
    <div class="container">
      <div v-if="loading" class="loading">加载中...</div>
      <div v-else-if="error" class="error">{{ error }}</div>
      <article v-else class="article-content">
        <button class="btn-back" @click="goBack">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M19 12H5M12 19l-7-7 7-7"/>
          </svg>
          返回文章列表
        </button>
        <h1 class="article-title">{{ article.title }}</h1>
        <div class="article-meta">
          <span class="article-author">作者：{{ article.author }}</span>
          <span class="article-date">发布时间：{{ formatDate(article.create_time) }}</span>
        </div>
        <div class="article-body">
          <MarkdownRenderer :content="article.content" />
        </div>
        
        <div v-if="isUnlocked && userStore.isLoggedIn" class="comments-section">
          <h2 class="comments-title">评论 ({{ rootCommentTotal }})</h2>
          <div class="comment-form">
            <textarea
              v-model="commentContent"
              placeholder="发表你的评论..."
              class="comment-input"
              maxlength="200"
            ></textarea>
            <div class="comment-form-footer">
              <span class="char-count">{{ commentContent.length }}/200</span>
              <button @click="submitComment" :disabled="submitLoading" class="btn-submit">
                {{ submitLoading ? '发表中...' : '发表评论' }}
              </button>
            </div>
          </div>
          
          <div class="comments-list">
            <div v-if="rootComments.length === 0" class="no-comments">暂无评论，快来抢沙发吧~</div>
            
            <div v-for="comment in rootComments" :key="comment.id" class="comment-card">
              <div class="comment-card-header">
                <div class="comment-avatar" :style="{ backgroundColor: getAvatarColor(comment.userName) }">
                  {{ getFirstChar(comment.userName) }}
                </div>
                <div class="comment-card-info">
                  <span class="comment-author">{{ comment.userName }}</span>
                </div>
              </div>
              
              <div class="comment-card-body">
                {{ comment.content }}
              </div>
              
              <div class="comment-card-footer">
                <span class="comment-meta">
                  <span class="comment-ip">IP：{{ comment.ipLocation || '未知' }}</span>
                  <span class="comment-time">{{ formatDate(comment.createTime) }}</span>
                </span>
                <div class="action-group">
                  <!-- <span class="action-item like-btn">
                    <svg class="action-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                    </svg>
                    <span class="action-count">{{ comment.likeCount }}</span>
                  </span> -->
                  <!-- <span v-if="comment.replyCount > 0" class="action-item reply-count">
                    <svg class="action-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
                    </svg>
                    <span class="action-count">{{ comment.replyCount }}</span>
                  </span> -->
                  <button class="btn-reply-action" @click="showReplyForm('root', comment.id, comment.userId, comment.userName)">
                    <svg class="action-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
                    </svg>
                    回复
                  </button>
                  <button v-if="canDeleteComment(comment.userId)" class="btn-delete-action" @click="handleDeleteComment(comment.id)">
                    <svg class="action-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <path d="M3 6h18"></path>
                      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v2"></path>
                      <line x1="10" y1="11" x2="10" y2="17"></line>
                      <line x1="14" y1="11" x2="14" y2="17"></line>
                    </svg>
                    
                  </button>
                </div>
              </div>
              
              <div v-if="replyingToKey === 'root_' + comment.id" class="reply-form">
                <div class="reply-form-header">
                  回复 <span class="reply-to-user">@{{ replyingToUserName }}</span>
                  <button class="btn-cancel-reply" @click="cancelReply()">取消</button>
                </div>
                <textarea
                  v-model="replyContent"
                  placeholder="发表你的回复..."
                  class="reply-input"
                  maxlength="200"
                ></textarea>
                <div class="reply-form-footer">
                  <span class="char-count">{{ replyContent.length }}/200</span>
                  <button 
                    @click="submitReply(comment.id, comment.id, replyingToUserId)" 
                    :disabled="replyLoading"
                    class="btn-submit-reply"
                  >
                    {{ replyLoading ? '发表中...' : '发表回复' }}
                  </button>
                </div>
              </div>
              
              <div v-if="comment.previewReply && !expandedComments[comment.id]" class="child-comments">
                <div class="reply-item">
                  <div class="reply-avatar" :style="{ backgroundColor: getAvatarColor(comment.previewReply.userName) }">
                    {{ getFirstChar(comment.previewReply.userName) }}
                  </div>
                  <div class="reply-content-wrapper">
                    <div class="reply-header">
                      <span class="reply-author">{{ comment.previewReply.userName }}</span>
                      <span v-if="comment.previewReply.toUserName" class="reply-to">
                        回复 <span class="to-user">@{{ comment.previewReply.toUserName }}</span>
                      </span>
                    </div>
                    <div class="reply-body">
                      {{ comment.previewReply.content }}
                    </div>
                    <div class="reply-footer">
                      <span class="reply-meta">
                        <span class="reply-ip">IP：{{ comment.previewReply.ipLocation || '未知' }}</span>
                        <span class="reply-time">{{ formatDate(comment.previewReply.createTime) }}</span>
                      </span>
                      <button class="btn-reply-inline" @click="expandAndReply(comment.id, comment.previewReply.userId, comment.previewReply.userName)">回复</button>
                      <button v-if="canDeleteComment(comment.previewReply.userId)" class="btn-delete-inline" @click="handleDeleteComment(comment.previewReply.id)">
                        <svg class="action-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                          <path d="M3 6h18"></path>
                          <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v2"></path>
                          <line x1="10" y1="11" x2="10" y2="17"></line>
                          <line x1="14" y1="11" x2="14" y2="17"></line>
                        </svg>
                        <!-- 删除 -->
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              
              <div v-if="comment.replyCount > 1 && !expandedComments[comment.id]" class="expand-replies">
                <button 
                  @click="loadChildComments(comment.id)"
                  class="btn-expand"
                >
                  <svg class="expand-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <polyline points="6 9 12 15 18 9"></polyline>
                  </svg>
                  查看更多回复,共
                  <span class="action-count">{{ comment.replyCount }}</span>
                  条
                </button>
              </div>
              
              <div v-if="expandedComments[comment.id]" class="child-comments">
                <div v-if="childLoading[comment.id]" class="loading-replies">加载中...</div>
                <div v-else>
                  <div 
                    v-for="reply in childComments[comment.id]" 
                    :key="reply.id" 
                    class="reply-item"
                  >
                    <div class="reply-avatar" :style="{ backgroundColor: getAvatarColor(reply.userName) }">
                      {{ getFirstChar(reply.userName) }}
                    </div>
                    <div class="reply-content-wrapper">
                      <div class="reply-header">
                        <span class="reply-author">{{ reply.userName }}</span>
                        <span v-if="reply.toUserName" class="reply-to">
                          回复 <span class="to-user">@{{ reply.toUserName }}</span>
                        </span>
                      </div>
                      <div class="reply-body">
                        {{ reply.content }}
                      </div>
                      <div class="reply-footer">
                        <span class="reply-meta">
                          <span class="reply-ip">IP：{{ reply.ipLocation || '未知' }}</span>
                          <span class="reply-time">{{ formatDate(reply.createTime) }}</span>
                        </span>
                        <button class="btn-reply-inline" @click="showReplyForm('reply', comment.id, reply.userId, reply.userName)">回复</button>
                        <button v-if="canDeleteComment(reply.userId)" class="btn-delete-inline" @click="handleDeleteComment(reply.id)">
                          <svg class="action-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M3 6h18"></path>
                            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v2"></path>
                            <line x1="10" y1="11" x2="10" y2="17"></line>
                            <line x1="14" y1="11" x2="14" y2="17"></line>
                          </svg>
                          <!-- 删除 -->
                        </button>
                      </div>
                    </div>
                  </div>
                  
                  <div v-if="replyingToKey === 'reply_' + comment.id" class="reply-form reply-form-inline">
                    <div class="reply-form-header">
                      回复 <span class="reply-to-user">@{{ replyingToUserName }}</span>
                      <button class="btn-cancel-reply" @click="cancelReply()">取消</button>
                    </div>
                    <textarea
                      v-model="replyContent"
                      placeholder="发表你的回复..."
                      class="reply-input"
                      maxlength="200"
                    ></textarea>
                    <div class="reply-form-footer">
                      <span class="char-count">{{ replyContent.length }}/200</span>
                      <button 
                        @click="submitReply(comment.id, comment.id, replyingToUserId)" 
                        :disabled="replyLoading"
                        class="btn-submit-reply"
                      >
                        {{ replyLoading ? '发表中...' : '发表回复' }}
                      </button>
                    </div>
                  </div>
                  
                  <div v-if="childTotalPages(comment.id) > 1" class="pagination">
                    <button 
                      :disabled="childPageNum[comment.id] === 1"
                      @click="goToChildPage(comment.id, childPageNum[comment.id] - 1)"
                      class="page-btn"
                    >
                      上一页
                    </button>
                    <div class="page-numbers">
                      <button 
                        v-for="page in getVisiblePages(childPageNum[comment.id], childTotalPages(comment.id))"
                        :key="page"
                        @click="goToChildPage(comment.id, page)"
                        :class="['page-num', { active: childPageNum[comment.id] === page }]"
                      >
                        {{ page }}
                      </button>
                    </div>
                    <button 
                      :disabled="childPageNum[comment.id] === childTotalPages(comment.id)"
                      @click="goToChildPage(comment.id, childPageNum[comment.id] + 1)"
                      class="page-btn"
                    >
                      下一页
                    </button>
                    <span class="page-info">
                      共 {{ childTotal[comment.id] }} 条
                    </span>
                  </div>
                  
                  <div class="collapse-replies">
                    <button 
                      @click="collapseComments(comment.id)"
                      class="btn-collapse"
                    >
                      <svg class="expand-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <polyline points="18 15 12 9 6 15"></polyline>
                      </svg>
                      收起回复
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div v-if="rootTotalPages > 1" class="pagination root-pagination">
            <button 
              :disabled="rootPageNum === 1"
              @click="goToRootPage(rootPageNum - 1)"
              class="page-btn"
            >
              上一页
            </button>
            <div class="page-numbers">
              <button 
                v-for="page in getVisiblePages(rootPageNum, rootTotalPages)"
                :key="page"
                @click="goToRootPage(page)"
                :class="['page-num', { active: rootPageNum === page }]"
              >
                {{ page }}
              </button>
            </div>
            <button 
              :disabled="rootPageNum === rootTotalPages"
              @click="goToRootPage(rootPageNum + 1)"
              class="page-btn"
            >
              下一页
            </button>
            <span class="page-info">
              共 {{ rootCommentTotal }} 条
            </span>
          </div>
        </div>
        <div v-else-if="isUnlocked && !userStore.isLoggedIn" class="locked-section">
          <p>需要登录才能解锁评论功能</p>
        </div>
        <div v-else class="locked-section">
          <p>评论功能未解锁</p>
        </div>
      </article>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import useSecretCode from '../composables/useSecretCode'
import { useArticleApi } from '../api/article'
import { useCommentApi } from '../api/comment'
import { useUserStore } from '../stores/user'
import MarkdownRenderer from '../components/MarkdownRenderer.vue'

const route = useRoute()
const router = useRouter()
const { isUnlocked } = useSecretCode()
const { getArticleById } = useArticleApi()
const { getRootComments, getChildComments, createComment, deleteComment } = useCommentApi()
const userStore = useUserStore()

const article = ref({})
const loading = ref(true)
const error = ref('')
const commentContent = ref('')

const rootComments = ref([])
const rootCommentTotal = ref(0)
const rootPageNum = ref(1)
const rootPageSize = 10
const rootTotalPages = computed(() => Math.ceil(rootCommentTotal.value / rootPageSize))

const expandedComments = reactive({})
const childComments = reactive({})
const childPageNum = reactive({})
const childTotal = reactive({})
const childLoading = reactive({})
const childTotalPages = computed(() => {
  return (rootId) => Math.ceil((childTotal[rootId] || 0) / 5)
})

function getFirstChar(name) {
  if (!name) return '?'
  return name.charAt(0).toUpperCase()
}

function getAvatarColor(name) {
  if (!name) return 'var(--theme-primary)'
  const colors = [
    '#FF6B6B', '#FF8E72', '#FFA07A', '#FFB347', '#FFCC5C',
    '#FFE66D', '#F7DC6F', '#F8B500', '#FF9F1C', '#FF6F61',
    '#E88565', '#D4A574', '#C9A959', '#B5A7A7', '#A0D2DB',
    '#7EC8E3', '#45B7D1', '#1E90FF', '#4169E1', '#6A5ACD',
    '#7B68EE', '#9370DB', '#BA55D3', '#DA70D6', '#DDA0DD',
    '#EE82EE', '#FF69B4', '#FF85A2', '#FFB6C1', '#FFC0CB',
    '#E6A8D7', '#C38D9E', '#B57EDC', '#9575CD', '#7E57C2',
    '#673AB7', '#512DA8', '#4A148C', '#6A1B9A', '#8E24AA',
    '#AB47BC', '#BA68C8', '#CE93D8', '#E1BEE7', '#F3E5F5',
    '#4ECDC4', '#26A69A', '#009688', '#00897B', '#00796B',
    '#00695C', '#004D40', '#2E7D32', '#388E3C', '#43A047',
    '#4CAF50', '#66BB6A', '#81C784', '#A5D6A7', '#C8E6C9',
    '#8BC34A', '#9CCC65', '#CDDC39', '#DCE775', '#FFF176',
    '#FFEB3B', '#FDD835', '#FBC02D', '#F9A825', '#F57F17',
    '#FF5722', '#FF7043', '#FF8A65', '#FFAB91', '#FFCCBC',
    '#D84315', '#BF360C', '#E65100', '#EF6C00', '#F57C00',
    '#FB8C00', '#FF9800', '#FFB300', '#FFC107', '#FFCA28',
    '#FFD54F', '#FFE082', '#FFECB3', '#FFF8E1', '#D7CCC8',
    '#BCAAA4', '#A1887F', '#8D6E63', '#795548', '#6D4C41',
    '#5D4037', '#4E342E', '#3E2723', '#90A4AE', '#78909C'
  ]
  let hash = 0
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash)
  }
  return colors[Math.abs(hash+60) % colors.length]
}

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

function getVisiblePages(current, total) {
  const pages = []
  let start = Math.max(1, current - 2)
  let end = Math.min(total, current + 2)
  
  if (current <= 3) {
    end = Math.min(5, total)
  }
  if (current > total - 3) {
    start = Math.max(1, total - 4)
  }
  
  for (let i = start; i <= end; i++) {
    pages.push(i)
  }
  return pages
}

async function loadArticle() {
  try {
    loading.value = true
    const articleId = route.params.id
    const response = await getArticleById(articleId)
    
    if (response.code === 200) {
      article.value = response.data
      await loadRootComments()
    } else {
      error.value = response.msg || '查询失败或文章不存在'
    }
  } catch (err) {
    console.error('加载文章失败:', err)
    error.value = '加载文章失败，请稍后重试'
  } finally {
    loading.value = false
  }
}

async function loadRootComments() {
  if (!userStore.isLoggedIn) {
    return
  }
  
  try {
    const articleId = route.params.id
    const response = await getRootComments(articleId, rootPageNum.value, rootPageSize)
    
    if (response.code === 200) {
      rootComments.value = response.data
      rootCommentTotal.value = response.total
    }
  } catch (err) {
    console.error('加载评论失败:', err)
  }
}

async function goToRootPage(page) {
  rootPageNum.value = page
  await loadRootComments()
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

async function loadChildComments(rootId) {
  expandedComments[rootId] = true
  childLoading[rootId] = true
  childPageNum[rootId] = 1
  
  try {
    const response = await getChildComments(rootId, 1, 5)
    
    if (response.code === 200) {
      childComments[rootId] = response.data
      childTotal[rootId] = response.total
    }
  } catch (err) {
    console.error('加载回复失败:', err)
  } finally {
    childLoading[rootId] = false
  }
}

async function goToChildPage(rootId, page) {
  childPageNum[rootId] = page
  childLoading[rootId] = true
  
  try {
    const response = await getChildComments(rootId, page, 5)
    
    if (response.code === 200) {
      childComments[rootId] = response.data
    }
  } catch (err) {
    console.error('加载回复失败:', err)
  } finally {
    childLoading[rootId] = false
  }
}

function collapseComments(rootId) {
  expandedComments[rootId] = false
}

async function expandAndReply(rootId, userId, userName) {
  await loadChildComments(rootId)
  showReplyForm('reply', rootId, userId, userName)
}

const replyingToKey = ref('')
const replyingToUserName = ref('')
const replyingToUserId = ref(0)
const replyContent = ref('')
const replyLoading = ref(false)

function showReplyForm(type, rootId, toUserId, toUserName) {
  if (!userStore.isLoggedIn) {
    alert('请先登录')
    router.push('/login')
    return
  }
  replyingToKey.value = type + '_' + rootId
  replyingToUserId.value = toUserId
  replyingToUserName.value = toUserName
  replyContent.value = ''
}

function cancelReply() {
  replyingToKey.value = ''
  replyContent.value = ''
}

async function submitReply(rootId, parentId, toUserId) {
  const content = replyContent.value.trim()
  
  if (!content) {
    alert('请输入回复内容')
    return
  }

  if (content.length > 200) {
    alert('回复内容不能超过200字')
    return
  }

  replyLoading.value = true
  try {
    await createComment({
      articleId: article.value.id,
      content: content,
      rootId: rootId,
      parentId: parentId,
      toUserId: toUserId
    })
    replyContent.value = ''
    replyingToKey.value = ''
    await loadChildComments(rootId)
    alert('回复发表成功')
  } catch (err) {
    alert(err.response?.data?.msg || '回复发表失败')
  } finally {
    replyLoading.value = false
  }
}

const submitLoading = ref(false)

async function submitComment() {
  if (!userStore.isLoggedIn) {
    alert('请先登录')
    router.push('/login')
    return
  }

  if (!commentContent.value.trim()) {
    alert('请输入评论内容')
    return
  }

  if (commentContent.value.length > 200) {
    alert('评论内容不能超过200字')
    return
  }

  submitLoading.value = true
  try {
    await createComment({
      articleId: article.value.id,
      content: commentContent.value.trim()
    })
    commentContent.value = ''
    rootPageNum.value = 1
    await loadRootComments()
    alert('评论发表成功')
  } catch (err) {
    alert(err.response?.data?.msg || '评论发表失败')
  } finally {
    submitLoading.value = false
  }
}

function canDeleteComment(commentUserId) {
  if (!userStore.isLoggedIn) {
    return false
  }
  
  if (userStore.isAdmin) {
    return true
  }
  
  return userStore.userId === commentUserId
}

function goBack() {
  router.push('/articles')
}

async function handleDeleteComment(commentId) {
  if (!confirm('确定要删除这条评论吗？')) {
    return
  }
  
  try {
    const response = await deleteComment(commentId)
    
    if (response.code === 200) {
      alert('删除成功')
      await loadRootComments()
    } else {
      alert(response.msg || '删除失败')
    }
  } catch (err) {
    console.error('删除评论失败:', err)
    alert(err.response?.data?.msg || '删除失败，请稍后重试')
  }
}

onMounted(() => {
  loadArticle()
})
</script>

<style scoped>
.article-detail {
  padding: 4rem 0;
  min-height: calc(100vh - 60px);
}

.loading,
.error {
  text-align: center;
  padding: 2rem;
  color: #86868b;
}

.article-content {
  max-width: 800px;
  margin: 0 auto;
}

.btn-back {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  background: none;
  border: none;
  color: #86868b;
  cursor: pointer;
  font-size: 0.8rem;
  padding: 0.5rem 0;
  margin-bottom: 1rem;
  transition: color 0.2s ease;
}

.btn-back svg {
  width: 16px;
  height: 16px;
}

.btn-back:hover {
  color: var(--theme-primary);
}

.article-title {
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
  color: #1d1d1f;
}

.article-meta {
  display: flex;
  gap: 2rem;
  margin-bottom: 2rem;
  color: #86868b;
  font-size: 0.9rem;
}

.article-body {
  font-size: 1.1rem;
  line-height: 1.8;
  color: #1d1d1f;
  margin-bottom: 3rem;
}

.comments-section {
  border-top: 1px solid #e5e5e5;
  padding-top: 2rem;
}

.comments-title {
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
  color: #1d1d1f;
}

.comment-form {
  margin-bottom: 2rem;
}

.comment-input {
  width: 100%;
  min-height: 120px;
  padding: 1rem;
  border: 1px solid #d2d2d7;
  border-radius: 8px;
  font-size: 1rem;
  resize: vertical;
}

.comment-input:focus {
  outline: none;
  border-color: var(--theme-primary);
}

.comment-form-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 0.5rem;
}

.char-count {
  color: #86868b;
  font-size: 0.85rem;
}

.btn-submit {
  padding: 10px 24px;
  background-color: var(--theme-primary);
  color: white;
  border-radius: 6px;
  font-weight: 500;
  transition: background-color 0.3s;
  cursor: pointer;
  border: none;
}

.btn-submit:hover {
  background-color: var(--theme-primary-hover);
}

.comments-list {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.no-comments {
  text-align: center;
  color: #86868b;
  padding: 3rem 2rem;
  font-size: 1rem;
}

.comment-card {
  background: #fff;
  padding: 1rem;
  border-radius: 16px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.04);
  border: 1px solid #f0f0f0;
  transition: box-shadow 0.3s ease;
}

.comment-card:hover {
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
}

.comment-card-header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 0.75rem;
}

.comment-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-weight: 600;
  font-size: 1rem;
  flex-shrink: 0;
}

.comment-card-info {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.comment-author {
  font-weight: 600;
  color: #1d1d1f;
  font-size: 0.95rem;
}

.comment-meta {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.comment-ip {
  color: #86868b;
  font-size: 0.75rem;
  padding: 0.15rem 0.5rem;
  background: #f5f5f7;
  border-radius: 10px;
}

.comment-time {
  color: #86868b;
  font-size: 0.8rem;
}

.comment-card-body {
  color: #333;
  line-height: 1.6;
  margin-bottom: 0.5rem;
  padding-left: calc(40px + 0.75rem);
  font-size: 0.9rem;
}

.comment-card-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-left: calc(40px + 0.75rem);
  padding-top: 0.5rem;
  border-top: 1px solid #f5f5f7;
}

.comment-meta {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.comment-time {
  color: #86868b;
  font-size: 0.8rem;
}

.action-group {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.action-item {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  color: #86868b;
  font-size: 0.8rem;
}

.action-icon-svg {
  width: 18px;
  height: 18px;
  transition: all 0.2s ease;
}

.like-btn {
  cursor: pointer;
  transition: all 0.2s ease;
  padding: 0.2rem 0.4rem;
  border-radius: 12px;
}

.like-btn:hover {
  color: #FF6B6B;
  background: rgba(255, 107, 107, 0.1);
}

.like-btn:hover .action-icon-svg {
  fill: #FF6B6B;
  stroke: #FF6B6B;
}

.action-count {
  font-weight: 500;
}

.btn-reply-action {
  background: none;
  border: none;
  color: var(--theme-primary);
  cursor: pointer;
  font-size: 0.85rem;
  padding: 0.25rem 0.75rem;
  border-radius: 16px;
  display: flex;
  align-items: center;
  gap: 0.25rem;
  transition: background-color 0.2s ease;
}

.btn-reply-action:hover {
  background-color: rgba(var(--theme-primary-rgb, 255, 107, 107), 0.1);
}

.btn-reply-inline {
  background: none;
  border: none;
  color: var(--theme-primary);
  cursor: pointer;
  font-size: 0.8rem;
  padding: 0.2rem 0.5rem;
  border-radius: 12px;
  margin-left: auto;
  transition: background-color 0.2s ease;
}

.btn-reply-inline:hover {
  background-color: rgba(var(--theme-primary-rgb, 255, 107, 107), 0.1);
}

.btn-delete-action {
  background: none;
  border: none;
  color: #ff6b6b;
  cursor: pointer;
  font-size: 0.8rem;
  padding: 0.2rem 0.5rem;
  border-radius: 12px;
  transition: background-color 0.2s ease;
}

.btn-delete-action:hover {
  background-color: rgba(255, 107, 107, 0.1);
}

.btn-delete-inline {
  background: none;
  border: none;
  color: #ff6b6b;
  cursor: pointer;
  font-size: 0.75rem;
  padding: 0.15rem 0.4rem;
  border-radius: 12px;
  transition: background-color 0.2s ease;
}

.btn-delete-inline:hover {
  background-color: rgba(255, 107, 107, 0.1);
}

.reply-form {
  margin-top: 1rem;
  padding: 1rem;
  background: #fafafa;
  border-radius: 12px;
  border: 1px solid #f0f0f0;
}

.reply-form-inline {
  margin-top: 1rem;
  background: #fff;
  border: 1px solid #f0f0f0;
}

.reply-form-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.75rem;
  font-size: 0.9rem;
  color: #1d1d1f;
}

.reply-to-user {
  color: var(--theme-primary);
  font-weight: 500;
}

.btn-cancel-reply {
  background: none;
  border: none;
  color: #86868b;
  cursor: pointer;
  font-size: 0.85rem;
  padding: 0.2rem 0.5rem;
  border-radius: 10px;
  transition: all 0.2s ease;
}

.btn-cancel-reply:hover {
  color: #333;
  background: #f0f0f0;
}

.reply-input {
  width: 100%;
  min-height: 80px;
  padding: 0.75rem;
  border: 1px solid #e5e5e5;
  border-radius: 12px;
  font-size: 0.9rem;
  resize: vertical;
  background: #fff;
}

.reply-input:focus {
  outline: none;
  border-color: var(--theme-primary);
}

.reply-form-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 0.75rem;
}

.btn-submit-reply {
  padding: 8px 20px;
  background-color: var(--theme-primary);
  color: white;
  border: none;
  border-radius: 20px;
  cursor: pointer;
  font-size: 0.85rem;
  transition: all 0.2s ease;
}

.btn-submit-reply:hover {
  transform: translateY(-1px);
  box-shadow: 0 2px 8px rgba(var(--theme-primary-rgb, 255, 107, 107), 0.3);
}

.btn-submit-reply:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none;
  box-shadow: none;
}

.preview-reply {
  margin-top: 0.75rem;
  padding: 0.75rem;
  background: #fafafa;
  border-radius: 12px;
  display: flex;
  gap: 0.75rem;
  align-items: flex-start;
}

.preview-reply-avatar {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-weight: 600;
  font-size: 0.75rem;
  flex-shrink: 0;
}

.preview-reply-content {
  flex: 1;
  font-size: 0.85rem;
  line-height: 1.5;
}

.reply-text {
  color: #333;
}

.btn-reply-preview {
  background: none;
  border: none;
  color: var(--theme-primary);
  font-size: 0.8rem;
  cursor: pointer;
  padding: 0.2rem 0.5rem;
  border-radius: 10px;
  transition: background-color 0.2s ease;
}

.btn-reply-preview:hover {
  background: rgba(var(--theme-primary-rgb, 255, 107, 107), 0.1);
}

.reply-item {
  display: flex;
  gap: 0.6rem;
  padding: 0.5rem 0;
  border-bottom: 1px solid #f5f5f5;
}

.reply-item:last-child {
  border-bottom: none;
}

.reply-avatar {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-weight: 600;
  font-size: 0.75rem;
  flex-shrink: 0;
}

.reply-content-wrapper {
  flex: 1;
  min-width: 0;
}

.reply-header {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  margin-bottom: 0.15rem;
}

.reply-body {
  color: #333;
  line-height: 1.5;
  margin-bottom: 0.15rem;
  font-size: 0.85rem;
}

.reply-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.reply-author {
  font-weight: 600;
  color: #1d1d1f;
  font-size: 0.9rem;
}

.reply-to {
  color: #86868b;
  font-size: 0.85rem;
}

.to-user {
  color: var(--theme-primary);
}

.reply-meta {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.reply-ip {
  color: #86868b;
  font-size: 0.7rem;
  padding: 0.1rem 0.4rem;
  background: #f0f0f0;
  border-radius: 8px;
}

.reply-ip-preview {
  color: #86868b;
  font-size: 0.7rem;
  margin-left: 0.5rem;
}

.reply-time {
  color: #86868b;
  font-size: 0.75rem;
}

.expand-replies {
  margin-top: 0.5rem;
  padding-left: calc(40px + 0.6rem);
}

.collapse-replies {
  margin-top: 0.5rem;
  text-align: center;
}

.btn-expand,
.btn-collapse {
  background: none;
  border: none;
  color: var(--theme-primary);
  font-size: 0.85rem;
  cursor: pointer;
  padding: 0.35rem 0.75rem;
  border-radius: 16px;
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  transition: background-color 0.2s ease;
}

.expand-icon {
  width: 16px;
  height: 16px;
}

.btn-expand:hover,
.btn-collapse:hover {
  background-color: rgba(var(--theme-primary-rgb, 255, 107, 107), 0.1);
}

.child-comments {
  margin-top: 0.5rem;
  padding: 0.75rem;
  background: #fafafa;
  border-radius: 12px;
  margin-left: calc(40px + 0.6rem);
}

.loading-replies {
  color: #86868b;
  font-size: 0.9rem;
  text-align: center;
  padding: 1rem;
}

.pagination {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid #f0f0f0;
}

.page-btn {
  padding: 0.4rem 0.8rem;
  border: 1px solid #e5e5e5;
  background: #fff;
  border-radius: 12px;
  cursor: pointer;
  font-size: 0.8rem;
  color: #666;
  transition: all 0.2s ease;
}

.page-btn:hover:not(:disabled) {
  border-color: var(--theme-primary);
  color: var(--theme-primary);
}

.page-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.page-numbers {
  display: flex;
  gap: 0.35rem;
}

.page-num {
  min-width: 2rem;
  height: 2rem;
  border: 1px solid #e5e5e5;
  background: #fff;
  border-radius: 10px;
  cursor: pointer;
  font-size: 0.8rem;
  color: #666;
  transition: all 0.2s ease;
}

.page-num:hover {
  border-color: var(--theme-primary);
  color: var(--theme-primary);
}

.page-num.active {
  background: var(--theme-primary);
  border-color: var(--theme-primary);
  color: #fff;
}

.page-info {
  color: #86868b;
  font-size: 0.8rem;
  margin-left: 0.5rem;
}

.root-pagination {
  margin-top: 2rem;
  padding-top: 1.5rem;
  border-top: 1px solid #f0f0f0;
}

.locked-section {
  /* 字体大小 1.25rem */
  font-size: 1.1rem;
  border-top: 1px solid #e5e5e5;
  padding-top: 2rem;
  text-align: center;
/* 提醒色 */
  color: #808087;
}

@media (max-width: 768px) {
  .article-detail {
    padding: 2rem 0;
  }

  .article-content {
    padding: 0 1rem;
  }

  .btn-back {
    font-size: 0.75rem;
    padding: 0.4rem 0;
  }

  .btn-back svg {
    width: 14px;
    height: 14px;
  }

  .article-title {
    font-size: 2rem;
  }

  .article-meta {
    flex-direction: column;
    gap: 0.5rem;
    font-size: 0.85rem;
  }

  .article-body {
    font-size: 1rem;
    margin-bottom: 2rem;
  }

  .comments-section {
    padding-top: 1.5rem;
  }

  .comments-title {
    font-size: 1.25rem;
    margin-bottom: 1rem;
  }

  .comment-input {
    min-height: 100px;
    padding: 0.875rem;
    font-size: 16px;
  }

  .btn-submit {
    width: auto;
    padding: 8px 16px;
    font-size: 0.9rem;
  }

  .comment-item {
    padding: 1.25rem;
  }

  .pagination {
    flex-wrap: wrap;
    gap: 0.5rem;
  }

  .page-info {
    width: 100%;
    text-align: center;
    margin-left: 0;
    margin-top: 0.5rem;
  }

  .comment-card {
    padding: 0.75rem;
  }

  .comment-avatar {
    width: 32px;
    height: 32px;
    font-size: 0.85rem;
  }

  .comment-author {
    font-size: 0.9rem;
  }

  .comment-ip {
    font-size: 0.65rem;
  }

  .comment-card-body {
    padding-left: calc(32px + 0.6rem);
    font-size: 0.85rem;
    margin-bottom: 0.4rem;
  }

  .comment-card-footer {
    padding-left: calc(32px + 0.6rem);
    gap: 0.5rem;
  }

  .comment-time {
    font-size: 0.75rem;
  }

  .action-group {
    gap: 0.5rem;
  }

  .action-item {
    font-size: 0.75rem;
  }

  .action-icon-svg {
    width: 16px;
    height: 16px;
  }

  .child-comments {
    margin-left: 0;
    padding: 0.6rem;
    margin-top: 0.4rem;
  }

  .reply-item {
    padding: 0.4rem 0;
    gap: 0.5rem;
  }

  .reply-avatar {
    width: 24px;
    height: 24px;
    font-size: 0.65rem;
  }

  .reply-author {
    font-size: 0.8rem;
  }

  .reply-to {
    font-size: 0.75rem;
  }

  .reply-body {
    font-size: 0.8rem;
  }

  .reply-ip {
    font-size: 0.6rem;
    padding: 0.1rem 0.3rem;
  }

  .reply-time {
    font-size: 0.65rem;
  }

  .expand-replies {
    padding-left: calc(32px + 0.6rem);
    margin-top: 0.4rem;
  }

  .btn-expand,
  .btn-collapse {
    font-size: 0.8rem;
    padding: 0.25rem 0.6rem;
  }

  .expand-icon {
    width: 14px;
    height: 14px;
  }

  .btn-reply-inline {
    font-size: 0.75rem;
    padding: 0.15rem 0.4rem;
  }

  .reply-form {
    padding: 0.75rem;
  }

  .reply-input {
    min-height: 80px;
    padding: 0.6rem;
    font-size: 16px;
  }

  .btn-reply-action {
    font-size: 0.8rem;
    padding: 0.2rem 0.5rem;
  }
}
</style>
