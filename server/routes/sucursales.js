'use strict'

const express = require('express')
const sucCtlr = require('../controllers/sucursales')
const api = express.Router()

api.post('/sucursal', sucCtlr.addSucursal)
api.get('/sucursal/:id', sucCtlr.getSucursal)
api.get('/sucursales', sucCtlr.getSucursales)
api.put('/sucursal/:idSuc', sucCtlr.updateSursal)
api.delete('/sucursal/:idSuc', sucCtlr.deleteSucursal)

module.exports = api
