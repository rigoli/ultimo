import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import DashBoard from '@/components/DashBoard'

import RegistrarUsuario from '@/components/users/Registrar'
import Login from '@/components/users/Login'
import Usuarios from '@/components/users/Index'

import Sucursales from '@/components/sucursales/Index'
import RegistrarSucursal from '@/components/sucursales/Registrar'
import EditarSucursal from '@/components/sucursales/Editar'
import DetallesSucursal from '@/components/sucursales/Detalles'

import Tanques from '@/components/tanques/Index'
import RegistrarTanque from '@/components/tanques/Registrar'
import EditarTanque from '@/components/tanques/Editar'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    }, {
      path: '/dashboard',
      name: 'dashboard',
      component: DashBoard
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    }, {
      path: '/usuarios',
      name: 'usuarios',
      component: Usuarios
    }, {
      path: '/usuarios/registrar',
      name: 'RegistrarUsuario',
      component: RegistrarUsuario
    },
    {
      path: '/sucursales',
      name: 'sucursales',
      component: Sucursales
    }, {
      path: '/sucursales/registrar',
      name: 'RegistrarSucursal',
      component: RegistrarSucursal
    }, {
      path: '/sucursal/:idSuc/editar',
      name: 'editarSucursal',
      component: EditarSucursal
    }, {
      path: '/sucursal/:idSuc/detalles',
      name: 'detallesSucursal',
      component: DetallesSucursal
    },
    {
      path: '/tanques',
      name: 'tanques',
      component: Tanques
    }, {
      path: '/tanque/registrar',
      name: 'registrarTanque',
      component: RegistrarTanque
    }, {
      path: '/tanque/:idTan/editar',
      name: 'editarTanque',
      component: EditarTanque
    }

  ]
})
