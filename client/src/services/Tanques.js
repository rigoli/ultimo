import Api from '@/services/Api'

export default {
  index () {
    return Api().get('tanques')
  },
  show (idTan) {
    return Api().get(`tanque/${idTan}`)
  },
  post (tanque) {
    return Api().post('tanque', tanque)
  },
  put (tanque) {
    return Api().put(`tanque/${tanque.idTan}`, tanque)
  },
  delete (idTan) {
    return Api().delete(`tanque/${idTan}`)
  }
}
