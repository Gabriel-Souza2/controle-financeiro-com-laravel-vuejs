import { axiosInstance as axios } from '../../boot/axios'

import qs from 'qs'

const login = (context, data) => {
  return axios.post('/auth/login', qs.stringify(data))
    .then((response) => {
      context.commit('authenticated', response.data.token)
      context.dispatch('me')
    })
}

const refresh = (context) => {
  return axios.post('/auth/refresh').then((response) => {
    context.commit('authenticated', response.data.token)
    return response.data
  }).catch((error) => {
    context.commit('unauthenticated')
    return Promise.reject(error);
  })
}
const me = (context) => {
  return axios.post('/auth/me').then((response) => {
    context.commit('setUser', response.data)
  })
}

const logout = (context) => {
  return axios.post('/auth/logout').then(() => {
    context.commit('unauthenticated')
  })
}

export {
  login,
  me,
  refresh,
  logout
}
