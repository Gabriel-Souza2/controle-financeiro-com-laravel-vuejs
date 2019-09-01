import localStorage from '../../services/persistent-store'

export default {
  user: localStorage.getObj('user'),
  check: localStorage.get('token') != null
}
