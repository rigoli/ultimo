import Api from '@/services/Api'

export default {
  registrar (credentials) {
    return Api().post('usuario', credentials)
  },
  login (credentials) {
    return Api().post('login', credentials)
  }
}
