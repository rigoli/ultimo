import Api from '@/services/Api'

export default {
  index () {
    return Api().get('sucursales')
  },
  show (sucursalId) {
    return Api().get(`sucursal/${sucursalId}`)
  },
  post (sucursal) {
    return Api().post('sucursal', sucursal)
  },
  put (sucursal) {
    return Api().put(`sucursal/${sucursal.idSuc}`, sucursal)
  },
  delete (sucursalId) {
    return Api().delete(`sucursal/${sucursalId}`)
  }
}
