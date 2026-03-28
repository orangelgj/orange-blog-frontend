import axios from 'axios'
import { getToken } from './storage'

const api = axios.create({
  baseURL: '/api',
  timeout: 5000
})

api.interceptors.request.use(
  config => {
    const token = getToken()
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

api.interceptors.response.use(
  response => {
    return response.data
  },
  error => {
    console.error('API Error:', error)
    
    if (error.response) {
      const { status, data, config } = error.response
      
      if (status === 401) {
        const url = config?.url || ''
        
        const publicRoutes = [
          '/api/v1/article/',
          '/api/v1/articles',
          '/api/v1/search',
          '/api/v1/check'
        ]
        
        const isPublicRoute = publicRoutes.some(route => url.startsWith(route))
        
        if (isPublicRoute) {
          console.log('公开接口返回 401，不跳转登录页')
          return Promise.reject({
            status,
            message: data?.msg || '请求失败',
            code: data?.code
          })
        }
        
        console.log('Token无效或已过期，自动登出')
        
        localStorage.removeItem('token')
        localStorage.removeItem('username')
        
        if (window.location.pathname !== '/login') {
          window.location.href = '/login'
        }
      }
      
      if (status === 403) {
        console.log('权限不足')
      }
      
      return Promise.reject({
        status,
        message: data?.msg || '请求失败',
        code: data?.code
      })
    }
    
    return Promise.reject(error)
  }
)

export default api
