import api from '../utils/api'

export function useSearchApi() {
  async function search(query) {
    const response = await api.post('/v1/search', { query })
    return response
  }

  return {
    search
  }
}
