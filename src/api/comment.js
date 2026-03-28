import api from '../utils/api'

export function useCommentApi() {
  async function getRootComments(articleId, pageNum = 1, pageSize = 10) {
    const response = await api.get('/v1/comments', {
      params: { articleId, pageNum, pageSize }
    })
    return response
  }

  async function getChildComments(rootId, pageNum = 1, pageSize = 10) {
    const response = await api.get('/v1/comments/replies', {
      params: { rootId, pageNum, pageSize }
    })
    return response
  }

  async function createComment(data) {
    const response = await api.post('/v1/comments', data)
    return response
  }

  async function deleteComment(commentId) {
    const response = await api.delete(`/v1/comments/${commentId}`)
    return response
  }

  return {
    getRootComments,
    getChildComments,
    createComment,
    deleteComment
  }
}
