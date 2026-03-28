import api from '../utils/api'

export function useArticleApi() {
  async function getArticles(categoryId = 0, page = 1, pageSize = 10) {
    const params = new URLSearchParams()
    if (categoryId > 0) params.append('categoryId', categoryId)
    params.append('page', page)
    params.append('pageSize', pageSize)
    
    const response = await api.get(`/v1/articles?${params.toString()}`)
    return response
  }

  async function getArticleById(id) {
    const response = await api.get(`/v1/article/${id}`)
    return response
  }

  async function createArticle(articleData) {
    const response = await api.post('/v1/articles', articleData)
    return response
  }

  async function getCategories() {
    const response = await api.get('/v1/categories')
    return response
  }

  return {
    getArticles,
    getArticleById,
    createArticle,
    getCategories
  }
}
