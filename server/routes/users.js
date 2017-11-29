'use strict'

const express = require('express')
const usersCtlr = require('../controllers/users')
const api = express.Router()

api.post('/login', usersCtlr.login)
api.post('/usuario', usersCtlr.addUser)
api.get('/usuario/:id', usersCtlr.getUser)
api.get('/usuarios', usersCtlr.getUsers)
api.put('/usuarios/:id', usersCtlr.updateUser)
api.delete('/usuarios/:id', usersCtlr.deleteUser)

module.exports = api
