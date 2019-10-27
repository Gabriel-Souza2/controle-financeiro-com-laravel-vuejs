import axios from 'axios'
import localStorage from '../services/persistent-store'

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8000/api',
  headers: {
    'X-Requested-With': XMLHttpRequest
  }
})

export default async ({ store, Vue, router }) => {

  axiosInstance.interceptors.request.use((request) => {
    request.headers['Authorization'] = 'Bearer ' + localStorage.get('token')
    return request
  })

  let isRefreshing = false;
  axiosInstance.interceptors.response.use(null, async function (error) {
    if (error.response.status == '401' && localStorage.get('token') && !isRefreshing) {
      isRefreshing = true
      return store.dispatch('auth/refresh').then(() => {
        isRefreshing = false
        return axiosInstance.request(error.config)

      }).catch((error) => {
        router.push({ name: 'login' })
      })
    }
    return Promise.reject(error);
  })

  Vue.prototype.$axios = axiosInstance
}

export { axiosInstance }
