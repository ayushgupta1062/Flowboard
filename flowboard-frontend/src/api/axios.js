import axios from 'axios'

const instance = axios.create({
  baseURL: 'https://flowboard-production-43a5.up.railway.app/api',
  headers: {
    'Content-Type': 'application/json'
  },
  timeout: 15000
})

instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('flowboard_token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

instance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('flowboard_token')
      localStorage.removeItem('flowboard_user')
      if (window.location.pathname !== '/login' && window.location.pathname !== '/signup') {
        window.location.href = '/login'
      }
    }
    return Promise.reject(error)
  }
)

export default instance

export const get = (url, config) => instance.get(url, config)
export const post = (url, data, config) => instance.post(url, data, config)
export const put = (url, data, config) => instance.put(url, data, config)
export const patch = (url, data, config) => instance.patch(url, data, config)
export const del = (url, config) => instance.delete(url, config)
