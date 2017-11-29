'use strict'

const express = require('express')
const combustiblesCtlr = require('../controllers/combustibles')
const api = express.Router()

api.get('/combustible/:idCom', combustiblesCtlr.getCombustible)
api.get('/combustibles', combustiblesCtlr.getCombustibles)

module.exports = api
