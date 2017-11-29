import Api from '@/services/Api'

export default {
  index () {
    return Api().get('usuarios')
  },
  show (usuarioId) {
    return Api().get(`usuario/${usuarioId}`)
  },
  post (usuario) {
    return Api().post('usuario', usuario)
  },
  put (usuario) {
    return Api().put(`usuario/${usuario.id}`, usuario)
  }
}
