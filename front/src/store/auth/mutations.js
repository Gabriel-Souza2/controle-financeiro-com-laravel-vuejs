import localStorage from '../../services/persistent-store'

const authenticated = (state, token) => {
    localStorage.set('token', token)
    state.check = true
}

const unauthenticated = (state) => {
    localStorage.remove('user')
    localStorage.remove('token')
    state.check = false
    state.user = null
}

const setUser = (state, user) => {
    localStorage.setObj('user', user)
    state.user = user
}

export  {
    authenticated,
    unauthenticated,
    setUser
}
