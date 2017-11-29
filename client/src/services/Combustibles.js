import Api from '@/services/Api'

export default {
  index () {
    return Api().get('combustibles')
  },
  show (idCom) {
    return Api().get(`combustible/${idCom}`)
  },
  post (combustible) {
    return Api().post('combustible', combustible)
  },
  put (combustible) {
    return Api().put(`combustible/${combustible.idCom}`, combustible)
  },
  delete (idCom) {
    return Api().delete(`combustible/${idCom}`)
  }
}
